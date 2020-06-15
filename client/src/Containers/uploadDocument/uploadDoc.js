import React , {useState , useEffect} from 'react';
import styled from 'styled-components'
import {unstable_batchedUpdates} from 'react-dom'
import {useLocation , useHistory} from 'react-router-dom'
import axios from 'axios'

const SubmitButton = styled.button`

display:flex;
justify-content:center;
align-items:center;
position:relative;
border-radius:6px ;
outline:none;
border:none;
color:white;
background:#00909e;
min-height:50px;
min-width:150px;
margin-top:30px;
font-size:14px;
align-self:flex-end;
&:hover{
    cursor:pointer;
}

`

const Item = styled.form`
width:55%;
margin: 0 auto ; 
display:flex;
flex-flow:column;
align-items:center;
justify-content:center;

`

const ImageFields = [

    "A government issued photo identification" , 

    "Rosedale English Proficiency Test Results" ,

    "English Proficiency Test Results",

    "A copy of translated transcripts ",

]

const useQuery = ()=> new URLSearchParams(useLocation().search) ;

const InitialState = {
    I1:{name:''},
    I2:{name:''},
    I3:{name:''},
    I4:{name:''},
}


const RequiredDocs = ()=>{

    const [ images , setImages ] = useState(InitialState);
    const [ loading , setLoading ] = useState(true);
    const [ tokenError , setTokenError ] = useState(false);
    const [ isAdded , setIsAdded ] = useState(false);
    const [ warning , setWarning ] = useState(false);

    const history  = useHistory();

    const query = useQuery();
    const token = query.get('token');
   
    
    if(!token) { history.goBack(); }

    useEffect(()=>{

        setLoading(true)  ;

        axios.post('/api/register/uploadDocuments',{},{ headers: {"Authorization": `Bearer ${token}`}}).then((res)=>{

            const { error , isVerified  } = res.data ; 

           if( error ) { setTokenError(true) ;  }
           
           if( isVerified ) { setLoading(false) ; }

           setLoading(false);

        }).catch((err)=>{

            setTokenError(true) ; 
            setLoading(false);

        })
           
    },[])

   
    
    const imageHandlerFactory=(type)=>{       
        return (e)=>{  
            setImages({...images,[type]:e.target['files'][0] || {name:''}});
        }
    }

    const submitImages = (e)=>{

        let isEmpty = false ; 

        e.preventDefault();

        Object.values(images).forEach((item)=>{ if(!item.name) {
                
            isEmpty = true ; 
            setWarning(<i className="fas fa-exclamation-circle warning"></i>); 
        
        }
       })

        if(isEmpty) return ; 

        var formData = new FormData();

        for (const key in images) { 

            formData.append("imageName","multer-image-"+Date.now());    
            formData.append('imgCollection', images[key]);

        } 
    
        setLoading(true) ; 

        axios.post('/api/register/uploadDocuments',formData , { headers: {"Authorization": `Bearer ${token}`}}).then((res)=>{
                 
            const { isAdded } = res.data ; 

            if( isAdded ) {

                setIsAdded(true);

            } else {
                
                setTokenError(true);
                
            }

            setLoading(false) ; 

        })

    }

    if( tokenError && !loading  ) {

        return <h1> HATALI TOKEN / INVALID TOKEN </h1>

    }

    if( isAdded && !loading  ) {

        return <h1> BELGELERİNİZ GÖNDERİLMİŞTİR / DOCUMENTS HAVE BEEN SENT  </h1>

    }

    return !loading && !tokenError && !isAdded ?   <div style={{display:'flex' , justifyContent:'center',alignItems:'center' , width:'100%' , height:'100%'}}>
        
        <Item onSubmit={submitImages}>
            
        <h1 style={{textAlign:'center' , fontSize:25 , marginBottom:30}}>REQUIRED DOCUMENTS</h1>

                <div className='Fields' style={{minHeight:'220px'}}>
                           
                           {

                               ImageFields.map((item,index)=>{ 
                                

                                return <div key={index} className="upload-btn-wrapper">

                                    <label  style={{padding:5}}>{item}</label>

                                    <button className="btn">

                                    {
                                        images['I'+ ( index+1 )].name ? 
                                        <i className="fas fa-check-circle"></i>
                                        : null
                                    }

                                    {  images['I'+ ( index+1 )].name || 'Upload a file'}
                                    <input type="file" name="myfile" accept=".png, .jpg, .jpeg , .pdf"   onChange={imageHandlerFactory('I'+ (index+1) )} />

                                    </button>
                                    
                                    {
                                            images['I'+ ( index+1 )].name ? null :  warning
                                    } 

                                </div> })
                                
                           }
                
                </div>

                <SubmitButton>
                    GÖNDER
                </SubmitButton>

        </Item>  

        </div> : null

}
export default RequiredDocs;
