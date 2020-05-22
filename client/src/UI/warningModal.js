import React,{useState,useEffect} from 'react';
import styled from 'styled-components';

const WarningModal = styled.div`
position:fixed;
display:flex;
justify-content:space-evenly;
align-items:center;
flex-flow:column;
width:100%;
height:6%;
padding:15px 0;
top:${(props)=>props.top + '%'};
background:#eb4559;
transition:500ms;
z-index:2;
color:white;
@media (max-width: 1030px) {
    width:100%;
    height:5%;
  }
@media (max-width: 500px) {
    width:100%;
    height:5%;
  }
@media (max-width: 350px) {
    width:100%;
    height:7%;
  }
`

const WarningModalC = (props)=>{ 

    const [modalY,setModalY] = useState(-100);

    useEffect(()=>{
        if(props.warning)
        {
          setModalY(0);
        }
        else if(!props.warning)
        {
          setModalY(-50);
        }
      },[props.warning])

      
      return <WarningModal top={modalY}>
            <h2 style={{textAlign:'center', fontSize:15 ,color:'white',fontWeight:'bolder'}}>Please Fill All Fields !</h2>
            </WarningModal>  
}

export default WarningModalC;