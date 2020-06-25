import React,{useEffect,useState,useContext} from 'react';
import {Context} from '../../../Context/Context'
import { makeSpecificStudentRequest , makeSendForConfirmationRequest }  from '../../../request/requset'
import styled from 'styled-components';
import Circle from '../../../UI/Circle';
import { IconEdit , IconRemove , IconSendConfirmation } from '../../../UI/IconButtons/IconButton';
import RegisterForm from '../../registration/registerForm'
import { PermissionsNumbers  } from '../../../Utilities/utilities'
import Modal from '../../../UI/sentModal'
import BackStage from '../../../UI/backStage'

const MainWrapper = styled.form`
display:flex;
background:white;
width:76%;
margin:0 auto;
align-items:center;
justify-content:center;
padding:0;
margin-top:2%;
margin-bottom:20px;
@media (max-width: 1030px) {
  width:90%;
  padding:10px 0 30px 0 ;
}
border-radius:3px;
flex-flow:column;
`

const InfoCapsule = styled.div`
opacity:0.7;
border-radius:5px;
padding:5px 10px;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
text-align:center;
background:#ff6464;
color:white;
font-size:15px;
margin-right:10px;

`
const InnerItems = styled.div`
display:flex;
justify-content:flex-end;
width:95%;
margin-bottom:20px;
margin-top:30px; 
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
     
    const [ loading , setLoading ]  = useState(true);
    const [ backStageLoading , setBackStageLoading ] = useState(false);
    const [ student , setStudent ]  = useState({});
    const [ disabled , setDisabled ] = useState(true);
    const [ modalType , setModalType ] = useState(null);

    const { user } = useContext( Context );

    const { id } = match.params;

    const closeModal = ()=>{ setModalType(null) }

    const sendConfirmation = ()=>{

        setBackStageLoading(true);

        makeSendForConfirmationRequest( 'patch' , id , setBackStageLoading , setModalType ) ; 

    }
    
    useEffect(()=>{

        makeSpecificStudentRequest('get' , id , setLoading , setStudent ) ;

    },[]);

    return  loading 

             ?

             <Circle position='static' marginTop={30} Load={loading}/>

             :

             <MainWrapper>

                            <BackStage backStage={modalType || backStageLoading} close={closeModal} loading={backStageLoading} />

                            <Modal backStage={modalType} handler={ sendConfirmation }   closeModal={closeModal}   type={modalType}/>
                            
                            <Title> <i style={{marginRight:8}} class="fas fa-file-alt"></i> Ön Kayıt Bilgileri  </Title>

                            <InnerItems> 
                                  
                                  {
                                       user.role === 'Temsilci' ?

                                       student.registerState.pendingResult ? 

                                       <InfoCapsule>

                                          Öğrenci Şuan Onay Aşamasındadır ...
                                            
                                       </InfoCapsule>  :
                                       
                                       <IconSendConfirmation handler={ ()=>setModalType( 'SEND_CONFIRMATION' ) } /> : null 
                                  }

                                  {                                  
                                        user.permissions.Öğrenci_Bilgileri.includes(PermissionsNumbers.UPDATE) && 
                                        <IconEdit handler={ ()=>setDisabled(false) } />
                                  } 

                                  {
                                        user.permissions.Öğrenci_Bilgileri.includes(PermissionsNumbers.REMOVE) && 
                                        <IconRemove   deletedText = 'Öğrenciyi Sil' /> 
                                  }
                            
                            </InnerItems>

                           <RegisterForm student = {student.StudentInfo} {...rest} disabled={disabled} setDisabled={setDisabled} id={id} setBackStageLoading={setBackStageLoading} setModalType={setModalType} />                 

             </MainWrapper>
           
}


export default StudentInformations;