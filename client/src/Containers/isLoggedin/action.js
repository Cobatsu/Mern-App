import React,{useState,useEffect,useContext} from 'react'
import {Context} from '../../Context/Context'
import {makeVerifyRequest} from '../../request/requset'
import {Redirect}  from 'react-router-dom'

export const UpdateLoggedin = ({page,children,history,isLoggedin,location,match})=>{

    const {user,isLoggedin:Loggedin,Loading,isLoggedinf,setUser,setLoadingf} = useContext(Context)   
    const context = useContext(Context);
    const token = localStorage.getItem('auth_token');
    

    useEffect(()=>{
        
        if(token)
        {
            makeVerifyRequest('get',setUser,isLoggedinf,setLoadingf);
        }
        else
        {
            isLoggedinf(false);
            setLoadingf(false);
        }

    },[history.location.pathname])
    
    switch(page)  
    {
        case 'LOGİN':

        if(Loggedin && isLoggedin)
        {
            history.push('/home');
        }
        else
        {
            return children(context);
        }   
        
        break ; 

        case 'ADD_USER':      // this is how I control  whether user is allowed to go into  the page or not

        if(user.role === 'Bayi')
        {
            history.push('/home');
        }
        else
        {
           if(Loggedin || Loading)
             return children(Loading,user);
           else
             history.push('/');
        }

        break;

        default:
            
            if(Loggedin || Loading)
            {
                return children(Loading,user);
            }
            else
            {
                history.push('/');
            }

        break;   
    }
    return null;
}

export default React.memo(UpdateLoggedin);