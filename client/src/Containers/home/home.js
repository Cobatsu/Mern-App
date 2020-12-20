import React,{useEffect} from 'react';
import {Redirect,Route, Link,Switch}  from 'react-router-dom'
import {Nav} from './navs/nav'
import Student from './Home_Options/students'
import MainPage from './Home_Options/mainPage'
import PersonelList from './Personel_Options/personelList'
import AddPerson from './Home_Options/addPerson'
import Profile from './Home_Options/Profile_Options/profile'
import Personel_options from './Personel_Options/personel_options'
import AddReport  from './Home_Options/addReport';
import MyReports from './Home_Options/myReports';
import ReportDetail from './Home_Options/reportDetail';
import NotFoundPage from '../../Components/NotFoundPage'
import ErrorBoundary from "../ErrorWrapper/ErrorBoundary";
import StudentInformation from "../home/Student_Options/preregister_informations"
import NewStudent from "../home/Home_Options/addNewStudent"

class  Home extends React.Component {

  
     render() {    
       //match path location  farklı olsa bile ilk eşleştiği route nin pathini verir
    
          return (  <React.Fragment>


              <ErrorBoundary> 
                  <Nav/>
              </ErrorBoundary>
            
             <Switch>

              
             <Route 
                path = {'/home/ön_kayıt_liste'}  
                exact  
                render = { (props)=> (

                     <ErrorBoundary {...props}> 
                        <Student {...props}/>
                     </ErrorBoundary> 

                ) }
              
              /> 


              <Route 
                path = {'/home/ön_kayıt_ekle'}  
                exact  
                render = { (props)=> (

                     <ErrorBoundary {...props}> 
                        <NewStudent {...props}/>
                     </ErrorBoundary> 

                ) }
              /> 

             <Route
                path = {'/home/ön_kayıt/:id'}
                exact
                render = { (props)=> (

                  <ErrorBoundary {...props}> 
                      <StudentInformation {...props}/>
                  </ErrorBoundary> 

                ) } 

              />

              <Route 
                path={'/home'}  
                exact  
                render = { (props)=>(
                   <ErrorBoundary {...props}> 
                        <MainPage {...props} />
                   </ErrorBoundary>
                )}
              />

              <Route 
                path = {'/home/personel_listesi'} 
                exact   
                render = {(props)=> 
                    
                    <ErrorBoundary {...props}>
                      <PersonelList  isOnlySubBranch={false} {...props}  />
                    </ErrorBoundary>

                }
              />

              <Route 
                path={'/home/bayi_listesi'} 
                exact 
                render = {(props)=> 
                    
                  <ErrorBoundary {...props}>
                    <PersonelList  isOnlySubBranch={true} {...props}  />
                  </ErrorBoundary>

               }
              />

              <Route 
                path={'/home/personel_ekle'} 
                exact 
                render = { (props)=> 
                
                <ErrorBoundary {...props}>    
                    <AddPerson {...props} />
                </ErrorBoundary>
                
              }
              />

              <Route 
                path={'/home/profil'}  
                exact 
                render={(props)=>

                  <ErrorBoundary {...props}>    
                    <AddPerson {...props} />
                  </ErrorBoundary> 
                
               }/>
          
              <Route 
                path={'/home/personel_listesi/:desc/:id'}  
                exact  
                render={(props)=>
                
                  <ErrorBoundary {...props}>  
                    < Personel_options {...props} />
                  </ErrorBoundary>

                } 
                />

              <Route 
                path={'/home/profil/:desc'} 
                exact 
                render={(props)=>
                
                  <ErrorBoundary {...props}>  
                    < Profile {...props} />
                  </ErrorBoundary>

                } />

              <Route 
                path={'/home/rapor_ekle'} 
                exact 
                render={(props)=>
                
                  <ErrorBoundary {...props}>  
                    < AddReport {...props} />
                  </ErrorBoundary>


                }  />

              <Route 
                path={'/home/raporlar'} 
                exact 
                render={(props)=>
                
                  <ErrorBoundary {...props}>  
                    < MyReports {...props} />
                  </ErrorBoundary>

                }  />

              <Route 
                path={'/home/raporlar/:id'}  
                exact  
                render={(props)=>
                
                  <ErrorBoundary {...props}>  
                    < ReportDetail {...props} />
                  </ErrorBoundary>

                } />  



              <Route path='*' render ={(props)=><NotFoundPage path='home'/>} />  

               {
                 //the route above when we add two params to path , match.params will get two params too
               }

            </Switch>   

          </React.Fragment>
       )  
         
       }
  }


  export default Home;