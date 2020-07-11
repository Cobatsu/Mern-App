import React, { useEffect, useState, createRef, useRef, useContext } from 'react';
import { makeReportsRequest, makeReportSearchRequest } from '../../../request/requset';
import { Context } from '../../../Context/Context'
import styled from 'styled-components';
import { UpdateLoggedin } from '../../ErrorWrapper/ErrorBoundary'
import { Route, Link , useLocation , useHistory } from 'react-router-dom'
import Circle from '../../../UI/Circle'
import BackStage from '../../../UI/backStage'
import { hasPermission, PermissionsNumbers, IconPermission } from '../../../UI/Permissions/permissionIcon'
import { SearchReportModal } from '../../../UI/SearchModal/SearchReport';
import GeneralList from '../../../Components/GeneralList'
import {restrictWord , statusColors , reportListHelperPackage} from '../../../Utilities/utilities'
import queryString from 'querystring' 

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
background:rgba(255, 93, 108, .08);
color:#fa4659;
border:1px solid #fa4659;
font-size:11.6px;
padding:6px;
`



const Student = (props) => {

  const [reports, setReports] = useState([]);
 
  const [backStage, setBackstage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subPagesCount, setSubPagesCount] = useState(0);
  const [ notFound , setNotFound ] = useState(null);

  const { isLoggedinf , user  } = useContext(Context);

  const location = useLocation() ; 
  const searchData = queryString.parse(location.search.slice(1)) ; 
 

  const [loading, setLoading] = useState( Object.keys( searchData ).length > 0   );


  const closeModal_1 = () => {
    setIsModalOpen(false);
    setBackstage(false);
  }

  useEffect(()=>{
       
    if( Object.keys( searchData ).length  > 0 &&  user.role ) {
      
      setLoading(true);

      makeReportSearchRequest('post', {
        ...searchData,
        pageNumber:searchData.pageNumber-1,
        role:user.role,
      } , isLoggedinf, setReports, closeModal_1, setSubPagesCount, setLoading , setNotFound , subPagesCount);

    }

  },[ location.search , user.role ]);

  
  return    <ListWrapper> 
           
                    <BackStage backStage={backStage} loading={!isModalOpen}   close={isModalOpen ? closeModal_1 : null}/>

                    <SearchReportModal

                        setReports={setReports} 
                        isOpen ={isModalOpen} 
                        close={closeModal_1} 
                        closeModalOnly = {setIsModalOpen} 
                        setSubPagesCount={setSubPagesCount}
                        setNotFound={setNotFound}
                        role={user.role} />
                    
                  
                    <GeneralList 

                        data = { reports }            
                        mainTitle = 'Raporlar' 
                        titleIcon = {<i style={{marginRight:8}} class="fas fa-file-alt"></i>} 
                        loading = { loading }                   
                        setIsModalOpen = { setIsModalOpen }
                        setBackstage = { setBackstage }                 
                        subPagesCount = { subPagesCount }
                        notFoundText = 'Herhangi Bir Sonuç Bulunamadı.'
                        notFound = { notFound }               
                        resetSubPage = { !isModalOpen && backStage }
                        helperPackage = { reportListHelperPackage(user._id) }

                    />
            
       </ListWrapper>

}

export default Student;