import React,{useContext,useEffect,useState} from 'react';
import {BrowserRouter,Route,Switch,Redirect,Link} from 'react-router-dom'
import Register from './Containers/registration/pre-registration'
import Login from './Containers/login/Login'
import {makeVerifyRequest} from './request/requset'
import Home  from './Containers/home/home'
import {Context} from './Context/Context'
import {UpdateLoggedin} from './Containers/isLoggedin/action'
import Circle from './UI/Circle';

class  App extends React.Component{
//asdasd
//asdasd
  render()
  { 
   
    return (
     <BrowserRouter> 
   
              <Route path='/' exact component={Login} />
              <Route path='/register' exact component={Register} />
              <Route path='/home'  component={Home} /> 
<<<<<<< HEAD
               
              
=======
               <h1>vcc kocani</h1>
               <h1>yeter be</h1>
>>>>>>> a3709573ff1252b2486f9d7c40bc492b57c88541
        
     </BrowserRouter> 

    )
    
  }
}

export default App;
