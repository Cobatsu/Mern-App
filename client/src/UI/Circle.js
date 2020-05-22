
import styled  from 'styled-components';
import React,{useState,useEffect} from 'react';

const RotatingCircle = styled.div`

width:50px;
height:50px;
border-radius:50%;
border:3px solid white;
border-top:3px solid #00bdaa;
border-right:3px solid #00bdaa;
transform: rotate(${({degree})=>degree+'deg'});
position:${({position})=> position || 'absolute'};
right:auto;
left:auto;
margin-top:${({marginTop})=>marginTop + 'px'};
margin-bottom:30px;
margin-left:auto;
margin-right:auto;
top:${({top})=>top + '%'};
z-index:4;


`

const Circle = React.memo(({Load,left,top,position,marginTop})=>{

   const [a,b] =   useState(0);

   useEffect(()=>{
        const reference = setInterval(()=>{
           
                b((prevState)=>{ 
                    if(a>=360)
                    {
                       return 0;
                    }
                    else{
                       return prevState+15
                    }    
                 });
            
       },10);

       return ()=>{
           clearInterval(reference);
       }
   },[a])
  

   return Load ? <RotatingCircle position={position} marginTop={marginTop} degree={a} top={top} left={left}  /> : null;

})

export default Circle;