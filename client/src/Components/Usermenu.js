import React from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const UserMenu = styled.div`
flex:0.2;
flex-flow:column;
display:flex;
justify-content:center;
position:relative;
align-items:center;
padding: 15px 5px;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
margin-bottom:10px;
`


const UserMenuContainer = styled.ul`
min-width:200px;
padding:0;
margin:0;
display:flex;
flex-flow:column;
margin-top:10px;
align-items:center;
`
const UserMenuElement = styled.li`
width:80%;
font-size:14px;
margin-top:3px;
opacity:${({selected})=>selected ? 1 : 0.5};
border-radius:3px;
&:hover{
  opacity:1;
}
`
const Capsule = styled.div`
border-radius:4px;
margin-top:10px;
background:#f57170;
color:white;
padding:5px 8px;
font-size:12.5px;
`


const UserImage = styled.img`
max-width:110px;
`

const pathGenerator = ( item , id ) => ( {

   PROFİLE_PATH :  '/home/profil/' + item.desc.split(' ').join('_').toLowerCase(),

   DETAİL_PATH:'/home/personel_listesi/' + item.desc.split(' ').join('_').toLowerCase() + '/' + id

} )
 


const Usermenu = ( { role , firstName , lastName , UserMenuLinks , match:{params:{id}} , subMenuIndex , page  } )=> <UserMenu>
                       
<Capsule style={{position:'absolute',left:0,top:0,margin:0,borderRadius:0,fontSize:11.4,background:'#2fc4b2'}}>
   {role}
</Capsule>

<UserImage  src={'/user.jpg'}></UserImage>

         <Capsule>

            <span style={{marginRight:5}}>{firstName}</span> 
            <span>{lastName}</span>

         </Capsule>

         <UserMenuContainer>

            {
               
               UserMenuLinks.map((item,index)=>{


                  return  <UserMenuElement key={index} selected={subMenuIndex === item.desc.split(' ').join('_').toLowerCase()} >

                     <Link   className='responsiveLink' style={{padding:5,textDecoration:'none' , display:'block'  , width:'100%' , height:'100%'}}  

                     to = { page === 'Profile'  ?  pathGenerator(item).PROFİLE_PATH : pathGenerator(item,id).DETAİL_PATH  }   >

                        {item.Icon} {item.desc}

                     </Link>

                   </UserMenuElement>
               
               })

            }       
                  
         </UserMenuContainer>

</UserMenu> 

export default Usermenu;