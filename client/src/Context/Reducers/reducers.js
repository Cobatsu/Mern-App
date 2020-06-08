

export const reportListDataReducer = ( state , action )=>{

    const { type , payload , listType } = action ; 

    switch(type) {

        case 'SET_SELECTED_PAGE' :
             
            return { ...state , [ listType + 'PageNumber'] : payload }
               
        break ; 

        case 'SET_SEARCH_DATA' :

            return { ...state , [ listType + 'SearchData' ]: payload };

        break  ; 

        case 'SET_CURRENT_DATA_LENGTH':

            return { ...state , [ listType + 'DataLength' ]  : payload }

        break ;

        case  'RESET' : 

            return {}

        break ; 

        default :

         return state ; 

         break;
    }
};


export const personListDataReducer = ( state , action )=>{

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