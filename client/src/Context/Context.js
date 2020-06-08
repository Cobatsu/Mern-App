import React,{ useEffect , useState , useReducer } from 'react';
import {makeCurrentUserRequest, makeVerifyRequest}  from '../request/requset'

export const Context = React.createContext(null);
const { Provider , Consumer } = Context ; 

const initialState = {};

const reducer = ( state , action )=>{

    const { type , payload } = action ; 

    switch(type) {

        case 'SET_SELECTED_PAGE' :
            
            return { ...state , pageNumber : payload }
               
        break ; 


        case 'SET_SEARCH_DATA' :

            return { ...state , searchData: payload };

        break  ; 


        case 'SET_CURRENT_DATA_LENGTH':

            return { ...state , dataLength : payload }

        break ;

        case  'RESET' : 

            return {}

        break ; 

        default :

         return state ; 

         break;

    }

};


const CurrentUser = (props)=>{ 

    const [currentUser,setCurrentUser] = useState({});
    const [isLoggedin,setLoggedin] = useState(false);
    const [Loading,setLoading] = useState(true);

    const [ state , dispatch ] = useReducer( reducer , initialState ) ;

    return <Provider value={{user:currentUser,isLoggedin,Loading,setLoadingf:setLoading , setUser:setCurrentUser , isLoggedinf:setLoggedin , state , dispatch}}>
              {props.children}         
    </Provider>   

}

export default CurrentUser;
