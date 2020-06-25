import React from 'react';
import moment from 'moment';
const studentInfo  =({name,warning,warningText,surname,phoneNumber,eMail,changeHandler,birthDate,disabled})=><div className='Item'>
<h1>1. STUDENT INFORMATION</h1>
<div className='Fields'>

   <div>
     <label htmlFor='1' >Legal First Name</label>  
     {
         name  ? null  : warning  
     }          
     <input  type='text' value={name} disabled={disabled} className={ name ? null : warningText } placeholder='Fatih' id='1' onChange={changeHandler('name')}/>
   </div>

   <div>
     <label htmlFor='2.'>Legal Last Name</label> 
     {
       surname ? null : warning
     }   
     <input type='text' disabled={disabled}   value={surname}  placeholder='Özer' className={surname ? null : warningText }  id='2.' onChange={changeHandler('surname')}/>
   </div>

   <div>
     <label htmlFor='2'>Student's Mobile Phone Number</label>
     {
         phoneNumber ? null  :warning 
     } 
     <input type='text' disabled={disabled}   value={phoneNumber} id='2'className={phoneNumber ? null : warningText } onChange={changeHandler('phone_number')}/>
   </div>

   <div>
     <label htmlFor='3'>Student's E-mail Address</label>
     {
         eMail  ? null  :warning 
     } 
     <input   type='text' disabled={disabled}  value={eMail} id='3' className={eMail  ? null : warningText } onChange={changeHandler('e_mail')}/>
   </div>
   
   <div>

     <label htmlFor='4'>Date of Birth</label>
     <input type='date' id='4' disabled={disabled}  value={ new Date(birthDate).toISOString().substring(0, 10) }   onChange={changeHandler('date_of_birth')}/>
     
   </div>

   <div>
     <label htmlFor='5'>Gender</label>
     <select onClick={changeHandler('gender')} disabled={disabled} >
          <option>Male</option>
          <option>Female</option>
     </select>
   </div>

</div>
</div>

export default studentInfo;

