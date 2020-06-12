import React , { useEffect , useState } from 'react';
import styled from 'styled-components';


const AnnouncementList = styled.ul`
padding:0;
margin:0;
width:100%;
background:#1f4068;
color:black;
`

const AnnouncementElement = styled.li`
padding:12px 15px;
font-size:13px;
width:100%;
color:white;
&:hover{
    background:#00909e
}
`


const AnnouncementSComponent = ( { isOpen , isFirstItem , Announcements} )=>{
     
     const checkIsFirstItem = (index) => { if ( index === 0 ) isFirstItem(true); else isFirstItem(false);}

     return isOpen &&  <AnnouncementList>

         {

            Announcements.map((item,index)=> <AnnouncementElement onMouseOver = { ()=> checkIsFirstItem(index) }  onMouseOut={ ()=> isFirstItem(false) }> {item}  </AnnouncementElement> )

         }


     </AnnouncementList> 

};


export { AnnouncementSComponent } ; 
