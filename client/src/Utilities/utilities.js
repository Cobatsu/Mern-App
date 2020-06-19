
export const restrictWord = (word,limit)=>{
  
    var finalText = word.toLowerCase() ; 

    if( word.length > limit )  finalText = finalText.slice(0,limit) + '...'
   
    return finalText ; 

}


export const statusColors = (report) => {

    const { isContacted , isFormFilled , isFormSent } = report ; 
    

    if(!isContacted && !isFormFilled && !isFormSent ) {
       
        return {

            text: 'Beklemede' , 
            style:{
               backgroundColor:'rgba(226, 151, 156, 0.5)' , 
               border:'1px solid #e7305b',
               color:'#e7305b',
            }

       }


    } else if( isContacted && !isFormFilled && !isFormSent ) {
        
        return {

             text: 'Görüşme Yapıldı' , 
             style:{
                backgroundColor: '#87dfd6' , 
                border:'1px solid #58b4ae',
                color:'#58b4ae',
             }

        }

    } else if( isContacted && !isFormFilled && isFormSent  ) {
         
        return {

            text: 'Form Gönderildi' , 
            style:{
               backgroundColor: '#f9c49a' , 
               border:'1px solid #f37121',
               color:'#f37121',
            }

       }

    } else if( isContacted && isFormFilled && isFormSent  ) {

        return {

            text: 'Ön Kayıt' , 
            style:{
               backgroundColor: '#d291bc' , 
               border:'1px solid #b5076b',
               color:'#b5076b',
            }

       }


    }



}