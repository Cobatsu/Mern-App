import React from 'react';
import moment from 'moment';
const registeringStudent =({country_of_birth,country_of_citizenship,native_language,first_date_of_grade_9_ref,changeHandler,warning,warning_text})=><div className='Item'>
<h1>3. ABOUT REGISTERING STUDENT</h1>
<div className='Fields'>

   <div>
     <label htmlFor='6' >Country of Birth</label>  
     {
        country_of_birth ? null  :warning  
     }  
     <input type='text' id='6' className={country_of_birth ? null : warning_text}  onChange={changeHandler('country_of_birth')}/>
   </div>

   <div>
     <label>Country of Citizenship</label> 
     {
         country_of_citizenship  ? null  :warning  
     }  
     <input type='text' className={country_of_citizenship ? null : warning_text}  onChange={changeHandler('country_of_citizenship')}/>
   </div>

   <div>
     <label>First Date of Grade 9</label>
     <input type='date' defaultValue={new Date().toISOString().substr(0, 10)} ref={first_date_of_grade_9_ref}  onChange={changeHandler('first_date_of_grade_9')}/>
   </div>

   <div>
     <label>Native Language </label>
     {
         native_language  ? null  :warning  
     }
     <input type='text' className={native_language ? null : warning_text}  onChange={changeHandler('native_language')}/>
   </div>
   
</div>
</div>

export default registeringStudent;
