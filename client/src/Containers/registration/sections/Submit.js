import React from 'react'
import Circle from '../../../UI/Circle';

const Submit = ( { circle , origin , disabled , setDisabled } )=> <div  style={{width:'100%',display:'flex' , justifyContent:'flex-end',padding:30}}>     


    {
         ( origin === 'DETAIL' &&  !disabled )   && <button onClick={ setDisabled } type='button'  style={{marginRight:8 , background:'#fa744f', opacity: circle ? '0.5' : '1' ,border:'none', color:'white',width:120 , height:50,position:'relative'}} >

              VAZGEÇ

        </button>  

    }


    {
        !disabled &&

        <button type='submit' disabled={circle}  style={{background:'#00bdaa', opacity: circle ? '0.5' : '1' ,border:'none', color:'white',width:120 , height:50,position:'relative'}}  >

          {

              circle ?  <Circle Load  height={30} width={30} position='static' marginTop={7} /> :
              
              origin === 'DETAIL' ?  'GÜNCELLE ' : 'SUBMİT'

          }

        </button>

    }

   </div>    

export default Submit;
