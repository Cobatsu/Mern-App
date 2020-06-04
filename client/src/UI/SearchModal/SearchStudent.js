import React,{useState,useContext,useEffect} from 'react';
import styled from 'styled-components';
import {Checkbox,TextField,Tab,Tabs,Paper,InputLabel,MenuItem,Selec} from '@material-ui/core'
import {makeStudentSearchRequest}  from '../../request/requset'
import {Context} from '../../Context/Context';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers'
import {useViewport} from '../../Containers/home/navs/customHooks/viewPortHook'

const SearchModalContainer = styled.form`
position:fixed;
display:flex;
justify-content:space-around;
align-items:center;
flex-flow:column;
max-width:600px;
min-height:400px;
margin:0 auto;
left:0;
right:0;
border-radius:6px;
padding:15px;
box-sizing:border-box;
top:auto;
z-index:7;
background:white;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
@media (max-width: 1030px) {
    max-width:300px;
    min-height:300px;
}
`
const CloseIcon = styled.div`
position:absolute;
right:13px;
top:5px;
font-size:18px;
color:#f57170;
&:hover{
    cursor:pointer;
}
`

const SearchFields = styled.div`
display:flex;
flex-flow:wrap;
padding:5px;
width:100%;
flex:1;
align-items:center;
justify-content:space-between;

@media (max-width: 1030px) {
    flex-flow:column;
    justify-content:center;
}
`

const SubmitButton = styled.button`
outline:none; 
background:#00bdaa;
border:none;
color:white;
border-radius:5px;
text-align:center;
padding:7px 13px ;
align-self:flex-end;
&:hover{
    cursor:pointer;
}
@media (max-width: 1030px) {
   margin-top:10px;
   align-self:center;
   width:90%;
}
`


export const  SearchStudentModal = React.memo(()=>{
  

    return <h1></h1> ; 

},[])