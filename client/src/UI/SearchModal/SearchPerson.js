import React,{useState,useContext,useEffect} from 'react';
import styled from 'styled-components';
import {Checkbox,TextField,Tab,Tabs,Paper,InputLabel,MenuItem,Selec} from '@material-ui/core'
import {makePersonSearchRequest}  from '../../request/requset'
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
   align-self:center;
   margin-top:10px;
   width:90%;
}
`

const initialSearchState = {
 firstName:'',
 lastName:'',
 role:'',
 region:'',
 contractDateStart:'',
 contractDateEnd:'',
 gender:'',
}

export const  SearchPersonModal = React.memo(({isOpen,close,role,closeModalOnly,setReports ,setSubPagesCount,setNotFound, setMainSearchData , setSelectedSubPage , isOnlySubBranch , id}) => {
  
    const [searchData,setSearchData] = useState (initialSearchState);
    const [date,setDate] = useState(null);
    const [date2,setDate2] = useState(null);
    const {isLoggedinf}  = useContext(Context); 
    
    const { width } = useViewport();
    const breakPoint = 1030;

    useEffect(() => {
        setSearchData((prev)=>({...prev,contractDateStart:date}))
    }, [date])

    useEffect(() => {
        setSearchData((prev)=>({...prev,contractDateEnd:date2}))
    }, [date2])
    

    const searchSubmitHandler = (e)=>{

        e.preventDefault();

        closeModalOnly(false);
        setSelectedSubPage(0);
       

        let  searchMainData = {...searchData};

        for (const key in searchMainData){
            if(searchMainData[key] && key !== 'contractDateStart' && key !== 'contractDateEnd')   searchMainData[key]  = searchMainData[key].trim();            
        }
        
        setMainSearchData(searchMainData);  //we can also send trim data to parent component;

        if(isOnlySubBranch) 
        {
            let { role , ...updatedSearchData } = searchData;
            searchMainData={...updatedSearchData,relatedAgencyID:id}
        }
        
        makePersonSearchRequest('post',searchMainData, isLoggedinf , setReports , close , setSubPagesCount,()=>{} , setNotFound);      
    }

    const submitChangeHandler = Type => event => {
      let value = event.target.value; 
      setSearchData((prevState)=>({...prevState,[Type]:value})); // react uses synthetic event istead of dom event
    }      

    return isOpen ? <SearchModalContainer onSubmit={searchSubmitHandler} >

        <CloseIcon onClick={close}>
           <i class="fas fa-times"></i>
        </CloseIcon>

        <SearchFields>
      
            <TextField   style={{width:width < breakPoint ? '90%' : '48%' , margin:'10px 0 0 5px'}}  inputProps={{style:{fontSize:14}}}  InputLabelProps={{style:{fontSize:14}}} value={searchData['firstName']}  onChange={submitChangeHandler('firstName')}  id="standard-basic" label="İsim" />

            <TextField   style={{width:width < breakPoint ? '90%' : '48%' , margin:'10px 0 0 5px'}}  inputProps={{style:{fontSize:14}}} InputLabelProps={{style:{fontSize:14}}} value={searchData['lastName']}  onChange={submitChangeHandler('lastName')}  id="standard-basic" label="Soy İsim" />

            {
                !isOnlySubBranch  ?

                    <TextField style={{width:width < breakPoint ? '90%' : '48%' , margin:'10px 0 0 5px',fontSize:14}} inputProps={{style:{fontSize:14}}}  InputLabelProps={{style:{fontSize:14}}}    value={searchData['role']}  onChange={submitChangeHandler('role')}  id="select" label="Rol"  select>
                                <MenuItem value="" selected><em>Rol</em></MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Temsilci">Temsilci</MenuItem>
                                <MenuItem value="Bayi">Bayi</MenuItem>
                    </TextField>
                 
                : null
            }
            <TextField style={{width:width < breakPoint ? '90%' : '48%' , margin:'10px 0 0 5px',fontSize:14}} inputProps={{style:{fontSize:14}}}  InputLabelProps={{style:{fontSize:14}}}    value={searchData['gender']}  onChange={submitChangeHandler('gender')}  id="select" label="Cinsiyet"  select>
                        <MenuItem value="" selected><em>Cinsiyet</em></MenuItem>
                        <MenuItem value="Male">Erkek</MenuItem>
                        <MenuItem value="Female">Kadın</MenuItem>
            </TextField>

            <TextField   style={{width:width < breakPoint ? '90%' : '48%' , margin:'10px 0 0 5px'}}   inputProps={{style:{fontSize:14}}} InputLabelProps={{style:{fontSize:14}}} value={searchData['region']}  onChange={submitChangeHandler('region')}  id="standard-basic" label="Bölge" />

    
        
         <MuiPickersUtilsProvider utils={DateFnsUtils}>

         <KeyboardDatePicker disableToolbar
         inputProps={{style:{fontSize:14}}}
         InputLabelProps={{style:{fontSize:14}}}
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Başlangıç Tarih"   
          value={searchData['contractDateStart']} 
          onChange={setDate} 
          style={{width: width < breakPoint ? '90%' : '48%', margin:'10px 0 0 5px'}}/>

        <KeyboardDatePicker disableToolbar
        inputProps={{style:{fontSize:14}}}
         InputLabelProps={{style:{fontSize:14}}}
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Son Tarih"   
          value={searchData['contractDateEnd']} 
          onChange={setDate2} 
          style={{width: width < breakPoint ? '90%' : '48%', margin:'10px 0 0 5px'}}/>

         </MuiPickersUtilsProvider>

        </SearchFields>

        <SubmitButton type='submit'> <i class="fas  fa-search"></i> ARA </SubmitButton>
             
  </SearchModalContainer> : null;


});
