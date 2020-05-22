import React from 'react';


const requiredDocs = ({I1,I2,I3,I4,imageHandler,warning})=><div className='Item'>
<h1>REQUIRED DOCUMENTS</h1>
<div className='Fields'>

 <div className="upload-btn-wrapper">
 <label  style={{padding:5}}>A government issued photo identification </label>

 <button className="btn">
   {
     I1.name ? 
     <i className="fas fa-check-circle"></i>
     : null
   }
 { I1.name || 'Upload a file'}
 <input type="file" name="myfile" accept=".png, .jpg, .jpeg"   onChange={imageHandler('I1')} />
 </button>
  {
       I1.name ? null :  warning  
   } 
 </div>
 <div className="upload-btn-wrapper">
 <label  style={{padding:5}}>Rosedale English Proficiency Test Results</label>
 <button className="btn">
  {
      I2.name ? 
     <i className="fas fa-check-circle"></i>
     : null
   }
 { I2.name || 'Upload a file'}
 <input type="file" name="myfile" accept=".png, .jpg, .jpeg"  onChange={imageHandler('I2')} />
 </button>
  {
       I2.name ? null :  warning  
   } 
 </div>


 <div className="upload-btn-wrapper">
 <label style={{padding:5}} >English Proficiency Test Results</label>
 <button className="btn">
  {
     I3.name ? 
     <i className="fas fa-check-circle"></i>
     : null
   }
 { I3.name || 'Upload a file'}
 <input type="file" name="myfile" accept=".png, .jpg, .jpeg"   onChange={imageHandler('I3')} />
 </button>
   {
       I3.name ? null :  warning  
   } 
 </div>

 <div className="upload-btn-wrapper">
 <label style={{padding:5}} >A copy of translated transcripts </label>
 <button className="btn">
  {
     I4.name ? 
     <i className="fas fa-check-circle"></i>
     : null
   }
   
 {I4.name || 'Upload a file'}
 <input type="file" name="myfile" accept=".png, .jpg, .jpeg"  onChange={imageHandler('I4')} />
 </button>
   {
       I4.name ? null :  warning  
   } 
 </div>

</div>
</div> 

export default requiredDocs;
