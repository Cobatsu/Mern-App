const User = require('../models/user');
const Reports = require('../models/reports');
const mongoose = require('mongoose')

module.exports = async (req,res,next)=>{
  
    const { user } = req ; 

    try {
      
        const now = new Date();
        const today = new Date( now.getFullYear() , now.getMonth() , now.getDate() );
        
      if( user.role === 'Admin' ){

        const Agenta  = await User.find({ role:'Temsilci' });
        const SubBranches = await  User.find({role:'Bayi'});
        const Report = await Reports.find({ meetingDate:{ $gte:today }});

        let agentaRegions = {};
        let agentaReports = {};
        let regionReportInfo = {}; 
        
        

        let placeRegion = (item,propertyName)=>{
          
              let oldArray = agentaRegions[propertyName] || [];

              return  {...agentaRegions,[propertyName]:oldArray.concat(item)}

        }
        
        Agenta.forEach((item,index)=>{

              let propertyName = item.region;
              agentaRegions = placeRegion(item,propertyName);

        })
        
       
        for (const key in agentaRegions) {

            if (agentaRegions.hasOwnProperty(key)) {
                
                const element = agentaRegions[key];
                
                agentaReports[key] = element.map((agenta,index)=>{

                    var lastArray = [] ;

                    var subBranches =  SubBranches.filter( ( person,index )=>{
                              return person.relatedAgencyID.toString() == agenta._id.toString()
                    } ) 
                       
                         
                    lastArray = lastArray.concat( Report.filter(( report , index )=>{

                        if(report.owner) {

                            return   report.owner.toString() ===  agenta._id.toString()

                        } else {

                            return false ; 

                        }
                    

                    }))


                    subBranches.forEach ( ( person , index )=>{

                        lastArray = lastArray.concat( Report.filter((report,index)=>{

                            if(report.owner) {

                                return report.owner.toString() ==  person._id.toString() ;

                            } else {

                                 return false ; 

                            }
                            
                        }))
                        
                    })
                  
                    var subSchoolLength  = lastArray.filter((subReport,index)=>{
                        return subReport.reportType === 'schoolReport'                
                    })

                    var subStudentLength  = lastArray.filter((subReport,index)=>{
                        return subReport.reportType === 'studentReport'                
                    })

                    
                    return { studentLength:subStudentLength.length , schoolLength:subSchoolLength.length , totalLength:lastArray.length };
                })

            }
        }

       

        for (const key in agentaRegions) {

            if (agentaRegions.hasOwnProperty(key)) {

                const agentaRegions_1 = agentaRegions[key];
  
                const agentaReports_2 = agentaReports[key];
                 
                agentaRegions_1.forEach((user,index)=>{
                     
                    var fullName = user.firstName  + ' ' + user.lastName

                    regionReportInfo[key] = [ ...regionReportInfo[key] || []  , { reportInfo:agentaReports_2[index] , fullName , region :user.region + ' Bölge Temsilcisi'}];
  
                })

            }
        }
 
        return res.json({regionReportInfo});

      }

      else if ( user.role  === 'Temsilci' ){
          
         const subBranchesOfAgency  = await User.find( { relatedAgencyID : user._id } );


         const Report = await Reports.find({ meetingDate:{ $gte:today }});
     
         let regionReportInfo = {};    
    
         subBranchesOfAgency.forEach(( branch,index )=>{
 
            var matchedReports  = Report.filter((report,index)=>{
                    
                if(report.owner) { 

                    return report.owner.toString() === branch._id.toString()  

                } else {
                   
                    return false ; 

                }
                     

            })    

        
            var subSchoolLength  = matchedReports.filter((subReport,index)=>{
                return subReport.reportType === 'schoolReport'                
            })

          
            var subStudentLength  = matchedReports.filter((subReport,index)=>{
                return subReport.reportType === 'studentReport'                
            })
        
            var reportInfo = { studentLength:subStudentLength.length , schoolLength:subSchoolLength.length , totalLength:matchedReports.length }

            regionReportInfo[branch.region] = [ ... ( regionReportInfo[branch.region] || [] )  , { region:branch.region + ' Bayisi', fullName:branch.firstName + ' ' + branch.lastName , reportInfo } ]

        }) 

      
        
        return res.json({regionReportInfo});

      }
      else
      {
        return res.json('Not allowed to get any Data !');
      }
       
    } catch (error) {

        console.log(error);

        res.json({error});
        
    }
    
    //
}