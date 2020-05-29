import React,{useEffect,useState,createRef,useRef,useContext} from 'react';
import {UpdateLoggedin} from '../../isLoggedin/action'
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {makePersonelRequest, makePersonSearchRequest} from '../../../request/requset';
import Circle from '../../../UI/Circle'
import BackStage from '../../../UI/backStage'
import {SearchPersonModal as SearchModal} from '../../../UI/SearchModal/SearchPerson'
import { Context } from '../../../Context/Context';

const ListWrapper = styled.div`
display:flex;
flex-flow:column;
align-items:center;
background:white;
width:80%;
margin:0 auto;
margin-top:2%;
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


const PersonelList_ = styled.ul`
overflow:hidden;
padding:0;
min-width:${({width})=> width ? width+'px' : '900px'};
max-width:${({width})=> width ? width+'px' : '900px'};
-webkit-box-shadow: 0 10px 6px -6px #758184;
-moz-box-shadow: 0 10px 6px -6px #758184;
 box-shadow: 0 10px 6px -6px #758184;
`


const PersonelListItemInnerWrapper = styled.div`
display:flex;
width:50%;
justify-content:space-between;
`

const PersonelListIconWrapper = styled.div`
&:hover{
  cursor:pointer;
  background:#ff6363;
}
font-size:8px;
flex:0.2;
`
const IconInnerSpan = styled.span`
display:flex;
flex:1;
text-align:center;
align-items:center;
justify-content:center;
padding:10px;
position:relative;
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

const PersonelListItem = styled.li`
width:200%;
display:flex;
transition:280ms;
`


const InnerTopSpan = styled.span`
display:flex;
text-align:center;
align-items:center;
justify-content:center;
flex:1;
background:#61c0bf;
color:white;
padding:10px;
font-size:14px;
box-sizing:border-box;
`

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

//*------------------------------
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
//-----------------------------------------

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
//------------------------------------

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


const TopRows  =  [
  'İsim',
  'Soy İsim',
  'Rol',
  'Bölge',
  'Sözleşme Tarihi',
  '',
]

const PersonelOptions = [
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
  const [selectedSubPage, setSelectedSubPage] = useState(0);
  const [ notFound , setNotFound ] = useState(null);
  
  let subPageNumber =  Math.ceil(subPagesCount/10);

  const {isLoggedinf} = useContext(Context);

  const refs = useRef([]);  
  refs.current = refs.current.slice(0, personels.length);
  for (let step = refs.current.length; step < personels.length; step++) {
      refs.current[step] = createRef();  //we can use useRef with createRef  ! ;
  }
  
  const closeModal_1 = () => {
    setIsModalOpen(false);
    setBackstage(false);
  }
   
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
   

  const nextPage = (page)=>{

    setSelectedSubPage(page);
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
                      setSelectedSubPage={setSelectedSubPage}  
                      isOpen ={isModalOpen} 
                      close={closeModal_1} 
                      closeModalOnly = {setIsModalOpen} 
                      setSubPagesCount={setSubPagesCount}
                      setNotFound={setNotFound}
                      role={user.role}

                      >

                      </SearchModal>
               
                    <HiddenWrapper>            
      {

                  loading

                  ?
                      <Circle Load={loading} position='static' marginTop={30}/>    
                  :

                  <React.Fragment>

                    <SearchBox>

                                 <div style={{ fontSize: 18}}> <i style={{ marginRight: 8 }} className="fas fa-user-friends"></i>  { isOnlySubBranch  ? 'BAYİLER'  : 'PERSONELLER'}   </div>

                                  <InnerSearch onClick={() => {
                                    
                                    setBackstage(true);
                                    setIsModalOpen(true)

                                  }}> <i className="fas  fa-search "></i> ARAMA YAP 
                                  
                                  </InnerSearch>

                    </SearchBox>

                    
                    {!notFound ?  <h1 style={{marginBottom:20,color:'lightblue',fontSize:16,color:'#52de97'}}>( {subPagesCount} ) Sonuç Bulundu </h1> : null }
                    
                    <_PersonelList currentRole = {user.role}  personels={personels} notFound={notFound} SwitchRow={SwitchRow} refs={refs} />

        <SubPagesContainer>
              {
                subPageNumber > 1 && personels.length !== 0 && !notFound ?  new Array(subPageNumber).fill().map((item, index) => { 
                return <SubPageItem  key={index} selected={ selectedSubPage === index }  onClick={() => nextPage(index)}>{index + 1}</SubPageItem>})
                :
                null
              }
        </SubPagesContainer>


        </React.Fragment>     
      }
               
            </HiddenWrapper>
          </ListWrapper>

        
      }
    </UpdateLoggedin>
}

export const _PersonelList = ({ personels,notFound,SwitchRow,refs,width,role,isProfil,currentRole })=>{
           
       
        if( role && !isProfil )
        {

           var notFoundText = `Henüz , Bu ${role}ye Bağlı  Bir Bayi  Bulunmamaktadır.`

        }
        else if( isProfil )
        {

           var notFoundText = `Henüz , Size  Bağlı  Bir Bayi  Bulunmamaktadır.`

        }
        else
        {

            var notFoundText = `Herhangi Bir Sonuç Bulunamadı.`

        }

        return  <PersonelList_ width={width}>

        <PersonelListItem>  

                <PersonelListItemInnerWrapper>
                    {
                      TopRows.map((item)=>{
                      return !item  ? <InnerTopSpan key={item} style={{flex:'0.05'}}  key={item}></InnerTopSpan> :  <InnerTopSpan key={item}>{item}</InnerTopSpan> 
                      })
                    }
                  </PersonelListItemInnerWrapper>
                  
        </PersonelListItem>

        {
            personels.length <= 0  && notFound ? <h1 style={{textAlign:'center' , padding:20,letterSpacing:1 , fontSize:17 , color:'#00909e'}}>{ notFoundText }</h1> : null
        }

        { 
            personels.length  <= 0 && !notFound ? <h1 style={{textAlign:'center' , padding:20,letterSpacing:1 , fontSize:17, color:'#00909e'}}> <i className="fas fa-search"></i> Lütfen Bir Arama Yapınız.</h1> : null
        }
        

      {

      personels.map((item,index)=>{

      return  <PersonelListItem style={{background:index%2==0 ? '#ececec' : '#fcf8f3'}}   key={item._id} ref={refs.current[index]}>

          <PersonelListItemInnerWrapper>

              <InnerSpan>{item.firstName}</InnerSpan>

              <InnerSpan>{item.lastName}</InnerSpan> 

              <InnerSpan>{item.role}</InnerSpan>

              <InnerSpan>{ item.region || '—'  }</InnerSpan>

              <InnerSpan>{item.contractDate}</InnerSpan>

              <IconInnerSpan style={{flex:'0.1'}} onClick={SwitchRow(-50,refs.current[index])}>

                <SwitchButton >
                  <i className="fas fa-arrow-circle-left"></i>
                </SwitchButton>

              </IconInnerSpan>

          </PersonelListItemInnerWrapper>    


      <PersonelListItemInnerWrapper style={{backgroundColor:'#204051'}}> 

       <div style={{display:'flex',flex:1}}>

            {
                PersonelOptions.map((subItem,Mainindex)=>{
                
                  if( item.role !== 'Temsilci' && subItem.desc === 'Bayiler' ) return null ;
                  if( item.role === 'Admin'    && subItem.desc === 'Raporlar' ) return null;
                  if( currentRole !==  'Admin' && subItem.desc === 'Yetkiler' ) return null ;
                   
                  return <PersonelListIconWrapper key={Mainindex}>
                            
                      <Link  to={'/home/personel_listesi/'+ subItem.desc.split(' ').join('_').toLowerCase() +'/'+ item._id} style={{display:'flex',flexFlow:'column',justifyContent:'center',alignItems:'center',padding:'6px',fontSize:'12px',color:'white', textDecoration:'none'}}>
                          {subItem.Icon}
                          <span>{subItem.desc}</span>
                      </Link>
                      
                  </PersonelListIconWrapper> 
        
                })
            }

        </div>


          <IconInnerSpan  onClick={SwitchRow(0,refs.current[index])}   style={{flex:'0.1'}}>
                    <SwitchButton>
                        <i className="fas fa-arrow-circle-right"></i>
                    </SwitchButton>  
          </IconInnerSpan>

      </PersonelListItemInnerWrapper>


      </PersonelListItem>
      })

      }
        
      </PersonelList_> 

}

export default PersonelList ; 