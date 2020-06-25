
import styled  from 'styled-components';
import React,{useState,useEffect} from 'react';

const RotatingCircle = styled.div`

width:${({width})=> ( width || '50' ) + 'px'};
height:${({height})=> ( height || '50' ) + 'px'};
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

const Circle = React.memo(({Load,left,top,position,marginTop,width,height})=>{

   const [a,b] =   useState(0);

   useEffect(()=>{
        const reference = setInterval(()=>{
           
                b((prevState)=>{ 
                    if(a>=360)
                    {
                       return 0;
                    }
                    else{
                       return prevState+13
                    }    
                 });
            
       },10);

       return ()=>{
           clearInterval(reference);
       }
   },[a])
  

   return Load ? <RotatingCircle position={position} marginTop={marginTop} degree={a} top={top} left={left} width={width} height={height} /> : null;

})

export default Circle;