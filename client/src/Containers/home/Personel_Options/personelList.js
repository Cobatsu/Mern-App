import React,{useEffect,useState,createRef,useRef,useContext} from 'react';
import {UpdateLoggedin} from '../../isLoggedin/action'
import styled from 'styled-components';
import { Link , useLocation } from 'react-router-dom'
import {makePersonelRequest, makePersonSearchRequest} from '../../../request/requset';
import Circle from '../../../UI/Circle'
import BackStage from '../../../UI/backStage'
import {SearchPersonModal as SearchModal} from '../../../UI/SearchModal/SearchPerson'
import { Context } from '../../../Context/Context';
import GeneralList from '../../../Components/GeneralList'
import {restrictWord} from '../../../Utilities/utilities'
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




const PersonelList  = ({isOnlySubBranch,...rest})=>{

  const [ personels,setPersonels ] = useState([]);
  const [ loading , setLoading ] = useState(false);
  const [ backStage, setBackstage ] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ subPagesCount, setSubPagesCount ] = useState(0);
  const [ notFound , setNotFound ] = useState();

  const { isLoggedinf , user:currentUser } = useContext(Context);

  const location = useLocation() ; 
  const searchData = queryString.parse(location.search.slice(1)) ; 


  const TopRows  =  [
    'İsim',
    'Soy İsim',
    'Rol',
    'Bölge',
    'Sözleşme Tarihi',
    '',
  ]

  // useEffect( ()=>{

  //   const { personSearchData , personPageNumber , personDataLength  } = state ; 
    
  //   if( personels.length === 0 && !notFound  && personSearchData ) {
      
  //     setSubPagesCount(personDataLength);
  //     setSearchData(personSearchData);
  //     setLoading(true);
      
  //     makePersonSearchRequest('post', {
  //       ...personSearchData,
  //       pageNumber: personPageNumber
  //     }, isLoggedinf, setPersonels, closeModal_1, setSubPagesCount, setLoading , setNotFound);

  //   }

  // },[])
  
  const closeModal_1 = () => {
    setIsModalOpen(false);
    setBackstage(false);
  }
   
  const filterIconOptions = (user)=>{

    var  PersonelOptions = [
      {desc:'Genel Bilgiler',Icon:<i className="fas fa-user-friends"></i>},
      {desc:'Bayiler',Icon:<i    className="fas fa-code-branch"/>},
      {desc:'Raporlar',Icon:<i   className="fas fa-sticky-note"></i>},
      {desc:'Yetkiler',Icon: <i  className="fas fa-unlock"></i>},
    ]

    const { role } = user ; 
    
    if( currentUser.role !== 'Admin' &&  currentUser.role ) PersonelOptions =  PersonelOptions.filter(( { desc } )=> desc !== 'Yetkiler' ) ;

    if( role !== "Temsilci" ) PersonelOptions =  PersonelOptions.filter(( { desc } )=> desc !== 'Bayiler' ) ;

    return PersonelOptions ; 
  }

  const tableInformations = ( item )=> {

    return [
      
      restrictWord( item.firstName , 13) , 
      restrictWord( item.lastName , 13),
      item.role,
      item.role === 'Admin' ? '—' : item.region,
      item.contractDate ]

  }  

  const pathGenerator = ( item , id ) => {

     if( item === 'Raporlar' || item === 'Bayiler' ) { var pageQuery = '?pageNumber=1' } else { var pageQuery = '' }

      return '/home/personel_listesi/' + item.split(' ').join('_').toLowerCase() + '/' + id + pageQuery ;
  }

  useEffect(()=>{
          
    if( Object.keys( searchData ).length  > 0 ) {

      setLoading(true);

      makePersonSearchRequest('post', {
        ...searchData,
        pageNumber: searchData.pageNumber - 1
      }, isLoggedinf, setPersonels, closeModal_1, setSubPagesCount, setLoading , setNotFound , subPagesCount);

    }
    else if( Object.keys(searchData).length === 1 ) {

      setLoading(true);

      makePersonSearchRequest('post', {
        ...searchData,
      }, isLoggedinf, setPersonels, closeModal_1, setSubPagesCount, setLoading , setNotFound , subPagesCount);


    }
    
  },[ location.search ])


 // we can also  use useRef hook for storing value or objects; 

    return <UpdateLoggedin page='PERSONEL_LİST' {...rest}  >

      {
          ( Loading , user )=> Loading 

          ?

          null 
                
          :
              <ListWrapper> 

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
                        topTitles = {TopRows} 
                        mainTitle = {isOnlySubBranch ? 'Bayiler' : 'Personeller'} 
                        titleIcon = {<i style={{ marginRight: 8 }} className="fas fa-user-friends"></i>} 
                        loading = {loading} 
                        tableInformations = {tableInformations}
                        setIsModalOpen = {setIsModalOpen}
                        setBackstage = {setBackstage}
                        iconOptions = {filterIconOptions}
                        subPagesCount = {subPagesCount}
                        notFoundText ='Herhangi Bir Sonuç Bulunamadı.'
                        notFound = {notFound}
                        pathGenerator = {pathGenerator}
                        resetSubPage = { !isModalOpen && backStage }

                        />

          </ListWrapper>

      }

    </UpdateLoggedin>
}


export default PersonelList ; 