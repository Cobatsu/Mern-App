import React,{useEffect,useState} from 'react';
import {UpdateLoggedin}  from '../../isLoggedin/action'
import {makeSpecificUserRequest}  from '../../../request/requset'
import styled from 'styled-components';
import Circle from '../../../UI/Circle';
import {IconPermission} from '../../../UI/Permissions/permissionIcon';

const InformationWrapper = styled.div`
display:flex;
background:white;
width:88%;
margin:0 auto;
align-items:center;
justify-content:center;
padding:0;
margin-top:2%;
padding:30px;
@media (max-width: 1030px) {
  padding:10px;
}
border-radius:3px;
flex-flow:column;
`
const InnerItems = styled.div`
display:flex;
justify-content:flex-end;
min-width:80%;
margin-bottom:20px;
paddin:10px;
`

//-----------------------------------
const InformationFields = styled.div`
width:80%;
text-align:center;
`

const UpdateInput = styled.input`

`

const FieldWrapper = styled.div`
width:100%;
display:flex;
flex-wrap:wrap;
justify-content:space-between;
`

const Title = styled.h1`
padding:10px  0px 30px 0px;
color:#a4c5c6;
`

const Field  =  styled.div`
width:48%;
display:flex;
justify-content:center;
align-items:center;
margin-bottom:20px;
`
const ValueSpan = styled.span`
text-align:left;
flex:1;
background-color:#eeeeee;
padding:3px  0 3px 10px ;

`
const DescriptionSpan = styled.span`
text-align:center;
flex:0.2;

`
//-----------------------------------



const GeneralInformations  = ({match,...rest})=>{
     
    const [loading , setLoading ]  = useState(true);
    const [student , setStudent ]  = useState({StudentInfo:{}});
    

    useEffect(()=>{
        const id = match.params.id;
        makeSpecificUserRequest('get',id,setLoading , setStudent)
    },[]);

   

    return  <UpdateLoggedin page='GENERAL_INFORMATİONS'  {...rest}>
      {
             (Loading,user)=>Loading ? null : loading 
             ?
             <Circle position='static' marginTop={30} Load={loading}/>
             :
              <InformationWrapper> 
                        <Circle top={11} left={50} Load={loading}/>
                        <React.Fragment>
                           <h1>ÖN KAYIT BİLGİLERİ</h1>
                           <InnerItems>{IconPermission({permissions:[4,1,2,3]})}</InnerItems> 
                          
                           <InformationFields>
                             
                                <Title>Öğrenci Bilgileri</Title>
                                <FieldWrapper>                                  
                                    
                                    <Field>
                                        <DescriptionSpan>İsim</DescriptionSpan>
                                        <ValueSpan>Ercan</ValueSpan>
                                    </Field>

                                      
                                    <Field>
                                        <DescriptionSpan>Soy İsim</DescriptionSpan>
                                        <ValueSpan>Özer</ValueSpan>
                                    </Field>

                                </FieldWrapper>

                           </InformationFields>
                        </React.Fragment>
              </InformationWrapper>
      }
         </UpdateLoggedin>   
    
}


export default GeneralInformations;