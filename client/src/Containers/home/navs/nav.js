import React,{useContext,useState,useEffect,useRef,createRef,useMemo,useCallback} from 'react';
import styled from 'styled-components';
import {Context} from '../../../Context/Context'
import {makeLogoutRequest,makeStudentRequest} from '../../../request/requset'
import {Link} from 'react-router-dom'
import UpdateLoggedin from '../../isLoggedin/action'
import {useViewport} from './customHooks/viewPortHook'; 
import {Admin,Bayi,Temsilci} from './roleBars/roleBars'
import NotResponsive  from './navBars/NotResponsiveNav';
import Responsive  from './navBars/ResponsiveNav';

const NavWrapper = styled.div`
display:flex;
background:white;
width:100%;
justify-content:space-between;
box-shadow: 0 10px 6px -6px #dcd6f7;
min-height:45px;
`

const statePermission = [
  'Kayıt_Görüşmeleri',
  'Personel_Maaşları',
  'Öğrenci_Bilgileri',
  'Kayıt_Bilgileri',
]

export const Nav = ({isLoggedinf,setLoadingf,user,location,match,...rest})=>{
    
    const {Loading}  =  useContext(Context);
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

