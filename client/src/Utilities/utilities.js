
export const restrictWord = (word,limit)=>{
  
    var finalText = word.toLowerCase() ; 

    if( word.length > limit )  finalText = finalText.slice(0,limit) + '...'
   
    return finalText ; 

}


<<<<<<< HEAD
export const avoidUndefined = ()=>{



}


=======
>>>>>>> ce5ad5f773927d736c978d9869148b9b97015bec
export const statusColors = (report) => {

    const { isContacted , isFormFilled , isFormSent } = report ; 
    

    if(!isContacted && !isFormFilled && !isFormSent ) {
       
        return {

            text: 'Beklemede' , 
            style:{
<<<<<<< HEAD
               backgroundColor:'rgba(226, 151, 156, 0.25)' , 
=======
               backgroundColor:'rgba(226, 151, 156, 0.5)' , 
>>>>>>> ce5ad5f773927d736c978d9869148b9b97015bec
               border:'1px solid #e7305b',
               color:'#e7305b',
            }

       }


    } else if( isContacted && !isFormFilled && !isFormSent ) {
        
        return {

             text: 'Görüşme Yapıldı' , 
             style:{
<<<<<<< HEAD
                backgroundColor: 'rgba(135, 223, 214, .25)' , 
=======
                backgroundColor: '#87dfd6' , 
>>>>>>> ce5ad5f773927d736c978d9869148b9b97015bec
                border:'1px solid #58b4ae',
                color:'#58b4ae',
             }

        }

    } else if( isContacted && !isFormFilled && isFormSent  ) {
         
        return {

            text: 'Form Gönderildi' , 
            style:{
<<<<<<< HEAD
               backgroundColor: 'rgba(249, 196, 154, .25)' , 
=======
               backgroundColor: '#f9c49a' , 
>>>>>>> ce5ad5f773927d736c978d9869148b9b97015bec
               border:'1px solid #f37121',
               color:'#f37121',
            }

       }

    } else if( isContacted && isFormFilled && isFormSent  ) {

        return {

            text: 'Ön Kayıt' , 
            style:{
<<<<<<< HEAD
               backgroundColor: 'rgba(0, 144, 158, .18)' , 
               border:'1px solid #00909e',
               color:'#00909e',
=======
               backgroundColor: '#d291bc' , 
               border:'1px solid #b5076b',
               color:'#b5076b',
>>>>>>> ce5ad5f773927d736c978d9869148b9b97015bec
            }

       }


    }



}