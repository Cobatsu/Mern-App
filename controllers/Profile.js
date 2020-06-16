const User = require('../models/user');
const Reports = require('../models/reports');
const bcyrpt  = require('bcryptjs');
const moment = require('moment');
const { Regions } = require('../client/src/Regions/regions');
const {data} = require('../client/src/Regions/regions2')

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
         res.json({reportAdded:true});
   
    } catch (error) {
        res.json({error})
    }

}

module.exports.addContactReport = async (req,res,next)=>{
     
<<<<<<< HEAD
    const contactData = req.body  
=======
    const contactData = req.body ; //lo 
>>>>>>> new
     
    const findedCity = data.find((City)=>{ return City['il_adi'].toLocaleLowerCase() === contactData.region.toLocaleLowerCase(); }) ;
    
    const regionOfCity = findedCity['bolge'];
     //hey I want to be merged
    
    const relatedAgencies  = await User.find({ $or:[{region:regionOfCity , responsibleCities:{$all:['']}}] });


    const IDs = relatedAgencies.map((user)=>{ return user._id ;})
    
    // hey

    try {    
        
        const newReport = new Reports({
          ...rest,userID:IDs,reportType,whoseDocument:user.firstName + ' ' + user.lastName,
        });
         
         await newReport.save();
         res.json({reportAdded:true});
   
    } catch (error) {
        res.json({error})
    }


}


const Query =  (body)=>{
    
    let searchData = {};

    for (const key  in body) { // it needs to be fixed

        const element = body[key];
       
        if(element)
        {
            if(key === 'reportType' || key === 'relatedAgencyID'){
                searchData={...searchData,[key]:element}
            }
            else if (key === 'dateIntervalStart'){
                searchData={...searchData,meetingDate:{$gte:element}}
            }
            else if (key === 'dateIntervalEnd'){
                searchData={...searchData,meetingDate:{...searchData.meetingDate,$lte:element}}
            }
            else{
                searchData={...searchData,[key]:{ $regex:element, $options: "i" }}
            }    
        }
         
    }
       return  searchData
}

module.exports.reportSearch = async (req,res,next)=>{

    const {user,body:{pageNumber,personelReportID,role,...rest}} = req;

    let searchData = Query(rest);
  
    try {

        if(user.role === 'Bayi') searchData={ ...searchData , userID:user._id } ; 

        if( personelReportID && role === 'Bayi')  searchData={...searchData,userID:personelReportID };
                
        if( ( user.role !== role && role === 'Bayi')  ||  ( user.role === role &&  role !== 'Temsilci') ) {
            var documentCount = await Reports.countDocuments( searchData );    
        }
             

        if ( role === 'Temsilci' ) {
            var sortedData = await  Reports.find ( searchData ).sort({meetingDate:'descending'});
        }
        else {
            var sortedData = await  Reports.find ( searchData ).sort({meetingDate:'descending'}).skip(10*pageNumber).limit(10);
        }
      
        

        if( ( user.role === 'Temsilci' && role !== 'Bayi' ) ||  role === 'Temsilci' ) {


            var newSortedArray  = [];
                 
            sortedData.forEach((report,index) => {
        
               if( report.userID == ( user.role === 'Temsilci'  ?  user._id : personelReportID  ) ) newSortedArray[index] = report ;

            })

            var subBranches   = await User.find ( { relatedAgencyID: user.role === 'Temsilci'  ?  user._id : personelReportID  } );

            subBranches.forEach( ( branch ) => {

                sortedData.forEach( ( report,index ) => {
                    
                    if(report.userID == branch._id)  newSortedArray[index] = report
                     
                })
                
            })

              //we remove undefined files .;

            
            newSortedArray = newSortedArray.filter( (item,index)=> item );

            var newSortedArrayLength = newSortedArray.length;
           
            var factor1 =  typeof pageNumber === 'number' ? pageNumber : 0 ; 
     
            sortedData = newSortedArray.filter( ( item , index )=> item ).slice( 10 * factor1 , 10 + 10 * factor1);

        }
        
        let copyReport = [...sortedData ];

        copyReport.forEach((mainItem,index)=>{
            
             let copyReportObj = {...mainItem._doc};
             let format = mainItem.meetingDate;
             let lastDate = format.getDate() + '/'  + (format.getMonth()+1) + '/' + format.getFullYear();
             let dateArray = lastDate.split('/');
             let updatedArray = dateArray.map((item)=>item.length === 1 ? '0' + item  : item);

             copyReportObj.meetingDate = updatedArray.join('/'); 
             copyReport[index] = copyReportObj;
        })

        res.json({ sortedData:copyReport , documentCount: documentCount || newSortedArrayLength});

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

    const { params: { id } , body } = req;
    
    try {
        await Reports.updateOne({_id:id},{$set:{...body}})
        const updatedData = await  Reports.findOne({_id:id}).select('-__v');

        res.json({updatedData});

    } catch (error) {
        res.json({error});
    }

}

module.exports.deleteReport = async (req,res,next)=>{
    const {params:{id},user} = req;

        try {
            await Reports.remove({_id:id});
            res.json({removed:true})
        } catch (error) {
            res.json({error});
        }

}

