import React,{useEffect,useState,createRef,useRef} from 'react';
import {makeStudentRequest} from '../../../request/requset';
import styled from 'styled-components';
import {UpdateLoggedin} from '../../isLoggedin/action'
import {Route,Link} from 'react-router-dom'
import Circle from '../../../UI/Circle'
import {hasPermission,PermissionsNumbers,IconPermission} from '../../../UI/Permissions/permissionIcon'

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
-webkit-box-shadow: 0 10px 6px -6px #758184;
-moz-box-shadow: 0 10px 6px -6px #758184;
 box-shadow: 0 10px 6px -6px #758184;
`

const StudentListItem = styled.li`
width:200%;
display:flex;
transition:280ms;
justify-content:space-between;

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
justify-content:space-between;
width:50%;
`

const StudentListIconWrapper = styled.div`
&:hover{
  cursor:pointer;
  background:#ff6363;
}
font-size:8px;
flex:0.16;
`

//-------------------------

const InnerTopSpan = styled.span`
display:flex;
text-align:center;
align-items:center;
justify-content:center;
flex:0.8;
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
flex:0.8;
font-size:14px;
box-sizing:border-box;
`

const IconInnerSpan = styled.span`
display:flex;
text-align:center;
align-items:center;
justify-content:center;
position:relative;
transition:100ms;
background:#00909e;
max-width:29px;
min-width:29px;
padding:10px;
&:hover{
  cursor:pointer;
  font-size:20px;
}

box-sizing:border-box;
`
//-----------------------------

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

//-------------------------------------------------

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
{desc:'Özel Bilgiler',Icon: <i className="far fa-address-card"></i>} ]


const Student =(props)=>{

  const [students,setStudents] = useState([]); 
  const [loading , setLoading] = useState(true);
  

  return <UpdateLoggedin page='STUDENT' {...props}>
    {
        (Loading)=>Loading ? 

          null

          :

          <ListWrapper> 
            
             < _StudentList students={students} />

          </ListWrapper>
       
    }

  </UpdateLoggedin> 
}

const _StudentList = ( { students } )=>{

  const refs = useRef([]);  // we can also  use useRef hook for storing value or objects; 
  const [backStage, setBackstage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subPagesCount, setSubPagesCount] = useState(0);
  const [ notFound , setNotFound ] = useState(null);

  refs.current = refs.current.slice(0, students.length);
  for (let step = refs.current.length; step < students.length; step++) {
      refs.current[step] = createRef();  //we can use useRef with createRef  ! ;
  }

 
  const SwitchRow = (Amount,ref)=> event =>{
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
  

  return   <HiddenWrapper>

            <SearchBox>

                <div style={{ fontSize: 18}}> <i class="fas fa-user-graduate" style={{marginRight:8}}></i> Ön Kayıt Öğrenciler   </div>

                <InnerSearch onClick={() => {
                  
                  setBackstage(true);
                  setIsModalOpen(true);

                }}> <i className="fas  fa-search "></i> ARAMA YAP 
                
                </InnerSearch>

            </SearchBox>

            <h1 style={{marginBottom:20,color:'lightblue',fontSize:16,color:'#52de97'}}>( { subPagesCount } ) Sonuç Bulundu </h1> 
    
            <StudentList>   
                  
              <StudentListItem>
                
                  <StudentListItemInnerWrapper>

                    {
                      TopRows.map((item)=>{
                      return  !item  ? <InnerTopSpan style={{flex:'0.06',maxWidth:'29px',minWidth:'29px'}}  key={item}></InnerTopSpan> :  <InnerTopSpan key={item}>{item}</InnerTopSpan> 
                      })
                    }
                    
                  </StudentListItemInnerWrapper>

              </StudentListItem>

          { 
            students.length  <= 0 && !notFound ? <h1 style={{textAlign:'center' , padding:20,letterSpacing:1 , fontSize:17, color:'#00909e'}}> <i className="fas fa-search"></i> Lütfen Bir Arama Yapınız.</h1> : null
          }   

          {

          students.map((Studentitem,index)=>{

                return  <StudentListItem style={{background:index%2==0 ? '#ececec' : '#fcf8f3'}}  key={Studentitem._id} ref={refs.current[index]}>

                <StudentListItemInnerWrapper>

                    <InnerSpan>{Studentitem.StudentInfo.information.name}</InnerSpan>
                    <InnerSpan>{Studentitem.StudentInfo.information.surname}</InnerSpan> 
                    <InnerSpan>{Studentitem.StudentInfo.information.dateofbirth}</InnerSpan> 
                    <InnerSpan>{Studentitem.StudentInfo.registerstate.onkayit.state ? 'Ön Kayıt' : Studentitem.StudentInfo.registerstate.kayitliogrenci.state ? 'Kayıt Kesinleşti' : null  }</InnerSpan> 
                    <InnerSpan>{Studentitem.StudentInfo.information.kayitalan} İlhan Yılmaz</InnerSpan>
                    
                    <IconInnerSpan style={{flex:'0.06'}} onClick={SwitchRow(-50,refs.current[index])}>

                        <SwitchButton >
                            <i className="fas fa-arrow-circle-left"></i>
                        </SwitchButton>

                    </IconInnerSpan>
                    

                  

                </StudentListItemInnerWrapper>    


                <StudentListItemInnerWrapper style={{backgroundColor:'#204051'}}> 

                <div  style={{display:'flex',flex:1}} >

                  {
                        StudentOptions.map((item,Mainindex)=>{

                            return   <StudentListIconWrapper key={Mainindex}>
                                    
                            <Link  to={'/home/öğrenciler/'+ item.desc.split(' ').join('_').toLowerCase() +'/'+ Studentitem._id} style={{display:'flex',width:'100%',height:'100%',flexFlow:'column',justifyContent:'center',alignItems:'center',padding:'6px',fontSize:'11.5px',color:'white', textDecoration:'none'}}>
                                {item.Icon}
                                <span>{item.desc}</span>
                            </Link>
                            
                        </StudentListIconWrapper>   
                      
                        })                      
                  }  

                </div>    

                <IconInnerSpan onClick={SwitchRow(0,refs.current[index])}   style={{flex:'0.013'}}>

                              <SwitchButton>
                                  <i className="fas fa-arrow-circle-right"></i>
                              </SwitchButton>  

                </IconInnerSpan>

                  
                </StudentListItemInnerWrapper>


              </StudentListItem>

            }).splice(0,10)

          }
            
        </StudentList>


        <SubPagesContainer>

        {
                // subPageNumber > 1 && personels.length !== 0 && !notFound ?  new Array(subPageNumber).fill().map((item, index) => { 

                //   return <SubPageItem  key={index} selected={ selectedSubPage === index }  onClick={() => nextPage(index)}>{index + 1}</SubPageItem>})
                //   :
                //   null
        }
                          
        </SubPagesContainer>

  </HiddenWrapper>


}


export default Student;