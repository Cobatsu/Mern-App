import React,{useState,useEffect,useContext} from 'react'
import {Context} from '../../Context/Context'
import {makeVerifyRequest} from '../../request/requset'
import {Redirect}  from 'react-router-dom'
import NotFound from '../../Components/NotFoundPage'

export class UpdateLoggedin extends React.Component {

    
    constructor(props) {

        super(props);
        this.state = { hasError: false };

    }

    static getDerivedStateFromError(error) {
                
        return { hasError: true };

    }


    static contextType =  Context ; 


    render() {

            if(this.state.hasError) { 

                return <NotFound />

            }

            const {page,children,history,isLoggedin,location,match} = this.props ; 
            
            const {user , isLoggedin:Loggedin , Loading } = this.context;   
 
            switch(page)   {

                case 'LOGİN':

                if(Loggedin && isLoggedin) {

                    history.push('/home');

                } else {

                    return children(this.context);

                }   
                
                break ; 

                case 'PERSONEL_LİST':
                case 'ADD_USER':      // this is how I control  whether user is allowed to go into  the page or not

                if(Loggedin || Loading) {  

                        if(!Loading) {

                            if(user.role === 'Bayi') {

                                return <NotFound />

                            }
                            else {

                                return children( Loading , user );

                            }

                        }
                    
                    }    
                    else
                    {
                        history.push('/');
                    }

                break;

                case  'PERSONEL_GENERAL_INFO' :  

                if(Loggedin || Loading)
                {  

                    if(!Loading)
                    {

                        if(user.role !== 'Admin' && ( match.params.id === user._id || match.params.desc === 'yetkiler' )) { 

                            return <NotFound />

                        }    
                        else {

                            return children( Loading , user );

                        }

                    }
                
                }    
                else
                {
                    history.push('/');
                }

                break;
                    
                default:
                    
                

                break;   
            }

    if(Loggedin || Loading)
    {
        return children(Loading,user);
    }
    else
    {
        history.push('/');
    }


    return null;

    }
}

export default React.memo(UpdateLoggedin);