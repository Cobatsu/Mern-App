
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