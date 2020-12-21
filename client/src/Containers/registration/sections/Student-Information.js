import React from 'react';



const studentInfo  =({name,warning,warningText,surname,phoneNumber,eMail,changeHandler,birthDate,disabled,student,origin,gender})=><div className='Item'>
<h1>1. STUDENT INFORMATION</h1>
<div className='Fields'>

   <div>
     <label htmlFor='1' >Legal First Name</label>  
     {
         name  ? null  : warning  
     }          
     <input  type='text' value={name} disabled={ !student && origin === 'UPDATE'   ? true : disabled  } className={ name ? null : warningText } placeholder='Fatih' id='1' onChange={changeHandler('name')}/>
   </div>

   <div>
     <label htmlFor='2.'>Legal Last Name</label> 
     {
       surname ? null : warning
     }   
     <input type='text' disabled={ !student && origin === 'UPDATE'   ? true : disabled  }   value={surname}  placeholder='Özer' className={surname ? null : warningText }  id='2.' onChange={changeHandler('surname')}/>
   </div>

   <div>
     <label htmlFor='2'>Student's Mobile Phone Number</label>
     {
         phoneNumber ? null  :warning 
     } 
     <input placeholder='asd' disabled={ !student && origin === 'UPDATE'   ? true : disabled  }   value={phoneNumber.split('_').join(" ")} id='2'className={phoneNumber ? null : warningText } onChange={changeHandler('phone_number')}/>
   </div>

   <div>
     <label htmlFor='3'>Student's E-mail Address</label>
     {
         eMail  ? null  :warning 
     } 
     <input   type='text' disabled={ !student && origin === 'UPDATE'   ? true : disabled  }  value={eMail} id='3' className={eMail  ? null : warningText } onChange={changeHandler('e_mail')}/>
   </div>
   
   <div>

     <label htmlFor='4'>Date of Birth</label>
     <input type='date' id='4' disabled={ !student && origin === 'UPDATE'   ? true : disabled  }  value={ new Date(birthDate).toISOString().substring(0, 10) }   onChange={changeHandler('date_of_birth')}/>
     
   </div>

   <div>
     <label htmlFor='5'>Gender</label>
     <select onChange={changeHandler('gender')} value={gender} disabled={disabled} >
          <option>Male</option>
          <option>Female</option>
     </select>
   </div>

</div>
</div>

export default studentInfo;

