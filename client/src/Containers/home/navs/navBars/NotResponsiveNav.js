import React,{useContext,useState,useEffect,useRef,createRef,useMemo,useCallback} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {restrictWord}  from '../../../../Utilities/utilities'
import  { AnnouncementSComponent } from '../../../../Components/Navbar/Announcement '

const NavWrapper = styled.div`
display:flex;
background:white;
width:100%;
justify-content:space-between;
box-shadow: 0 10px 6px -6px #dcd6f7;
min-height:45px;
`

const Item = styled.div`
display:flex;
justify-content:center;
align-items:stretch;
padding:0;
position:relative;
@media (max-width: 1030px) {
    display:none;
}
`

const ItemProfile = styled.div`
flex:0.1;
position:relative;
background-color:#f7f7f7;
&:hover{
    background-color:#ff6363;
    color:white;
    cursor:pointer;
}

@media (max-width: 1030px) {
    display:none;
}
`
const Logout = styled.button`
align-self:stretch;
flex:0.8;
padding:0;
border:none;
&:hover{
    background-color:#0779e4;
    color:white;
    cursor:pointer;
}
`

const InnerItemLink = styled.span`
transition:100ms;
font-size:15px;
box-sizing:border-box;
display:flex;
align-items:center;
justify-content:center;
flex:1;
text-align:center;
transition:100ms;
background-color:${({isSelected})=>isSelected ? '#00909e' : 'none' };
color:${({isSelected})=>isSelected ? 'white': '#707070' } !important;
&:hover{
    cursor:pointer;
    background-color:#00909e !important;
    color:white !important;
}
`
const InnerItemText  = styled.span`
font-size:15px;
margin-right:4px;
text-align:center;
text-transform: capitalize;
`

const Sublist  =  styled.ul`
width:100%;
padding:0;
background-color:#1f4068;
display:block;
box-shadow: 0 10px 6px -6px #dcd6f7;
`
const SublistItem = styled.li`
text-align:center;
transition:100ms;
&:hover{
    background-color:#00909e;
    cursor:pointer;
}
`

const SubContainer = styled.div`
display:flex;
justify-content:center;
color:white;
position:absolute;
width:100%;
top:100%;
z-index:200;
`

const ArrowIcon = styled.div`

position:absolute;
left:auto;
right:auto;
top:80%;
color:${({isFirstItem})=> isFirstItem ?  '#00909e' : '#1f4068'};
font-size:30px;
display:${({isSelected})=>isSelected  ? 'block':'none'};

`


const Announcements = [

    '  - Sayfa içi  ileri geri yaparken verinin kaybolma sorunu çözüldü .' ,
   
    '  - Personel eklerken çoklu il seçim bölümü eklendi . ' , 
  
    '  - Öğrenci ve Okul raporlarına Bölge  ve İlçe bölümü eklendi . ' , 
  
    '  - Raporlarınızın Bölge ve İlçe kısımlarını güncelleyebilirsiniz . '
  
  ]

const NotResponsiveNav = ({logoutHandler,subMenu,user,setSubLeave,setSubEnter,match,hideSubList})=>{
    
     const [ selectedElement , setSelectedElement] = useState(null);

     const [ announcement , setAnnouncement ]  = useState(null);

     const [ isFirstItem , setIsFirstItem ] = useState(null);


     return <NavWrapper>

     <Item style={{flex:0.16 , alignItems:'stretch',justifyContent:'flex-start'}}>

            <Logout onClick={logoutHandler}> Çıkış Yap </Logout>  

            <InnerItemLink style={{padding:0 ,flex:1}}>
                
                <Link to='/home'  style={{textDecoration:'none',display:'flex',alignItems:'center',justifyContent:'center',color:'#707070',width:'100%',height:'100%'}}>
                <i className="fas fa-home" style={{marginRight:5}}></i>
                    Ana Sayfa
                </Link>
            
            </InnerItemLink>

     </Item>
 
    <Item style={ {flex:subMenu.length*0.1} }>

            {
                subMenu.map((item,index)=>{

                    return   <InnerItemLink style={{ position:'relative'  }}  key={item.type} isSelected={selectedElement === index}  onMouseOut={()=>setSelectedElement(null)}  onMouseOver={()=>setSelectedElement(index)}>{item.type}

                             <ArrowIcon style={{top:'70%'}} isSelected = { selectedElement === index }  isFirstItem = { isFirstItem  }> 

                                  <i class="fas fa-caret-up"/>

                             </ArrowIcon>
            
                    </InnerItemLink> 
                })
            }

            <SubContainer>

                            {

                                    subMenu.map((mainItem,index)=>{

                                        return  < div style={{ width:'100%', paddingTop: selectedElement === index ? 12 : 0 , display: selectedElement === index  ? 'block' : 'none' }}   onMouseEnter={()=>setSelectedElement(index)} onMouseLeave={()=>setSelectedElement(null)}  >
                                    
                                        <Sublist onClick={()=>setSelectedElement(null)}    key={mainItem.type} > 
                                                        
                                            {
                                                mainItem.props.map((item,index)=>{
                                                    return   <SublistItem   key={index} onMouseOver = { ()=>{ index === 0 && setIsFirstItem(true)  } } onMouseOut = { ()=> setIsFirstItem(null) }>
                                                        
                                                        <Link to={ match.path + '/' + item.split(' ').join('_').toLocaleLowerCase() }  style={{textDecoration:'none',display:'block',width:'100%',height:'100%',color:'white',padding:10}}>{item}
                                                        </Link>

                                                        </SublistItem>
                                                })
                                            }

                                        </Sublist>  

                                        </div>
                                        
                                    })  

                            }

                
                
            </SubContainer>

    </Item>
                    <Item style={{flex:0.2}}>

                        <InnerItemLink style={{ position:'relative'  }} isSelected = { announcement } onMouseOut= { ()=>setAnnouncement(false) }  onMouseOver = { ()=>setAnnouncement(true) }>

                            <i style = {{ fontSize:19.5 , color: announcement ? 'white' : '#d63447'  }} class="fas fa-exclamation-circle"></i>    
                                 
                            <span style={{ marginLeft:10 , fontWeight:'550' }}> Duyurular </span> 

                            <ArrowIcon isSelected = {announcement}  isFirstItem = {isFirstItem}>
                                  <i class="fas fa-caret-up"/>
                            </ArrowIcon>
                           
                          
                        </InnerItemLink>


                        <InnerItemLink style={{background:'#f3f5f9'}}>

                            <Link to='/home/profil/genel_bilgiler'  style={{textDecoration:'none',display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%',color:'#707070'}}>
                                    <InnerItemText>{restrictWord(user.firstName,10)}</InnerItemText>
                            </Link>    

                        </InnerItemLink>

                        <SubContainer style={{ width:'200%' ,left:'-96%' }}>
                                  
                                  
                            <div style={{ width:'80%', paddingTop: announcement ? 16 : 0 }} onMouseEnter={()=>setAnnouncement(true)} onMouseLeave={()=>setAnnouncement(false)} >

                                  <AnnouncementSComponent isOpen = { announcement } isFirstItem = { setIsFirstItem } Announcements = { Announcements } />

                            </div>


                        </SubContainer>

                     </Item>
  </NavWrapper>

}


export default NotResponsiveNav ;
