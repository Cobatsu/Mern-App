import React,{useContext,useEffect,useState} from 'react';
import {BrowserRouter,Route,Switch,Redirect,Link} from 'react-router-dom'
import Register from './Containers/registration/pre-registration'
import Login from './Containers/login/Login'
import {makeVerifyRequest} from './request/requset'
import Home  from './Containers/home/home'
import NotFoundPage from './Components/NotFoundPage';
import {Context} from './Context/Context'
import {UpdateLoggedin} from './Containers/isLoggedin/action'
import Circle from './UI/Circle';

class  App extends React.Component{

  render()
  { 

    
   
    return ( <BrowserRouter> 
           
           <Switch>

              <Route path='/' exact component = {Login} />

              {/* <Route path='/register' exact component={Register} /> */}
              <Route path='/home'  component = {Home} /> 

              <Route path='*'  render = {()=><NotFoundPage path=''/>} />

           </Switch> 
     </BrowserRouter> 

    )
    
  }
}

export default App;
