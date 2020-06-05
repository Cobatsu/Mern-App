import React,{useEffect,useState,createRef,useRef,useContext} from 'react';
import {UpdateLoggedin} from '../../isLoggedin/action'
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {makePersonelRequest, makePersonSearchRequest} from '../../../request/requset';
import Circle from '../../../UI/Circle'
import BackStage from '../../../UI/backStage'
import {SearchPersonModal as SearchModal} from '../../../UI/SearchModal/SearchPerson'
import { Context } from '../../../Context/Context';
import GeneralList from '../../../Components/GeneralList'

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
const TopRows  =  [
  'İsim',
  'Soy İsim',
  'Rol',
  'Bölge',
  'Sözleşme Tarihi',
  '',
]

var  PersonelOptions = [
  {desc:'Genel Bilgiler',Icon:<i className="fas fa-user-friends"></i>},
  {desc:'Bayiler',Icon:<i    className="fas fa-code-branch"/>},
  {desc:'Raporlar',Icon:<i   className="fas fa-sticky-note"></i>},
  {desc:'Yetkiler',Icon: <i  className="fas fa-unlock"></i>},
]


const PersonelList  = ({isOnlySubBranch,...rest})=>{

  const [personels,setPersonels] = useState([]);
  const [loading , setLoading] = useState(false);
  const [backStage, setBackstage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subPagesCount, setSubPagesCount] = useState(0);
  const [searchData, setSearchData] = useState({});
  const [ notFound , setNotFound ] = useState();

  const {isLoggedinf,user} = useContext(Context);

  console.log(user.role)

  const closeModal_1 = () => {
    setIsModalOpen(false);
    setBackstage(false);
  }
   
  if( user.role !== 'Admin' &&  user.role ) PersonelOptions = PersonelOptions.filter(({desc})=> desc !== 'Yetkiler' ) ;

  const tableInformations = ( item )=> {
    return [
      item.firstName,
      item.lastName,
      item.role,
      item.role === 'Admin' ? '—' : item.region,
      item.contractDate ] 
  }  

  const pathGenerator = ( item , id ) => '/home/personel_listesi/' + item.split(' ').join('_').toLowerCase() + '/' + id 

  const nextPage = (page)=>{

    setLoading(true);    
          makePersonSearchRequest('post', {
            ...searchData,
            pageNumber: page
          }, isLoggedinf, setPersonels, closeModal_1, setSubPagesCount, setLoading);

  }
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
                        setMainSearchData={setSearchData}  
                        setReports={setPersonels}
                        isOpen ={isModalOpen} 
                        close={closeModal_1} 
                        closeModalOnly = {setIsModalOpen} 
                        setSubPagesCount={setSubPagesCount}
                        setNotFound={setNotFound}
                        role={user.role} />
               
                        
                      <GeneralList 
                        data = { personels } 
                        topTitles = {TopRows} 
                        mainTitle = {isOnlySubBranch ? 'Bayiler' : 'Personeller'} 
                        titleIcon = {<i style={{ marginRight: 8 }} className="fas fa-user-friends"></i>} 
                        loading = {loading} 
                        nextPage = {nextPage}
                        tableInformations = {tableInformations}
                        setIsModalOpen = {setIsModalOpen}
                        setBackstage = {setBackstage}
                        iconOptions = {PersonelOptions}
                        subPagesCount = {subPagesCount}
                        notFoundText ='Herhangi Bir Sonuç Bulunamadı.'
                        notFound = {notFound}
                        pathGenerator = {pathGenerator}  />

          </ListWrapper>

      }

    </UpdateLoggedin>
}


export default PersonelList ; 