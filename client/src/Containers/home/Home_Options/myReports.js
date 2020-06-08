import React, { useEffect, useState, createRef, useRef, useContext } from 'react';
import { makeReportsRequest, makeReportSearchRequest } from '../../../request/requset';
import { Context } from '../../../Context/Context'
import styled from 'styled-components';
import { UpdateLoggedin } from '../../isLoggedin/action'
import { Route, Link , useLocation} from 'react-router-dom'
import Circle from '../../../UI/Circle'
import BackStage from '../../../UI/backStage'
import { hasPermission, PermissionsNumbers, IconPermission } from '../../../UI/Permissions/permissionIcon'
import { SearchReportModal } from '../../../UI/SearchModal/SearchReport';
import GeneralList from '../../../Components/GeneralList'
import {restrictWord} from '../../../Utilities/utilities'

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
background:#f57b51;
color:white;
font-size:12.5px;
padding:6px;
`
 const useQuery = () => new URLSearchParams(useLocation().search);


const Student = (props) => {

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backStage, setBackstage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subPagesCount, setSubPagesCount] = useState(0);
  const [searchData, setSearchData] = useState({});
  const [ notFound , setNotFound ] = useState(null);

  const { isLoggedinf , user  } = useContext(Context);

   const query = useQuery();

  const TopRows = [
    'Görüşülen Kişi',
    'Telefon Numarası',
    'Görüşme Tipi',
    'Görüşme Tarihi',
    'Gönderen Kişi',
    '',
  ]
  

  const filterIconOptions = (report)=>{

    var  reportOptions = [
      {
        desc: 'Görüşme Bilgileri',
        Icon: <i className="fas fa-user-friends"></i>
      },
    ]

    return reportOptions ; //just for now

  }

  const tableInformations = ( item  )=> {
    
    return [
      restrictWord( item.relatedPersonName , 13 ) , 
      item.relatedPersonPhoneNumber,
      item.reportType === 'schoolReport' ? 'Okul Görüşmesi' : 'Öğrenci Görüşmesi'  ,
      item.meetingDate,
      item.userID == user._id  ? <Capsule> { restrictWord(item.whoseDocument,13) } </Capsule> : restrictWord(item.whoseDocument,13)
    ] 

  }  

  const pathGenerator = ( _ , id )=> '/home/raporlar/' + id ; 

  const closeModal_1 = () => {
    setIsModalOpen(false);
    setBackstage(false);
  }

  // useEffect(()=>{

  //   const { reportSearchData , reportPageNumber , reportDataLength  } = state ; 
    
  //   if( reports.length === 0 && !notFound  && reportSearchData ) {
      
  //     setSubPagesCount(reportDataLength)
  //     setSearchData(reportSearchData)
  //     setLoading(true);
      
  //     makeReportSearchRequest('post', {
  //       ...reportSearchData,
  //       role:user.role,
  //       pageNumber:query.get,
  //     }, isLoggedinf, setReports, closeModal_1, setSubPagesCount, setLoading , setNotFound);

  //   }

  // },[])


  useEffect(()=>{
          
    if(query.get('page')) {

      makeReportSearchRequest('post', {
        ...searchData,
        role:user.role,
        pageNumber: query.get('page'),
      }, isLoggedinf, setReports, closeModal_1, setSubPagesCount, setLoading , setNotFound);

    }
    
  },[query.get('page')])

  
  return <UpdateLoggedin page='REPORT_LİST' {...props}>
    {

    (Loading,user) => Loading ? null :

      <ListWrapper> 
           
                    <BackStage backStage={backStage} loading={!isModalOpen}   close={isModalOpen ? closeModal_1 : null}/>

                    <SearchReportModal
                        setMainSearchData={setSearchData}  
                        setReports={setReports} 
                        isOpen ={isModalOpen} 
                        close={closeModal_1} 
                        closeModalOnly = {setIsModalOpen} 
                        setSubPagesCount={setSubPagesCount}
                        setNotFound={setNotFound}
                        role={user.role} />
                    
                  
                    <GeneralList 

                        listType = 'report'
                        data = { reports } 
                        topTitles = {TopRows} 
                        mainTitle = 'Raporlar' 
                        titleIcon = {<i style={{marginRight:8}} class="fas fa-file-alt"></i>} 
                        loading = {loading} 
                        tableInformations = {tableInformations}
                        setIsModalOpen = {setIsModalOpen}
                        setBackstage = {setBackstage}
                        iconOptions = {filterIconOptions}
                        subPagesCount = {subPagesCount}
                        notFoundText = 'Herhangi Bir Sonuç Bulunamadı.'
                        notFound = {notFound}
                        pathGenerator = {pathGenerator}
                        resetSubPage = { !isModalOpen && backStage }

                    />
            
       </ListWrapper>

    }

  </UpdateLoggedin>
}





export default Student;