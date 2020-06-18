import React,{useEffect,useState} from 'react';
import {makeStudentRequest} from '../../../request/requset';
import styled from 'styled-components';
import {UpdateLoggedin} from '../../isLoggedin/action'
import {Route,Redirect} from 'react-router-dom'
import Circle from '../../../UI/Circle'
import axios from 'axios';
import ReactDOM from 'react-dom';
import {restrictWord} from '../../../Utilities/utilities'

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
color:#1b6ca8;

`

const GeneralWrapper = styled.ul `
padding:0;
margin:0;
list-style:none;

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

@media (max-width: 1030px) {
    width:100%;
}
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
margin-right:10px;
`

const Capsule = styled.div`
border-radius:4px;
background:#1b6ca8;
color:white;
padding:5px 7px;
opacity:0.76;
margin-left:6.5px;
text-transform:capitalize;
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

            let sumDailyReports = 0 ;
     
            Object.values( regionReportInfo ).forEach( ( item ) => {  
              
                sumDailyReports += item.reduce ( ( prevValue , currentItem ) => { return currentItem.reportInfo.totalLength + prevValue },0)

            })

            ReactDOM.unstable_batchedUpdates(() => {

                  setLoading(false);
                  setTotalDailyReportNumber(sumDailyReports)
                  setRegionReportInfo( regionReportInfo );
  
            });

        })
        .catch((err)=>{

           console.log(err);

        })
        
    },[]);

    
    return  <UpdateLoggedin page='MAİN_PAGE' {...props}>
    {
        ( Loading , user )=> Loading ? null : 
        
           <React.Fragment>

                    
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

                                    <Field style={{padding:'2px 4px',minWidth:30 , minHeight:30, fontSize:16 , marginTop:6  , color:'#f5803e' , fontWeight:'400'}}>   
                                               {totalDailyReportNumber}
                                    </Field>
                                  
                                </GeneralItem2>  

                                
                            {
                                Object.values( regionReportInfoState ).map(( item ) => {
                                  
                                 return item.map ( ( region , index ) => region.reportInfo.totalLength > 0   &&  < GeneralItem2 key={index}>
                                    
                                     <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>

                                           <span style= { {marginRight:3 , fontSize:14.5 , color:'#707070'}} > { region.region } </span>
                                           <Capsule> <i style={{marginRight:5}} class="fas fa-user"></i> { restrictWord( region.fullName.split(' ')[0] , 10 )  } </Capsule> 

                                     </div>
                                    
                                     <InfoFields> 
                                          
                                          <Field>

                                               <span> Öğrenci Görüşme Sayısı </span>

                                               <span style={{color:'#f5803e' , fontWeight:'400'}}>  { region.reportInfo.studentLength } </span>

                                          </Field>

                                          <Field>

                                               <span> Okul Görüşme Sayısı</span>

                                               <span style={{color:'#f5803e' , fontWeight:'400'}}> { region.reportInfo.schoolLength } </span>


                                          </Field>

                                          <Field>

                                               <span> Toplam Görüşme Sayısı </span>

                                               <span style={{color:'#f5803e' , fontWeight:'400'}}> { region.reportInfo.totalLength } </span>

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