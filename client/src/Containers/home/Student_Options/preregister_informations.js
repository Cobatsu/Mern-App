import React,{useEffect,useState} from 'react';
import {UpdateLoggedin}  from '../../isLoggedin/action'
import {makeSpecificStudentRequest}  from '../../../request/requset'
import styled from 'styled-components';
import Circle from '../../../UI/Circle';
import { IconEdit , IconRemove , IconSendConfirmation } from '../../../UI/IconButtons/IconButton';
import RegisterForm from '../../registration/registerForm'

const MainWrapper = styled.form`
display:flex;
background:white;
width:70%;
margin:0 auto;
align-items:center;
justify-content:center;
padding:0;
margin-top:2%;
margin-bottom:30px;
@media (max-width: 1030px) {
  padding:10px;
}
border-radius:3px;
flex-flow:column;
`

const InnerItems = styled.div`
display:flex;
justify-content:flex-end;
width:95%;
margin-bottom:20px;
color:#30475e;
@media (max-width: 1030px) {
    justify-content:center !important;
}
`

const Title = styled.div `

font-size: 22 ; 
font-weight:bolder ; 
margin:20px 0 ; 
color:#61c0bf ;

`


const StudentInformations  = ( { match , ...rest } )=>{
     
    const [loading , setLoading ]  = useState(true);
    const [student , setStudent ]  = useState({});
    
    useEffect(()=>{

        const { id }= match.params;

        makeSpecificStudentRequest('get' , id , setLoading , setStudent ) ;

    },[]);

    return  loading 

             ?

             <Circle position='static' marginTop={30} Load={loading}/>

             :

             <MainWrapper>
                            
                            <Title> <i style={{marginRight:8}} class="fas fa-file-alt"></i> Ön Kayıt Bilgileri  </Title>

                            <InnerItems> 

                                  <IconEdit />

                                  <IconSendConfirmation />

                            </InnerItems>

                           <RegisterForm student = {student} {...rest} />                 

             </MainWrapper>
          

}


export default StudentInformations;