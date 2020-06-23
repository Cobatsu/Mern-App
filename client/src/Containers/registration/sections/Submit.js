import React from 'react'
import Circle from '../../../UI/Circle';

const Submit = ({circle})=> <div className='submit' style={{width:'100%',display:'flex' , justifyContent:'flex-end',padding:30}}>     

     <button type='submit' disabled={circle}  style={{background:'#d7385e', opacity: circle ? '0.5' : '1' ,border:'none', color:'white',width:120 , height:50,position:'relative'}}  value='SUBMİT'>

       {

           circle ? <Circle Load  height={30} width={30} position='static' marginTop={7} /> : 'SUBMİT'

       }

     </button>

   </div>    

export default Submit;
