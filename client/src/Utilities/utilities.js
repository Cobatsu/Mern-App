import React from 'react';
import styled from 'styled-components'

const Capsule = styled.div`
display:flex;
align-items:center;
justify-content:center;
border-radius:4px;
background:rgba(255, 93, 108, .08);
color:#fa4659;
border:1px solid #fa4659;
font-size:11.6px;
padding:6px;
`

export const restrictWord = (word,limit)=>{
  
    var finalText = word.toLowerCase() ; 

    if( word.length > limit )  finalText = finalText.slice(0,limit) + '...'
   
    return finalText ; 

}

export const studentStatusColor = ( docState )=>{

  
    if( docState ) { 


        return {

            text: 'Belgeler Tamamlandı' , 
            style:{
                backgroundColor: 'rgba(121, 215, 15, .1)' , 
                border:'1px solid #0c9463',
                color:'#0c9463',
             }

       }

    } else {

        return {

            text: 'Belgeler Eksik' , 
            style:{
               backgroundColor:'rgba(226, 151, 156, 0.1)' , 
               border:'1px solid #e7305b',
               color:'#e7305b',
            }

       }
    }

}

export const studentListHelperPackage = ( id )=>{
    

    const filterIconOptions = (student)=>{

        var  studentOptions = [
    
          {
            desc: ' Ön Kayıt Bilgileri ',
            Icon: <i class="far fa-file-alt"></i>
          },
          
        ]
    
        return studentOptions ; //just for now
    
      }
    
      const pathGenerator = ( _ , id )=> '/home/ön_kayıt/' + id ; 

      const TopRows = [
        'İsim',
        'Soy İsim',
        'Kayıt Durumu',
        'Referans Kişi',
        'Kayıt Tarihi',
        '',
      ]
    
      const tableInformations = ( item ) => {
    
        var fullName = item.owner.firstName + ' ' + item.owner.lastName ; 
    
        var docState = item.StudentInfo.registerState.onkayit.docState ; 
    
        return [
    
          restrictWord( item.StudentInfo.information.name , 13) , 
          restrictWord( item.StudentInfo.information.surname , 13) ,
          <Capsule  style={ {...studentStatusColor(docState).style}} >  { studentStatusColor(docState).text } </Capsule>,
          item.owner._id === id  ?  <Capsule>{restrictWord(fullName,13)}</Capsule> : restrictWord(fullName,13) ,
          item.StudentInfo.registerdate 
        
        ]
    
      } 
    

      return {

        filterIconOptions,
        pathGenerator,
        TopRows , 
        tableInformations

      }

}


export const reportListHelperPackage = (id) => {

    const TopRows = [
        'Görüşülen Kişi',
        'Telefon Numarası',
        'Görüşme Tipi',
        'Görüşme Tarihi',
        'Görüşme Durumu',
        'Görüşen Kişi',
        '',
      ]
      
    
    const filterIconOptions = ()=>{
    
        var  reportOptions = [
          {
            desc: 'Görüşme Bilgileri',
            Icon: <i className="fas fa-user-friends"></i>
          },
        ]
    
        return reportOptions ; //just for now
    
    }

    const tableInformations = ( item  )=> {

        if(item.owner) {
          var fullName = item.owner.firstName + ' ' + item.owner.lastName ; 
        }
    
        return [
          restrictWord( item.relatedPersonName , 13 ) , 
          item.relatedPersonPhoneNumber,
          item.reportType === 'schoolReport' ? 'Okul Görüşmesi' : 'Öğrenci Görüşmesi'  ,
          item.meetingDate,
          <Capsule  style={ {...statusColors(item).style}} >  { statusColors(item).text } </Capsule>,
          !item.isContacted ? '—' : item.owner._id == id ? <Capsule> { restrictWord(fullName,13) } </Capsule> : restrictWord(fullName,13)
        ] 
    
      } 
    
      const pathGenerator = ( _ , id )=> '/home/raporlar/' + id ; 

        

      return {

        filterIconOptions,
        pathGenerator,
        TopRows , 
        tableInformations

      }

}

export const personelListHelperPackage = ( currentUser ) => {

    const TopRows  =  [
        'İsim',
        'Soy İsim',
        'Rol',
        'Bölge',
        'Sözleşme Tarihi',
        '',
    ]

    const filterIconOptions = ( user )=>{

        var  PersonelOptions = [
          {desc:'Genel Bilgiler',Icon:<i className="fas fa-user-friends"></i>},
          {desc:'Bayiler',Icon:<i    className="fas fa-code-branch"/>},
          {desc:'Raporlar',Icon:<i   className="fas fa-sticky-note"></i>},
          {desc:'Yetkiler',Icon: <i  className="fas fa-unlock"></i>},
          {desc:'Öğrenciler', Icon:<i class="fas fa-user-graduate"></i>}
        ]
    
        const { role } = user ; 
        
        if( currentUser.role !== 'Admin' &&  currentUser.role ) PersonelOptions =  PersonelOptions.filter(( { desc } )=> desc !== 'Yetkiler' ) ;
    
        if( role !== "Temsilci" ) PersonelOptions =  PersonelOptions.filter(( { desc } )=> desc !== 'Bayiler' ) ;
    
        return PersonelOptions ; 
        
    }

    const tableInformations = ( item )=> {

        return [
          
          restrictWord( item.firstName , 13) , 
          restrictWord( item.lastName , 13),
          item.role,
          item.role === 'Admin' ? '—' : item.region,
          item.contractDate ]
    
    } 

    
  const pathGenerator = ( item , id ) => {

    if( item === 'Raporlar' || item === 'Bayiler' ) { var pageQuery = '?pageNumber=1' } else { var pageQuery = '' }

     return '/home/personel_listesi/' + item.split(' ').join('_').toLowerCase() + '/' + id + pageQuery ;
  }

    return {

        filterIconOptions,
        pathGenerator,
        TopRows , 
        tableInformations

    }
    
}




export const statusColors = (report) => {

    const { isContacted , isFormFilled , isFormSent } = report ; 
    

    if(!isContacted && !isFormFilled && !isFormSent ) {
       
        return {

            text: 'Beklemede' , 
            style:{
               backgroundColor:'rgba(226, 151, 156, 0.1)' , 
               border:'1px solid #e7305b',
               color:'#e7305b',
            }

       }


    } else if( isContacted && !isFormFilled && !isFormSent ) {
        
        return {

             text: 'Görüşme Yapıldı' , 
             style:{
                backgroundColor: 'rgba(121, 215, 15, .1)' , 
                border:'1px solid #0c9463',
                color:'#0c9463',
             }

        }

    } else if( isContacted && !isFormFilled && isFormSent  ) {
         
        return {

            text: 'Form Gönderildi' , 
            style:{
               backgroundColor: 'rgba(249, 196, 154, .25)' , 
               border:'1px solid #f37121',
               color:'#f37121',
            }

       }

    } else if( isContacted && isFormFilled && isFormSent  ) {

        return {

            text: 'Ön Kayıt' , 
            style:{
               backgroundColor: 'rgba(9, 108, 71, .1)' , 
               border:'1px solid #096c47',
               color:'#096c47',
            }

       }
      
    }
  
}
