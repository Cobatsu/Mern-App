
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
               backgroundColor:'rgba(226, 151, 156, 0.25)' , 
               border:'1px solid #e7305b',
               color:'#e7305b',
            }

       }


    } else if( isContacted && !isFormFilled && !isFormSent ) {
        
        return {

             text: 'Görüşme Yapıldı' , 
             style:{
                backgroundColor: 'rgba(135, 223, 214, .25)' , 
                border:'1px solid #58b4ae',
                color:'#58b4ae',
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
               backgroundColor: 'rgba(0, 144, 158, .18)' , 
               border:'1px solid #00909e',
               color:'#00909e',
            }

       }


    }



}