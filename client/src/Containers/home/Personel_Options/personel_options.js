import React, {useEffect,useState,useContext,useCallback,useRef,createRef,useMemo,useReducer} from 'react';
import {UpdateLoggedin}  from '../../isLoggedin/action'
import {makeSpecificPersonRequest,makeUpdateUserRequest,makeRemoveUserRequest,makeReportSearchRequest,makeRelatedAgencyRequest,makePersonSearchRequest}  from '../../../request/requset'
import styled from 'styled-components';
import Circle from '../../../UI/Circle';
import {IconPermission} from '../../../UI/Permissions/permissionIcon';
import {UserInputs,ChecBoxes,PermissionsTabs} from '../Home_Options/addPerson'
import {MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers'
import {Context} from '../../../Context/Context'
import DateFnsUtils from '@date-io/date-fns';
import Generator  from 'generate-password';
import {Regions}  from '../../../Regions/regions'
import {Link,NavLink,Route,Switch} from 'react-router-dom';
import Modal from '../../../UI/sentModal'
import Stage from '../../../UI/backStage'
import {Redirect}  from 'react-router-dom'
import {ReportList} from '../Home_Options/myReports'
import {Admin,Temsilci,Bayi} from './statusArrays/statusArray'
import {_PersonelList} from  './personelList'
import UserMenu from '../../../Components/Usermenu'
import {useViewport} from '../../home/navs/customHooks/viewPortHook'
import GeneralList from '../../../Components/GeneralList'

const MainWrapper = styled.form`
display:flex;
background:white;
width:94%;
margin:0 auto;
align-items:center;
justify-content:center;
margin-top:2%;
margin-bottom:20px;
padding:30px;
border-radius:3px;
flex-flow:column;
@media (max-width: 1030px) {
  padding:10px;
}
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
  justify-content:flex-start;
  flex-flow:column;
  align-items:stretch;
}
`

//-------------------------------

const InputsWrapper = styled.div`
flex:0.7;
display:flex;
align-items:center;
justify-content:center;
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

//-------------------------------



const PermissionsWrapper = styled.div`
flex:0.7;
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
margin-bottom:10px;
`


//-------------------------------
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

const ButtonWrapper = styled.div`
display:flex;
justify-content:flex-end;
width:100%;
`


const Icon = styled.div`
border-radius:5px;
padding:5px 10px;
color:white;
background:#0779e4;
font-size:15px;
margin-right:10px;
&:hover{
    cursor:pointer;
}
`



const Capsule = styled.div`
display:flex;
align-items:center;
justify-content:center;
border-radius:4px;
background:#f57b51;
color:white;
font-size:12.5px;
padding:6px;
`


//---------------------------------

export const PermissionsNumbers = {
  REMOVE: 1,
  UPDATE: 2,
  ADD: 3,
  READ: 4,
}



const  initialUserInformations = {
  firstName:'',
  lastName:'',
  userName:'',
  password:'',
  gender:'',
  phoneNumber:'',
  region:'',
  mailAddress:'',
  township:'',
  contractDate:new Date(),
  role:'',
  permissions:{},
}

const General_User_Info = ({match,...rest})=>{

    const { width } = useViewport();
   

    const [userInformations , setUserInformations ] = useState(initialUserInformations);
    const [reuseUser , setreuseUser ] = useState({});
    const [rePermissions , setrePermissions ] = useState({});
    const [disable , setDisable]  = useState(true);      
    const [permissionsState  ,  setPermissions ]  = useState({});
    const [alreadyInUse , setAlreadyInUse] = useState(false);
    const [modalShow , setmodalShow]  = useState (false);
    const [tabShow  , setTabShow] = useState(0);
    const [deletePopUp , setDeletePopUP]  = useState(false);
    const [date , setDate] = useState(new Date());
    const [warning,setwarningPopUp]   = useState();
    const [loading , setLoading ]  = useState(false);
    const [isDeleted , setIsDeleted] = useState(false);
    const [backStageOpen ,setbackStageOpen] = useState(false);
    const [relatedAgencyLoading , setrelatedAgencyLoading]= useState(false);
    const [relatedAgency , setRelatedAgency] = useState({});
   
    
    
    
    const context =  useContext(Context);

          const UserMenuLinks = useMemo(()=>{

            switch(userInformations.role)
            {
              case 'Admin':

              return Admin();

              break;

              case 'Temsilci':
                 
                return Temsilci();

              break;

              case 'Bayi':
                 
                if(context.user.role === 'Temsilci')
                {
                   return Bayi().filter(( menuItem , index ) => menuItem.desc !== 'Yetkiler'  );
                }
                else
                {
                   return Bayi();
                }
                
              break;

              default : 
                  return [];
              break;
            }
        },[userInformations]);

                  
        const closeModal_1 = useCallback(event=>{
            setbackStageOpen(false);
            setmodalShow(false);
        },[])
       
        const closeModal_2 =useCallback(event=>{
          setbackStageOpen(false);
            setAlreadyInUse(false);
        },[])

        const closeModal_3 =useCallback(event=>{
          setbackStageOpen(false);
          setwarningPopUp(false);
        },[])

        const closeModal_4 =useCallback(event=>{
          setbackStageOpen(false);
          setDeletePopUP(false);
        },[])

        const closeModal_5 =useCallback(event =>{
          rest.history.push('/home/personel_listesi');
        },[])
        
        const openModal  = useCallback(event =>{
          setbackStageOpen(true);
          setDeletePopUP(true);
        },[])
       
       useEffect(()=>{ 

         const {id} = match.params;
         makeSpecificPersonRequest('get',id,setLoading,setUserInformations,setPermissions,setreuseUser,setrePermissions);

       },[match.params.id])

       useEffect(()=>{
         setDisable(true);
       },[rest.history.location.pathname])

       useEffect(()=>{

          if(userInformations.relatedAgencyID) 
               makeRelatedAgencyRequest('get',userInformations.relatedAgencyID,setrelatedAgencyLoading,setRelatedAgency,context.isLoggedinf);

       },[userInformations.relatedAgencyID])

       useEffect(()=>{
           //it is important  for date to work correctly
          if(date)
             setUserInformations( prevState => ({...prevState,contractDate:date}));

       },[date]);

  
      const tabsHandle = useCallback((event, newValue) => {
        setTabShow(newValue);
      },[]);

    
    const subMenuIndex = React.useMemo(()=>{
          return rest.history.location.pathname.split('/')[3];
    },[rest.history.location.pathname]);

    const removeUser = ()=>{
        setDeletePopUP(false);
        const person_id = match.params.id;
        makeRemoveUserRequest('delete',person_id,context.isLoggedinf,setDeletePopUP,setIsDeleted);
    }

    const submitHandler =(e)=>{  
        
        setbackStageOpen(true);
  
        const {permissions,...rest} =userInformations;  //here we seperates two obejects
        const { role }= userInformations;

        e.preventDefault();
        for (const key in rest) 
        {  
            const element = rest[key];   

          if(role === 'Bayi')
          {
            
             if(!element)
             {
              return setwarningPopUp(true);
             }  

          }
          else if (role === 'Admin')
          {
              if(!element && key !== 'region' && key !=='township'  && key !=='relatedAgencyID' )
              {
                return setwarningPopUp(true);
              }
          }
          else
          {
              if(!element && key !=='township' && key !=='relatedAgencyID')
              {
                return setwarningPopUp(true);
              } 
          }             
        }

        makeUpdateUserRequest('patch',match.params.id,{...rest,permissions:permissionsState},context.isLoggedinf,setAlreadyInUse,setmodalShow,setreuseUser,setrePermissions,setDisable,setUserInformations);
    }

   

    const textChangeHandler = React.useCallback((Type) => event => {
        let value = event.target.value;
        const oldState = {...userInformations};
        oldState[Type]=value 
    
        if(Type==='region')
        {
          oldState['township']='';
        }

        if( value==='Admin' || value==='Temsilci' || value==='Bayi' )
        {
          oldState['township']='';
          oldState['region']='';
        }
        //we are doing override here;
        setUserInformations(oldState);
    },[userInformations]);

    const permissionHandler =React.useCallback((Type,value)=>event=>{

        const oldPermissions = {...permissionsState}; //we need to keep updated state;
        oldPermissions[Type]=[...oldPermissions[Type]];

        if(!event.target.checked)
        {
          oldPermissions[Type].splice( oldPermissions[Type].indexOf(value),1);
        }
        else
        {
          oldPermissions[Type].push(value);
        }
        setPermissions(oldPermissions);

    },[permissionsState])
  


    const GeneratePassword = React.useCallback(()=> {
        const oldState = {...userInformations}; //we need to get updated userInformations for password to  be created
        const password = Generator.generate({
          length: 8,
          numbers: true
        });
        oldState['password']=password;
        setUserInformations(oldState);
      },[userInformations])

    let townships = null ; 

    if(userInformations.region && userInformations['role'] === 'Bayi')
    {
      const City =Regions.find((item)=>item['il'] === userInformations.region) ;
      townships = City.ilceleri;
    }
   
     //
    return <UpdateLoggedin page='PERSONEL_GENERAL_INFO'  {...rest} match={match}>
        {
           ( Loading , user )=>Loading ? null : loading 
           ?  
           <Circle  Load={loading} position='static' marginTop={50}/>
           :
           <React.Fragment>

           <MainWrapper onSubmit={submitHandler}> 
           
           <Stage backStage={backStageOpen} loading={!modalShow && !alreadyInUse && !warning &&  !deletePopUp && !isDeleted}   close={modalShow ? closeModal_1 : alreadyInUse? closeModal_2 : warning ? closeModal_3 : deletePopUp ? closeModal_4: isDeleted ? closeModal_5 : null}/>
           <Modal backStage={modalShow} closeModal={closeModal_1} type='UPDATE_PERSONEL'/>
           <Modal backStage={alreadyInUse} closeModal={closeModal_2} type='NOT_UNİQUE'/>
           <Modal backStage={warning} closeModal={closeModal_3} type='EMPTY_FİELD'/>
           <Modal backStage={deletePopUp} closeModal={closeModal_4}  deleteUser={removeUser}  type='DELETE_USER'/>
           <Modal backStage={isDeleted} closeModal={closeModal_5} type='DELETED'/>

                    
                     {

                         UserMenuLinks.map((item)=>{
                                 return item.desc.toLowerCase() === subMenuIndex.split('_').join(' ').toLowerCase() 
                                 ? 
                                 <h1 key={item.desc} style={{width:'100%',textAlign:'center' , color:'#4cbbb9',fontWeight:'bolder',fontSize:15}}>
                                   {item.Icon}
                                   {item.desc}
                                 </h1>    
                                 :
                                 null
                         })

                     }
        
           <InnerItems>

              
               {
                  user.permissions.Personel_Bilgileri.includes(PermissionsNumbers.UPDATE) &&  <Icon onClick={()=>{setDisable(false)}}>Düzenle <i className="fas fa-edit"/></Icon>     
               } 
                       
               {
                  user.permissions.Personel_Bilgileri.includes(PermissionsNumbers.REMOVE) &&   <Icon style={{background:'#c70039'}} onClick={openModal}> Kullanıcıyı Sil <i className="fas fa-trash-alt"></i></Icon>
               }
             
            </InnerItems>

         <InnerContainer>
                        
         <UserMenu 
            
                     role = { userInformations.role } 
                     firstName = { userInformations.firstName } 
                     lastName = {userInformations.lastName}
                     UserMenuLinks={ UserMenuLinks } 
                     match={match}
                     subMenuIndex = { subMenuIndex  }
                     page = 'Personel Detail'
          />             

          <Switch>
              
                   <Route path='/home/personel_listesi/yetkiler/:id' exact render={()=> <PermissionsWrapper>
                         <span style={{textAlign:'center',color:'#fb7b6b',fontSize:20,marginBottom:'7px',flex:0.2}}>YETKİLER</span>

                           <div style={{width:'100%',padding:'3px',flex:1}}>

                           <PermissionsTabs value={tabShow} handler={tabsHandle} />  

                           <ChecBoxes disabled={disable} width={width}   permissions={permissionsState} handler={permissionHandler} tabShow={tabShow}/>                  
                              
                           </div> 
                         </PermissionsWrapper>
                   }
                   />
              
                  <Route path='/home/personel_listesi/genel_bilgiler/:id' exact   render={()=><InputsWrapper> 
                           
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                           <UserInputs 

                            user={user}
                            townships={townships} 
                            disabled={disable} 
                            userInformations={userInformations} 
                            textChangeHandler={textChangeHandler} 
                            date={date} 
                            setDate={setDate}
                            relatedAgency={relatedAgency} 
                            GeneratePassword={GeneratePassword}
                            relatedAgencyLoading={relatedAgencyLoading}/>

                    </MuiPickersUtilsProvider>
                            
                  </InputsWrapper>
                   } />

                  <Route path='/home/personel_listesi/raporlar/:id' exact render={()=><InputsWrapper style={{alignSelf:'stretch',justifyContent:'flex-start'}}>  
                            <PersonelReports role={userInformations.role}    id={match.params.id} setLoggedin={context.isLoggedinf} currentID={user._id}  currentRole = {user.role} />                
                   </InputsWrapper> 
                  }
                  />


                  <Route path='/home/personel_listesi/bayiler/:id' exact render={()=><InputsWrapper style={{alignSelf:'stretch',justifyContent:'flex-start'}}>  
                            <PersonelSubBranches role={userInformations.role}   id={match.params.id} setLoggedin={context.isLoggedinf} currentID={user._id} currentRole = {user.role} />                
                   </InputsWrapper> 
                  }
                  />
                                                
            </Switch>

           </InnerContainer>   
              { disable  ? null :

              <ButtonWrapper>
                
                <SubmitButton type='button' onClick={()=>{  //here we reset the all informations
                setDisable((prev)=>true);
                setUserInformations(reuseUser);
                setPermissions(rePermissions);
                window.scrollTo(0,0);
                }}   style={{background:'#fa744f',marginRight:10}}>VAZGEÇ</SubmitButton> 

                <SubmitButton type='submit'>GÜNCELLE</SubmitButton> 
              
              </ButtonWrapper>
              }

          
          </MainWrapper>

        </React.Fragment>     
      }
      
    </UpdateLoggedin>

}

export const PersonelReports = ( { id , setLoggedin , role , notFoundText  , currentID } )=>{
    
  const [reports, setReports] = useState([]);
  const [ notFound , setNotFound ] = useState(null);
  const [subPagesCount , setSubPagesCount] = useState(null);
  const [selectedSubPage, setSelectedSubPage] = useState(0);
  const [loading,setLoading] = useState(true);
  
  const TopRows = [
    'Görüşülen Kişi',
    'Telefon Numarası',
    'Görüşme Tipi',
    'Görüşme Tarihi',
    'Gönderen Kişi',
    '',
  ]
  

  
  const filterIconOptions = (report)=>{

    var  reportOptions = [
      {
        desc: 'Görüşme Bilgileri',
        Icon: <i className="fas fa-user-friends"></i>
      },
    ]

    return reportOptions ; //just for now

  }
  
  const tableInformations = (item)=> {
      
    return [
      item.relatedPersonName,
      item.relatedPersonPhoneNumber,
      item.reportType === 'schoolReport' ? 'Okul Görüşmesi' : 'Öğrenci Görüşmesi'  ,
      item.meetingDate,
      item.userID == id  ? <Capsule> {item.whoseDocument} </Capsule> : item.whoseDocument
    ] 

  }

  const pathGenerator = ( item , id )=> '/home/raporlar/' + id ; 

  const nextPage = (page) => {

    setSelectedSubPage(page);
    setLoading(true);

    makeReportSearchRequest('post', {
      role:role,
      personelReportID:id,
      pageNumber: page
    },setLoggedin , setReports, ()=>{}, setSubPagesCount, setLoading);

  }

  useEffect(()=>{
    if(role) makeReportSearchRequest('post', { personelReportID:id , role:role  } ,setLoggedin,setReports,()=>{},setSubPagesCount,setLoading,setNotFound);
  },[role])
    
  return <GeneralList 
    width = {780}
    data = { reports } 
    topTitles = {TopRows} 
    loading = {loading} 
    nextPage = {nextPage}
    tableInformations = {tableInformations}
    iconOptions = {filterIconOptions}
    subPagesCount = {subPagesCount}
    notFoundText = { notFoundText || `Bu ${role}ye Ait Bir Rapor Bulunmamaktadir`}
    notFound = {notFound}
    path = {'/home/personel_listesi'}
    pathGenerator = {pathGenerator}   />

}



export const PersonelSubBranches = ({ id , setLoggedin , role , notFoundText , currentRole  })=>{
    
  const [ subBranches, setSubBranches ] = useState([]);
  const [ notFound , setNotFound ] = useState(null);
  const [ subPagesCount , setSubPagesCount ] = useState(null);
  const [ selectedSubPage, setSelectedSubPage ] = useState(0);
  const [ loading,setLoading ] = useState(true);
 
  const TopRows  =  [
    'İsim',
    'Soy İsim',
    'Rol',
    'Bölge',
    'Sözleşme Tarihi',
    '',
  ]
  
  const filterIconOptions = (user)=>{

    var  PersonelOptions = [
      {desc:'Genel Bilgiler',Icon:<i className="fas fa-user-friends"></i>},
      {desc:'Bayiler',Icon:<i    className="fas fa-code-branch"/>},
      {desc:'Raporlar',Icon:<i   className="fas fa-sticky-note"></i>},
      {desc:'Yetkiler',Icon: <i  className="fas fa-unlock"></i>},
    ]

    const { role } = user ; 
    
    if( currentRole !== 'Admin' &&  currentRole ) PersonelOptions =  PersonelOptions.filter(( { desc } )=> desc !== 'Yetkiler' ) ;

    if( role !== "Temsilci" ) PersonelOptions =  PersonelOptions.filter(( { desc } )=> desc !== 'Bayiler' ) ;
    

    return PersonelOptions ; 

  }

  const tableInformations = (item)=> {
      
    return [
      item.firstName,
      item.lastName,
      item.role,
      item.region,
      item.contractDate
    ] 

  } 

  const pathGenerator = ( item , id ) => '/home/personel_listesi/' + item.split(' ').join('_').toLowerCase() + '/' + id

  const nextPage = (page) => {

    setSelectedSubPage(page);
    setLoading(true);

    makePersonSearchRequest('post', {
      relatedAgencyID:id,
      pageNumber: page
    } , setLoggedin , setSubBranches, ()=>{}, setSubPagesCount, setLoading);

  }

  useEffect(()=>{
    makePersonSearchRequest('post',{relatedAgencyID:id},setLoggedin,setSubBranches,()=>{},setSubPagesCount,setLoading,setNotFound);
  },[])
    
  return <GeneralList 
   
    width = {780}
    data = { subBranches } 
    topTitles = {TopRows} 
    loading = {loading} 
    nextPage = {nextPage}
    tableInformations = {tableInformations}
    iconOptions = {filterIconOptions}
    subPagesCount = {subPagesCount}
    notFoundText ={ notFoundText || `Bu ${role}ye Bagli Bir  Bayi  Bulunmamaktadir`}
    notFound = {notFound}
    path = {'/home/personel_listesi'}
    pathGenerator = {pathGenerator}  />

}


export default  General_User_Info;