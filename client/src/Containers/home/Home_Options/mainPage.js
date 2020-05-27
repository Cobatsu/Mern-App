import React,{useEffect,useState} from 'react';
import {makeStudentRequest} from '../../../request/requset';
import styled from 'styled-components';
import {UpdateLoggedin} from '../../isLoggedin/action'
import {Route,Redirect} from 'react-router-dom'
import Circle from '../../../UI/Circle'
import axios from 'axios';


const MainPageWrapper = styled.div`
display:flex;
background:white;
width:70%;
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
    margin-top:3%;
}

`
const TopTitle = styled.div`
padding-bottom:20px;
color:#1eb2a6;

`

const GeneralWrapper = styled.ul `
padding:0;
margin:0;

`

const GeneralItem1 = styled.li`
min-height:25px;
margin-top:5px;
color:#707070;
`

const InfoFields = styled.div`
width:80%;
display:flex;
justify-content:space-evenly;
padding:30px 0 ;
`

const Field = styled.div`
display:flex;
align-items:center;
flex-flow:column;
justify-content:center;
font-size:13px;
padding:10px;
color:#707070;
border-radius:7px;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.03);

`

const GeneralItem2 = styled.li`
min-height:80px;
margin-top:5px;
display:flex;
flex-flow:column;
align-items:center;

`


const MainPage = (props)=>{
      
    const [ regionReportInfo , setRegionReportInfo ]  = useState( { } );
    const [ loading , setLoading  ] = useState( false );
  
    useEffect(()=>{

        
        axios.get('/api/homeSearch').then((response)=>{

         setRegionReportInfo(response.data.regionReportInfo);
         setLoading(true)

        })
        .catch((err)=>{

         console.log(err);

        })
        
    },[])

    return  <UpdateLoggedin page='MAİN_PAGE' {...props}>
    {
            ( Loading , user )=> Loading ? null : 
        
        <React.Fragment>

                    <MainPageWrapper>

                        <TopTitle>
                                Duyurular  <i style={{marginLeft:4}} class="fas fa-exclamation-triangle"></i>
                        </TopTitle>


                                <GeneralWrapper>
                                        
                                        <GeneralItem1>

                                            <i class="fas fa-circle" style={{ marginRight:10 , fontSize:6 , color:'#707070'}}></i>
                                            Şimdilik , uygulamamızda sadece " Rapor Bilgilendirme " sistemi bulunmaktadır . Yeni güncellemeler için çalışmalarımız devam etmektedir . 

                                        </GeneralItem1>
                                            
                                            {
                                                user.role === 'Admin' && <GeneralItem1> 
                                                    
                                                    <i class="fas fa-circle" style={{ marginRight:10 , fontSize:6 , color:'#707070'}}></i>  
                                                    Yetkilendirme sistemimiz şimdilik  kısıtlı bölgelere etki etmektedir . 
                                                
                                                </GeneralItem1> 
                                            }

                                            <GeneralItem1>

                                            <i class="fas fa-circle" style={{ marginRight:10 , fontSize:6 , color:'#707070'}}></i>

                                                Lütfen Uygulamamızla ilgili şikayetlerinizi veya isteklerinizi bu e-posta adresine
                                                iletiniz : bexfg@hotmail.com. 

                                            </GeneralItem1>
                                        
                        
                                </GeneralWrapper>

                    </MainPageWrapper>
                    
                    {user.role === 'Admin' && <MainPageWrapper style={{marginBottom:30}}>    

                        <TopTitle>
                                Günlük Görüşme Sayıları <i style={{marginLeft:4}}  class="fas fa-file"></i>
                        </TopTitle>

                        {
                            loading  ? <GeneralWrapper>
                                
                            {
                                Object.keys( regionReportInfo ).map(( key )=>{
                                  
                                  return regionReportInfo [ key ].map( ( region , index )=> <GeneralItem2 key={index}>

                                     <span style={{color:'#7ebdb4'}}> { region.region + ` : ${region.fullName} ` }  </span>

                                     <InfoFields> 
                                          
                                          <Field>
                                               <span> Öğrenci Görüşme Sayısı </span>
                                                { region.reportInfo.studentLength  }
                                          </Field>

                                          <Field>
                                               <span> Okul Görüşme Sayısı</span>
                                                { region.reportInfo.schoolLength  }
                                          </Field>

                                          <Field>
                                               <span> Toplam Görüşme Sayısı </span>
                                                { region.reportInfo.totalLength  }
                                          </Field>


                                     </InfoFields>

                                        
                                  </GeneralItem2>
                                )
  
                              })
                            }
                          
  
                          </GeneralWrapper>  
                          
                          : 
                          
                          <Circle position='static' Load={true}/>

                        }

                    </MainPageWrapper>
                    
                    }
        </React.Fragment>
    }
   
    </UpdateLoggedin> 
}

export default MainPage;