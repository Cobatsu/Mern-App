import React,{useContext,useState,useEffect,useRef,createRef,useMemo,useCallback} from 'react';
import styled from 'styled-components';
import {Context} from '../../../Context/Context'
import {makeLogoutRequest} from '../../../request/requset'
import {Link , useRouteMatch} from 'react-router-dom'
import {useViewport} from './customHooks/viewPortHook'; 
import {Admin,Bayi,Temsilci} from './roleBars/roleBars'
import NotResponsive  from './navBars/NotResponsiveNav';
import Responsive  from './navBars/ResponsiveNav';


export const Nav = ()=>{
    
    const  { Loading , user , isLoggedinf , setLoadingf }  =  useContext(Context);
    const match = useRouteMatch();
    const  { width } = useViewport();
    const breakPoint = 1030 ;

    if(width > breakPoint)
    {document.body.style.overflowY='scroll'; }
       

    const subMenu = useMemo(()=>{ //we perevent for function to  recalculate what type of menu we have to have

            switch(user.role)
            {
                case 'Admin' :  
                return Admin();
                break;

                case 'Bayi' : 
                return Bayi();
                break; 

                case 'Temsilci':
                return Temsilci();
                break;

                default:
                return []
                break;
            }

    },[user])
       
    const logoutHandler = ()=>{
        
        const token = localStorage.getItem('auth_token');
        const tokenObj = {token};
        if(token)
        {
            makeLogoutRequest('post',tokenObj,isLoggedinf,setLoadingf);
        }
        else
        {
            isLoggedinf(false);
            setLoadingf(false);
        }

    }



    return  Loading ? null :

            width < breakPoint ?

            <Responsive 
              match={match}
              user={user} 
              logOutHandler={logoutHandler}
              subMenu={subMenu}/> 
              

            : 
            
            <NotResponsive   
            logoutHandler={logoutHandler} 
            user={user} 
            subMenu={subMenu}
            match={match} />

};

