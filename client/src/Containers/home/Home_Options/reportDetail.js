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
import {Checkbox,TextField,Tab,Tabs,Paper,InputLabel,MenuItem,Selec} from '@material-ui/core'
import {makeUpdateReportRequest,makeDeleteReportRequest,makeSpecificReportRequest}  from '../../../request/requset'
import {Report} from './addReport';
import NotFoundPage from '../../../Components/NotFoundPage'

const MainWrapper = styled.form`
display:flex;
background:white;
width:70%;
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

const ReportDetail  = ({match,...rest })=>{
     
    const  [loading , setLoading ]  = useState(true);
    const  [initalReportStates ,  setInitalReportState ] = useState(null);
    const  [reInitalReportStates ,  reIsetInitalReportState ] = useState(null);
    const  [disable,setDisable] = useState(true);
    const  [backStageOpen ,setbackStageOpen]  = useState(false);
    const  [emptyWarning,setEmptyWarning] = useState(false);
    const  [uptadedModal , setUpdatedModal] = useState(false);
    const  [date , setDate ] = useState(new Date());
    const  [deleteModal , setDeleteModal] = useState(false);
    const  [deleted , setDeleted ] = useState(false);
    const  [ notFoundPage , setNotFoundPage ] = useState(false)


    const context = useContext(Context);
     
    useEffect(()=>{
        const {id} = match.params;
        makeSpecificReportRequest('get',id,setLoading,setInitalReportState,reIsetInitalReportState,setNotFoundPage);
    },[])

    const SubmitOnChange =Type=>event=>{
         let value =  event.target.value ;
         setInitalReportState((prevState)=>({...prevState,[Type]:value}));
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

    const closeModal_4= ()=>{   
        rest.history.push('/home/raporlar');
    }
   
    
   

    useEffect(()=>{  //this is just because of Date issue //--------
        setInitalReportState(prevState =>({...prevState,meetingDate:date}));
    },[date])
  

    const submitUpdatedReport = (e)=>{

        e.preventDefault();
        setbackStageOpen(true)


        for (const key in initalReportStates) {

            const element = initalReportStates[key];

            if(!element)
            {
                return setEmptyWarning(true);
            }
            else
            {
                if(key !== 'meetingDate')  initalReportStates[key] = initalReportStates[key].trim();
            }
        }
        makeUpdateReportRequest('patch',match.params.id,{...initalReportStates},context.isLoggedinf,setInitalReportState,reIsetInitalReportState,setUpdatedModal,setDisable);
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

                <Stage backStage={backStageOpen} loading={!emptyWarning && !uptadedModal && !deleteModal && !deleted } close={emptyWarning ? closeModal_1 : uptadedModal ? closeModal_2 : deleteModal ? closeModal_3 : deleted ?  closeModal_4 : null } />

                <Modal backStage={emptyWarning}  closeModal={closeModal_1} type='EMPTY_FİELD'/>
                <Modal backStage={uptadedModal}  closeModal={closeModal_2} type='UPDATED_REPORT'/>
                <Modal backStage={deleteModal}  closeModal={closeModal_3} deleteUser={deleteReport}  type='DELETE_REPORT'/>
                <Modal backStage={deleted} closeModal={closeModal_4} type='DELETED_REPORT'/>
                
               <Form onSubmit={submitUpdatedReport}>
                   
                   {
                       ( user.role === 'Admin' || user.role === 'Temsilci')  &&  <InnerItems style={{justifyContent:'flex-start',padding:10}}>  

                            {
                                user._id != initalReportStates.userID  &&   <Icon style={{background:'#63b7af',padding:0}}>

                                        <Link to={'/home/personel_listesi/raporlar/' + initalReportStates.userID} style={{width:'100%',height:'100%',textDecoration:'none',color:'white',display:'block',padding:'5px 10px'}}>
                                            Gönderen:  {initalReportStates.whoseDocument}   <i class="fas fa-user"></i> 
                                        </Link>
                                        
                                </Icon> 
                            }
                            
                        </InnerItems>
                   }
                   
                   <InnerItems>
                         
                        {
                           user.permissions.Rapor_Bilgileri.includes(PermissionsNumbers.UPDATE) && <Icon onClick= { ()=>setDisable(false)}>Düzenle <i className="fas fa-edit"/></Icon>
                        }
                        
                        {
                           user.permissions.Rapor_Bilgileri.includes(PermissionsNumbers.REMOVE) &&  <Icon style={{background:'#d9455f'}} onClick={()=>{setDeleteModal(true); setbackStageOpen(true)}} > Raporu  Sil <i className="fas fa-trash-alt"></i></Icon>
                        }

                   </InnerItems>

                    <Report State={initalReportStates} SubmitOnChange={SubmitOnChange} disable={disable} setDate={setDate}  type='detail' reportType={initalReportStates.reportType}/>

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