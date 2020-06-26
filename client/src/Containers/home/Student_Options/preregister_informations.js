import React,{useEffect,useState,useContext} from 'react';
import {Context} from '../../../Context/Context'
import { makeSpecificStudentRequest , makeSendForConfirmationRequest , makeDeleteStudentRequest , makeConfirmStudentRequest }  from '../../../request/requset'
import styled from 'styled-components';
import Circle from '../../../UI/Circle';
import { IconEdit , IconRemove , IconSendConfirmation , confirmStudent as ConfirmStudent } from '../../../UI/IconButtons/IconButton';
import RegisterForm from '../../registration/registerForm'
import { PermissionsNumbers , studentStatusColor  } from '../../../Utilities/utilities'
import Modal from '../../../UI/sentModal'
import BackStage from '../../../UI/backStage'
import { Link } from 'react-router-dom'

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
display:flex;
align-items:center;
text-align:center;
background:#10375c;
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
   

    if( user.role === 'Admin' ) {
   
        if(student.registerState) var  updatePermissionResult = user.permissions.Öğrenci_Bilgileri.includes(PermissionsNumbers.UPDATE) ; 

    } else {

        if(student.registerState) var  updatePermissionResult = user.permissions.Öğrenci_Bilgileri.includes(PermissionsNumbers.UPDATE) && !student.registerState.pendingResult

    }

   

    const closeModal = ()=>{ 
       
        if(modalType === 'STUDENT_DELETED') {

            rest.history.goBack();

        } else {

            setModalType(null) ;

        }
     
 
    }

    const requestHandler = () => {

        setModalType(null)
        setBackStageLoading(true);
        
        switch(modalType) {

            case 'SEND_CONFIRMATION' : 
           
                 makeSendForConfirmationRequest( 'patch' , id , setStudent  , setBackStageLoading , setModalType ) ; 

            break ; 


            case 'DELETE_STUDENT' : 

                 makeDeleteStudentRequest( 'delete' , id , setBackStageLoading , setModalType ) ; 

            break ; 

            case 'CONFİRM_STUDENT' : 
                  
                  makeConfirmStudentRequest( 'patch' , id , setStudent  , setBackStageLoading , setModalType  )

            break ;

        } 

    }
    
    

    if( student.registerState ) {
     
        var getStatusUI = studentStatusColor(student.registerState) ; 

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

                            <Modal backStage={modalType} handler={ requestHandler }   closeModal={closeModal}   type={modalType}/>
                            
                            <Title> <i style={{marginRight:8}} class="fas fa-file-alt"></i> Ön Kayıt Bilgileri  </Title>

                            <InnerItems> 
                                  
                                  {

                                        <InfoCapsule>

                                            {getStatusUI.text}

                                            {getStatusUI.icon}

                                        </InfoCapsule> 

                                  }


                                  {
                                        
                                         (  user.role === 'Admin' &&  student.registerState.pendingResult ) ? 

                                         <ConfirmStudent handler={ ()=>setModalType( 'CONFİRM_STUDENT' ) } /> : null 
                                           
                                  }


                                  {                                     
 
                                          ( user.role === 'Temsilci' &&  getStatusUI.text === 'Belgeler Tamamlandı' ) ?
                                       
                                        <IconSendConfirmation handler={ ()=>setModalType( 'SEND_CONFIRMATION' ) } /> : null 

                                  }   


                                  {   

                                         ( updatePermissionResult ) ?  

                                        <IconEdit handler = { ()=>setDisabled(false) } /> : null 

                                  } 


                                  {
                                        user.permissions.Öğrenci_Bilgileri.includes(PermissionsNumbers.REMOVE) && 

                                        <IconRemove handler = { ()=>setModalType( 'DELETE_STUDENT' ) }   deletedText = 'Öğrenciyi Sil' /> 
                                  }
                            
                            </InnerItems>

                            {
                                     
                                     student.StudentInfo.Images.map((fileName)=>{


                                       return <a href={'http://localhost:3001/api/' + fileName} target="_blank" >{fileName}</a>


                                     })

                            }

                           <a href={'http://localhost:3001/api/singlePage.pdf.png'} target="_blank" >PDF</a>

                           <RegisterForm student = {student.StudentInfo} {...rest} disabled={disabled} setDisabled={setDisabled} id={id} setBackStageLoading={setBackStageLoading} setModalType={setModalType} />                 

             </MainWrapper>
           
}


export default StudentInformations;