import React from 'react';

const studentsHomeAdress=({street,apartmentAndNumber,town,city,postalCode,warning,warning_text,changeHandler})=><div className='Item'>
<h1>2. STUDENT'S  HOME ADRESS</h1>
<div className='Fields'>

   <div>
     <label htmlFor='6' >Street</label>  
     {
         street  ? null  :warning 
     } 
     <input type='text' id='6' className={street ? null : warning_text }  onChange={changeHandler('street')} />
   </div>

   <div>
     <label>Apartment and Number</label> 
     {
        apartmentAndNumber  ? null  : warning
     }   
     <input type='text'  className={apartmentAndNumber ? null : warning_text }   onChange={changeHandler('apartment_and_number')}/>
   </div>

   <div>
     <label>Town</label>
     {
         town  ? null  :warning 
     }   
     <input type='text' className={town ? null : warning_text } onChange={changeHandler('town')}/>
   </div>

   <div>
     <label>City</label>
     {
         city  ? null  : warning 
     }  
     <input type='text' className={city ? null : warning_text } onChange={changeHandler('city')}/>
   </div>
   
   <div style={{width:'98%'}}>
     <label>Postal Code</label>
     {
         postalCode  ? null  :warning
     } 
     <input type='text' className={postalCode ? null : warning_text}  onChange={changeHandler('postal_code')}/>
   </div>

</div>
</div>

export default studentsHomeAdress;