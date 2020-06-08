import React,{ useEffect , useState , useReducer } from 'react';
import {makeCurrentUserRequest, makeVerifyRequest}  from '../request/requset'
import { reportListDataReducer , personListDataReducer  } from './Reducers/reducers'

export const Context = React.createContext(null);
const { Provider , Consumer } = Context ; 

const initialState = {};

const CurrentUser = (props)=>{ 

    const [currentUser,setCurrentUser] = useState({});
    const [isLoggedin,setLoggedin] = useState(false);
    const [Loading,setLoading] = useState(true);

    const [ state , dispatch ] = useReducer( reportListDataReducer , initialState ) ;

    return <Provider value={{user:currentUser,isLoggedin,Loading,setLoadingf:setLoading , setUser:setCurrentUser , isLoggedinf:setLoggedin , state , dispatch}}>
              {props.children}         
    </Provider>   

}

export default CurrentUser;
