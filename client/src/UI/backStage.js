import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import Circle from '../UI/Circle'

const Stage = styled.div`
position:fixed;
width:100%;
top:0;
left:0;
height:100vh;
background-color:black;
opacity:0.3;
z-index:3;
`

const BackStage  = React.memo(({backStage,close,loading})=>{
  
    //it is so important to determine top and left for fixed objects
    if(backStage && !loading) {

       var BackStage = <Stage onClick={close}/>

    } else if(backStage && loading) {

       var BackStage = <React.Fragment>
        <Stage/>
        <Circle top={40} Load={loading} position='fixed' />
      </React.Fragment>

    } else {

       var BackStage=null;

    }

    return BackStage;
})

export default BackStage;