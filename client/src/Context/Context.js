import React,{useEffect,useState} from 'react';
import {makeCurrentUserRequest, makeVerifyRequest}  from '../request/requset'

export const Context = React.createContext(null);

const CurrentUser = (props)=>{ 

    const [currentUser,setCurrentUser] = useState({});
    const [isLoggedin,setLoggedin] = useState(false);
    const [Loading,setLoading] = useState(true);

    return <Context.Provider value={{user:currentUser,isLoggedin,Loading,setLoadingf:setLoading,setUser:setCurrentUser,isLoggedinf:setLoggedin}}>
              {props.children}         
    </Context.Provider>   
}

export default CurrentUser;
