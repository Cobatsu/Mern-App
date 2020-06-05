import React, {useEffect,useMemo,useState,useContext,useCallback} from 'react';
import {UpdateLoggedin} from '../../../isLoggedin/action'
import styled from 'styled-components';
import {Link,Route} from 'react-router-dom'
import {Context} from '../../../../Context/Context';
import  {UserInputs}  from '../addPerson';
import Generator  from 'generate-password';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,DatePicker } from '@material-ui/pickers'
import {Regions}  from '../../../../Regions/regions'
import Circle from '../../../../UI/Circle';
import Modal from '../../../../UI/sentModal';
import Stage from '../../../../UI/backStage';
import {Checkbox,TextField,Tab,Tabs,Paper,InputLabel,MenuItem,Selec} from '@material-ui/core'
import {makeChangeProfiePasswordRequest,makeRelatedAgencyRequest}  from '../../../../request/requset'
import  {Admin,Bayi,Temsilci}  from './statusArrays/statusArray'
import  UserMenu from '../../../../Components/Usermenu'
import {PersonelSubBranches} from '../../Personel_Options/personel_options'
import {PersonelReports} from '../../Personel_Options/personel_options'

const MainWrapper = styled.form`
display:flex;
background:white;
width:94%;
margin:0 auto;
align-items:center;
justify-content:center;
padding:0;
margin-top:2%;
margin-bottom:20px;
padding:30px;
@media (max-width: 1030px) {
  padding:10px;
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
`

const InnerContainer = styled.div`
display:flex;
width:100%;
justify-content:space-evenly;
margin:10px 0;
align-items:flex-start;
@media (max-width: 1030px) {
  align-items:stretch;
  flex-flow:column;
}
`


const InputsWrapper = styled.div`
flex:0.7;
display:flex;
align-items:center;
justify-content:flex-start;
flex-flow:column;
padding: 15px 5px;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
@media (max-width: 1030px) {
  width:100%;
  overflow-x: scroll;
  overflow-y: scroll;
  min-height:500px;
}
position:relative;
margin-bottom:5px;
`


//--------------------------------------

const ChangePasswordContainer = styled.div`
max-width:300px;
display:flex;
justify-content:center;
`

const PasswordInputFields = styled.form `
width:100%;
padding:20px;
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




const Profile = ({match,...rest})=>{
       
     const [disable , setDisable]  = useState(true);      
     const {user,...restContext} = useContext(Context);
     const [userInformations,setUserInformations] = useState(user);
     const [backStageOpen ,setbackStageOpen] = useState(false);
     const [dontMatch,setDontMatchPasswords]  = useState(false);
     const [isChanged , setIsChanged ] = useState(false);
     const [warning ,setWarning] = useState(false);
     const [isOldPasswordTrue  , setIsOldPasswordTrue ] = useState(false);
     const [password  , setPassword ]  = useState({
      oldPassword  : '',
      newPassword  : '',
      verifyPassword  : '',  
    })
    const [relatedAgencyLoading , setrelatedAgencyLoading]= useState(false);
    const [relatedAgency , setRelatedAgency] = useState({});

     useEffect(()=>{  //we prevent no need rerenders  
           setUserInformations(user);  
     },[user])
    
     useEffect(()=>{
       
      if(userInformations.relatedAgencyID){

         makeRelatedAgencyRequest('get',userInformations.relatedAgencyID,setrelatedAgencyLoading,setRelatedAgency,restContext.isLoggedinf);

      }
          
     },[userInformations.relatedAgencyID])

     const UserMenuLinks = useMemo(()=>{
         switch(user.role)
         {
            case 'Admin':

            return Admin();

            break;

            case 'Temsilci':

              return Temsilci();

            break;

            case 'Bayi':
              return Bayi();
            break;

            default : 
                return [];
            break;
         }
     },[user]);

     
     const closeModal_1 = useCallback(event=>{
      setbackStageOpen(false);
      setIsChanged(false);
     },[])

     const closeModal_2 =useCallback(event=>{
       setbackStageOpen(false);
       setWarning(false);
     },[])

     const closeModal_3 = useCallback(event=>{
      setbackStageOpen(false);
      setDontMatchPasswords(false);
     },[])

     const closeModal_4 = useCallback(event =>{
      setbackStageOpen(false);
      setIsOldPasswordTrue(false);
     },[])



     const subMenuIndex = React.useMemo(()=>{
       return rest.history.location.pathname.split('/')[3];
     },[rest.history.location.pathname]);

     
     const GeneratePassword = React.useCallback(()=> {
      const oldState = {...userInformations}; //we need to get updated userInformations for password to  be created
      const password = Generator.generate({
        length: 8,
        numbers: true
      });
      oldState['password']=password;
      setUserInformations(oldState);
    },[userInformations])

     const passwordChangeHandler =React.useCallback(type => event =>{
      const copyPasswords  = {...password};
      copyPasswords[type]=event.target.value;
      setPassword(copyPasswords);
     },[password]); //everytime password changes  , function will be reacreated ;

    const passwordSubmitHandler = event  => {

      setbackStageOpen(true);

      event.preventDefault();

       for (const key in password) {  
          if(!password[key])
          {
              return setWarning(true)
          }
       }

       if(password.newPassword !== password.verifyPassword)
       {
          return  setDontMatchPasswords(true);
       }


       makeChangeProfiePasswordRequest('patch',userInformations._id,restContext.isLoggedinf,setIsChanged,setIsOldPasswordTrue,password,setPassword);
       
     }
     
   
     if(userInformations.region && user.role === 'Bayi' )
     {
      const City =Regions.find((item)=>item['il'] === userInformations.region) ;
      var townships = City.ilceleri;
     }

    const textChangeHandler = React.useCallback((Type) => event => {
      let value = event.target.value;
      const oldState = {...userInformations};
      oldState[Type]=value 
      if(Type=='region') //whenever we want to change region , we have to assign unf value to township
      {
         oldState['township']='';
      }
      //we are doing override here;
      setUserInformations(oldState);
    },[userInformations]);


    return <UpdateLoggedin page='PROFİLE' {...rest}>
     {
          (Loading,user)=> Loading   //this is for unloggedin access  ,  user will see blank page

          ?

          <Circle  Load={true} position='static' marginTop={30}/>

          :

            <MainWrapper>

           <Stage backStage={backStageOpen} loading={!isChanged && !warning && !dontMatch && !isOldPasswordTrue}   close={isChanged ? closeModal_1 : warning ? closeModal_2: dontMatch ?  closeModal_3 : isOldPasswordTrue ? closeModal_4 : null }/>

            <Modal backStage={isChanged} closeModal={closeModal_1} type='CHANGED_PASSWORD'/>
            <Modal backStage={warning} closeModal={closeModal_2} type='EMPTY_FİELD'/>
            <Modal backStage={dontMatch} closeModal={closeModal_3} type='PASSWORDS_DONT_MATCH'/>
            <Modal backStage={isOldPasswordTrue} closeModal={closeModal_4} type='OLD_PASSWORD_WRONG'/>
                     {
                         UserMenuLinks.map((item)=>{ 
                                 return item.desc.toUpperCase() === subMenuIndex.split('_').join(' ').toUpperCase() ? 
                                 <h1 key={item.desc}  style={{width:'100%',textAlign:'center' , color:'#4cbbb9',fontWeight:'bolder',fontSize:15,padding:' 0 0 10px 0'}}>
                                   {item.Icon}
                                   {item.desc}
                                 </h1>             
                                 :
                                 null
                         })
                     }
                  <InnerContainer>

                   <UserMenu

                      role = { userInformations.role } 
                      firstName = { userInformations.firstName } 
                      lastName = {userInformations.lastName}
                      UserMenuLinks= { UserMenuLinks }  
                      subMenuIndex = { subMenuIndex  }
                      match={match}
                      page='Profile'

                    />
                    
                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                     

                          <Route path='/home/profil/genel_bilgiler' exact   render={()=><InputsWrapper> 
                              <UserInputs
                                  disabled={disable} 
                                  isProfil={true}  
                                  userInformations={userInformations} 
                                  date={Date.now()}   
                                  textChangeHandler={textChangeHandler}  
                                  GeneratePassword={GeneratePassword} 
                                  user={user}
                                  relatedAgency={relatedAgency}
                                  relatedAgencyLoading={relatedAgencyLoading}
                                  />

                              </InputsWrapper>
                          } />

                          <Route path='/home/profil/şifre_değiştir' exact   render={()=><InputsWrapper> 
                          
                                <ChangePassword passwordChangeHandler={passwordChangeHandler} password={password}  passwordSubmitHandler={passwordSubmitHandler}/>

                          </InputsWrapper>
                          } />

                          <Route path='/home/profil/bayiler' exact   render={()=><InputsWrapper> 
                          
                               <PersonelSubBranches id={ user._id } role={ user.role } setLoggedin={restContext.isLoggedinf} notFoundText = 'Size Bağlı Bir Bayi Bulunmamaktadır'  />

                            </InputsWrapper>
                           } />

                          <Route path='/home/profil/raporlar' exact   render={()=><InputsWrapper> 
                          
                               <PersonelReports currentRole={ user.role } role = { user.role }   currentID={user._id} notFoundText = 'Size Ait Bir Rapor Bulunmamaktadır' setLoggedin={restContext.isLoggedinf} isProfil={true}  />

                            </InputsWrapper>
                          } />



                         
                   </MuiPickersUtilsProvider>  
                   </InnerContainer>
                </MainWrapper>
     }
    </UpdateLoggedin>
}

const ChangePassword = React.memo(({passwordChangeHandler,passwordSubmitHandler,password})=>{
    return  <ChangePasswordContainer>
             <PasswordInputFields onSubmit={passwordSubmitHandler}>
                    <TextField value={password['oldPassword']}   onChange = {passwordChangeHandler('oldPassword')} type='password' label='Eski Şifre'  style={{width:'100%',padding:'10px 0',marginBottom:5}}   />
                    <TextField value={password['newPassword']}   onChange = {passwordChangeHandler('newPassword')} type='password' label='Yeni Şifre'  style={{width:'100%',padding:'10px 0',marginBottom:5}}   />
                    <TextField value={password['verifyPassword']} onChange = {passwordChangeHandler('verifyPassword')} type='password' label='Yeni Şifre Onay'  style={{width:'100%',padding:'10px 0',marginBottom:5}}   />
                    <InnerItems> <SubmitButton type='submit'>Değiştir</SubmitButton> </InnerItems>
             </PasswordInputFields>
    </ChangePasswordContainer>
});


export default Profile;