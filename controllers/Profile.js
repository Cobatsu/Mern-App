const User = require('../models/user');
const Reports = require('../models/reports');
const bcyrpt  = require('bcryptjs');
const moment = require('moment');

module.exports.Update = async (req,res,next)=>{ 

    const {id} = req.params; 
    const {newPassword,oldPassword} = req.body;

        if(newPassword && oldPassword)
        {            
            const findUser = await User.findOne({_id:id}); 
         
            bcyrpt.compare(oldPassword,findUser.password , async (err,result)=>{
               
                if(result)
                {
                    bcyrpt.hash(newPassword,10,async (err,hash)=>{
                        const updated = await User.updateOne({_id:id},{$set:{password:hash}}) //User can not update his FirstName and LastName
                        res.json({message:updated})
                    })
                }
                else
                {
                       res.json({notMatched:true})
                }

            })

        }
        else
        {
            res.json({message:'Server Error' , success:false})
        }   
};




module.exports.addReport  = async (req,res,next)=>{

    const {reportType,...rest} = req.body;
    const {user} = req;

    try {    
        const newReport = new Reports({
          ...rest,userID:user._id,reportType,whoseDocument:user.firstName + ' ' + user.lastName
         });
         
         await newReport.save();
         res.json({reportAdded:true , message:'Report Added !'});
   
    } catch (error) {
        res.json({error})
    }
}


const Query =  (body)=>{
    
    let searchData = null;

    for (const key  in body) { // it needs to be fixed

        const element = body[key];
       
        if(element)
        {
            if(key === 'reportType' || key === 'relatedAgencyID')
            {
                searchData={...searchData,[key]:element}
            }
            else if (key === 'dateIntervalStart')
            {
                searchData={...searchData,meetingDate:{$gte:element}}
            }
            else if (key === 'dateIntervalEnd')
            {
                searchData={...searchData,meetingDate:{...searchData.meetingDate,$lte:element}}
            }
            else
            {
                searchData={...searchData,[key]:{ $regex:element, $options: "i" }}
            }    
        }
         
    }
       return  searchData
}

module.exports.reportSearch = async (req,res,next)=>{

    const {user,body:{pageNumber,personelReportID,...rest}} = req;
    let searchData = Query(rest);
    
    console.log(personelReportID)

    try {

        if(user.role !== 'Admin')
        {
            searchData={...searchData,userID:user._id}
        }

        if(personelReportID)
        {
            searchData={...searchData,userID:personelReportID};
        }
        
        if(!pageNumber)
        {
            var documentCount = await Reports.countDocuments(searchData);     
        }
        let sortedData = await  Reports.find(searchData).sort({meetingDate:'descending'}).skip(10*pageNumber).limit(12);
        let copyReport = [...sortedData];
        copyReport.forEach((mainItem,index)=>{
            
             let copyReportObj = {...mainItem._doc};
             let format = mainItem.meetingDate;
             let lastDate = format.getDate() + '/'  + (format.getMonth()+1) + '/' + format.getFullYear();
             let dateArray = lastDate.split('/');
             let updatedArray = dateArray.map((item)=>item.length === 1 ? '0' + item  : item);

             copyReportObj.meetingDate = updatedArray.join('/'); 
             copyReport[index] = copyReportObj;
        })
        res.json({sortedData:copyReport,documentCount});
    }       
    catch (error) {
         console.log(error);
         res.json({error});
    }
}

module.exports.getSpecificReport =async (req,res,next)=>{
    const {id} = req.params;
    try 
    {
        const specificReport = await Reports.findOne({_id:id}).select('-__v -_id');
        res.json({specificReport});
    } catch (error) {
        res.json({error});
    }

}

module.exports.updateReport = async ( req,res,next)=>{

    const {params:{id} ,body} = req;
    
    try 
    {
        await Reports.updateOne({_id:id},{$set:{...body}})
        const updatedData = await  Reports.findOne({_id:id}).select('-__v -_id -userID');

        res.json({updatedData});

    } catch (error) 
    {
        res.json({error});
    }

}

module.exports.deleteReport = async (req,res,next)=>{
    const {params:{id},user} = req;

    if(user.role === 'Admin')
    {
        try {
            await Reports.remove({_id:id});
            res.json({removed:true})
        } catch (error) {
            res.json({error});
        }
    }
    else
    {
        return res.json({error:'Server Error'});
    }
   
}

