import React from 'react';
import moment from 'moment';
const studentInfo  =({name,warning,warningText,surname,phoneNumber,eMail,date_of_birth_ref,gender_ref,changeHandler,state})=><div className='Item'>
<h1>1. STUDENT INFORMATION</h1>
<div className='Fields'>

   <div>
     <label htmlFor='1' >Legal First Name</label>  
     {
         name  ? null  : warning  
     }          
     <input type='text' className={ name ? null : warningText } placeholder='Fatih' id='1' onChange={changeHandler('name')}/>
   </div>

   <div>
     <label htmlFor='2.'>Legal Last Name</label> 
     {
       surname ? null : warning
     }   
     <input type='text'placeholder='Özer' className={surname ? null : warningText }  id='2.' onChange={changeHandler('surname')}/>
   </div>

   <div>
     <label htmlFor='2'>Student's Mobile Phone Number</label>
     {
         phoneNumber ? null  :warning 
     } 
     <input type='text' id='2'className={phoneNumber ? null : warningText } onChange={changeHandler('phone_number')}/>
   </div>

   <div>
     <label htmlFor='3'>Student's E-mail Address</label>
     {
         eMail  ? null  :warning 
     } 
     <input   type='text' id='3' className={eMail  ? null : warningText } onChange={changeHandler('e_mail')}/>
   </div>
   
   <div>
     <label htmlFor='4'>Date of Birth</label>
     <input type='date'  defaultValue={new Date().toISOString().substr(0, 10)} id='4' ref={date_of_birth_ref}  onChange={changeHandler('date_of_birth')}/>
   </div>

   <div>
     <label htmlFor='5'>Gender</label>
     <select onClick={changeHandler('gender')} ref={gender_ref}>
          <option>Male</option>
          <option>Female</option>
     </select>
   </div>

</div>
</div>

export default studentInfo;

