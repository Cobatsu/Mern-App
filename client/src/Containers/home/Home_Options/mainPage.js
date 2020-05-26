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
flex-flow:column;
padding:3px;
margin-top:1%;
padding:25px;
border-radius:3px;
box-sizing:border-box;

box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.03);

@media (max-width: 1030px) {
    width:90%;
}

`
const TopTitle = styled.div`
padding-bottom:20px;
color:#1eb2a6;
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
const AnnouncementsWrapper = styled.ul `
padding:0;
margin:0;

`

const Announcement = styled.li`
min-height:25px;
margin-top:5px;
`


const MainPage = (props)=>{
      

    return  <UpdateLoggedin page='MAİN_PAGE' {...props}>
    {
            ( Loading , user )=> Loading ? null : 
        
        <React.Fragment>

                    <MainPageWrapper>

                        <TopTitle>
                                Duyurular  <i style={{marginLeft:4}} class="fas fa-exclamation-triangle"></i>
                        </TopTitle>


                    <AnnouncementsWrapper>
                            
                            <Announcement>
                                <i class="fas fa-circle" style={{ marginRight:10 , fontSize:8 , color:'#1eb2a6'}}></i>
                                Şimdilik , uygulamamızda sadece rapor bilgilendirme sistemi bulunmaktadır . Yeni güncellemeler için çalışmalara devam etmekteyiz . 

                            </Announcement>
                            
                            {
                                user.role === 'Admin' && <Announcement> 
                                    
                                    <i class="fas fa-circle" style={{ marginRight:10 , fontSize:8 , color:'#1eb2a6'}}></i>  
                                    Yetkilendirme özellikleri şimdilik kısıtlıdır . 
                                
                                </Announcement> 
                            }

                                <Announcement>

                                <i class="fas fa-circle" style={{ marginRight:10 , fontSize:8 , color:'#1eb2a6'}}></i>

                                Uygulamamızda olası bir hata ile karşılaşırsanız , lütfen  şikayetlerinizi ve isteklerinizi bu e-posta adresine
                                iletiniz : bexfg@hotmail.com. 

                                </Announcement>
                            
            
                    </AnnouncementsWrapper>
                                
                        </MainPageWrapper>


                        <MainPageWrapper>

                        </MainPageWrapper>

        </React.Fragment>
    }
   
    </UpdateLoggedin> 
}

export default MainPage;