import React,{useEffect,useState,createRef,useRef,useContext} from 'react';
import {UpdateLoggedin} from '../../ErrorWrapper/ErrorBoundary'
import styled from 'styled-components';
import { Link , useLocation } from 'react-router-dom'
import {makePersonelRequest, makePersonSearchRequest} from '../../../request/requset';
import Circle from '../../../UI/Circle'
import BackStage from '../../../UI/backStage'
import {SearchPersonModal as SearchModal} from '../../../UI/SearchModal/SearchPerson'
import { Context } from '../../../Context/Context';
import GeneralList from '../../../Components/GeneralList'
import {restrictWord,personelListHelperPackage} from '../../../Utilities/utilities'
import queryString from 'querystring' 

const ListWrapper = styled.div`
display:flex;
flex-flow:column;
align-items:center;
background:white;
width:80%;
margin:0 auto;
margin-top:2%;
margin-bottom:20px;
border-radius:3px;
padding:0 0 20px 0;
position:relative;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
@media (max-width: 1000px) {
   width:100%;
   height:100%;
   overflow-x: scroll;
}
`




const PersonelList  = ( { isOnlySubBranch } )=>{

  const [ personels,setPersonels ] = useState([]);
  const [ loading , setLoading ] = useState(false);
  const [ backStage, setBackstage ] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ subPagesCount, setSubPagesCount ] = useState(0);
  const [ notFound , setNotFound ] = useState();

  const { isLoggedinf , user } = useContext(Context);

  const location = useLocation() ; 
  const searchData = queryString.parse(location.search.slice(1)) ; 

  const closeModal_1 = () => {
    setIsModalOpen(false);
    setBackstage(false);
  }
   
  useEffect(()=>{
          
    if( Object.keys( searchData ).length  > 0 ) {

      setLoading(true);

      makePersonSearchRequest('post', {
        ...searchData,
        pageNumber: searchData.pageNumber - 1
      }, isLoggedinf, setPersonels, closeModal_1, setSubPagesCount, setLoading , setNotFound , subPagesCount);

    }
    
  },[ location.search ])

 // we can also  use useRef hook for storing value or objects; 

    return    <ListWrapper> 

                     <BackStage backStage={backStage} loading={!isModalOpen}   close={isModalOpen ? closeModal_1 : null}/>

                      <SearchModal

                        isOnlySubBranch={isOnlySubBranch}
                        id= {user._id}
                        setReports={setPersonels}
                        isOpen ={isModalOpen} 
                        close={closeModal_1} 
                        closeModalOnly = {setIsModalOpen} 
                        setSubPagesCount={setSubPagesCount}
                        setNotFound={setNotFound}
                        role={user.role} />
               
                        
                      <GeneralList 
                      
                        listType = 'person'
                        data = { personels }                
                        mainTitle = {isOnlySubBranch ? 'Bayiler' : 'Personeller'} 
                        titleIcon = {<i style={{ marginRight: 8 }} className="fas fa-user-friends"></i>} 
                        loading = {loading}           
                        setIsModalOpen = {setIsModalOpen}
                        setBackstage = {setBackstage}                   
                        subPagesCount = {subPagesCount}
                        notFoundText ='Herhangi Bir Sonuç Bulunamadı.'
                        notFound = {notFound}                 
                        resetSubPage = { !isModalOpen && backStage }
                        helperPackage = { personelListHelperPackage(user) }

                        />

          </ListWrapper>

}


export default PersonelList ; 