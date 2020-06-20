import React,{ useEffect,useState,createRef,useRef,useContext} from 'react';
import {makeStudentSearchRequest} from '../../../request/requset';
import styled from 'styled-components';
import {UpdateLoggedin} from '../../isLoggedin/action'
import { Link , useLocation } from 'react-router-dom'
import Circle from '../../../UI/Circle'
import { hasPermission,PermissionsNumbers,IconPermission } from '../../../UI/Permissions/permissionIcon'
import { SearchStudentModal }  from '../../../UI/SearchModal/SearchStudent'
import GeneralList from '../../../Components/GeneralList'
import BackStage from '../../../UI/backStage'
import { Context } from '../../../Context/Context'
import { restrictWord , studentStatusColor } from '../../../Utilities/utilities'
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


//------------------

//-------------------------------------------------



const Student =(props)=>{

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backStage, setBackstage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subPagesCount, setSubPagesCount] = useState(0);
  const [ notFound , setNotFound ] = useState(null);
  
  const { isLoggedinf , user  } = useContext(Context);

  const location = useLocation() ; 
  const searchData = queryString.parse(location.search.slice(1)) ; 

  const TopRows = [
    'İsim',
    'Soy İsim',
    'Kayıt Durumu',
    'Referans Kişi',
    'Kayıt Tarihi',
    '',
  ]

  const tableInformations = ( item ) => {

    var fullName = item.owner.firstName + ' ' + item.owner.lastName ; 

    var docState = item.StudentInfo.registerState.onkayit.docState ; 

    return [

      restrictWord( item.StudentInfo.information.name , 13) , 
      restrictWord( item.StudentInfo.information.surname , 13) ,
      <Capsule  style={ {...studentStatusColor(docState).style}} >  { studentStatusColor(docState).text } </Capsule>,
      item.owner._id === user._id ?  <Capsule>{restrictWord(fullName,13)}</Capsule> : restrictWord(fullName,13) ,
      item.StudentInfo.registerdate 
    
    ]

  } 

  useEffect(()=>{
          
    if( Object.keys( searchData ).length  > 0 && user.role ) {

      setLoading(true);

      makeStudentSearchRequest('post', {
        ...searchData,
        role:user.role,
        pageNumber: searchData.pageNumber - 1
      }, isLoggedinf, setStudents, closeModal_1 , setSubPagesCount, setLoading , setNotFound , subPagesCount);

    }
    
  },[ location.search  , user.role])

  const filterIconOptions = (student)=>{

    var  studentOptions = [

      {
        desc: ' Ön Kayıt Bilgileri ',
        Icon: <i class="far fa-file-alt"></i>
      },
      
    ]

    return studentOptions ; //just for now

  }

  const pathGenerator = ( _ , id )=> '/home/ön_kayıt/' + id ; 

  const closeModal_1 = () => {
    setIsModalOpen(false);
    setBackstage(false);
  }

  return <UpdateLoggedin page='STUDENT' {...props}>
    {
        (Loading)=>Loading ? 

          null

          :

          <ListWrapper> 

            <BackStage backStage={backStage} loading={!isModalOpen}  close={isModalOpen ? closeModal_1 : null} />

            <SearchStudentModal

              setStudents={setStudents} 
              isOpen ={isModalOpen} 
              close={closeModal_1} 
              closeModalOnly = {setIsModalOpen} 
              setSubPagesCount={setSubPagesCount}
              setNotFound={setNotFound}
              role={user.role}  />
            
            <GeneralList 

                data = { students } 
                topTitles = {TopRows} 
                mainTitle = 'Ön Kayıt Öğrenciler' 
                titleIcon = {<i style={{marginRight:8}} class="fas fa-user-graduate"></i>} 
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