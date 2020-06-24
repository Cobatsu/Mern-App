import React from 'react' ; 
import styled from 'styled-components' ;
import { Link } from 'react-router-dom'

const Icon = styled.div`
border-radius:5px;
padding:5px 10px;
color:white;
background:#00a8cc;
font-size:15px;
margin-right:10px;
&:hover{
    cursor:pointer;
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
        <i style={{marginLeft:6}} className="fas fa-trash-alt"></i>
         
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
            style={{background:'#b5076b'}} 
            onClick = {handler} > Onaya Gönder  
            <i style={{marginLeft:6}} class="fas fa-search"></i>  
    </Icon>

)
