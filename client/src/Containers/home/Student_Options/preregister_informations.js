import React, { useEffect , useState , useContext , useRef } from 'react';
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
padding: 0 60px;
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
margin-bottom:5px;
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

    flex-flow:column;
    align-items:flex-start !important;
    justify-content:space-evenly;
    

}

`

const LoadFile = styled.button `

font-size:15px;
border-radius:15px 0 15px 0  ; 
min-height:40px;
min-width:130px;
background:#00909e ; 
position:absolute ; 
right:0;
bottom:0;
outline:none;
border:none;
color:white;
&:hover{
    cursor:pointer;
}

`

const FileList = styled.ul `

display:${({isActive})=> isActive ? 'block' : 'none'};
position:relative;
padding:50px 15px 55px  15px;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
margin:30px 50px;
border-radius:15px;
width:90%;

`

const FileListElement = styled.li`

&:hover{

    box-shadow: 0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
}

border-radius:7px;
transition:50ms;

`

const Title = styled.div `

font-size: 22 ; 
font-weight:bolder ; 
margin:20px 0 ; 
color:#61c0bf ;

`

const ImageFields = [

    "Kimlik Belgesi" , 

    "Rosedale İngilizce Yeterlilik Testi" ,

    "İngilizce Yeterlilik Testi Sonuçları",

    "Transkript Çevirisi",

]


const StudentInformations  = ( { match , ...rest } )=>{
     
    const [ loading , setLoading ]  = useState(true);
    const [ backStageLoading , setBackStageLoading ] = useState(false);
    const [ student , setStudent ]  = useState({});
    const [ disabled , setDisabled ] = useState(true);
    const [ modalType , setModalType ] = useState(null);

    const inputRef = useRef(); 

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

    const loadFileHandler = ()=>{

        inputRef.current.click();

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


                          
                            <FileList  isActive = {student.registerState.docState}>
                                      
                                    <FileListElement style={{background:'#00909e' , borderRadius :'7px 7px 0 0'   , width:'100%' , top:0 , left:0 , position:'absolute' , color:'white', textAlign:'center',padding:5}}>

                                        Öğrencinin Belgeleri

                                    </FileListElement>

                                    {                                   
                                            student.StudentInfo.Images.map((fileName,index)=>{


                                            return (
                                                <FileListElement>
                                                   <a className='responsiveLink' style={{width:'100%' , color:'#00909e'  , height:'100%' , display:'block' , padding:'5px 5px 5px 10px' , textDecoration:'none' ,  }} href={'http://localhost:3001/api/' + fileName} target="_blank" > {ImageFields[index]} </a> 
                                                </FileListElement>
                                            )

                                        })
                                    }   


                                    <LoadFile type='button' onClick={loadFileHandler} >
                                                 
                                                 <input type="file" name="myfile" accept=".png, .jpg, .jpeg , .pdf" ref={inputRef}  style={{display:'none'}}  />

                                                 Dosya Ekle <i style={{marginLeft:7}} className="fas fa-plus"></i>

                                    </LoadFile>

                            </FileList>     

                           <RegisterForm student = {student.StudentInfo} {...rest} disabled={disabled} setDisabled={setDisabled} id={id} setBackStageLoading={setBackStageLoading} setModalType={setModalType} />                                  

             </MainWrapper>
           
}


export default StudentInformations;