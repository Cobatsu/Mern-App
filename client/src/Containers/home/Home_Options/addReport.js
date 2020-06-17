import React, {useEffect,useMemo,useState,useContext,useCallback} from 'react';
import {UpdateLoggedin} from '../../isLoggedin/action';
import styled from 'styled-components';
import {Link,Route} from 'react-router-dom'
import {Context} from '../../../Context/Context';
import  {UserInputs}  from './addPerson';
import Generator  from 'generate-password';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers'
import Circle from '../../../UI/Circle';
import Modal from '../../../UI/sentModal';
import Stage from '../../../UI/backStage';
import {Checkbox,TextField,Tab,Tabs,Paper,InputLabel,MenuItem,Selec} from '@material-ui/core'
import {makeAddReportRequest}  from '../../../request/requset'
import {Regions} from '../../../Regions/regions'

const MainWrapper = styled.form`
display:flex;
background:white;
width:70%;
margin:0 auto;
align-items:center;
justify-content:center;
margin-top:2%;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
padding:30px;
margin-bottom:20px;
@media (max-width: 1030px) {
  padding:10px 0 30px 0 ;
  width:90%;
}
border-radius:3px;
flex-flow:column;
`
const InnerItems = styled.div`
display:flex;
justify-content:flex-end;
width:100%;
margin-bottom:20px;
padding:20px 0 5px 0;
color:#30475e;
@media (max-width: 1030px) {
  justify-content:center;
}
`

const SubmitButton  = styled.button`
outline:none; 
background:#00bdaa;
border:none;
color:white;
padding:10px 20px ;
@media (max-width: 1030px) {
  width:50%;
}
&:hover{
    cursor:pointer;
}
`
const ReportContainer = styled.form`
  width:100%;
  display:flex;
  justify-content:center;
  align-items:stretch;
  margin-top:20px;
  @media (max-width: 1030px) {
   flex-direction:column;
   align-items:center;
  }
`
const ReportDescripton = styled.textarea`
flex:0.7; 
resize:none;
padding:10px;
border:none;
outline:none;
box-shadow:0 0 2px black;
@media (max-width: 1030px) {
  width:80%;
  min-height:300px;
  margin-top:20px;
}
`
const ReportTextFields = styled.div`
flex:1;
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
@media (max-width: 1030px) {
    width:100%
 }
`


const initialReportStateFirst={
  schoolName:'',
  relatedPersonName:'',
  relatedPersonPhoneNumber: '',
  meetingDate:new Date(),
  relatedPersonEmail:'',
  meetingDetails:'',
  region:'',
  townShip:'',
}



export const  AddReport = React.memo((props)=>{
  
   const  [reportType , setReportType]  = useState(null);
   const  [initialReportState ,  setinitialReportState ] = useState(initialReportStateFirst);
   const  {isLoggedinf,user} = useContext(Context);
   const  [emptyWarning , setEmptyWarning] = useState(false);
   const  [reportAdded ,setReportAdded] = useState(false);
   const  [backStage , setBackStage ] = useState(false); 
   const  [date , setDate] = useState(new Date());
   
    useEffect(()=>{  //this is just because of Date issue //--------      
      if(reportType) setinitialReportState(prevState =>({...prevState,meetingDate:date}));
    },[date])

   
    const closeEmptyModal = ()=>{
         setBackStage(false);
         setEmptyWarning(false)
    }

    const closeReportAddedModal = ()=>{
         setBackStage(false);
         setReportAdded(false)
    }

    const setReportTypeF = (e)=>{
      setReportType(e.target.value);
    }

    const SubmitOnChange = type => event => {

      const prevStateFirst = {...initialReportState}

      let value = event.target.value;
       
      if(type==='region'){

          prevStateFirst['townShip'] = '' ; 

      }
      
      setinitialReportState({...prevStateFirst,[type]:value});
    }


    if( reportType ) {

      if(initialReportState.region)
      {

          const City = Regions.find((item)=> item['il'] === initialReportState.region);  //just get first one matched
          var townships = City.ilceleri;

      }

    }

    const SubmitReport = (e)=>{
         
            e.preventDefault();

              for (const key in initialReportState) {

                  const element = initialReportState[key];
                
                  if(reportType === 'schoolReport')
                    {
                      if(!element)
                      {
                        return setEmptyWarning(true);
                      }  
                      else
                      {
                        if (key !== 'meetingDate') initialReportState[key] = initialReportState[key].trim();
                      }    

                  }
                  else
                    {
                      if( !element && key !== 'schoolName')
                      {
                        return setEmptyWarning(true);
                      }  
                      else
                      {
                        if (key !== 'meetingDate') initialReportState[key] = initialReportState[key].trim();
                      } 
                  }
              }
               
              setinitialReportState(initialReportStateFirst);
            

              makeAddReportRequest('post',initialReportState,setReportAdded,isLoggedinf,reportType);     

    } 
     
    return <UpdateLoggedin {...props} >
    {
        (Loading)=>Loading ? null : 

        <MainWrapper> 

              <Stage backStage={backStage} loading={!emptyWarning && !reportAdded}   close={emptyWarning ?  closeEmptyModal : null}/>
              <Modal backStage={emptyWarning} closeModal={closeEmptyModal} type='EMPTY_FİELD'/>
              <Modal backStage={reportAdded}  closeModal={closeReportAddedModal} type='REPORT_ADDED'/>
                
              <div style={{width:'100%' ,padding:10}}>

              {!reportType ? <h6 style={{color:'#1eb2a6'}}>Lütfen Rapor Tipini Seçiniz</h6> : null}
              
              <TextField style={{margin:'7px 0 ',width:'100%'}}  onChange={setReportTypeF}  value={reportType}   id="select" label="Rapor Tipi "  select>
                  <MenuItem value="schoolReport">Okul Raporu</MenuItem> 
                  <MenuItem value="studentReport">Veli/Öğrenci Raporu</MenuItem>
              </TextField> 

              </div> 
                
              <form style={{width:'100%'}} onSubmit={SubmitReport}>

                {
                  (reportType && initialReportState) && <Report townships={townships} SubmitOnChange={SubmitOnChange} State={initialReportState} setBackStage={setBackStage} date={date} setDate={setDate} reportType={reportType} />
                } 

              </form>

       </MainWrapper>
    }  
   </UpdateLoggedin> 
});

export const Report = ( { SubmitOnChange,State,setBackStage,setDate,disable,type,reportType,townships,isContactStudent } )=>{
  
  console.log(isContactStudent)

  return <React.Fragment>
     
     <h6 style={{width:'100%',textAlign:'center',marginTop:10,color:'#dc3545'}}>
         {
              reportType === 'schoolReport' ? 
         
              <React.Fragment>
                      <i className="fas fa-school" style={{marginRight:4}}></i>
                      OKUL RAPORU
              </React.Fragment>

              :

              <React.Fragment>
                      <i  style={{marginRight:4}} class="fas fa-user-graduate"></i>
                      VELİ/ÖĞRENCİ RAPORU
              </React.Fragment>

         }
          
           
    </h6>

     <ReportContainer>

          <ReportTextFields>
                  
                {reportType === 'schoolReport' ? <TextField value={State['schoolName']}   InputLabelProps={{style:{zIndex:1}}}  disabled={disable}   onChange = {SubmitOnChange('schoolName')}   label='Okul İsmi'  style={{width:'85%',padding:'10px 0',marginBottom:5}}  inputProps={{style:{padding:10,background:disable ?  '#eeeeee' : 'white', color:'#333'}}} /> : null }
                <TextField value={State['relatedPersonName']}   InputLabelProps={{style:{zIndex:1}}}  disabled={disable}   onChange = {SubmitOnChange('relatedPersonName')}   label='Görüşülen Kişinin İsmi'  style={{width:'85%',padding:'10px 0',marginBottom:5}} inputProps={{style:{padding:10,background:disable ?  '#eeeeee' : 'white', color:'#333'}}}   />
                <TextField value={State['relatedPersonPhoneNumber']}   InputLabelProps={{style:{zIndex:1}}}  disabled={disable}   onChange = {SubmitOnChange('relatedPersonPhoneNumber')}   label='Görüşülen Kişinin Telefon Numarası'  style={{width:'85%',padding:'10px 0'}}  inputProps={{style:{padding:10,background:disable ?  '#eeeeee' : 'white', color:'#333'}}}  />
                <TextField value={State['relatedPersonEmail']}   InputLabelProps={{style:{zIndex:1}}}  disabled={disable}   onChange = {SubmitOnChange('relatedPersonEmail')}   label='Görüşülen Kişinin Mail Adresi'  style={{width:'85%',padding:'10px 0'}} inputProps={{style:{padding:10,background:disable ?  '#eeeeee' : 'white', color:'#333'}}}   />

                        <TextField  InputLabelProps={{style:{zIndex:1}}}  disabled={disable}    style={{width:'85%',padding:'10px 0'}} inputProps={{style:{padding:10,background:disable ?  '#eeeeee' : 'white', color:'#333'}}}  onChange={SubmitOnChange('region')}  id="select" label="Bölge" value={State['region']}  select>

                          {                 
                            Regions.map((item)=> <MenuItem value={item['il'].toString()}>{item['il']}</MenuItem>)
                          }

                         </TextField> 
 
                        {

                          ( State.region && !isContactStudent )  ? <TextField disabled={disable} InputLabelProps={{style:{zIndex:1}}}  disabled={disable}       style={{width:'85%',padding:'10px 0'}} inputProps={{style:{padding:10,background:disable ?  '#eeeeee' : 'white', color:'#333'}}}  onChange={SubmitOnChange('townShip')}  id="select" label="İlçe" value={State['townShip']}  select>

                            {                
                              townships.map((item)=> <MenuItem value={item}>{item}</MenuItem>)
                            }

                          </TextField> 

                          : null 

                        }
              

                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <KeyboardDatePicker 
                
                  autoOk
                  inputProps={{style:{padding:10,background:disable ?  '#eeeeee' : 'white', color:'#333'}}} 
                  disabled={disable}
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Görüşme Tarihi"   
                  value={State['meetingDate']} 
                  onChange={setDate} 
                  style={{width:'85%',margin:'10px 0'}}/>

               </MuiPickersUtilsProvider>

          </ReportTextFields>
          
          <ReportDescripton disabled={disable} value={State['meetingDetails']}   onChange = {SubmitOnChange('meetingDetails')}  placeholder='Görüşme Detayları'/>

    </ReportContainer>   

      {
        type === 'detail'  ? null : 
        <InnerItems style={{margin:0}}> 
            <SubmitButton type='submit' onClick={()=>{setBackStage(true)}}>EKLE</SubmitButton> 
        </InnerItems>  
      }
       
    </React.Fragment>
}


export default  AddReport;