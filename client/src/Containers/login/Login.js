import React from 'react';
import styled from 'styled-components';
import {Link,Redirect}  from 'react-router-dom'
import {makeAuthenticationRequest,makeVerifyRequest}   from '../../request/requset'
import App from '../../App';
import {Context} from '../../Context/Context'

const Container = styled.div`
width:100%;
height:100%;
background:#f3f5f9;
display:flex;
flex-direction: column;
align-items: center;
justify-content:center;
`
const Fields  = styled.form`
max-width:350px;
margin:0 10px;
height:450px;
padding:0 20px;
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
background:#fff;
position:relative;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.03);


`
const Input = styled.input`
width:100%;
border-radius: 4px;
outline: none;
border:0px;
padding:10px 10px 10px 30px;
font-size:14px;
box-shadow:0 0 5px  rgb(112, 112, 112);
margin-top:10px;
`
const Inner_Fields = styled.div`
width:100%;
margin-top:10px;
padding: 5px;
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
` 


const Submit = styled.button`
background-color:#00bdaa;
color:white;
width:86%;
border-radius:3px;
text-align:center;
border:none;
margin-top:10px;
out-line:none;
padding:5px;
display:flex;
align-items: center;
justify-content: center;

&:hover{
    cursor:pointer;
    box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 3), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

&:focus{
    outline:none;
}
`
const InputWrapper = styled.div`
width:86%;
position:relative
`
const ImageWrapper = styled.div`
width:86%;
`

const SubButtons = styled.button`
padding:0;
width:83%;
margin-top:3px;
out-line:none;
border:none;
color:white;
border-radius:3px;
background-color:#1eb2a6;
font-weight:400;
&:hover{
    cursor:pointer;
    box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 3), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}
`
const PopUp =styled.div`
background-color:#F3565D;
display:flex;
align-items: center;
justify-content:center;
width:86%;
padding:5px; 
color:white;
border-radius: 4px;
font-size:13px;
position:relative;

`


class Login  extends React.Component {

    state={
        user:{ 
        name:'',
        password:'',    
        },
        warning:false,
        redirect:false,
        isLoggedin:false,
    } 
    
    redirectTo=(type)=>{
        this.setState({...type})
    }
    
    static contextType = Context;

    submitHandler=(e)=>{

            e.preventDefault();      

            const user = {name: this.state.user.name.trim(), password:this.state.user.password.trim()}; // we can prevenet fails by putting trim here
            
           if( this.state.user.name && this.state.user.password ) {

                makeAuthenticationRequest( 'post' ,user , this.redirectTo , this.context );

           } else {

               return this.setState({warning:true})

           }

    }
    

    changeHandlerFactory = (type) => {

        return (e)=>{

            this.setState({user:{...this.state.user,[type]:e.target.value},warning:false})

        }

    }

    render() {

        const { isLoggedin } = this.state ; 

        if( isLoggedin ) {

            return <Redirect to='/home'/>

        }  
          
        return ( <Container>     

                        <Fields onSubmit={this.submitHandler}>
                                
                            <ImageWrapper>
                                <img style={{width:'100%'}} alt="ercan" src='canada.png' ></img>
                            </ImageWrapper>
                            
                            <Inner_Fields>
                                {this.state.warning ? <PopUp>Hatalı Giriş !<i onClick={()=>this.setState({warning:false})}  style={{position:'absolute',right:5,color:'#a94442' , top:5}}  className="fas fa-times"></i></PopUp> : null}
                                <InputWrapper>
                                <i style={{display:'block',position:'absolute',left:8,top:'50%',color:'#ccc'}}  className="fas fa-user"/>
                                <Input onChange={this.changeHandlerFactory('name')}   placeholder='Kullanıcı Adı'/>
                                </InputWrapper> 
    
                                <InputWrapper>  
                                <i style={{display:'block',position:'absolute',left:8,top:'50%',color:'#ccc'}}  className="fas fa-lock"/>
                                <Input type='password' onChange={this.changeHandlerFactory('password')}  placeholder='Şifre'/>
                                </InputWrapper>
    
                                <Submit type='Submit'>Giriş<i style={{marginLeft:10 }} className="fas fa-sign-in-alt"></i></Submit>
    
                            </Inner_Fields>

                            
                            <SubButtons type='button'>
                                
                                <Link to='/register'style={{width:'100%',alignItems:'center',justifyContent:'center',height:'100%',textDecoration:'none',color:'white',padding:5,display:'flex'}}>

                                        Öğrenci İletişim Formu 
                                        
                                        <i style={{marginLeft:10 }} class="fas fa-file-alt"></i>
                                
                                </Link>
                               
                            </SubButtons> 
    
                        </Fields>
   
               </Container>
                  
        );
    }
}

 
export default Login ;






