import React,{useState,useContext,useEffect} from 'react';
import styled from 'styled-components';
import {Checkbox,TextField,Tab,Tabs,Paper,InputLabel,MenuItem,Selec} from '@material-ui/core'
import {makeReportSearchRequest}  from '../../request/requset'
import {Context} from '../../Context/Context';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers'
import {useViewport} from '../../Containers/home/navs/customHooks/viewPortHook'

const SearchModalContainer = styled.form`
position:fixed;
display:flex;
justify-content:space-around;
align-items:center;
flex-flow:column;
max-width:600px;
min-height:400px;
margin:0 auto;
left:0;
right:0;
border-radius:6px;
padding:15px;
box-sizing:border-box;
top:auto;
z-index:7;
background:white;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
@media (max-width: 1030px) {
    max-width:300px;
    min-height:300px;
}
`
const CloseIcon = styled.div`
position:absolute;
right:13px;
top:5px;
font-size:18px;
color:#f57170;
&:hover{
    cursor:pointer;
}
`

const SearchFields = styled.div`
display:flex;
flex-flow:wrap;
padding:5px;
width:100%;
flex:1;
align-items:center;
justify-content:space-between;

@media (max-width: 1030px) {
    flex-flow:column;
    justify-content:center;
}
`

const SubmitButton = styled.button`
outline:none; 
background:#00bdaa;
border:none;
color:white;
border-radius:5px;
text-align:center;
padding:7px 13px ;
align-self:flex-end;
&:hover{
    cursor:pointer;
}
@media (max-width: 1030px) {
   margin-top:10px;
   align-self:center;
   width:90%;
}
`


const initialSearchState = {
 reportType:'',
 relatedPersonName:'',
 relatedPersonPhoneNumber:'',
 dateIntervalStart:'',
 dateIntervalEnd:'',
 schoolName:'',
 whoseDocument:'',
}

export const  SearchReportModal = React.memo(( { isOpen , close , role , closeModalOnly , setReports , setSubPagesCount , setNotFound, setMainSearchData  }) => {
  
   
    const [date,setDate] = useState(null);
    const [date2,setDate2] = useState(null);
    const { isLoggedinf , dispatch ,state }  = useContext(Context);
    const [searchData,setSearchData] = useState ( state['reportSearchData'] || initialSearchState );
    const { width }  = useViewport(); 
    const breakPoint = 1030 ;

    useEffect(() => {
        setSearchData((prev)=>({...prev,dateIntervalStart:date}))
    }, [date])

    useEffect(() => {
        setSearchData((prev)=>({...prev,dateIntervalEnd:date2}))
    }, [date2])
  
    const searchSubmitHandler = (e)=>{
        
        e.preventDefault();

        closeModalOnly(false);
        
        const searchMainData = {...searchData};

        for (const key in searchMainData){
            if(searchMainData[key] && key !== 'dateIntervalStart' && key !== 'dateIntervalEnd')   searchMainData[key]  = searchMainData[key].trim();            
        }

        setMainSearchData(searchMainData);  //we can also send trimmed data to parent component;


        dispatch({ type:'SET_SEARCH_DATA' , payload : searchMainData , listType:'report'})
       

        makeReportSearchRequest('post',{...searchMainData,role}, isLoggedinf , setReports , close , setSubPagesCount,()=>{},setNotFound,dispatch);      
        
    }

    const submitChangeHandler = Type => event => {
      let value = event.target.value; 
      setSearchData((prevState)=>({...prevState,[Type]:value})); // react uses synthetic event istead of dom event
    }      

    return isOpen ? <SearchModalContainer onSubmit={searchSubmitHandler} >

        <CloseIcon onClick={close}>
           <i class="fas fa-times"></i>
        </CloseIcon>

        <SearchFields className='SearchFields'>

            <TextField style={{width: width < breakPoint ? '90%' : '48%' , margin:'10px 0  0 5px ',fontSize:14}} inputProps={{style:{fontSize:14}}}  InputLabelProps={{style:{fontSize:14}}}    value={searchData['reportType']}  onChange={submitChangeHandler('reportType')}  id="select" label="Görüşme Tipi"  select>
                        <MenuItem value="" selected><em>Görüşme Tipi</em></MenuItem>
                        <MenuItem value="schoolReport">Okul Görüşmesi</MenuItem>
                        <MenuItem value="studentReport">Veli/Öğrenci Görüşmesi</MenuItem>
            </TextField>

            
            {
                ( role === 'Admin' || role === 'Temsilci' )  ?  <TextField  InputLabelProps={{style:{fontSize:14}}} inputProps={{style:{fontSize:14}}}   style={{width:width<breakPoint ? '90%' : '48%' , margin:'10px 0  0 5px '}} value={searchData['whoseDocument']}  onChange={submitChangeHandler('whoseDocument')}  id="standard-basic" label="Gönderen  Kişi"/> : null 
            }
      
            <TextField   style={{width:width<breakPoint ? '90%' : '48%' , margin:'10px 0  0 5px '}}  inputProps={{style:{fontSize:14}}}  InputLabelProps={{style:{fontSize:14}}} value={searchData['relatedPersonName']}  onChange={submitChangeHandler('relatedPersonName')}  id="standard-basic" label="Görüşülen Kişi" />

            <TextField   style={{width:width<breakPoint ? '90%' : '48%' , margin:'10px 0  0 5px '}}  inputProps={{style:{fontSize:14}}} InputLabelProps={{style:{fontSize:14}}} value={searchData['relatedPersonPhoneNumber']}  onChange={submitChangeHandler('relatedPersonPhoneNumber')}  id="standard-basic" label="Görüşülen Kişinin Telefon Numarası" />

            <TextField   style={{width:width<breakPoint ? '90%' : '48%' , margin:'10px 0  0 5px '}}   inputProps={{style:{fontSize:14}}} InputLabelProps={{style:{fontSize:14}}} value={searchData['schoolName']}  onChange={submitChangeHandler('schoolName')}  id="standard-basic" label="Okul İsmi" />

        
         <MuiPickersUtilsProvider utils={DateFnsUtils}>

         <KeyboardDatePicker disableToolbar
          autoOk
          inputProps={{style:{fontSize:14}}}
          InputLabelProps={{style:{fontSize:14}}}
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Başlangıç Tarih"   
          value={searchData['dateIntervalStart']} 
          onChange={setDate} 
          style={{width:width<breakPoint ? '90%' : '48%' , margin:'10px 0  0 5px '}}/>

        <KeyboardDatePicker disableToolbar
          autoOk
          maxDate={new Date()}
          inputProps={{style:{fontSize:14}}}
          InputLabelProps={{style:{fontSize:14}}}
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Son Tarih"   
          value={searchData['dateIntervalEnd']} 
          onChange={setDate2} 
          style={{width:width<breakPoint ? '90%' : '48%' , margin:'10px 0  0 5px '}}/>
       
         </MuiPickersUtilsProvider>

        </SearchFields>

        <SubmitButton type='submit'> <i class="fas  fa-search"></i> ARA </SubmitButton>
             
  </SearchModalContainer> : null;


});
