import React,{useEffect} from 'react';
import {Redirect,Route, Link,Switch}  from 'react-router-dom'
import {Context} from '../../Context/Context'
import Circle  from  '../../UI/Circle'
import {makeLogoutRequest,makeStudentRequest} from '../../request/requset'
import {Nav} from './navs/nav'
import Student from './Home_Options/students'
import MainPage from './Home_Options/mainPage'
import PersonelList from './Personel_Options/personelList'
import AddPerson from './Home_Options/addPerson'
import Profile from './Home_Options/Profile_Options/profile'
import Pre_Register_Info from './Student_Options/preregister_informations'
import Personel_options from './Personel_Options/personel_options'
import  AddReport  from './Home_Options/addReport';
import MyReports from './Home_Options/myReports';
import ReportDetail from './Home_Options/reportDetail';
import NotFoundPage from '../../Components/NotFoundPage'

import { UpdateLoggedin } from "../isLoggedin/action";
class  Home extends React.Component{
     static contextType = Context; 
   
     render() {    
       //match path location  farklı olsa bile ilk eşleştiği route nin pathini verir

          return (  <React.Fragment>
              <Nav {...this.props} {...this.context}/>
            <Switch>
              
              {/* <Route path={'/home/ön_kayıt'}  exact  component={Student}/>   */}

              <Route path={'/home'}  exact  component={MainPage}/> 
              <Route path={'/home/personel_listesi'} exact   render={(props)=><PersonelList {...props} isOnlySubBranch={false}  />}/>
              <Route path={'/home/bayi_listesi'} exact render={(props)=> <PersonelList {...props}  isOnlySubBranch={true} />} />
              <Route path={'/home/personel_ekle'} exact component={AddPerson}/>
              <Route path={'/home/profil'}  exact component={Profile}/>

              {/* <Route path={'/home/öğrenciler/ön_kayıt_bilgileri/:id'} exact component={Pre_Register_Info}/> */}

              <Route path={'/home/personel_listesi/:desc/:id'}  exact  component={Personel_options}/>
              <Route path={'/home/profil/:desc'} exact component={Profile} />
              <Route path={'/home/rapor_ekle'} exact component={AddReport} />
              <Route path={'/home/raporlar'} exact component={MyReports} />
              <Route path={'/home/raporlarım/:desc/:id'} exact component={MyReports} /> 
              <Route path={'/home/raporlar/:id'}  exact  component={ReportDetail}/>  

              <Route path='*' render ={()=><NotFoundPage path='home'/>} />

               {
                 //the route above when we add two params to path , match.params will get two params too
               }

            </Switch>   
          </React.Fragment>
       )  
         
       }
  }


  export default Home;