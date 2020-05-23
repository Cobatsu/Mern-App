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
  render()
  { 
   
    return (
     <BrowserRouter>  
<<<<<<< HEAD
<<<<<<< HEAD
              <h1>:)</h1>
=======
                <h1>edited github</h1>
>>>>>>> 6ef46f2d8030639bd6022bd20a5d26c5679d92e9
=======
                <h1>edited github</h1>
>>>>>>> 6ef46f2d8030639bd6022bd20a5d26c5679d92e9
              <Route path='/' exact component={Login} />
              <Route path='/register' exact component={Register} />
              <Route path='/home'  component={Home} /> 
     </BrowserRouter> 
    )
    
  }
}

export default App;
