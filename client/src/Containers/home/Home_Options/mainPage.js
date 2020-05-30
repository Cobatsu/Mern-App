import React,{useEffect,useState} from 'react';
import {makeStudentRequest} from '../../../request/requset';
import styled from 'styled-components';
import {UpdateLoggedin} from '../../isLoggedin/action'
import {Route,Redirect} from 'react-router-dom'
import Circle from '../../../UI/Circle'
import axios from 'axios';
import ReactDOM from 'react-dom';

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
width:60%;
display:flex;
justify-content:space-evenly;
padding:15px 0 ;
`

const Field = styled.div`
display:flex;
align-items:center;
flex-flow:column;
justify-content:center;
font-size:13px;
padding:10px;
color:#707070;
border-radius:3px;
box-shadow: 0 2px 6px -2px grey;
`

const Capsule = styled.div`
border-radius:4px;
background:#1eb2a6;
color:white;
padding:5px 7px;
opacity:0.76;
margin-left:7px;
font-size:13px;
`


const GeneralItem2 = styled.li`
min-height:80px;
margin-bottom:30px;
color:#707070;
display:flex;
flex-flow:column;
align-items:center;

`


const MainPage = (props)=>{
      
    const [ regionReportInfoState , setRegionReportInfo ]  = useState({});

    const [ loading , setLoading  ] = useState( true );

    const [totalDailyReportNumber , setTotalDailyReportNumber] = useState(null);
  
    useEffect(()=>{

        axios.get('/api/homeSearch',{ headers: {"Authorization": `Bearer ${localStorage.getItem("auth_token")}`}}).then((response)=>{

          const  { regionReportInfo } = response.data;

            let totalDailyReport = 0 ;
     
            Object.keys( regionReportInfo ).forEach( (key)=>{

                regionReportInfo[key].forEach( ( item , index )=>{ totalDailyReport += item.reportInfo.totalLength; })

            })

            ReactDOM.unstable_batchedUpdates(() => {

                  setLoading(false);
                  setTotalDailyReportNumber(totalDailyReport)
                  setRegionReportInfo( regionReportInfo );
  
            });

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
                    
                    { ( user.role === 'Admin' || user.role === 'Temsilci' ) && <MainPageWrapper style={{marginBottom:30}}>    

                        <TopTitle>
                          
                          {
                              user.role === 'Admin' ?  'Günlük Temsilci Görüşme Rakamları' : 'Günlük Bayi Görüşme Rakamları' 
                          }

                          <i style={{marginLeft:8}}  class="fas fa-file"></i>

                        </TopTitle>

                        {
                            loading  ?  <Circle position='static' Load={true}/> : 

                            <GeneralWrapper>

                               <GeneralItem2> 

                                            <span> Günlük Toplam Görüşme</span>

                                    <Field style={{padding:'4px 8px', fontSize:17 , marginTop:6}}>   
                                               {totalDailyReportNumber}
                                    </Field>
                                  
                                </GeneralItem2>  
                                
                            {
                                Object.keys( regionReportInfoState ).map(( key )=>{
                                  
                                return regionReportInfoState [ key ].map( ( region , index )=> < GeneralItem2 key={index}>
                                    
                                     <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                           <span style= { {marginRight:5 , color:'#707070'}} > { region.region } </span>
                                           <Capsule> <i style={{marginRight:5}} class="fas fa-user"></i> { region.fullName } </Capsule>        
                                     </div>
                                    
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

                        }

                    </MainPageWrapper>
                    
                    }

         </React.Fragment>
    }
   
    </UpdateLoggedin> 
}

export default MainPage;