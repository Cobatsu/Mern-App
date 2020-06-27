import React from 'react';

const prevSchoolInfo = ({currentorlastAttendedSchool,warning,warning_text,changeHandler,disabled})=> <div className='Item'>
<h1>5.PREVIOUS SCHOOL INFORMATION</h1>
<div className='Fields'>

   <div>
     <label htmlFor='6' >Are you currently attending a high school?</label>   
     <select onClick={changeHandler('currently_attending_a_high_school')} disabled={disabled} >
         <option>Yes</option>
         <option>No</option>
     </select>
   </div>

   <div>
     <label>Current or Last Attended School Name </label>
     {
        currentorlastAttendedSchool  ? null  :warning 
     }   
     <input type='text'  value={currentorlastAttendedSchool} disabled={disabled} className={currentorlastAttendedSchool ? null :warning_text} onChange={changeHandler('currentor_last_attended_school_name')}/>
   </div>

   <div>
     <label>English Language Proficiency</label>
     <select onClick={changeHandler('english_language_proficiency')}  disabled={disabled} >
          <option>TOEFL</option>
          <option>IELTS</option>
          <option>TOEIC</option>
          <option>CAEL</option>
     </select>
   </div>

   <div>
     <label>I look forward to study at rosedale academy</label>
     <select onClick={changeHandler('look_forward_to_study_at_rosedale')} disabled={disabled}  >
          <option>Grade 10</option>
          <option>Grade 11</option>
          <option>Grade 12</option>
     </select>
   </div>
   
   <div style={{width:'98%'}}>
     <label>Desired University Studies</label>
     <select onClick={changeHandler('desired_university_studies')} disabled={disabled} >
          <option>Engineering &  Physics</option>
          <option>Health &  Environment</option>
          <option>Accounting &  Mathematics</option>
          <option>Business &  Mathematics</option>
          <option>Social Sciences</option>
     </select>
   </div>

</div>
</div>

export default prevSchoolInfo;
