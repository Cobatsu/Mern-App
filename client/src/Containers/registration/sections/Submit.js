import React from 'react'
import Circle from '../../../UI/Circle';

const Submit = ({circle})=><div className='Item'> 
<div style={{width:'100%', display:'flex', justifyContent:'center',alignItems:'flex-start'}}> 
   <div className='submit' style={{width:'30%',position:'relative'}}>    
     <Circle Load={circle}/>   
     <input type='submit' disabled={circle}  style={{background:'#d7385e',border:'none', color:'white',width:'100%',padding:'14px',boxShadow:'0px 3px 8px black'}}  value='SUBMİT'/>
   </div>    
 </div> 
</div>  

export default Submit;
