import React, { useEffect, useState, createRef, useRef, useContext } from 'react';
import { makeReportsRequest, makeReportSearchRequest } from '../../../request/requset';
import { Context } from '../../../Context/Context'
import styled from 'styled-components';
import { UpdateLoggedin } from '../../isLoggedin/action'
import { Route, Link } from 'react-router-dom'
import Circle from '../../../UI/Circle'
import BackStage from '../../../UI/backStage'
import { hasPermission, PermissionsNumbers, IconPermission } from '../../../UI/Permissions/permissionIcon'
import { SearchReportModal } from '../../../UI/SearchModal/SearchReport';
import GeneralList from '../../../Components/GeneralList'

const ListWrapper = styled.div`
display:flex;
flex-flow:column;
align-items:center;
background:white;
width:80%;
margin:0 auto;
padding:0 0 20px 0;
margin-top:2%;
margin-bottom:30px;
border-radius:3px;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
position:relative;
@media (max-width: 1000px) {
   width:100%;
   height:100%;
   padding:0 0 30px 0;
   overflow-x: scroll;
}
`

const Capsule = styled.div`
display:flex;
align-items:center;
justify-content:center;
border-radius:4px;
background:#fc8210;
color:white;
font-size:12.5px;
padding:6px;
`


//------------------
const HiddenWrapper = styled.div`
width:100%;
@media (max-width: 900px) {  
  min-width:900px;
  max-width:900px;
  position:absolute;
  left:0;
}
flex-direction:column;
align-items:center;
position:relative;
display:flex;
justify-content:center;

`
const StudentList = styled.ul`
overflow:hidden;
padding:0;
min-width:${({width})=> width ? width+'px' : '900px'};
max-width:${({width})=> width ? width+'px' : '900px'};
margin:0;
-webkit-box-shadow: 0 10px 6px -6px #758184;
-moz-box-shadow: 0 10px 6px -6px #758184;
 box-shadow: 0 10px 6px -6px #758184;
`

const StudentListItem = styled.li`
width:200%;
display:flex;
transition:280ms;
`

const SwitchButton = styled.div`
   &:hover{
     cursor:pointer;
   }
   border-radius:50%;
   color:white;
   position:absolute;
   text-align:center;
   box-sizing:border-box;
`

const StudentListItemInnerWrapper = styled.div`
display:flex;
justify-content:space-evenly;
width:50%;
`

const StudentListIconWrapper = styled.div`
&:hover{
  cursor:pointer;
  background:#ff6363;
}

display:flex;
align-items:center;
justify-content:center;
font-size:8px;
flex:0.2;
`

//-------------------------

const InnerTopSpan = styled.span`
display:flex;
text-align:center;
align-items:center;
justify-content:center;
flex:1.5;
background:#61c0bf;
color:white;
padding:10px;
font-size:14px;
box-sizing:border-box;
`
const InnerSpan = styled.span`
display:flex;
text-align:center;
align-items:center;
justify-content:center;
padding:10px;
position:relative;
flex:1.5;
font-size:14px;
box-sizing:border-box;
`

const IconInnerSpan = styled.span`
display:flex;
text-align:center;
align-items:center;
justify-content:center;
padding:10px;
position:relative;
flex:1.5;
transition:100ms;
background:#00909e;
min-width:28.41px;
max-width:28.41px;
&:hover{
  cursor:pointer;
  font-size:20px;
}

box-sizing:border-box;
`

//----------------------------

const SearchBox = styled.div`
padding:20px;
color:#61c0bf;
letter-spacing:1;
width:100%;
display:flex;
flex-direction:column;
align-items:center
`
const InnerSearch = styled.div`
align-self:flex-end;
font-size:13px;
background:#f57170;
color:white;
padding:8px;
border-radius:6px;
&:hover{
  cursor:pointer;
}
`
//---------------------------------

const SubPagesContainer = styled.div`
display:flex;
justify-content:center;
width:100%;
margin-top:20px;
align-items:center;
padding:10px 0;
`

const SubPageItem = styled.div`

margin-right:8px;
border-radius:2px;
display:flex;
width:5px;
height:5px;
padding:11px;
color:${({selected}) => selected ? 'white' : 'grey'};
align-items:center;
justify-content:center;
box-shadow:0 0px 4px  black;
background:${({selected}) => selected ? '#f57170' : 'white'};
&:hover{
cursor:pointer;
}

`

//-----------------------------


const TopRows = [
  'Görüşülen Kişi',
  'Telefon Numarası',
  'Görüşme Tipi',
  'Görüşme Tarihi',
  'Gönderen Kişi',
  '',
]

const reportOptions = [
  {
    desc: 'Görüşme Bilgileri',
    Icon: <i className="fas fa-user-friends"></i>
  },
]

const Student = (props) => {

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backStage, setBackstage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subPagesCount, setSubPagesCount] = useState(0);
  const [searchData, setSearchData] = useState({});
  const [selectedSubPage, setSelectedSubPage] = useState(0);
  const [ notFound , setNotFound ] = useState(null);

  const {isLoggedinf,user} = useContext(Context);
  

  const tableInformations = (item)=> {
      
    return [
      item.relatedPersonName,
      item.relatedPersonPhoneNumber,
      item.reportType === 'schoolReport' ? 'Okul Görüşmesi' : 'Öğrenci Görüşmesi'  ,
      item.meetingDate,
      item.whoseDocument
    ] 

  }  

  const pathGenerator = ( item , id )=> '/home/raporlar/' + id ; 

  const closeModal_1 = () => {
    setIsModalOpen(false);
    setBackstage(false);
  }

  const nextPage = (page) => {

    setSelectedSubPage(page);
    setLoading(true);

    makeReportSearchRequest('post', {
      ...searchData,
      role:user.role,
      pageNumber: page,
    }, isLoggedinf, setReports, closeModal_1, setSubPagesCount, setLoading);

  }
  
  return <UpdateLoggedin page='REPORT_LİST' {...props}>
    {

    (Loading,user) => Loading ? null :

      <ListWrapper> 
           
                    <BackStage backStage={backStage} loading={!isModalOpen}   close={isModalOpen ? closeModal_1 : null}/>

                    <SearchReportModal
                    setMainSearchData={setSearchData}  
                    setReports={setReports}
                    setSelectedSubPage={setSelectedSubPage}  
                    isOpen ={isModalOpen} 
                    close={closeModal_1} 
                    closeModalOnly = {setIsModalOpen} 
                    setSubPagesCount={setSubPagesCount}
                    setNotFound={setNotFound}
                    role={user.role} >
                    
                    </SearchReportModal>

          
                    <GeneralList 

                        data = { reports } 
                        topTitles = {TopRows} 
                        mainTitle = 'Raporlar' 
                        titleIcon = {<i style={{ marginRight: 8 }} className="fas fa-user-friends"></i>} 
                        loading = {loading} 
                        nextPage = {nextPage}
                        tableInformations = {tableInformations}
                        setIsModalOpen = {setIsModalOpen}
                        setBackstage = {setBackstage}
                        iconOptions = {reportOptions}
                        subPagesCount = {subPagesCount}
                        notFoundText = 'Herhangi Bir Sonuç Bulunamadı.'
                        notFound = {notFound}
                        path = {'/home/'}
                        pathGenerator = {pathGenerator}

                    />
            
       </ListWrapper>

    }

  </UpdateLoggedin>
}

export const ReportList = ({reports,notFound,refs,SwitchRow,detailID,width,role,currentRole,isProfil,id})=>{
  

  if( role && !isProfil )
  {

     var notFoundText = ` Henüz , Bu ${role}ye Ait   Bir Rapor  Bulunmamaktadır.`

  }
  else if( isProfil )
  {

     var notFoundText = ` Henüz , Bir  Raporunuz  Bulunmamaktadır .`

  }
  else
  {

      var notFoundText = ` Herhangi Bir Sonuç Bulunamadı. `
 
  }

  
  return <StudentList width={width}> 

  <StudentListItem>

       <StudentListItemInnerWrapper>

               {
                 TopRows.map((item) => {

                   if(currentRole === 'Bayi' && item ===  'Gönderen Kişi' )
                   {
                      return null ;
                   }
                   else
                   {
                     return !item ? <InnerTopSpan style={{ flex: '0.1'}}  key={item}></InnerTopSpan> : <InnerTopSpan key={item}>{item}</InnerTopSpan>
                   } 
                   
                 })

               }

       </StudentListItemInnerWrapper>

    </StudentListItem>   

     {
        reports.length <= 0  && notFound ? <h1 style={{textAlign:'center' , padding:20,letterSpacing:1 , fontSize:17 , color:'#00909e'}}>{notFoundText} </h1> : null
     }

     {
       reports.length  <= 0 && !notFound ? <h1 style={{textAlign:'center' , padding:20,letterSpacing:1 , fontSize:17 , color:'#00909e'}}> <i className="fas fa-search"></i> Lütfen Bir  Arama Yapınız.</h1> : null
     }

    {

    reports.map((reportItem, index) => {

       return <StudentListItem style={{
           background: index % 2 == 0 ? '#ececec' : '#fcf8f3'
         }}  key={reportItem._id} ref={refs.current[index]}>

       <StudentListItemInnerWrapper>

           <InnerSpan>{reportItem.relatedPersonName}</InnerSpan>
           <InnerSpan>{reportItem.relatedPersonPhoneNumber}</InnerSpan>
           <InnerSpan>{reportItem.reportType === 'studentReport' ? 'Öğrenci Görüşmesi' : 'Okul Görüşmesi' }</InnerSpan>
           <InnerSpan>{reportItem.meetingDate}</InnerSpan>

           {
               ( currentRole ===  'Temsilci' || currentRole === 'Admin' )  &&

              <InnerSpan>
                  {
                      reportItem.userID == id  || detailID == reportItem.userID

                      ?

                      <Capsule>
                       <i style={{marginRight:8}} class="fas fa-user"></i> {reportItem.whoseDocument} 
                      </Capsule> 

                      :

                      reportItem.whoseDocument
                  }      
              </InnerSpan>
                
           }
           
           <IconInnerSpan style={{  flex: '0.05'}} onClick={SwitchRow(-50, refs.current[index])}>

           <SwitchButton >
              <i className="fas fa-arrow-circle-left"></i>
           </SwitchButton>

           </IconInnerSpan>
          
       </StudentListItemInnerWrapper>    

       <StudentListItemInnerWrapper style={{ backgroundColor: '#204051'}}> 

                <div style={{display:'flex',flex:1}}>

                      {

                            reportOptions.map((item, Mainindex) => {

                              return <StudentListIconWrapper key={Mainindex}>
                                              
                                        <Link  to={'/home/raporlar/'+ reportItem._id} style={{display:'flex',width:'100%',height:'100%',flexFlow:'column',justifyContent:'center',alignItems:'center',padding:'6px',fontSize:'12px',color:'white', textDecoration:'none'}}>
                                          {item.Icon}
                                          <span>{item.desc}</span>
                                        </Link>
                                                    
                              </StudentListIconWrapper>
                                                                          
                            })

                      }  

                </div>

           <IconInnerSpan  onClick={SwitchRow(0, refs.current[index])}   style={{flex: '0.1'}}>
               <SwitchButton>
                   <i className="fas fa-arrow-circle-right"></i>
               </SwitchButton>  
          </IconInnerSpan>   
         
       </StudentListItemInnerWrapper>

     </StudentListItem>

 })
 }
      
 </StudentList>


}



export default Student;