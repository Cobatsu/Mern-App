import React , {useState,useEffect} from 'react';
import styled from 'styled-components'
import {TextField , MenuItem} from '@material-ui/core'
import Circle from '../../UI/Circle'
import NumberFormat from 'react-number-format'
import {Regions} from '../../Regions/regions'
import axios from 'axios'



const ErrorCapsule = styled.div`

padding:30px;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
min-width:200px;
text-align:center;
background:#e00543;
color:white;

`

const GeneralWrapper  = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:100%;
height:100%;
`

const FormBox = styled.form`
min-width:350px;
min-height:500px;
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
font-size:18px;

`
const InputBox = styled.div`
flex:1;
width:80%;
display:flex;
padding:10px;
flex-flow:column;
align-items:center;
justify-content:space-evenly;
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
opacity:${({ disabled }) => disabled ? '0.5' : '1'};
min-height:40px;
min-width:150px;
font-size:12px;
align-self:flex-end;
border-radius:15px 0 15px 0  ; 
&:hover{
    cursor:pointer;
}
`




const initialState = {

    name:'',
    surname:'',
    e_mail:'',
    phoneNumber:'+90 (___) ___-____',
    region:'',

}


const RefferenceNumber= (props)=>{

    
    
    const [ contactForm , setContactForm ] = useState(initialState);
    const [ responseResult  , setResponseResult ] = useState('');
    const [ loading , setLoading ] = useState(false);
    

    const Submit = (e) => { 
     
        e.preventDefault();
       
        const finalState = {

            relatedPersonName:contactForm.name +' '+ contactForm.surname,
            relatedPersonPhoneNumber:contactForm.phoneNumber,
            relatedPersonEmail:contactForm.e_mail,
            region:contactForm.region,  

        }

        setLoading(true)

        axios.post( '/api/profile/contactReport/add' , finalState ).then((response)=>{

            const { result } = response.data ; 

            setResponseResult(result);
            setLoading(false)

        })
        .catch((error)=>{
            console.log(error);
            setResponseResult('Error');
            setLoading(false)

        })

    }

    let isPhoneNumberFilled = contactForm['phoneNumber'].split('')
    .slice(3)
    .filter((item) => parseInt(item) || item === '0' ).length < 10 ; 


    let result = Object.keys(contactForm).every((key) => {

      if( key === 'phoneNumber' && isPhoneNumberFilled ) {

        return false ; 

      } else {

        return contactForm[key] ; 

      }

    }) ; 


    const OnchangeHandler = type => event => {
         
        let value = event.target.value ; 

        setContactForm((prevState)=>({...prevState , [type]:value}));

    }


    if( responseResult  === 'Success' ) {

        return  <div style={{display:'flex' , justifyContent:'center',alignItems:'center' , width:'100%' , height:'100%'}}>
            
            <ErrorCapsule style={{background:'#42b883'}}> İletişim Formunuz Gönderilmiştir . En Kısa Sürede Size Dönüş Yapılacaktır  </ErrorCapsule>

        </div>

    } else if (responseResult === 'Error') {

        return <div style={{display:'flex' , justifyContent:'center',alignItems:'center' , width:'100%' , height:'100%'}}>
            
            <ErrorCapsule > 

               Hata Oluştu , Formunuz Gönderilmedi !  
                
            </ErrorCapsule>

        </div>

    }

    return <GeneralWrapper>

           <FormBox onSubmit = {Submit} >
                      
                      <Description>

                         İletişim Formu / Contact Form <i style={{marginLeft:15 , fontSize:16}} className="fas fa-phone"></i>

                      </Description>


                      <InputBox>

                           <TextField style={{width:'100%'}} onChange={OnchangeHandler('name')}  label='İsim / Name'  />
                      
                           <TextField style={{width:'100%'}} onChange={OnchangeHandler('surname')}  label='Soy İsim / Surname'  />

                           <TextField style={{width:'100%'}} onChange={OnchangeHandler('e_mail')}  label='E-posta Adresi / E-mail Address'  />

                           <NumberFormat style={{width:'100%'}}  onChange={OnchangeHandler('phoneNumber')}   customInput={TextField} format="+90 (###) ###-####" label='Telefon Numarası / Phone Number' allowEmptyFormatting mask="_"/>

                            <TextField style={{width:'100%'}} value={contactForm['region']}   onChange={OnchangeHandler('region')}  id="select" label="Şehir / City"   select>

                                {                 
                                    Regions.map((item)=> <MenuItem key={item['il']} value={item['il'].toString()}>{item['il']}</MenuItem>)
                                }

                            </TextField> 


                      </InputBox>



                      <SubmitButton disabled = { !result || loading} >
                            
                            {

                                loading ? <Circle Load width={25} height={25} />  : 
                                
                                <React.Fragment>

                                    GÖNDER / SUBMİT  <i style={{marginLeft:10}} className="fas fa-arrow-right"></i> 

                                </React.Fragment>

                            }
                          
                      </SubmitButton>

           </FormBox> 

    </GeneralWrapper>  ; 

}

export default RefferenceNumber;