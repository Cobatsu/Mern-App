import React from 'react';
import styled from 'styled-components'


const Capsule = styled.div`
display:flex;
align-items:center;
justify-content:center;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
border-radius:4px;
background:rgba(255, 93, 108, .08);
color:#fa4659;
font-weight:bold;
font-size:11.6px;
padding:6px;
`

export const PermissionsNumbers = {
  REMOVE: 1,
  UPDATE: 2,
  ADD: 3,
  READ: 4,
}

export const restrictWord = (word,limit)=>{
  
    var finalText = word.toLowerCase() ; 

    if( word.length > limit )  finalText = finalText.slice(0,limit) + '...'
   
    return finalText ; 

}

export const checkPhoneNumber = (input)=>{

    return input.split('').filter((item) => parseInt(item) || item === '0' ).length < 10 ; 

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
    
        var registerState = item.registerState ; 
    
        return [
    
          restrictWord( item.StudentInfo.name , 16) , 
          restrictWord( item.StudentInfo.surname , 16) ,
          <Capsule  style={ {...studentStatusColor(registerState).style}} >  { studentStatusColor(registerState).text } </Capsule>,
          item.owner._id === id  ?  <Capsule>{restrictWord(fullName,16)}</Capsule> : restrictWord(fullName,16) ,
          item.registerDate 
        
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
        'Kişi / Okul',
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
          restrictWord( item.reportType === 'schoolReport' ? item.schoolName : item.relatedPersonName , 17 ) , 
          item.relatedPersonPhoneNumber,
          item.reportType === 'schoolReport' ? 'Okul Görüşmesi' : 'Öğrenci Görüşmesi'  ,
          item.meetingDate,
          <Capsule  style={ {...statusColors(item).style}} >  { statusColors(item).text } </Capsule>,
          !item.isContacted ? '—' : item.owner._id == id ? <Capsule> { restrictWord(fullName,15) } </Capsule> : restrictWord(fullName,13)
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

    const filterIconOptions = ( user ) => {

        var  PersonelOptions = [
          {desc:'Genel Bilgiler',Icon:<i className="fas fa-user-friends"></i>},
          {desc:'Bayiler',Icon:<i    className="fas fa-code-branch"/>},
          {desc:'Raporlar',Icon:<i   className="fas fa-sticky-note"></i>},
          {desc:'Yetkiler',Icon: <i  className="fas fa-unlock"></i>},
          {desc:'Öğrenciler', Icon:<i class="fas fa-user-graduate"></i>}
        ]
    
        const { role } = user ; 
        
        if( currentUser.role !== 'Admin' ) {  
            
          PersonelOptions =  PersonelOptions.filter(( { desc } )=> desc !== 'Yetkiler' ) ;

        } 
    
        if( role !== "Temsilci" ) { 

          PersonelOptions =  PersonelOptions.filter(( { desc } )=> desc !== 'Bayiler' ) ;

        } 
        
        if ( role === "Admin" ) {

            PersonelOptions =  PersonelOptions.filter(( { desc } )=> desc !== 'Raporlar' &&  desc !== 'Öğrenciler' ) ;

        }
    
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
               color:'#e7305b',
            }

       }


    } else if( isContacted && !isFormFilled && !isFormSent ) {
        
        return {

             text: 'Görüşme Yapıldı' , 
             style:{
              backgroundColor:'rgba(0, 189, 170, .06)' , 
              color:'#00bdaa',
             }

        }

    } else if( isContacted && !isFormFilled && isFormSent  ) {
         
        return {

            text: 'Form Gönderildi' , 
            style:{
               backgroundColor: 'rgba(249, 196, 154, .25)' , 
               color:'#f37121',
            }

       }

    } else if( isContacted && isFormFilled && isFormSent  ) {

        return {

            text: 'Ön Kayıt' , 
            style:{
               backgroundColor: 'rgba(0, 168, 181, .1)' , 
               color:'#00a8b5',
            }

       }
      
    }
  
}


export const studentStatusColor = ( registerState )=>{

   const  { docState , result:{ result } , pendingResult , isContracted } = registerState ; 
   



  if( docState && !result && !pendingResult && !isContracted) { 

      return {

          text: 'Belgeler Tamamlandı' , 
          style:{
              backgroundColor: 'rgba(121, 215, 15, .1)' , 
              color:'#0c9463',
           } ,
           icon: <i style={{marginLeft:8}} class="fas fa-clipboard-check"></i>

     }

  } else if ( docState && !result && pendingResult && !isContracted) {
   
      return {

          text: 'Onay Bekleniyor' , 
          style:{
             backgroundColor:'rgba(95, 108, 175, .1)' , 
             color:'#5f6caf',
          } , 
          icon: <img style={{marginLeft:7}} width='25' height='25' src='/animation_500_kbv6hrft.gif' />
          // icon: <i style={{marginLeft:8}}  class="fas fa-hourglass-start"></i> 

     }


  } else if ( docState && result && !pendingResult && !isContracted ) {

    return {

      text: 'Öğrenci Onaylandı' , 
      style:{
         backgroundColor:'rgba(0, 189, 170, .06)' , 
         color:'#00bdaa',
      }, 
      icon: <i style={{marginLeft:8}} class="fas fa-thumbs-up"></i>


    }
    
  } else if ( docState && result && !pendingResult && isContracted  ) {


    return {

      text: 'Sözleşme Yapıldı' , 
      style:{
         backgroundColor:'rgba(0, 189, 170, .06)' , 
         color:'#00bdaa',
      }, 
      icon: <i style={{marginLeft:8}} className="fas fa-file-signature"></i>


    }


  } else {

    return {

      text: 'Belgeler Eksik' , 
      style:{
         backgroundColor:'rgba(226, 151, 156, 0.1)' , 
         color:'#e7305b',
      },
      icon: <i style={{marginLeft:8}}  class="fas fa-ban"></i>
      
    }

  }

  

}
