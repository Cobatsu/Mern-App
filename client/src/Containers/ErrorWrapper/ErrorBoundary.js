import React,{useState,useEffect,useContext} from 'react'
import {Context} from '../../Context/Context'
import {makeVerifyRequest} from '../../request/requset'
import {Redirect}  from 'react-router-dom'
import styled from 'styled-components';

const ErrorCapsule = styled.div`
padding:30px;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
min-width:200px;
text-align:center;
background:#e00543;
color:white;
`


class ErrorBoundary extends React.Component {

    
    static contextType = Context ; 

    constructor(props) {

        super(props);
        this.state = { hasError: false , errorMessage:'' };

    }

    static getDerivedStateFromError(error) {
                
        return { hasError: true , errorMessage:error.message };

    }

    componentDidUpdate( prevProps ) {
          
         const { location:PrevPath = {} } = prevProps; 

         const { location:CurrentPath = {} } = this.props;
    
  
         if( PrevPath.pathname !== CurrentPath.pathname )  {

              this.setState({ hasError: false , errorMessage:'' })

         }
         
    }

    render() {

            const { isLoggedin , Loading } = this.context ;

            const { hasError } = this.state ; 
            
            if( hasError ) { 

                return  <div style={{display:'flex' , justifyContent:'center',alignItems:'center' , width:'100%' , height:'100%'}}>
            
                        <ErrorCapsule> 

                               Beklenmeyen Bir Hata Oluştu , Sayfa Görüntülenemiyor                
     
                        </ErrorCapsule>
            
               </div>

            } else {

                    if (  Loading  ) {

                        return null
                        
                    } else {

                        if( isLoggedin ) {

                            return this.props.children ;

                        } else {
                            
                            return <Redirect to='/'/>

                        }

                    }

            }
    }

}

export default ErrorBoundary;