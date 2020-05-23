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
  //ercan
  render()
  { 
   
    return (
     <BrowserRouter>  
     <h1>ercan</h1>
              <Route path='/' exact component={Login} />
              <Route path='/register' exact component={Register} />
              <Route path='/home'  component={Home} /> 
               <h1>hamit</h1>
     </BrowserRouter> 

          

     
    )
    
  }
}

export default App;
