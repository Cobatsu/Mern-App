import React,{useMemo,useState,useEffect,useCallback,useRef,useContext} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {restrictWord}  from '../../../../Utilities/utilities'
import {Context} from '../../../../Context/Context'

const NavWrapper = styled.div`
display:flex;
background:white;
width:100%;
justify-content:space-between;
box-shadow: 0 10px 6px -6px #dcd6f7;
min-height:45px;
position:fixed;
z-index:2;
top:0;
left:0;
`

const Holder = styled.div`
min-height:53px;
`

const SideBarWrapper = styled.div`
height:${({sideBarStatus})=>sideBarStatus? '100%' : '0' };
width:100%;
background:white;
transition:400ms;
background:white;
position:fixed;
z-index:5;
top:45.4px;
overflow:hidden;
left:0;
`
const LinkContainer = styled.div`
padding:8px 3px 0 3px;
height:93%;
width:100%;
overflow:scroll;

`

const SideBarElement = styled.div`
transition:200ms;
display:flex;
padding:10px;
justify-content:space-between;
background:${({selected})=>selected ? '#3b6978' : 'none'};
color:${({selected})=>selected ? 'white' : 'black'};
`

const SideBarMenuIconWrapper = styled.div`
display:flex;
align-items:center;
font-size:25px;
justify-content:center;
flex:0.5;
background:#f7f7f7;
max-width:50px;
`

const ItemProfile = styled.div`
display:flex;
flex:0.6;
max-width:120px;
position:relative;
background-color:#f7f7f7;
`

const InnerGeneralWrapper = styled.div`
width:100%;
margin-bottom:10px;
`
//-------------------------

const SubLinks = styled.ul`
height: ${({selected,factor})=> selected ? (factor*38) + 'px' : '0' };
transition:300ms;
background:#204051;
margin-botttom:5px;
overflow:hidden;
margin:0;
padding:0;
`

const SubLinkItem = styled.li`
&:hover{
    background:#ff6363;
}
`
const IconDropDown = styled.span`

`
//-----------------------

const InnerItemText  = styled.span`
font-size:15px;
margin-right:4px;
text-align:center;
text-transform: capitalize;
`

const ResponsiveNav = ({ user,subMenu,match,logOutHandler })=>{

    const [sideBarStatus , setSideBarStatus ] = useState(false);
  
    if(sideBarStatus)
        document.body.style.overflowY='hidden';
    else
        document.body.style.overflowY='scroll'; 

    return <React.Fragment>

            <Holder/>

         

                <NavWrapper>

                    <SideBarMenuIconWrapper onClick={()=>setSideBarStatus((prevState)=>!prevState)}>
                        <i className="fas fa-bars"></i>
                    </SideBarMenuIconWrapper>

                    <ItemProfile>   
                                    <Link onClick={()=>setSideBarStatus(false)}  className='responsiveLink'  to='/home/profil/genel_bilgiler'  style={{textDecoration:'none',flex:1,display:'flex',alignItems:'center',justifyContent:'center',color:'black'}}>
                                        <InnerItemText>{restrictWord(user.firstName,10)}</InnerItemText>
                                    </Link>  

                    </ItemProfile>

                </NavWrapper>

                <SideBar logOutHandler={logOutHandler} sideBarStatus={sideBarStatus} subMenu={subMenu} setSideBarStatus={setSideBarStatus} match={match} /> 
            
           

    </React.Fragment> 
   
}


const SideBar  = ({sideBarStatus,subMenu,match,setSideBarStatus,logOutHandler})=>{

    const [subLinks , setSubLinks ] = useState([]);
    const { state , dispatch } = useContext(Context);

     const onClickSubLink  = (index)=>{
        subLinks.includes(index) 
        ? 
        setSubLinks((prevState)=>prevState.filter((item)=>item !== index)) 
        :
        setSubLinks((prevState)=>prevState.concat(index));
     } 

     useEffect(()=>{

        if(!sideBarStatus) setSubLinks([]); //here we rest the array , when sideBar is closed

     },[sideBarStatus])

     return <SideBarWrapper  sideBarStatus={sideBarStatus} >
            
             <LinkContainer>
             
             <InnerGeneralWrapper style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
             
                    <Link to='/home' onClick={()=>setSideBarStatus(false)}  className='responsiveLink'  style={{display:'block',color:'black',padding:10,textDecoration:'none',textAlign:'left',justifyContent:'center',width:'100%',height:'100%'}} >
                        Ana Sayfa
                    </Link>
                    
                    <i style={{fontSize:20,marginRight:10}} className="fas fa-home"></i>

            </InnerGeneralWrapper>

             {
                subMenu.map((item,index)=>{
                                    
                    return <InnerGeneralWrapper key ={index}>
                    
                    <SideBarElement selected={subLinks.includes(index)}  onClick={()=>onClickSubLink(index)}>

                        <span>{item.type}</span> 
                        <IconDropDown selected={subLinks.includes(index)} > <i style={{transform:subLinks.includes(index) ? 'rotate(-180deg)':'rotate(0)',transition:'300ms'}}  className="fas fa-caret-down"></i>  </IconDropDown>

                    </SideBarElement>

                    {
                     
                          <SubLinks  selected={subLinks.includes(index)}  factor={item.props.length}>

                          {
                              item.props.map((subItem,index)=>{
                               return <SubLinkItem key={index}>

                                   <Link 
                                   
                                   onClick={()=>{
                                    dispatch({type:'RESET'});
                                    setSideBarStatus(false);      
                                   }}
                                   to={match.path + '/' + subItem.split(' ').join('_').toLocaleLowerCase() }
                                   style={{display:'block',width:'100%',height:'100%',color:'white',padding:'7px  11px',textDecoration:'none'}}>
                                
                                         {subItem}
                                   </Link>
                                   
                               </SubLinkItem>
                              })
                          }

                          </SubLinks>

                    } 
                    
                </InnerGeneralWrapper>

                })
             }    

             <InnerGeneralWrapper  style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                
             <div onClick={logOutHandler}  style={{height:'100%',background:'#32afa9',color:'white',padding:10}}>

                    <span> Çıkış Yap </span>    
                    <i style={{fontSize:20}} className="fas fa-sign-out-alt"></i>
                    
             </div>

             </InnerGeneralWrapper>

             </LinkContainer>   
            
     </SideBarWrapper>
}

export default ResponsiveNav;
