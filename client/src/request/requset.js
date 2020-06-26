import axios from 'axios';
import ReactDOM from 'react-dom';

export const makeRequest = (Type,Body,activeCircle,backStage,setResult) => {

    activeCircle(true);

    axios[Type]('/api/register',Body).then((data)=>{   

      const { result } = data.data ; 
    

      ReactDOM.unstable_batchedUpdates(()=>{

        setResult(result);
  
        backStage(true);
  
        activeCircle(false);
           
      })
         
    })
    .catch((err)=>{ console.log(err) })    
}



export const makePersonelRequest = (type,setPersonels,setLoading)=>{
  
  setLoading(true);

  axios[type]('/api/user/get').then((res)=>{
       
        const {personels} =  res.data; 
        
        setPersonels(personels);
        setLoading(false);
   
  })
  .catch(()=>{

  })

}

export const makeAddUserRequest = (Type,Body,alreadyInUse,setModal,setLoggedin)=>{
  axios[Type]('/api/user',Body,{
    headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`}}).then((res)=>{
    if(res.data.error && !res.data.isLoggedin)
    {
      setLoggedin(false);
    }
    else if(res.data.notUnique)
    {
      alreadyInUse(true);
    }
    else
    {
      setLoggedin(true);
      setModal(true)
    }
  })
  .catch((err)=>{
        console.log(err);
  })

}




export const makeLogoutRequest = (Type,Body,setLoggedin,setLoading)=>{
  axios[Type]('/api/logout',Body,  {
    headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`}}).then((res)=>{
    const {isLoggedin} = res.data;

    localStorage.removeItem('auth_token')
    setLoggedin(isLoggedin);
    setLoading(false)
  }
  )
  .catch((err)=>{
  
  })
}

export const makeCurrentUserRequest = (Type,Body,setCurrentUser,setLoggedin,setLoading)=>{
  
  axios[Type]('/api/getUser',Body).then((res)=>{
   
     setCurrentUser(res.data.user)
     setLoggedin(true);
     setLoading(false);
  })
  .catch(()=>{

  })
  
}


export const makeVerifyRequest = (Type,setUser,setLoggedin,setLoading )=>{

  axios[Type]('/api/verify', {
    headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`}}).then((res)=>{
        const {user,isLoggedin} = res.data;

           setLoggedin(isLoggedin);
           setUser(user);
           setLoading(false);

  })
  .catch((err)=>{
    console.log(err);
  })
  
}

export const makeAuthenticationRequest = (Type,Body,redirectTo,setContext)=>{

   setContext.setLoadingf(true);
   
   axios[Type]('/api/login',Body).then((res)=>{

    if(res.data.user)
    {
      const isLoggedState = { isLoggedin:true }

      const { user , token } = res.data;

          localStorage.setItem('auth_token',token);

          setContext.setLoadingf(false);
          setContext.setUser(user);
          setContext.isLoggedinf(true);  
          redirectTo(isLoggedState)
      
    }
    else
    {
      setContext.setLoadingf(false);  
      setContext.isLoggedinf(false);
      const type = {warning:true}
      return redirectTo(type);
    }

   }
   )
   .catch((err)=>{

    console.log(err);

    setContext.isLoggedinf(false); 
    setContext.setLoadingf(false);
    const type = {warning:true}
    return redirectTo(type);
   })
}

export const makePermissionRequest = (Type,setPermission)=>{
 
  axios[Type]('/api/user/permission')
  .then((res)=>{
    const {permissionsList} = res.data;
    setPermission(permissionsList);
  })
  .catch((err)=>{

  })
}
export const makeSpecificPersonRequest = (Type,person_id,setLoading,setPerson,setPermission,setReuse,setrePermissions)=>{

  setLoading(true);

  axios[Type]('/api/user/'+person_id)
  .then((res)=>{
    const {person,error} = res.data;
    const {permissions}  = person; 
    
    if(error)
    {
       console.log(error);
    }
    else
    {
      setLoading(false);
      setPerson(person);
      setReuse(person);
      setrePermissions(permissions);
      setPermission(permissions);
    }
  })
  .catch((err)=>{
     console.log(err);
  })
}

export const makeUpdateUserRequest = (Type,id,Body,setLoggedin,alreadyInUse,setModal,setreuseUser,setrePermissions,setDisable,setUserInformations)=>{
  
  axios[Type]('/api/user/'+id,Body,{

    headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`}}).then((res)=>{
  
    if(res.data.error && !res.data.isLoggedin)
    {
      setLoggedin(false);
    }
    else if(res.data.notUnique)
    {
      alreadyInUse(true);
    }
    else
    {
      const {updatedNewUser} = res.data;
      const {permissions} =  updatedNewUser;

      setrePermissions(permissions);
      setDisable(true);
      setUserInformations(updatedNewUser);
      setreuseUser(updatedNewUser);
      setModal(true);

    }
  })
  .catch((err)=>{
        console.log(err);
  })
}

export const makeRemoveUserRequest = (Type,id,setLoggedin,_,setIsDeleted)=>{
  axios[Type]('/api/user/'+id,{
    headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`}}).then((res)=>{
    if(res.data.error && !res.data.isLoggedin)
    {
      setLoggedin(false);
    }
    else
    {
      setIsDeleted(true);   
    }
  })
  .catch((err)=>{
        console.log(err);
  })
}

export const makeChangeProfiePasswordRequest = (Type,id,setLoggedin,setChangedPopUp,setIsOldPasswordTrue,Body,resetPassword)=>{
  axios[Type]('/api/profile/'+id,Body,{

    headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`}

  }
  ).then((res)=>{

    if(res.data.error && !res.data.isLoggedin)
    {
      setLoggedin(false);
    }
    else if (res.data.notMatched)
    {
      setIsOldPasswordTrue(true);
    }
    else
    {
      setChangedPopUp(true); 
      resetPassword({
        oldPassword  : '',
        newPassword  : '',
        verifyPassword  : '',  
      });
    }

  })
  .catch((err)=>{
        console.log(err);
  });
}

export const makeAddReportRequest = (Type,Body,setReportAdded,setLoggedin,reportType,State)=>{
  axios[Type]('/api/profile/report/add',{...Body,reportType},{
    headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`} 
  })
  .then((res)=>{

    if(res.data.error && !res.data.isLoggedin)
    {
      setLoggedin(false);
    }
    else if (res.data.reportAdded)
    {
      setReportAdded(true);
      State({});
    }

  })
  .catch((err)=>{

  })

}

export const makeReportsRequest = (Type,setReports,setLoading)=>{

  axios[Type]('/api/profile/report/',{
    headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`} 
  })
  .then((res)=>{
      const {reports} = res.data;
      setLoading(false);
      setReports(reports);
  })
  .catch((err)=>{
      console.log(err);
  })
}


export const makeSpecificReportRequest = (Type,id,setLoading,setInitialReport,reIsetInitalReport,setNotFoundPage,initialGeneralReportState)=>{

  axios[Type]('/api/profile/report/'+id)
  .then((res)=>{

    if(res.data.error)
    {
        setNotFoundPage(true);
    }

    const {specificReport} =res.data;

    if(specificReport) { 

      ReactDOM.unstable_batchedUpdates(()=>{

        setInitialReport((prevState)=>({...prevState,...specificReport , owner:specificReport.owner || {} }));
        reIsetInitalReport((prevState)=>({...prevState,...specificReport  , owner:specificReport.owner || {}  }));
        setLoading(false);
  
      })

    }


  })
  .catch((res)=>{


  });

}

export const makeUpdateReportRequest = (Type,id,updatedData,setLoggedin,setInitalReportState,reIsetInitalReportState,setUpdatedModal,setDisable)=>{
  axios[Type]('/api/profile/report/'+id,updatedData,{
    headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`}})
    .then((res)=>{  

      if(res.data.error && !res.data.isLoggedin)
      {
        setLoggedin(false);
      }
      else
      {
        const {updatedData} = res.data; 

        setInitalReportState(updatedData);
        reIsetInitalReportState(updatedData);
        setDisable(true);
        setUpdatedModal(true);
      }
      
    })
   .catch((err)=>{

   })
}

export const makeDeleteReportRequest =(Type,id,setLoggedin,setDeleted)=>{

  axios[Type]('/api/profile/report/'+id,{
    headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`}}).then((res)=>{
    if(res.data.error && !res.data.isLoggedin)
    {
      setLoggedin(false);
    }
    else
    {
      setDeleted(true);   
    }
  })
  .catch((err)=>{
        console.log(err);
  })
}

export const makeReportSearchRequest = (Type , searchData , setLoggedin , setReport , close , setCount , setLoading , setNotFound , subPagesCount  )=>{
  
  axios[Type]('/api/profile/report_search',searchData,{
    headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`} 
  })
  .then((res)=>{
    
    const {sortedData,documentCount} = res.data;
    

    if(res.data.error && !res.data.isLoggedin){
      return setLoggedin(false);
    }
    else if (sortedData.length > 0) {
        
      setCount(documentCount);
      setNotFound(null)
      close();
      setReport(sortedData);

    }
    else {

    

      setCount( 0 );
      setNotFound(true)
      close();
      setReport([]);

    }
    
    setLoading(false);
    
  })
  .catch((err)=>{
      console.log(err);
  })

}

export const makePersonSearchRequest = (Type,searchData,setLoggedin , setReport , close , setCount , setLoading , setNotFound , subPagesCount  ) =>{
  axios[Type]('/api/user/person_search',searchData,{
    headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`} 
  })
  .then((res)=>{
     
    const {sortedData,documentCount} = res.data;

    if(res.data.error && !res.data.isLoggedin) {

      return setLoggedin(false);
      
    } else if (sortedData.length > 0) {
      
      setCount(documentCount);
      close();
      setReport(sortedData);
      setNotFound(null)
      
    } else {

      setCount(0);    
      setNotFound(true)
      close();
      setReport([]);

    }

    setLoading(false);
  

  })
  .catch((err)=>{
      console.log(err);
  })

}

export const makeSubBranchRequest = (Type,id,setSubBranches)=>{
  
  axios[Type]('/api/user/subBranch/'+id, { headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`} })
  .then((res)=>{    
    
    const {subBranches} = res.data;
    
  })
  .catch((err) => {

  })
  
}

export const makeRelatedAgencyRequest = (Type,id,setLoading,setRelatedAgency,setLoggedin)=>{

  setLoading(true)
 axios[Type]('/api/user/relatedAgency/'+id,{
  headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`} 
 })
 .then((res)=>{
     
      const { relatedAgency } = res.data;

      if(res.data.error && !res.data.isLoggedin) {

        setLoggedin(false);

      }
      else {

        setRelatedAgency(relatedAgency)
        setLoading(false);

      }

 })
 .catch((data)=>{

 })

}


export const makeStudentSearchRequest = (Type,searchData,setLoggedin , setReport , close , setCount , setLoading , setNotFound , subPagesCount  ) =>{


  axios[Type]('/api/register/get_students',searchData,{
    headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`} 
  })
  .then((res)=>{

     
    const { sortedData , documentCount } = res.data;

    if(res.data.error && !res.data.isLoggedin) {


      return setLoggedin(false);
      
    }

    else if (sortedData.length > 0)
    {
      
      setCount(documentCount);
      close();
      setReport(sortedData);
      setNotFound(null)

      
    }
    else
    {
      setCount(0);    
      setNotFound(true)
      close();
      setReport([]);

    }

    setLoading(false);
  

  })
  .catch((err)=>{
      console.log(err);
  })

}

export const makeSendFormRequest = ( Type , data , setSentForm , setFormSent )=>{

  axios[Type]('/api/register/sendForm',data ,{
    headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`} 
  }).then((response)=>{
       
    const { result , tokenLink } = response.data ; 

    setFormSent( {result:result , text:data.requestType , payload:tokenLink} ) ; 
    
    setSentForm(true);

  })
  .catch((error)=>{
 
    setFormSent( {result:'Error' }) ; 

    setSentForm(true);
    
  })

}


export const makeUpdateStudentRequest = ( Type , data , id , setUpdatedStudent , setBackStageLoading , setModalType ) => {

  axios[Type]('/api/register/student/'+ id ,data , { headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`}})
  
  .then((response)=>{

    const { updatedStudent:{ StudentInfo } } = response.data ; 

    ReactDOM.unstable_batchedUpdates(()=>{

      setBackStageLoading(false);
      setUpdatedStudent(StudentInfo);
      setModalType('STUDENT_UPDATED');

    })
 
  })
  .catch((err)=>{

  })
  
} 

export const makeDeleteStudentRequest = ( Type , id , setBackStageLoading , setModalType )=>{
   
  axios[Type]('/api/register/student/'+ id , 
  { headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`}}).then((response)=>{

    
    ReactDOM.unstable_batchedUpdates(()=>{

      setBackStageLoading(false);
      setModalType('STUDENT_DELETED');

    })
  }).catch(()=>{


  })

}


export const makeSendForConfirmationRequest = ( Type  , id , setUpdatedStudent , setBackStageLoading , setModalType  ) => {


  axios[Type]('/api/register/send_confirmation/'+ id , {},
  { headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`}}).then((response)=>{
      
    const  { updatedStudent , error } = response.data ; 
    

    if( error ) {
          
        return console.log(error) ; 

    }

    ReactDOM.unstable_batchedUpdates(()=>{

      setUpdatedStudent(updatedStudent);
      setBackStageLoading(false);
      setModalType('CONFİRMATİON_SENT');

    })
  

  }).catch(()=>{


  })


}

export const makeConfirmStudentRequest = ( Type  , id , setUpdatedStudent , setBackStageLoading , setModalType  ) =>{

 
        axios[Type]('/api/register/confirm_student/'+ id , {},
        { headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`}}).then((response)=>{
            
          const  { updatedStudent , error } = response.data ; 
          

          if( error ) {
                
              return console.log(error) ; 

          }

          ReactDOM.unstable_batchedUpdates(()=>{

            setUpdatedStudent(updatedStudent);
            setBackStageLoading(false);
            setModalType('CONFİRMED_STUDENT');

          })
        

        }).catch(()=>{


        })

}

export const makeSpecificStudentRequest = ( Type , id ,  setLoading , setStudent ) => {

  axios[Type]('/api/register/student/'+ id ,  { headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`}}).then( (res) => {
 
      const { specificStudent , error } = res.data;   
      
    if(error) {
 
       console.log(error);
 
    } else {
 
       setStudent(specificStudent);
       setLoading(false);
 
    }
 
   })
   .catch((err)=>{
     
       console.log(err);
   });
 }