import React from 'react';
import './register.css'
import {makeRequest,makeFileRequest,makeGetRequest} from '../../request/requset'
import RefferenceNumberForm  from '../../Components/RegisterStudent/refferenceNumber'
import RegisterForm from './registerForm'
import axios from 'axios';
import Circle  from '../../UI/Circle'

class Register extends React.Component {

  state = {

    isRefferenceNumberTrue : false,
    loading : false ,  
    errorMessage : false , 
    mainLoading : false , 
  
  }
   

  Submit = (e)=>{

    e.preventDefault();
    
    const inputValue = document.querySelector('.code').value ; 

    if ( !inputValue  ) {

       return this.setState( { errorMessage:'Lütfen Kodu Giriniz !' } );

    } else {

          if ( inputValue.length < 9 ) {

            return this.setState( { errorMessage:'Lütfen Kodu Tam Giriniz !' } );
      
          } else {
      
            this.setState( { errorMessage:'' , loading:true} );
      
          }

    }

    axios.post( '/api/checkRefferenceNumber', { referenceCode:inputValue } ).then((response)=>{

       const { isCorrect } = response.data ; 

       if(isCorrect) { 
         
        localStorage.setItem('code',inputValue); 
        this.setState( { isRefferenceNumberTrue : true , errorMessage:''  , loading:false, } ) ;   

      } else {

        this.setState( { isRefferenceNumberTrue : false , errorMessage:' Kodunuz Hatalı ! '  , loading:false, } ) ;  

      }



    })
    .catch((error)=>{

      console.log(error) ; 

    })

  }

  componentDidMount() {
  
    const code = localStorage.getItem('code'); 

    if(code) {

          this.setState({mainLoading:true});

          axios.post( '/api/checkRefferenceNumber', { referenceCode:code } ).then((response)=>{
      
            const { isCorrect } = response.data ; 
     
            if(!isCorrect) { 
            
              this.setState( { isRefferenceNumberTrue : false , errorMessage:''  , mainLoading:false, } ) ;   
      
            } else { 

              this.setState( { isRefferenceNumberTrue : true , errorMessage:''  , mainLoading:false, } ) ;   

            }
         
      
        })
        .catch((error)=>{
      
          console.log(error) ; 
      
        })
    }


  }

  render() {
    return this.state.mainLoading ? <Circle Load={true} position='static' marginTop={30}/>  :  ( this.state.isRefferenceNumberTrue  ? <RegisterForm/> : <RefferenceNumberForm submit = {this.Submit} loading = {this.state.loading} errorMessage={this.state.errorMessage} /> ) 
  }


}


export default Register;