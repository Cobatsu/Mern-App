import React,{useContext,useState,useEffect,useRef,createRef,useMemo,useCallback} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

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
font-size:15px;
box-sizing:border-box;
display:flex;
align-items:center;
justify-content:center;
flex:1;
text-align:center;
transition:100ms;
background-color:${({isSelected})=>isSelected ? '#ff6363' : 'none' };
color:${({isSelected})=>isSelected ? 'white' : 'black' };
&:hover{
    cursor:pointer;
    background-color:#ff6363;
    color:white;
}
`
const InnerItemText  = styled.span`
font-size:15px;
margin-right:4px;
text-align:center;
`

const Sublist  =  styled.ul`
width:100%;
padding:0;
background-color:#588da8;
display:${({isSelected})=>isSelected?'block':'none'};
`
const SublistItem = styled.li`
text-align:center;
&:hover{
    background-color:#fb7b6b;
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

const NotResponsiveNav = ({logoutHandler,subMenu,user,setSubLeave,setSubEnter,match,hideSubList})=>{
    
     const [selectedElement , setSelectedElement] = useState(null);
     
    
     return <NavWrapper>

     <Item style={{flex:0.16 , alignItems:'stretch',justifyContent:'flex-start'}}>

            <Logout onClick={logoutHandler}> Çıkış Yap </Logout>  

            <InnerItemLink style={{padding:0 ,flex:1}}>
                
                <Link to='/home'  style={{textDecoration:'none',display:'flex',alignItems:'center',justifyContent:'center',color:'black',width:'100%',height:'100%'}}>
                <i className="fas fa-home" style={{marginRight:5}}></i>
                    Ana Sayfa
                </Link>
            
            </InnerItemLink>

     </Item>
 
 <Item style={{flex:0.4}}>

     {
         subMenu.map((item,index)=>{
             return   <InnerItemLink key={item.type} isSelected={selectedElement === index}  onMouseOut={()=>setSelectedElement(null)}  onMouseOver={()=>setSelectedElement(index)}>{item.type}
             </InnerItemLink> 
         })
     }

     <SubContainer>
      {

       subMenu.map((mainItem,index)=>{
        return  <Sublist onClick={()=>setSelectedElement(null)} isSelected={selectedElement === index}  onMouseEnter={()=>setSelectedElement(index)} onMouseLeave={()=>setSelectedElement(null)}    key={mainItem.type} >                  
            {
                 mainItem.props.map((item,index)=>{
                     return   <SublistItem   key={index}><Link to={match.path + '/' + item.split(' ').join('_').toLocaleLowerCase() }  style={{textDecoration:'none',display:'block',width:'100%',height:'100%',color:'white',padding:10}}>{item}</Link>
                         </SublistItem>
                 })
            }                       
         </Sublist>  
         
      })  

     }
     </SubContainer>

     </Item>
                    <ItemProfile>
                         <Link to='/home/profil/genel_bilgiler'  style={{textDecoration:'none',display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%',color:'black'}}>
                             <InnerItemText>{user.firstName}</InnerItemText>
                             <InnerItemText>{user.lastName}</InnerItemText>
                         </Link>    
                     </ItemProfile>
  </NavWrapper>

}


export default NotResponsiveNav ;
