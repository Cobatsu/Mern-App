import React,{useEffect,useState} from 'react';
import {makeStudentRequest} from '../../../request/requset';
import styled from 'styled-components';
import {UpdateLoggedin} from '../../isLoggedin/action'
import {Route,Redirect} from 'react-router-dom'
import Circle from '../../../UI/Circle'

const MainPageWrapper = styled.div`
display:flex;
background:white;
width:60%;
margin:0 auto;
align-items:center;
flex-flow:column;
padding:3px;
margin-top:2%;
padding:25px;
border-radius:3px;
box-sizing:border-box;

@media (max-width: 1030px) {
    width:90%;
}

`
const TopTitle = styled.div`
width:100%;
padding-bottom:20px;
color:#5b9bd1;
`
const InnerTitle = styled.span`
color:#B8C3C7;
`

const InnerFields  = styled.div`
display:flex;
width:100%;
justify-content:space-evenly;
`


const InnerElement = styled.div`
text-align:center;
display:flex;
flex-flow:column;
align-items:center;
flex:1;
border-right:1px solid #B8C3C7;

`

const MainPage = (props)=>{
      

     
    return  <UpdateLoggedin page='MAİN_PAGE' {...props}>
        {
            (Loading)=> Loading ? null : 
            <MainPageWrapper>
                    <TopTitle>
                    Kayıt Raporu
                    </TopTitle>
            <InnerFields>
    
                 <InnerElement>
                        <InnerTitle>Toplam Kayıt</InnerTitle>
                        <span style={{color:'#7D8C9D'}}>657</span>
                        <InnerTitle>Başvuru Sayısı</InnerTitle>
                        <span style={{color:'#7D8C9D'}}>800</span>
                 </InnerElement>
    
                 <InnerElement>
                 <InnerTitle>Günlük Ciro</InnerTitle>
                 <span style={{color:'#7D8C9D'}}>657</span>
                 </InnerElement>
    
                 <InnerElement>
                 <InnerTitle>Toplam Kayıt</InnerTitle>
                 <span style={{color:'#7D8C9D'}}>657</span>
                 </InnerElement>
    
                 <InnerElement style={{border:'none'}}>
                 <InnerTitle>Bugün Kayıt</InnerTitle>
                 <span style={{color:'#7D8C9D'}}>657</span>
                 </InnerElement>
    
            </InnerFields>
        </MainPageWrapper>
    }
   
    </UpdateLoggedin> 
}

export default MainPage;