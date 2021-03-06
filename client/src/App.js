import React,{useContext,useEffect,useState,useRef} from 'react';
import {BrowserRouter,Route,Switch,Redirect,Link} from 'react-router-dom'
import Register from './Components/RegisterStudent/refferenceNumber'
import Student_Form from './Containers/registration/registerForm'
import Login from './Containers/login/Login'
import UploadDocument from './Containers/uploadDocument/uploadDoc'
import Home  from './Containers/home/home'
import NotFoundPage from './Components/NotFoundPage';
import './Containers/registration/register.css'

class  App extends React.Component{

  render() { 

    return ( <BrowserRouter> 
            
           <Switch>
               
              <Route path='/' exact component = {Login} />
              <Route path='/register' exact component={Register} /> 
              <Route path='/student_form' exact component={Student_Form} /> 
              <Route path='/upload' exact component={UploadDocument} />
              <Route path='/home'  component = {Home} /> 
              <Route path='*'  render = {()=> <NotFoundPage path=''/>} />

           </Switch> 

     </BrowserRouter> 

    )
    
  }
}




export default App;
