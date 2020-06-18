import React, {useEffect,useMemo,useState,useContext,useCallback} from 'react';
import {UpdateLoggedin} from '../../isLoggedin/action';
import styled from 'styled-components';
import {Link,Route} from 'react-router-dom'
import {Context} from '../../../Context/Context';
import  {UserInputs}  from './addPerson';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,DatePicker } from '@material-ui/pickers'
import {Regions}  from '../../../Regions/regions'
import Circle from '../../../UI/Circle';
import Modal from '../../../UI/sentModal';
import Stage from '../../../UI/backStage';
import {Checkbox,TextField,Tab,Tabs,Paper,InputLabel,MenuItem,Stepper,StepLabel,Step,Check,StepConnector,withStyles,makeStyles} from '@material-ui/core'
import {makeUpdateReportRequest,makeDeleteReportRequest,makeSpecificReportRequest , makeSendFormRequest}  from '../../../request/requset'
import {Report} from './addReport';
import NotFoundPage from '../../../Components/NotFoundPage'
import {restrictWord} from '../../../Utilities/utilities'

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
padding:30px;
@media (max-width: 1030px) {
  width:90%;
  padding:10px 0 30px 0 ;
}
border-radius:3px;
flex-flow:column;
`
const Icon = styled.div`
border-radius:5px;
padding:5px 10px;
color:white;
background:#00a8cc;
font-size:15px;
margin-right:10px;
&:hover{
    cursor:pointer;
}
`
const ButtonWrapper = styled.div`
display:flex;
justify-content:flex-end;
width:100%;
margin-top:15px;
@media (max-width: 1030px) {
    justify-content:center;
}
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
const SubmitButton  = styled.button`
outline:none; 
background:#00bdaa;
border:none;
color:white;
padding:10px 20px ;
&:hover{
    cursor:pointer;
}
`

const Form = styled.form`
width:100%;
display:flex;
flex-flow:column;
align-items:center;
`

export const PermissionsNumbers = {
    REMOVE: 1,
    UPDATE: 2,
    ADD: 3,
    READ: 4,
}


const initialGeneralReportState={
    schoolName:'',
    relatedPersonName:'',
    relatedPersonPhoneNumber: '',
    meetingDate:new Date(Date(Date.now())),
    relatedPersonEmail:'',
    meetingDetails:'',
    region:'',
    townShip:'',
}

const QontoConnector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    line: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);


  

const ReportDetail  = ({match,...rest })=>{
     
    const  [loading , setLoading ]  = useState(true);
    const  [initalReportStates ,  setInitalReportState ] = useState(initialGeneralReportState);
    const  [reInitalReportStates ,  reIsetInitalReportState ] = useState(initialGeneralReportState);
    const  [disable,setDisable] = useState(true);
    const  [backStageOpen ,setbackStageOpen]  = useState(false);
    const  [emptyWarning,setEmptyWarning] = useState(false);
    const  [uptadedModal , setUpdatedModal] = useState(false);
    const  [date , setDate ] = useState(new Date());
    const  [deleteModal , setDeleteModal] = useState(false);
    const  [deleted , setDeleted ] = useState(false);
    const  [notFoundPage , setNotFoundPage ] = useState(false);

    const  [ sendForm , setSendForm ] = useState(false);

    const  [ formSent , setFormSent ] = useState({text:'REQUEST' , payload:null});

     
    const activeStep = useMemo(()=>{
            
        if ( initalReportStates.isContacted && !initalReportStates.isFormSent ) {

            return 1

        } else if ( initalReportStates.isFormSent && !initalReportStates.isFormFilled ) { 

            return 2

        } else if( initalReportStates.isFormFilled ) {

            return 3 

        }

        return 0; 
 
    },[initalReportStates.owner])

    const steps = ['İletişime Geçildi' , 'Öğrenci Formu Gönderildi' , 'Öğrenci Formu Dolduruldu']

    const context = useContext(Context);
     
    useEffect(()=>{
        const {id} = match.params;
        makeSpecificReportRequest('get',id,setLoading,setInitalReportState,reIsetInitalReportState,setNotFoundPage,initialGeneralReportState);
    },[])


    const sendFormHandler = (requestType) => event =>{

           setSendForm(false);

            const {id} = match.params;

            const  data = {
                
                tokenData : {

                    owner : initalReportStates.owner ,
                    contactReportID : id,
                    e_mail:initalReportStates.relatedPersonEmail , 

                },

                requestType , 
            }  
                
            makeSendFormRequest( 'post' , data , setSendForm , setFormSent); 

    }

    const SubmitOnChange =Type=>event=>{

         const prevStateFirst = {...initalReportStates}

         let value =  event.target.value ;

         if( Type === 'region' ) prevStateFirst['townShip']=''; 

         setInitalReportState({...prevStateFirst,[Type]:value});
    }

    const closeModal_1 = ()=>{

        setbackStageOpen(false);
        setEmptyWarning(false);

    }

    const closeModal_2 = ()=>{

        setbackStageOpen(false);
        setUpdatedModal(false);

    }

    const closeModal_3 = ()=>{

        setbackStageOpen(false);
        setDeleteModal(false);

    }

    const closeModal_4= ()=> {  rest.history.goBack(); }

    const closeModal_5 = ()=>{

        setbackStageOpen(false);
        setSendForm(false);
        
    }
    
   
    useEffect(()=>{  //this is just because of Date issue //--------
        setInitalReportState(prevState =>({...prevState,meetingDate:date}));
    },[date])
  
    if(  initalReportStates.reportType )
    {
      if(initalReportStates.region)
      {

          const City = Regions.find((item)=> item['il'] === initalReportStates.region);  //just get first one matched
          var townships = City.ilceleri;

      }
    }

    const submitUpdatedReport = (e)=>{

        e.preventDefault();
        setbackStageOpen(true)


        for (const key in initalReportStates) {

            const element = initalReportStates[key];

            if(initalReportStates.reportType === 'schoolReport')
            {

                if(!element && key!=='meetingDetails' ){
                    return setEmptyWarning(true);
                }
                else{

                    if(key !== 'meetingDate') {
                        if(initalReportStates[key]) initalReportStates[key] = initalReportStates[key].trim(); 
                    }

                }

            }
            else
            {
                
                if( !element && key !=='schoolName' && key!=='townShip' && typeof initalReportStates[key] === 'string') {
                
                    return setEmptyWarning(true);
                }
                else {

                    if(key !== 'meetingDate' &&  typeof initalReportStates[key] === 'string' ) {
                        
                        initalReportStates[key] = initalReportStates[key].trim(); 

                    } 

                }

            }
        }


        makeUpdateReportRequest('patch', match.params.id ,initalReportStates,context.isLoggedinf,setInitalReportState,reIsetInitalReportState,setUpdatedModal,setDisable);
    }
   
    const deleteReport = ()=>{
         setDeleteModal(false);
         const {id} = match.params;
         makeDeleteReportRequest('delete',id,context.isLoggedinf,setDeleted);
    }
   
    if(!notFoundPage) 

       return <UpdateLoggedin {...rest}>

        {
            (Loading,user)=>Loading ? null : loading
            ?
            <Circle marginTop={30} Load={loading} position='static'/>
            :
            <MainWrapper>

                <Stage backStage={backStageOpen} loading={!emptyWarning && !uptadedModal && !deleteModal && !deleted && !sendForm } close={emptyWarning ? closeModal_1 : uptadedModal ? closeModal_2 : deleteModal ? closeModal_3 : deleted ?  closeModal_4 : sendForm  ? closeModal_5 : null } />

                <Modal backStage={emptyWarning}  closeModal={closeModal_1} type='EMPTY_FİELD'/>
                <Modal backStage={uptadedModal}  closeModal={closeModal_2} type='UPDATED_REPORT'/>
                <Modal backStage={deleteModal}   closeModal={closeModal_3} deleteUser={deleteReport}  type='DELETE_REPORT'/>
                <Modal backStage={deleted}       closeModal={closeModal_4} type='DELETED_REPORT'/>
                <Modal backStage={sendForm}  formSent={formSent}     closeModal={closeModal_5} type='SEND_STUDENT_FORM' sendForm = {sendFormHandler}  />
                
                <Stepper style={{width:'90%'}} alternativeLabel activeStep={activeStep}>
                    
                            {steps.map((label) => ( 

                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>

                            ))}
                </Stepper>

               <Form onSubmit={submitUpdatedReport}>
                   
                   {
                       ( user.role === 'Admin' || user.role === 'Temsilci')  &&  <InnerItems style={{justifyContent:'flex-start',padding:10,marginBottom:5,marginTop:40}}>  

                            {
                                initalReportStates.owner && initalReportStates.isContacted && initalReportStates.owner !== user._id  ?  <Icon style={{background:'#63b7af',padding:0}}>

                                        <Link to={'/home/personel_listesi/raporlar/' + initalReportStates.owner + '?pageNumber=1'} style={{width:'100%',height:'100%',textTransform:'capitalize',textDecoration:'none',color:'white',display:'block',padding:'5px 10px'}}>
                                            Görüşen Kişi :  { restrictWord( initalReportStates.whoseDocument , 13)}   <i class="fas fa-user"></i> 
                                        </Link>
                                        
                                </Icon> : null 
                            }
                            
                        </InnerItems>
                   }
                   
                   <InnerItems>
                         

                        {
                           initalReportStates.isContacted &&  ( initalReportStates.owner === user._id ) ?  <Icon style={{background:'#e16262'}} onClick= {()=>{ setSendForm(true); setbackStageOpen(true) }}> Öğrenci Formunu Gönder <i class="fas fa-file-signature"></i> </Icon> : null
                        }

                        {
                           user.permissions.Rapor_Bilgileri.includes(PermissionsNumbers.UPDATE) &&  ( !initalReportStates.isContacted || initalReportStates.owner === user._id ) && user.role !== 'Admin'   ?  <Icon onClick= { ()=>setDisable(false)}>Düzenle <i className="fas fa-edit"/></Icon> : null
                        }
                        
                        {
                           user.permissions.Rapor_Bilgileri.includes(PermissionsNumbers.REMOVE) &&  ( initalReportStates.owner === user._id || user.role === 'Admin' ) ?    <Icon style={{background:'#d9455f'}} onClick={()=>{setDeleteModal(true); setbackStageOpen(true)}} > Raporu  Sil <i className="fas fa-trash-alt"></i></Icon> : null
                        }

                   </InnerItems>

                    <Report State={initalReportStates} isContactStudent = { !initalReportStates['townShip'] ? true : false  } townships={townships} SubmitOnChange={SubmitOnChange} disable={disable} setDate={setDate}  type='detail' reportType={initalReportStates.reportType}/>

                    

                    {
                        disable
                        ?
                        null
                        :
                        <ButtonWrapper>

                                <SubmitButton type='button' onClick={()=>{
                                    setInitalReportState(reInitalReportStates);
                                    setDisable(true)
                                }}

                                style={{background:'#fa744f',marginRight:10}}>VAZGEÇ</SubmitButton> 
                                <SubmitButton type='submit'>GÜNCELLE</SubmitButton> 
                        </ButtonWrapper>                   
                    }

               </Form> 
                   
            </MainWrapper>   
        }
    </UpdateLoggedin>

  else 

     return   <NotFoundPage/>

}

export default  ReportDetail;