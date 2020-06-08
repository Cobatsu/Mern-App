import React,{ useEffect , useState , useReducer } from 'react';
import {makeCurrentUserRequest, makeVerifyRequest}  from '../request/requset'

export const Context = React.createContext(null);
const { Provider , Consumer } = Context ; 

const CurrentUser = (props)=>{ 

    const [currentUser,setCurrentUser] = useState({});
    const [isLoggedin,setLoggedin] = useState(false);
    const [Loading,setLoading] = useState(true);

    return <Provider value={{user:currentUser,isLoggedin,Loading,setLoadingf:setLoading , setUser:setCurrentUser , isLoggedinf:setLoggedin }}>
              {props.children}         
    </Provider>   

}

export default CurrentUser;
