import React,{useEffect,useState,createRef,useRef} from 'react';
import {makeStudentRequest} from '../../../request/requset';
import styled from 'styled-components';
import {UpdateLoggedin} from '../../isLoggedin/action'
import {Route,Link} from 'react-router-dom'
import Circle from '../../../UI/Circle'
import {hasPermission,PermissionsNumbers,IconPermission} from '../../../UI/Permissions/permissionIcon'

const ListWrapper = styled.div`
display:flex;
background:white;
width:100%;
margin:0 auto;
justify-content:center;
padding:0;
margin-top:2%;
padding:30px;
border-radius:3px;

@media (max-width: 800px) {
  overflow-x: scroll;
   height:100%;
}

`
//------------------
const HiddenWrapper = styled.div`
width:100%;
@media (max-width: 800px) {
  margin-bottom:250px;
}
position:relative;
display:flex;
justify-content:center;

`
const StudentList = styled.ul`
overflow:hidden;
padding:0;
min-width:900px;
max-width:900px;
margin:0;
@media (max-width: 800px) {
  position:absolute;
  left:0;
  
}
-webkit-box-shadow: 0 10px 6px -6px #758184;
-moz-box-shadow: 0 10px 6px -6px #758184;
 box-shadow: 0 10px 6px -6px #758184;
`

const StudentListItem = styled.li`
width:200%;
display:flex;
transition:280ms;

`

const SwitchButton  = styled.div`
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
  background:#b9ebcc;
}
font-size:8px;
flex:1;
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
//-----------------------------


const TopRows  =  [
  'İsim',
  'Soy İsim',
  'Başvuru Tarihi',
  'Kayıt Durumu',
  'Kaydeden',
  '',
]

const StudentOptions = [
{desc:'Ön Kayıt Bilgileri',Icon:<i className="fas fa-user-friends"></i>},
{desc:'Ödemeler',Icon:<i className="fas fa-money-bill-wave"></i>},
{desc:'Kayıt Başvurusu',Icon:<i className="fas fa-user-edit"></i>},
{desc:'Özel Bilgiler',Icon: <i className="far fa-address-card"></i>},
]


const Student =(props)=>{

  const [students,setStudents] = useState([]); 
  const [loading , setLoading] = useState(true);
  
  const refs = useRef([]);  // we can also  use useRef hook for storing value or objects; 

  refs.current = refs.current.slice(0, students.length);
  for (let step = refs.current.length; step < students.length; step++) {
      refs.current[step] = createRef();  //we can use useRef with createRef  ! ;
  }

  useEffect(()=>{
     makeStudentRequest('get',setStudents,setLoading);
  },[])
 
  const SwitchRow = (Amount,ref)=>event=>{
    ref.current.style.transform = `translateX(${Amount}%)`
   if(Amount==-50)  
      for(let i = 0 ; i<refs.current.length ; i++)
      {
            if(i !== refs.current.indexOf(ref) && refs.current[i].current)  //close all other list items ; 
            {
              refs.current[i].current.style.transform=`translateX(0)`
            }
      }
  }
  
  return <UpdateLoggedin page='STUDENT' {...props}>
    {
        (Loading)=>Loading ? null  :  loading
          ? 
          <Circle Load={loading} position='static' marginTop={40}/>    
          :
          <ListWrapper> 
          <HiddenWrapper>
          <StudentList>   
           
           <StudentListItem>
             
                <StudentListItemInnerWrapper>
                  {
                    TopRows.map((item)=>{
                    return  !item  ? <InnerTopSpan style={{flex:'0.1'}}  key={item}></InnerTopSpan> :  <InnerTopSpan key={item}>{item}</InnerTopSpan> 
                    })
                  }
                </StudentListItemInnerWrapper>

                
     
           </StudentListItem>
           {
            students.map((Studentitem,index)=>{
              return  <StudentListItem style={{background:index%2==0 ? '#ececec' : '#fcf8f3'}}  key={Studentitem._id} ref={refs.current[index]}>

              <StudentListItemInnerWrapper>

                  <InnerSpan>{Studentitem.StudentInfo.information.name}</InnerSpan>
                  <InnerSpan>{Studentitem.StudentInfo.information.surname}</InnerSpan> 
                  <InnerSpan>{Studentitem.StudentInfo.information.dateofbirth}</InnerSpan> 
                  <InnerSpan>{Studentitem.StudentInfo.registerstate.onkayit.state ? 'Ön Kayıt' : Studentitem.StudentInfo.registerstate.kayitliogrenci.state ? 'Kayıt Kesinleşti' : null  }</InnerSpan> 
                  <InnerSpan>{Studentitem.StudentInfo.information.kayitalan} İlhan Yılmaz</InnerSpan>
                  
                  <IconInnerSpan style={{flex:'0.1'}} onClick={SwitchRow(-50,refs.current[index])}>

                  <SwitchButton >
                     <i className="fas fa-arrow-circle-left"></i>
                  </SwitchButton>

                  </IconInnerSpan>
                 

               

              </StudentListItemInnerWrapper>    


              <StudentListItemInnerWrapper style={{backgroundColor:'#a6b1e1'}}> 

                {
                  StudentOptions.map((item,Mainindex)=>{

                      return  Mainindex === StudentOptions.length-1  
                      ?
                      <IconInnerSpan key={Mainindex} onClick={SwitchRow(0,refs.current[index])}   style={{flex:'0.1'}}>
                      <SwitchButton>
                          <i className="fas fa-arrow-circle-right"></i>
                      </SwitchButton>  
                      </IconInnerSpan>
                      
                      :  
                      <StudentListIconWrapper key={Mainindex}>
                              
                        <Link  to={'/home/öğrenciler/'+ item.desc.split(' ').join('_').toLowerCase() +'/'+ Studentitem._id} style={{display:'flex',flexFlow:'column',justifyContent:'center',alignItems:'center',padding:'6px',fontSize:'12px',color:'white', textDecoration:'none'}}>
                            {item.Icon}
                            <span>{item.desc}</span>
                         </Link>
                         
                    </StudentListIconWrapper> 
                       
                  })                      
                }      
 
               
              </StudentListItemInnerWrapper>


            </StudentListItem>
            }).splice(0,10)
           }
             
        </StudentList>

        </HiddenWrapper>
            
      </ListWrapper>
       
    }

  </UpdateLoggedin> 
}

export default Student;