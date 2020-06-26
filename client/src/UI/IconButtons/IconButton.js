import React from 'react' ; 
import styled from 'styled-components' ;
import { Link } from 'react-router-dom'

const Icon = styled.div`
display:flex;
align-items:center;
border-radius:5px;
padding:5px 7px;
color:white;
background:#00a8cc;
margin-bottom:5px;
font-size:13px;
margin-right:10px;
&:hover{
    cursor:pointer;
    box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 3), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}
`

export const IconForTextLink = ( { content:Content , id } ) => (

    <Icon style={{background:'#63b7af' , padding:0}}>

            <Link to={'/home/personel_listesi/raporlar/' + id + '?pageNumber=1'} style={{width:'100%',height:'100%',textTransform:'capitalize',textDecoration:'none',color:'white',display:'block',padding:'5px 10px'}}>

               {Content} 
               <i style={{marginLeft:8}} class="fas fa-user"></i> 

            </Link>

    </Icon> 
     
)

export const IconEdit = ( { handler } )=> ( 

    <Icon   
        onClick = { handler } > 
        Düzenle   
        <i style={{marginLeft:6}} className="fas fa-edit"/> 
    </Icon> 

)

export const IconRemove = ( { handler , deletedText  } ) => ( 
   
    <Icon 
        style={{background:'#d9455f'} } 
        onClick = {handler} > 
        
        { deletedText } 
        <i style={{marginLeft:6}} className="far fa-trash-alt"></i>
         
    </Icon>  
    
)

export const IconSendForm  = ( { handler } ) =>(  

   <Icon 
        style={ { background:'#e16262' } } 
        onClick = {handler} > Ön Kayıt Formu Gönder 
        <i class="fas fa-file-signature"></i>  
  </Icon> 
)

export  const IconSendConfirmation = ( { handler } ) => (

    <Icon 
            style={{background:'#ff6464'}} 
            onClick = {handler} > Onaya Gönder  
            <i style={{marginLeft:6}} class="fas fa-search"></i>  
    </Icon>

)

export const confirmStudent = ( { handler } ) => ( 

    <Icon 
        style={{background:'#ff6464'}} 
        onClick = {handler} > Öğrenciyi Onayla 
        <i style={{marginLeft:6}} class="fas fa-user-check"></i>  
    </Icon>

) 
