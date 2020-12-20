import React, {useEffect,useState,useContext,useMemo} from 'react';
import {Report} from './addReport'
import styled from 'styled-components';
import {Checkbox,TextField,Tab,Tabs,Paper,InputLabel,MenuItem,Selec} from '@material-ui/core'
import {MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers'
import NumberFormat from 'react-number-format'
import DateFnsUtils from '@date-io/date-fns';
import validator from 'email-validator'
import {checkPhoneNumber} from '../../../Utilities/utilities'
import {makeAddNewStudentRequest}  from '../../../request/requset'
import Modal from '../../../UI/sentModal';
import BackStage from '../../../UI/backStage';
import { Link , useLocation , useRouteMatch , useHistory } from 'react-router-dom'
import queryString from 'querystring'

 const MainWrapper = styled.form`
    display:flex;
    background:white;
    width:75%;
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

const SubmitButton  = styled.button`
outline:none; 
background:#00bdaa;
border:none;
color:white;
padding:10px 20px ;
align-self:flex-end;
margin-top:10px;
@media (max-width: 1030px) {
  width:50%;
  align-self:center;
}
&:hover{
    cursor:pointer;
    box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}
`

const ReportContainer = styled.form`
  width:78%;
  display:flex;
  justify-content:space-around;
  align-items:stretch;

  flex-wrap:wrap;
  margin-top:20px;
  @media (max-width: 1030px) {
   flex-direction:column;
   align-items:center;
   width:100%;
  }
`

const initialState ={

  studentName:'',
  studentSurname:'',
  studentBirthDate:new Date(),
  studentSchoolName:'',
  studentPhoneNumber:'',
  studentMail:'',
  studentClass:9,
  studentParentMail:''

}

const CheckMailAndNumber = ( mails = [] , numbers = [] )=>{
 

  let mailResult = mails.every((value)=>{

     return validator.validate(value) 

  });

  let numberResult = numbers.every((value)=>{
    
     return !checkPhoneNumber(value);

  })

  return mailResult && numberResult;

}



const Test = ()=> {
    

    const [ state , setState ] = useState( initialState );
    const [ isSubmitted , setIsSubmitted ] = useState( false );
    const [ modalType , setModalType ] = useState(null);
    const [ backStageLoading , setBackStageLoading ] = useState(false);   



    const closeModal = ()=>{  setModalType(null) ; }

    const SubmitOnChange = type => event => {

      let value = event.target.value;
    
      setState( (prevState)=>{

        return {
          ...prevState,
          [type]:value,
        }

      });
      
   }


   const SubmitStudent = (e)=>{

    setIsSubmitted(true);

    e.preventDefault();

    setModalType(null);
   

    let lastResult = CheckMailAndNumber ( [ state['studentMail'], state['studentParentMail']  ] , [ state['studentPhoneNumber'] ]  )

      if( !lastResult ) { return setModalType('EMPTY_FİELD') }

      for (const key in state) {
       
        const element = state[key];
          
        if( !element ) {

          return setModalType('EMPTY_FİELD') ;

        } 
      
      }

      setBackStageLoading(true);
      makeAddNewStudentRequest( 'post' , state , setBackStageLoading , setModalType )

   }

   
   
    return <MainWrapper>

            <BackStage backStage={modalType || backStageLoading} close={closeModal} loading={backStageLoading} />

            <Modal backStage={modalType}   closeModal={closeModal}   type={modalType}/>


            <h6 style={ { color:'#1eb2a6' , fontSize:18 } } >  <i style={{marginRight:8}} class="fas fa-user-graduate"></i> Yeni Öğrenci </h6>


            <form onSubmit={SubmitStudent} style={{width:'100%',display:'flex',justifyContent:'center', alignItems:'center' , flexDirection:'column'}}>


              <ReportContainer>

                <TextField error={ isSubmitted && !state['studentName'] } value={ state['studentName'] } onChange={ SubmitOnChange('studentName') }  label='İsim'  style={{width:'40%',padding:'10px 0',margin:'10px 0 5px 0' }}    />
                <TextField error={ isSubmitted && !state['studentSurname'] } value={ state['studentSurname'] } onChange={ SubmitOnChange('studentSurname') } label='Soy isim'  style={{width:'40%',padding:'10px 0',margin:'10px 0 5px 0'}}    />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                  <KeyboardDatePicker 
                      
                      autoOk 
                      disableToolbar
                      value ={ state['studentBirthDate'] }
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Doğum Tarihi"           
                      style={{width:'40%',margin:'10px 0'}}
                      onChange= { ( date )=> { setState( (prevState)=>( {...prevState,studentBirthDate:date } ) ) } }
                      
                  />

                </MuiPickersUtilsProvider>

                <NumberFormat error={ isSubmitted && checkPhoneNumber(state['studentPhoneNumber']) }  value={state['studentPhoneNumber']}  onChange={ SubmitOnChange('studentPhoneNumber') } format="(###) ###-####" label='Telefon Numarası' style={{width:'40%',padding:'10px 0'}} customInput={TextField}   allowEmptyFormatting mask="_"/>
                <TextField    error={ isSubmitted && !state['studentSchoolName'] } value={state['studentSchoolName']} onChange={ SubmitOnChange('studentSchoolName') } label='Okul Adı'  style={{width:'40%',padding:'10px 0',margin:'10px 0 5px 0'}}    />
                <TextField    value={state['studentClass']} onChange={ SubmitOnChange('studentClass') }  InputLabelProps={{style:{color:'black',zIndex:1}}}  id="select" label="Sınıf"  style={{width:'40%',margin:'10px 0'}}  select> 

                      <MenuItem value="9">  9 </MenuItem> 
                      <MenuItem value="10"> 10 </MenuItem> 
                      <MenuItem value="11"> 11 </MenuItem> 
                      <MenuItem value="12"> 12 </MenuItem> 

                </TextField>

                <TextField  error={ isSubmitted && !validator.validate(state['studentMail']) } value={ state['studentMail']} onChange={ SubmitOnChange('studentMail') } label='E-Posta Adresi'  style={{width:'40%',padding:'10px 0',margin:'10px 0 5px 0' }}    />
                <TextField  error={ isSubmitted && !validator.validate(state['studentParentMail']) } value={ state['studentParentMail']} onChange={ SubmitOnChange('studentParentMail') } label='Veli E-Posta Adresi'  style={{width:'40%',padding:'10px 0',margin:'10px 0 5px 0' }}    />


              </ReportContainer>


            <SubmitButton type='submit' > EKLE</SubmitButton> 

            </form>
        

        
    </MainWrapper>

}


export default Test;