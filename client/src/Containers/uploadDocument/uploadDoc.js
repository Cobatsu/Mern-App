import React , {useState , useEffect} from 'react';
import ReactDOM from 'react-dom'
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
opacity:${({ disabled }) => disabled ? '0.5' : '1'};
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

const ErrorCapsule = styled.div`

padding:30px;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
min-width:200px;
text-align:center;
background:#e00543;
color:white;

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

    "Kimlik Belgesi" , 

    "Rosedale İngilizce Yeterlilik Testi" ,

    "İngilizce Yeterlilik Testi Sonuçları",

    "Transkript Çevirisi",

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
    const [ loading , setLoading ] = useState(false);
    const [ warning , setWarning ] = useState(false);

    const [ result , setResult ] = useState('');
    const history  = useHistory();

    const query = useQuery();
    const token = query.get('token');
   
    
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
                 
            const {  result  } = res.data ; 

            ReactDOM.unstable_batchedUpdates(()=>{

                setResult(result);
                setLoading(false); 

            })

        })

    }


    if( result  === 'Success' ) {

        return  <div style={{display:'flex' , justifyContent:'center',alignItems:'center' , width:'100%' , height:'100%'}}>
            
            <ErrorCapsule style={{background:'#42b883'}}> Belgeleriniz Gönderilmiştir . Bu Bağlantı Tek Seferliktir . Belgelerinizi Tekrar Gönderemeyeceksiniz </ErrorCapsule>

        </div>

    } else if (result === 'Error') {

        return <div style={{display:'flex' , justifyContent:'center',alignItems:'center' , width:'100%' , height:'100%'}}>
            
            <ErrorCapsule > 

                Hatalı Token ,

                Bu Bağlantıyı Yalnızca Bir Kez Kullanabilirsiniz !  
                
            </ErrorCapsule>

        </div>

    } else {

      return   <div style={{display:'flex' , justifyContent:'center',alignItems:'center' , width:'100%' , height:'100%'}}>
        
        <Item onSubmit={submitImages}>
            
        <h1 style={{textAlign:'center' , fontSize:25 , marginBottom:30}}> GEREKLİ BELGELER</h1>

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

                <SubmitButton disabled = {loading} >
                    GÖNDER
                </SubmitButton>

        </Item>  

        </div> 
    }


}
export default RequiredDocs;
