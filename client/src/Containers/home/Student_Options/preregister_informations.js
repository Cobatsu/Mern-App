import React,{useEffect,useState} from 'react';
import {UpdateLoggedin}  from '../../isLoggedin/action'
import {makeSpecificStudentRequest}  from '../../../request/requset'
import styled from 'styled-components';
import Circle from '../../../UI/Circle';
import RegisterForm from '../../registration/registerForm'


const StudentInformations  = ( { match , ...rest } )=>{
     
    const [loading , setLoading ]  = useState(true);
    const [student , setStudent ]  = useState({});
    
    useEffect(()=>{

        const { id }= match.params;

        makeSpecificStudentRequest('get' , id , setLoading , setStudent ) ;

    },[]);

   

    return  loading 

             ?

             <Circle position='static' marginTop={30} Load={loading}/>

             :
             
             <RegisterForm student = {student} {...rest} />

}


export default StudentInformations;