
export const isSearchDataSame = ( history , queryObject , searchMainData ,  querySearchData , location  )=>{
    
    var  queryString = Object.keys(searchMainData).reduce( ( init ,  currentValue , currentIndex )=>{
            
        if(!searchMainData[currentValue]) return init ;

        else return '?' + `${currentValue}=${searchMainData[currentValue]}` + '&' + init.slice(1) ;

    },'')

    queryString = queryString.split('&') ; 

    queryString.pop();

    queryString = queryString.join('&') ; 


    if(Object.keys(queryObject).length === 0 ) { return history.push( location.pathname + ( queryString ?  queryString + '&pageNumber=1'  :  '?pageNumber=1')) };

    var notUndefinedObject = Object.keys(searchMainData).reduce((init,curr)=>{
    
        if(searchMainData[curr]) return {...init,[curr]:searchMainData[curr]} ; 

        else return init ; 

    },{}) 

    for ( const key in notUndefinedObject ) {
      
              
            if(Object.keys(querySearchData).includes(key)) {
               
                if( querySearchData[key] !== searchMainData[key]){
                    
                    return  history.push( location.pathname  +  queryString   + '&pageNumber=1' ); 

                }

            }
            else {

                    return  history.push( location.pathname  +   queryString  + '&pageNumber=1' );

            }

    }
 
    if( Object.keys(notUndefinedObject).length !== Object.keys(querySearchData).length){ return history.push( location.pathname  +    ( queryString ? queryString +  '&pageNumber=1' : '?pageNumber=1' ) );}

   
    return true ; 

}