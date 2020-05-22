import React from 'react';

const parentInformation =({parentFirstName,parentLastName,parenEmailAdress,parentPhoneNumber,warning,warning_text,changeHandler,relationship_to_student_ref})=><div className='Item'>
<h1>4.PARENT INFORMATION</h1>
<div className='Fields'>

   <div>
     <label htmlFor='6' >Parent/Guardian First Name</label>  
     {
         parentFirstName  ? null  :warning  
     } 
     <input type='text' id='6' className={parentFirstName  ? null : warning_text}  onChange={changeHandler('parent_guardian_first_name')}/>
   </div>

   <div>
     <label>Parent/Guardian Last Name </label> 
     {
         parentLastName  ? null  :warning  
     }   
     <input type='text' className={ parentLastName ? null : warning_text} onChange={changeHandler('parent_guardian_last_name')}/>
   </div>

   <div>
     <label>Relationship to Student</label>
     <select onClick={changeHandler('relationship_to_student')} ref={relationship_to_student_ref}>
          <option>Father</option>
          <option>Mother</option>
          <option>Other</option>
     </select>
   </div>

   <div>
     <label>Parent/Guardian E-mail Address </label>
     {
         parenEmailAdress  ? null  :warning  
     } 
     <input type='text' className={parenEmailAdress ? null : warning_text}  onChange={changeHandler('parent_guardian_e_mail_address')}/>
   </div>
   
   <div style={{width:'98%'}}>
     <label>Parent/Guardian Mobile Phone Number </label>
     {
         parentPhoneNumber  ? null  :warning  
     }
     <input type='text' className={parentPhoneNumber ? null : warning_text}  onChange={changeHandler('parent_guardian_mobile_phone_number')}/>
   </div>

</div>
</div>

export default parentInformation;
