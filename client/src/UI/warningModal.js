import React,{useState,useEffect} from 'react';
import styled from 'styled-components';

const WarningModal = styled.div`
position:fixed;
display:flex;
justify-content:space-evenly;
align-items:center;
flex-flow:column;
min-width:100%;
min-height:40px;
top:${(props)=>props.top + '%'};
background:#eb4559;
transition:500ms;
z-index:2;
color:white;
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
                  Please Fill All Fields !
            </WarningModal>  
}

export default WarningModalC;