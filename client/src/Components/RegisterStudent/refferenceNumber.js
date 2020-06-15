import React , {useState} from 'react';
import styled from 'styled-components'
import {TextField} from '@material-ui/core'
import Circle from '../../UI/Circle'

const GeneralWrapper  = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:100%;
height:100%;
`

const FormBox = styled.form`
min-width:320px;
min-height:230px;
border-radius:15px;
display:flex;
flex-flow:column;
align-items:center;
background:white;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.03);

`

const Description = styled.div`

border-radius:15px 15px 0 0 ;
background:#00909e;
min-height:60px;
width:100%;
display:flex;
align-items:center;
justify-content:center;
color:white;
font-size:15px;

`
const InputBox = styled.div`
flex:1;
display:flex;
padding:10px;
align-items:center;
justify-content:center;
`

const SubmitButton = styled.button`

display:flex;
justify-content:center;
align-items:center;
position:relative;
border-radius:6px ;
outline:none;
border:none;
color:white;
background:#00909e;
min-height:40px;
min-width:150px;
font-size:14px;
align-self:flex-end;
border-radius:15px 0 15px 0  ; 
&:hover{
    cursor:pointer;
}

`


const RefferenceNumber= ( { loading , submit , errorMessage  } )=>{

    return <GeneralWrapper>

           <FormBox onSubmit = {submit} >
                      
                      <Description>

                          Lütfen  Referans Kodunuzu Giriniz  

                      </Description>


                      <InputBox>

                           <TextField  maxLength ='9'  inputProps={{ className:'code' , maxLength:'9'}} error = { errorMessage } placeholder='#########' />
                      
                      </InputBox>

                      {
                            errorMessage &&  <h1 style = {{fontSize:14 , padding:0 , margin:0 }}> { errorMessage } </h1> 
                      }


                      <SubmitButton >
                            
                            {

                                loading ? <Circle Load width={25} height={25} />  : 
                                
                                <React.Fragment>

                                    DEVAM ET  <i style={{marginLeft:10}} className="fas fa-arrow-right"></i> 

                                </React.Fragment>

                            }
                          
                      </SubmitButton>

           </FormBox> 

    </GeneralWrapper>  ; 

}

export default RefferenceNumber;