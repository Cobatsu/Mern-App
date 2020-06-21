import React, {useEffect,useState,useContext,useMemo} from 'react';
import Generator  from 'generate-password';
import {UpdateLoggedin} from '../../isLoggedin/action'
import styled from 'styled-components';
import {Checkbox,TextField,Tab,Tabs,Paper,InputLabel,MenuItem,IconButton,InputAdornment} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import {makeAddUserRequest} from '../../../request/requset'
import {MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import Modal from '../../../UI/sentModal'
import Stage from '../../../UI/backStage'
import {Context} from '../../../Context/Context'
import {Link} from 'react-router-dom'
import {Regions}  from '../../../Regions/regions'
import {makePermissionRequest} from '../../../request/requset'
import Circle from '../../../UI/Circle';
import  {useViewport} from '../../home/navs/customHooks/viewPortHook'
import NumberFormat from 'react-number-format'
import {checkPhoneNumber} from '../../../Utilities/utilities'

const MainWrapper = styled.form`
display:flex;
background:white;
width:94%;
margin:0 auto;
align-items:center;
justify-content:center;
padding:0;
margin-top:2%;
margin-bottom:30px;
padding:30px;
@media (max-width: 1030px) {
  padding:10px;
}
border-radius:3px;
flex-flow:column;
`

const InnerContainer = styled.div`
display:flex;
width:100%;
justify-content:space-evenly;
margin:30px 0;
align-items:flex-start;
@media (max-width: 1030px) {
  justify-content:flex-start;
  flex-flow:column;
  align-items:stretch;
}
`

//-------------------------------

const InputsWrapper = styled.div`
flex:0.45;
flex-flow:column;
display:flex;
justify-content:center;
align-items:center;
padding: 15px 5px;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.03);

`
const InnerInputWrapper = styled.div`
width:90%;
padding:10px 0;
display:flex;
flex-flow:column;
justify-content:center;
align-items:center;
`


const Capsule = styled.div`
width:100%;
display:flex;
`

//-------------------------------



const PermissionsWrapper = styled.div`
flex:0.48;
display:flex;
flex-flow:column;
padding: 15px 8px;
justify-content:space-evenly;
align-items:center;
box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
@media (max-width: 1030px) {
  width:100%;
  margin-top:30px;
}
`

const InnerPermission  = styled.div`
width:100%;
padding:3px;
margin-top:10px;
display:flex;
align-items:center;
justify-content:space-evenly;
`

const PermissionTopSpan = styled.span `
padding:3px;
color:black;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
border-radius:6px;
@media (max-width: 1030px) {
  font-size:10px;
}
`



const RadioWrapper = styled.div`
display:flex;
justify-content:space-evenly;
flex:0.8;
font-size:14px;
`



//-------------------------------
const SubmitButton  = styled.button`
outline:none; 
background:#00bdaa;
border:none;
color:white;
padding:10px 20px ;
align-self:flex-end;
&:hover{
    cursor:pointer;
}
`
const GeneratePasswrd = styled.button`
padding:5px 15px;
border:none;
outline:none;
background:#ff6363;
color:white;
align-self:flex-end;
box-shadow:none;
margin-top:5px;
&:hover{
  cursor:pointer;
}
`
const InnerInputWrapperIcon = styled.div`
display:flex;
align-items:center;
width:90%;
background:#f4f4f4;
padding:10px;
border-radius:6px;
position:relative;
margin-top:10px;
@media (max-width: 1030px) {
  justify-content:flex-start;
  flex-flow:column;
}
`
const WidthCapsules = styled.div`
width:${({ width })=> width + 'px' };
display:flex;
justify-content:center;
align-items:center;
`

const Icon = styled.div`
border-radius:5px;
color:white;
background:rgb(255, 99, 99);
font-size:15px;
margin-left:10px;
&:hover{
    cursor:pointer;
}
@media (max-width: 1030px) {
  margin-left:0;
  margin-top:4px;
}
`
//----------------------------------


const UserInformations = [

  {0:'firstName',1:'İsim'},
  {0:'lastName',1:'Soy İsim'},
  {0:'userName',1:'Kullanıcı İsmi'},
  {0:'mailAddress',1:'E-Posta Adresi'},
  {0:'phoneNumber',1:'Telefon Numarası'},
  {0:'password',1:'Şifre'},
  {0:'relatedAgency',1:'İlgili Acenta'},
  {0:'role',1:'Rol'},
  {0:'region',1:'Bölge'},
  {0:'township',1:'İlçe'},
  {0:'responsibleCities' , 1:'Sorumlu Olduğu İller'},
  {0:'gender',1:'Cinsiyet'},
  {0:'contractDate',1:'Sözleşme Tarihi'},

]

const UserPermissions = {
Personel:['Personel Bilgileri'],
Rapor:['Rapor Bilgileri'],
}
// -----------------------------

const initialState = {
    firstName:'',
    lastName:'',
    userName:'',
    password:'',
    gender:'',
    mailAddress:'',
    phoneNumber:'+90 (___) ___-____',
    region:'',
    township:'',
    responsibleCities:[],
    contractDate:new Date(),
    role:'',
}

const AgencyRegions = [
  'Marmara',
  'İç Anadolu',
  'Ege',
  'Karadeniz',
  'Akdeniz',
  'Doğu Anadolu',
  'Güneydoğu Anadolu',
  'Katar',
  'Rusya'
]

const DetailStatuses = [
  'Admin',
  'Temsilci',
  'Bayi'
]

const AddPersonStatuses = [
  'Admin',
  'Temsilci',
]

const AddPerson  = React.memo((props)=>{
  
  const { width } = useViewport();

  const [userInformations , setUserInformations ] = useState(initialState);
   
  const {isLoggedinf , user:currentUser} =  useContext(Context);

  const [permissions  ,  setPermissions ]  = useState({});
  const [fetchPermission  , setFetchPermission] = useState({});

  const [alreadyInUse , setAlreadyInUse] = useState(false);
  const [modalShow , setmodalShow]  = useState (false);
  const [tabShow  , setTabShow] = useState(0);
 
  const [date , setDate] = useState(new Date(Date.now()));
  const [warning,setwarningPopUp]   = useState();
  const [BackStage,setBackStage]  = useState(false);
  const [spanWiths , setSpanWiths] = useState([]);

  const tabsHandle = (event, newValue) => {
    setTabShow(newValue);
  };

  useEffect(()=>{
    setUserInformations(prevState =>({...prevState ,contractDate:date}));
  },[date]);

  useEffect(()=>{

    switch(userInformations.role)
    {
      case 'Bayi':
        setPermissions(fetchPermission.subBranchDefault)
      break;

      case 'Temsilci':
        setPermissions(fetchPermission.agencyDefault)
        break;

      case 'Admin':
          setPermissions(fetchPermission.adminDefault)
          break;  
      default: 
       
      break;
    }

  },[userInformations.role])

  useEffect(()=>{
   makePermissionRequest('get',setFetchPermission);
  },[]);

  const textChangeHandler = (Type,multipleInput) => (event) => {

    let value = event.target.value;

    const oldState = { ...userInformations };
    oldState[Type] = value 

    if(Type === 'responsibleCities' ){ oldState[Type] = multipleInput ;}

    if(Type === 'region') //whenever we want to change region , we have to assign unf value to township
    {
       oldState['township']='';
    }

    if(value === 'Admin' || value === 'Temsilci' || value === 'Bayi'){ //we have to reset regions and smaltowns
          oldState['township']='';
          oldState['region']='';
          oldState['relatedAgency']='';
    }
    //we are doing override here;
    setUserInformations(oldState);
  };

  const closeModal_1 = event=>{
    setUserInformations(initialState);
    setPermissions({});
    setBackStage(false);
    setmodalShow(false);
  }

  const closeModal_2= event=>{
     setBackStage(false);
     setAlreadyInUse(false);
  }

  const closeModal_3= event=>{
    setBackStage(false);
    setwarningPopUp(false);
 }

  const GeneratePassword = ()=> {
    const oldState = {...userInformations};
    const password = Generator.generate({
      length: 8,
      numbers: true
    });
    oldState['password']=password;
    setUserInformations(oldState);
  } 


  const permissionHandler =React.useCallback((Type,value)=>event=>{

    const oldPermissions = {...permissions};
    oldPermissions[Type]=[...oldPermissions[Type]];

    if(!event.target.checked)
    {
      oldPermissions[Type].splice( oldPermissions[Type].indexOf(value) , 1 );
    }
    else
    {
      oldPermissions[Type].push(value);
    }
    setPermissions(oldPermissions);

  },[permissions])

 
  const submitHandler =(e)=>{

      e.preventDefault();
      setBackStage(true);

      let mainState = { ...userInformations , permissions }  ;

      let result =  checkPhoneNumber(userInformations['phoneNumber'])

      if(result) {  return setwarningPopUp(true); }

      const { role } = userInformations;
      
      for (const key in userInformations) 
      {

        if (userInformations.hasOwnProperty(key)) {

          const element = userInformations[key];
          
          if(role === 'Bayi' && currentUser.role === 'Temsilci') {

             if( ( !element && key !== 'relatedAgency' )  ||  userInformations['responsibleCities'].length <= 0) {

               return setwarningPopUp(true);

             }

          } else if (role === 'Admin') {


             if(!element && key !== 'region' && key !=='township' && key !== 'relatedAgency') {

              return setwarningPopUp(true);

             }

          } else {

             if(!element && key !=='township' && key !== 'relatedAgency') {

               return setwarningPopUp(true);

             }  
             
          }
           
        }
      }

      makeAddUserRequest('post',mainState,setAlreadyInUse,setmodalShow,isLoggedinf);
  }
  
  if(userInformations.region && userInformations['role'] === 'Bayi')
  {
    const City = Regions.find((item)=> item['il'] === userInformations.region);  //just get first one matched
    var townships = City.ilceleri;
  }
  
  
  return  <UpdateLoggedin page='ADD_USER' {...props}>
    {
    
        (Loading,User)=> Loading  ? null : <MainWrapper onSubmit={submitHandler}> 


        <MuiPickersUtilsProvider utils={DateFnsUtils}>
       
        <Stage backStage={BackStage} loading={!modalShow && !alreadyInUse && !warning}  close={modalShow ? closeModal_1 : alreadyInUse? closeModal_2 : warning ? closeModal_3 : null}/>
       
        <Modal backStage={modalShow} closeModal={closeModal_1} type='ADD_PERSONEL'/>
        <Modal backStage={alreadyInUse} closeModal={closeModal_2} type='NOT_UNİQUE'/>
        <Modal backStage={warning} closeModal={closeModal_3} type='EMPTY_FİELD'/>
        
        <h1 style={{width:'100%',textAlign:'center' , color:'#4cbbb9',fontWeight:'bolder'}}><i style={{marginRight:10}}className="fas fa-user-plus"></i>YENİ PERSONEL</h1>
      <InnerContainer>

                <InputsWrapper> 
               

                <UserInputs townships={townships} user={User} userInformations={userInformations} textChangeHandler={textChangeHandler} date={date} setDate={setDate} GeneratePassword={GeneratePassword} />

                                               
                </InputsWrapper>

                
              {
                    
                User.role === 'Admin' ?
               
                <PermissionsWrapper>

                    <span style={{textAlign:'center',color:'#fb7b6b',fontSize:20,marginBottom:'7px',flex:0.2}}>YETKİLER</span>
                  
                    <div style={{width:'100%',padding:'3px',flex:1}}>

                    <PermissionsTabs value={tabShow} handler={tabsHandle} />  


                        {
                          userInformations['role']  ? <ChecBoxes permissions={permissions} handler={permissionHandler} tabShow={tabShow}/>  : <h6 style={{textAlign:'center',color:'#00909e',marginBottom:'7px',flex:0.2}}>LÜTFEN ROL SEÇİNİZ</h6>
                        }

                    </div> 

                </PermissionsWrapper>

                :

                null
             }
              
        </InnerContainer>   
            

           <SubmitButton type='submit'>EKLE</SubmitButton>
           </MuiPickersUtilsProvider>
        </MainWrapper>
    }
  </UpdateLoggedin>
})


export const UserInputs = React.memo(({userInformations,townships,textChangeHandler,setDate,GeneratePassword,disabled,isProfil,user,relatedAgency,relatedAgencyLoading})=>{

  const [showPassword, setShowPassword] = useState(false);

  var relatedAgencyIcon = (item) => null;
  var responsibleForCities = (item) => null;

  var controlRegion = (mainItem)=>  userInformations['role']  ?     <InnerInputWrapper key={mainItem}><TextField InputLabelProps={{style:{color:'black',zIndex:1}}} inputProps={{style:{background:'grey'}}}  disabled={ userInformations.relatedAgencyID  ? true : disabled }  onChange={textChangeHandler(mainItem)}  id="select" label={userInformations['role'] === 'Bayi' ? 'Bayi Bölge' : 'Temsilci Bölge'} value={userInformations[mainItem]} style={{width:'100%',margin:'10px 0'}}  select>{
             
        userInformations['role'] === 'Bayi' ?  

        Regions.map(( item )=> <MenuItem value={item.il}>{item.il}</MenuItem> ) 
        
        :

        AgencyRegions.map(( item )=> <MenuItem value={item}>{item}</MenuItem>) } 

  </TextField> </InnerInputWrapper> : null


  if(user.role === 'Admin')
  {

      if(isProfil){

            var Statuses =  DetailStatuses.map((statu , index)=>{ 
               return <MenuItem key={statu} value={statu}>{statu}</MenuItem> 
            })

      }
      else{  
          if(userInformations.relatedAgencyID)
          {

            var responsibleForCities =(item)=> <InnerInputWrapper key={item}>
              
            <Autocomplete

              multiple
              value={userInformations[item]}
              onChange={(event,newValue)=>{textChangeHandler(item,newValue)(event)}}
              id="tags-standard"
              disabled={disabled}
              options={Regions.map((Region)=>Region.il)}
              style={{width:'100%'}}
              getOptionLabel={(option) => option }
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{style:{color:'black',zIndex:1}}} 
                  variant="standard"
                  label="Sorumlu Olduğu İller"
                />
              )}
    
            />

            </InnerInputWrapper>
            
          
            if(!relatedAgencyLoading)
            {
              var relatedAgencyIcon = (index) => <InnerInputWrapperIcon key={index}>  
              
              <span>  Bağlı Olduğu Temsilci :   </span>
  
              <Icon>
  
                  <Link to={'/home/personel_listesi/genel_bilgiler/' + userInformations.relatedAgencyID}  style={{width:'100%',height:'100%',textDecoration:'none',color:'white',display:'block',padding:'5px 10px'}}>
  
                            <span > {relatedAgency.firstName} </span>
                            <span >  {relatedAgency.lastName}  </span> 
                            <i class="fas fa-user" style={{marginLeft:5}}></i>
  
                  </Link>   
  
              </Icon>
  
              <Icon style={{padding:'5px 10px',background:'#1eb2a6'}}>
                  
                <span>{relatedAgency.region} Bölge Temsilcisi</span>
  
              </Icon>
  
            </InnerInputWrapperIcon> ;

            }

            else {

              var relatedAgencyIcon = (index) => <InnerInputWrapperIcon key={index}>

                  <Circle key={index} Load={relatedAgencyLoading} position='static'/>

              </InnerInputWrapperIcon>

            }
            
            var Statuses =  DetailStatuses.map((statu , index)=>{ 
                 return <MenuItem key={index}  value={statu}>{statu}</MenuItem> 
            })

          }
          else
          {
            var Statuses =  AddPersonStatuses.map((statu , index)=>{ 
                  return <MenuItem key={statu}  value={statu}>{statu}</MenuItem> 
            })

          }

      }
  }
  else if (user.role === 'Temsilci' ){

      if(isProfil) {
        var Statuses = <MenuItem  value='Temsilci'>Temsilci</MenuItem>
      }
      else {

        var Statuses = <MenuItem  value='Bayi'>Bayi</MenuItem>

        var responsibleForCities = ( item )=> <InnerInputWrapper key={item}>

       <Autocomplete
          multiple
          value={userInformations[item]}
          disabled={disabled}
          onChange={(event,newValue)=>{textChangeHandler(item,newValue)(event)}}
          id="tags-standard"
          options={Regions.map((Region)=>Region.il)}
          style={ {width:'100%' , color:'black'} }
          getOptionLabel={(option) => option }
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{style:{color:'black',zIndex:1}}} 
              variant="standard"
              label="Sorumlu Olduğu İller"
            />
          )} />  
      
      </InnerInputWrapper>
      }
  }
  else
  {
      var Statuses = <MenuItem  value='Bayi'>Bayi</MenuItem>

      if(isProfil) {

        var responsibleForCities = ( item )=> <InnerInputWrapper key={item}>

              <Autocomplete

                      multiple
                      value={userInformations[item]}
                      disabled={disabled}
                      onChange={(event,newValue)=>{textChangeHandler(item,newValue)(event)}}
                      id="tags-standard"
                      options={Regions.map((Region)=>Region.il)}
                      style={ {width:'100%' , color:'black'} }
                      getOptionLabel={(option) => option }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputLabelProps={{style:{color:'black',zIndex:1}}} 
                          variant="standard"
                          label="Sorumlu Olduğu İller"
                        />
                      )} />   

            </InnerInputWrapper>

            if(!relatedAgencyLoading) {

                    var relatedAgencyIcon = (index)=> <InnerInputWrapperIcon key={index}>  
                    
                    <span>  Bağlı Olduğu Temsilci :   </span>

                    <Icon>
                        <div  style={{width:'100%',height:'100%',textDecoration:'none',color:'white',display:'block',padding:'5px 10px'}}>
                                  <span > {relatedAgency.firstName} </span>
                                  <span >  {relatedAgency.lastName}  </span> 
                                  <i class="fas fa-user" style={{marginLeft:5}}></i> 
                        </div>   
                    </Icon>

                    <Icon style={{padding:'5px 10px',background:'#1eb2a6'}}>
                        
                      <span>{relatedAgency.region} Bölge Temsilcisi</span>

                    </Icon>

                </InnerInputWrapperIcon>
            }
            else
            {
                var relatedAgencyIcon = (index)=> <InnerInputWrapperIcon key={index}>

                    <Circle key={index} Load={relatedAgencyLoading} position='static'/>

                </InnerInputWrapperIcon>
            }
        
      }
    
  }
 

  return UserInformations.map((item,index)=>{

    if(item[0] === 'township' ||  item[0] === 'relatedAgency' || item[0] === 'responsibleCities' )
    {
       if(item[0] === 'township' && townships && userInformations['region'] && userInformations['role'] !== 'Admin'){
              return  <InnerInputWrapper key={item[0]}> <TextField disabled={ userInformations.relatedAgencyID  ? true : disabled } InputLabelProps={{style:{color:'black',zIndex:1}}}  inputProps={{style:{padding:14,background:disabled ?  '#eeeeee' : 'white',color:'#333'}}}  onChange={textChangeHandler(item[0])}  id="select" label="İlçe" value={userInformations[item[0]]} style={{width:'100%',margin:'10px 0'}}  select>
                       {
                         townships.map((item)=>{
                           return   <MenuItem value={item}>{item}</MenuItem> 
                         })
                       }
              </TextField> 

              </InnerInputWrapper> 
       }
       if( item[0] === 'relatedAgency' ){ return  relatedAgencyIcon(index); } 
       if( item[0] === 'responsibleCities' &&  userInformations['role']) {  return  responsibleForCities(item[0]); }
            
    }
    else
    { 

      if(item[0] !='gender' &&  item[0]!='contractDate'  && item[0]!='role' && item[0] !='region')
       {

        return  item[0] === 'password' && !isProfil ? 

       <InnerInputWrapper key={item[0]}>    
        {

        item[0] === 'password'

        ? 
        <React.Fragment>
              <TextField type={showPassword ?  "text" : "password"}   InputProps={{ 
                // <-- This is where the toggle button is added.
         endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={()=>setShowPassword(prev=>!prev)}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )

        }}  InputLabelProps={{style:{color:'black',zIndex:1}}}  inputProps={{style:{padding:10,background:disabled ?  '#eeeeee' : 'white',color:'#333'}}}   value={userInformations[item[0]]} disabled={disabled}  onChange={textChangeHandler(item[0])}  id="outlined-basic" label={item[1]}  style={{width:'100%'}} />
              {!disabled ?  <GeneratePasswrd type='button'  onClick={GeneratePassword}>Şifre Ver</GeneratePasswrd> : null}
        </React.Fragment>  
         :
         item[0] === 'phoneNumber'
         ?   
          <TextField  InputLabelProps={{style:{color:'black',zIndex:1}}}  inputProps={{style:{padding:10,background:disabled ?  '#eeeeee' : 'white',color:'#333'}}}   value={userInformations[item[0]]} disabled={disabled}  onChange={textChangeHandler(item[0])}  id="outlined-basic" label={item[1]}  style={{width:'100%'}} />
         :
         <TextField   value={userInformations[item[0]]} disabled={disabled}  onChange={textChangeHandler(item[0])}  id="outlined-basic" InputLabelProps={{style:{color:'black',zIndex:1}}}  label={item[1]} inputProps={{style:{padding:10,background:disabled ?  '#eeeeee' : 'white', color:'#333'}}} style={{width:'100%'}}   /> 
        } 
        </InnerInputWrapper> 
        :
        <InnerInputWrapper key={item[0]}>  
        {

            
            item[0] === 'phoneNumber' 
            ?   
            <NumberFormat   value={userInformations[item[0]]}  InputLabelProps={{style:{color:'black',zIndex:1}}}   disabled={disabled}  onChange = {textChangeHandler(item[0])}   customInput={TextField} format="+90 (###) ###-####" label={item[1]} style={{width:'100%'}} inputProps={{style:{padding:10,background:disabled ?  '#eeeeee' : 'white', color:'#333'}}}   allowEmptyFormatting mask="_"/>
            :
            item[0] !== 'password' &&  item[0] !== 'responsibleCities' ? 
            <TextField    value={userInformations[item[0]]} disabled={disabled}  onChange={textChangeHandler(item[0])}  id="outlined-basic" InputLabelProps={{style:{color:'black',zIndex:1}}}  label={item[1]} inputProps={{style:{padding:10,background:disabled ?  '#eeeeee' : 'white',color:'#333'}}} style={{width:'100%'}}   /> 
            :
            null
            
        } 
       </InnerInputWrapper>
       
       }
       else
       {
            return userInformations['role'] === 'Admin' && item[0] === 'region'  ?

            null

            :

            userInformations['role'] !== 'Admin'  && item[0] === 'region' ? 

            controlRegion(item[0])

            :

           <InnerInputWrapper key={item[0]}>

           {item[0] === 'gender' ?   <TextField InputLabelProps={{style:{color:'black',zIndex:1}}}  inputProps={{style:{padding:14,background:disabled ?  '#eeeeee' : 'white',color:'#333'}}} disabled={disabled}   onChange={textChangeHandler(item[0])}  id="select" label="Cinsiyet" value={userInformations[item[0]]} style={{width:'100%',margin:'10px 0'}}  select> <MenuItem value="Male">Erkek</MenuItem> <MenuItem value="Female">Kadın</MenuItem> </TextField> : null}
           {item[0] === 'contractDate' ? <KeyboardDatePicker disableToolbar
           
                autoOk
                InputLabelProps={{style:{color:'black',zIndex:1}}}
                disabled={disabled}
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Sözleşme Tarihi"   
                value={userInformations[item[0]]} 
                onChange={setDate} 
                style={{width:'100%',margin:'10px 0'}}/> : null}

                        {  
                           item[0] === 'role' ?    <TextField InputLabelProps={{style:{color:'black',zIndex:1}}}  inputProps={{style:{padding:14,background:disabled ?  '#eeeeee' : 'white',color:'#333'}}} onChange={textChangeHandler(item[0])} disabled={ userInformations.relatedAgencyID  ? true : disabled }   id="select" label="Rol" value={userInformations[item[0]]}  style={{width:'100%',margin:'10px 0'}}  select>
                                
                                {
                                   Statuses
                                }
                             
                          </TextField>
                           : null       
                         } 

           </InnerInputWrapper>

       }   
    }
    })
})

export const ChecBoxes = React.memo(({permissions,handler,tabShow,disabled,width})=>{

  const [spanWiths , setSpanWiths] = useState([]);
 
  useEffect(()=>{

       var topItems =  document.querySelectorAll('.TopSpans span') ;
            
       var spanWithsLast = [ ...topItems ].map( ( item )=>{ return item.offsetWidth });

       setSpanWiths( spanWithsLast )
              
 },[ width ]);
  

  var checkBoxes = ( mainItem , item ) => spanWiths.map( ( width , index ) => {

    return <WidthCapsules width={ width } >

               <Checkbox disabled={ disabled } style={ { padding:'0' } }  size='small' onChange={handler(item.split(' ').join('_'),index+1)} checked = {permissions[mainItem].indexOf(index+1)>=0} value="checkedA"  color='primary' inputProps={{ 'aria-label': 'Checkbox A' }} />

         </WidthCapsules>
  })


  return <React.Fragment>

      <InnerPermission>

          <span style={{flex:0.2}}></span>

          <RadioWrapper style={{fontSize:'14px'}} className ='TopSpans' >

                  <PermissionTopSpan >Silme</PermissionTopSpan >
                  <PermissionTopSpan >Düzenleme</PermissionTopSpan>
                  <PermissionTopSpan >Yazma</PermissionTopSpan>
                  <PermissionTopSpan >Okuma</PermissionTopSpan >
                  
          </RadioWrapper>

      </InnerPermission>

    { 
          Object.keys(permissions).map((mainItem,index)=>{      

          return UserPermissions[Object.keys( UserPermissions )[ tabShow ]].map(( item )=>{

            return mainItem === item.split(' ').join('_')  ?  
              <InnerPermission key={item}>

                  <span style={{flex:0.2,fontSize:'13px',textAlign:'center'}}> {item}</span>
                    
                  <RadioWrapper >  

                    {
                        checkBoxes(mainItem,item)
                    }  

                  </RadioWrapper>

              </InnerPermission> 

            : 
            null

          })

        })
  }

  </React.Fragment>

})

export const PermissionsTabs=React.memo(({handler,value})=>{
  return (
    <Paper style={{marginBottom:'40px'}}  square>
      <Tabs
        style={{width:'100%'}} 
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handler}
        variant='scrollable'
        scrollButtons='auto'
      >
        {
          Object.keys(UserPermissions).map((item)=>{
            return   <Tab key={item} style={{fontSize:'12px',outline:'none',minWidth:'25%',padding:0}} label={item} />
          })
        }
      </Tabs>
    </Paper>
  );
 
})

export default AddPerson;