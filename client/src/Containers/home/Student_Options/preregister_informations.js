import React, { useEffect , useState , useContext , useRef } from 'react';
import {Context} from '../../../Context/Context'
import { makeSpecificStudentRequest 
, makeSendForConfirmationRequest 
, makeDeleteStudentRequest 
, makeConfirmStudentRequest 
, makeUploadFileRequest 
, makeDeleteFileRequest 
, makePaymentScheduleRequest}  from '../../../request/requset'
import styled from 'styled-components';
import Circle from '../../../UI/Circle';
import { IconEdit , IconRemove , IconSendConfirmation , confirmStudent as ConfirmStudent ,   IconsendToRosedale } from '../../../UI/IconButtons/IconButton';
import RegisterForm from '../../registration/registerForm'
import { PermissionsNumbers , studentStatusColor  } from '../../../Utilities/utilities'
import Modal from '../../../UI/sentModal'
import BackStage from '../../../UI/backStage'
import {TextField,MenuItem} from '@material-ui/core'
import { KeyboardDatePicker , MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import {useViewport} from '../navs/customHooks/viewPortHook'

const MainWrapper = styled.form`
display:flex;
background:white;
width:76%;
margin:0 auto;
align-items:center;
justify-content:center;
margin-top:2%;
margin-bottom:20px;
@media (max-width: 1030px) {
  width:90%;
  padding:10px 0 30px 0 ;
}
border-radius:3px;
flex-flow:column;
`

const InfoCapsule = styled.div`

margin-bottom:5px;
opacity:0.7;
border-radius:5px;
padding:5px 10px;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
display:flex;
align-items:center;
text-align:center;
background:#30475e;
color:white;
font-size:13px;
margin-right:10px;

`

const InnerItems = styled.div`
display:flex;
justify-content:flex-end;
width:95%;
margin-bottom:20px;
margin-top:30px; 
color:#30475e;

@media (max-width: 1030px) {

    flex-flow:column;
    align-items:flex-start !important;
    justify-content:space-evenly;
    

}

`

const Submit = styled.button `

font-size:15px;
border-radius:15px 0 15px 0  ; 
min-height:40px;
min-width:130px;
background:#00909e ; 
position:absolute ; 
right:0;
bottom:0;
outline:none;
border:none;
color:white;
&:hover{
    cursor:pointer;
}

`

const InnerLink = styled.a `

width:96% ;
color:#00909e ; 
height:100% ;
display:flex ;
align-items:center ;
justify-content:space-between ;  
padding:5px 5px 5px 10px ; 
text-decoration: none;

`

const FileList = styled.ul `

display:${({ isActive })=> isActive ? 'block' : 'none'};
position:relative;
padding:${({ isAllowed })=> isAllowed ? '55px 15px 57px  15px' : '50px 15px 15px  15px'};
box-shadow: 0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
margin:30px 50px;
border-radius:15px;
width:90%;

`

const IconCapsule = styled.div`

min-width:30px;
color:white;
font-size:13px;
border-radius: 0 7px 7px 0 ;
display:${({isDeleted})=> isDeleted ? 'flex' : 'none' };
align-items:center;
justify-content:space-evenly;
background:rgb(217, 69, 95);
flex:1;

&:hover{

    background:#900c3f;
    cursor:pointer;

}

`

const TrashIcon = styled.i`
color:white;

`

const FileListElement = styled.li`

&:hover{
    box-shadow: 0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
}

&:hover ${IconCapsule}{
    display:flex;
 
}

position:relative;
box-shadow:${({isDeleted})=> isDeleted ? '0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02)' : '0' };
display:flex;
justify-content:space-between;

border-radius:7px;
transition:50ms;

`

const Title = styled.div `

font-size: 22 ; 
font-weight:bolder ; 
margin:20px 0 ; 
color:#61c0bf ;

`

const ImageFields = [

    "Kimlik Fotokopisi" , 

    "Rosedale İngilizce Yeterlilik Testi Sonuçları" ,

    "İngilizce Yeterlilik Testi Sonuçları",

    "Transkript",

]


const StudentInformations  = ( { match , ...rest } )=>{
     
    const { width } = useViewport();
    const [ loading , setLoading ]  = useState(true);

    const [ backStageLoading , setBackStageLoading ] = useState(false);
    const [ student , setStudent ]  = useState({});
    const [ disabled , setDisabled ] = useState(true);
    const [ modalType , setModalType ] = useState(null);

    const [ uploadFileLoading , setUploadFileLoading ] = useState(false) ; 

    const [ deletedFile , setDeletedFile ] = useState(null) ;
    const [ isAllFilled , setIsAllFilled ] = useState(true);
    
    const [ paymentType , setPaymentType ] = useState('');
    const [ paymentSchedule , setPaymentSchedule ] = useState([])
    const [ paymentRequest ,  setPaymentRequest  ] = useState(false);

    const inputRef = useRef(); 

    const { user } = useContext( Context );

    const { id } = match.params;

    
   
    const setDate = ( value , index )=>{

        var copyPayment = [ ...paymentSchedule ];

        var copyObject =  { ...copyPayment[index] };

        copyObject.date = value ; 

        copyPayment[index] = copyObject;

        setPaymentSchedule(copyPayment);

    }

    const setMount = ( value , index  )=>{

        var copyPayment = [...paymentSchedule];

        var copyObject =  {...copyPayment[index]};

        copyObject.amount = value.slice(2) ; 

        copyObject.amount = copyObject.amount.split(',').join('');

        var commaCount = Math.floor( copyObject.amount.length/3 );

        var finalText = copyObject.amount.split('');

        for (let i = 0; i < commaCount; i++) {

            finalText[ (copyObject.amount.length-1 ) -  (i+1)*3 ] += ',' // when using += not just think about numbers , it is very useful everwhere
            
        }


        copyObject.amount = finalText.join('');

        copyPayment[index] = copyObject;

        setPaymentSchedule(copyPayment);

    }

    if( user.role === 'Admin' ) {
   
        if(student.registerState) var  updatePermissionResult = user.permissions.Öğrenci_Bilgileri.includes(PermissionsNumbers.UPDATE) ; 

    } else {

        if(student.registerState) var  updatePermissionResult = user.permissions.Öğrenci_Bilgileri.includes(PermissionsNumbers.UPDATE) && !student.registerState.pendingResult

    }

   

    const closeModal = ()=>{ 
       
        if(modalType === 'STUDENT_DELETED') {

            rest.history.goBack();

        } else {

            setModalType(null) ;

        }
     
    }
    

    const loadFileHandler = ()=>{

        inputRef.current.click();

    }

    const requestHandler = () => {

        setModalType(null)
        setBackStageLoading(true);
        
        switch(modalType) {

            case 'SEND_CONFIRMATION' : 
           
                 makeSendForConfirmationRequest( 'patch' , id , setStudent  , setBackStageLoading , setModalType ) ; 

            break ; 


            case 'DELETE_STUDENT' : 

                 makeDeleteStudentRequest( 'delete' , id , setBackStageLoading , setModalType ) ; 

            break ; 

            case 'CONFİRM_STUDENT' : 
                  
                  makeConfirmStudentRequest( 'patch' , id , setStudent  , setBackStageLoading , setModalType  )

            break ;

        } 

    }
    
    
    if( student.registerState )  {
     
        var getStatusUI = studentStatusColor(student.registerState) ; 

        if(user.role === 'Admin') { 

            var uploadFilePermission =  true ;

        } else {


            var uploadFilePermission =  ( getStatusUI.text === 'Öğrenci Onaylandı' ) ; 

        }


    }
   
    const uploadFileHandler = (e)=> {

            setUploadFileLoading(true);

            var formData = new FormData();

            formData.append( "imageName","multer-image-"+ Date.now() );     
            formData.append( 'imgCollection', e.target.files[0] );

            makeUploadFileRequest( 'post' , id , formData  , setStudent  ,  setUploadFileLoading )

    }

    const deleteFile = ( fileWillBeDeleted , deletedItem ) => (e) => {

             
            setDeletedFile(deletedItem)
   
            makeDeleteFileRequest(  'post' , id , fileWillBeDeleted , setStudent , setDeletedFile  );

    }
   

    useEffect(()=>{

            makeSpecificStudentRequest('get' , id , setLoading , setStudent ) ;

    },[]);

  

    useEffect(()=>{ 

            if(student._id) {

                setPaymentSchedule(student.paymentSchedule);
                setPaymentType(student.paymentType);

            }
             

    },student._id)

    const reduceInstallmentCount =(e)=>{
        
        var count = e.target.value ; 

        var copyPayment = [];

        if( count.length > 1 ) {

            count = count[1] ;
            
            if( count > 3) { count = paymentSchedule.length  } 
            
        } 

        if( count > 3) { count = paymentSchedule.length }
      
        for (let i = 0; i < count ; i++) {

            copyPayment.push( paymentSchedule[i] ||  ( student.paymentSchedule[i] || { amount:null , date:null } ) ) ;
            
        }

        setPaymentSchedule(copyPayment);
    }

    const setPaymentTypeFunc = (e)=>{

        var value = e.target.value ; 
        
        if(value === 'Peşin') {

            setPaymentSchedule( { date:null , amount:null } ); 

        } else {

            setPaymentSchedule( [] ) ;

        }

        setPaymentType( value );
        
    }


    const paymentScheduleRequest=()=>{

        var result = paymentSchedule.every((item)=>{

            if( item.date && item.amount ) {

                return true ; 
                
            } else {

                return false ; 

            }            

        })

        setIsAllFilled(result)

        if ( !result ) { return ;   }

        setPaymentRequest(true);

        makePaymentScheduleRequest( 'post' , id , { paymentSchedule , paymentType }  , setStudent  ,  setPaymentRequest  )

    }


    useEffect(()=>{

        if(paymentType && paymentType === 'Peşin' && student._id && student.paymentSchedule.length ===  0 ) {
                

            setPaymentSchedule( [  { amount:null , date:null } ] )
  
        }

    },[ paymentType , student._id ])

 
   if(paymentType) {

        var paymentTable = (
    
                    paymentSchedule.map((item,index)=>{
    
                        return ( 
                        
                            <FileListElement key={index} style={{boxShadow:'none', padding:10 , margin:' 18px 0 22px 0 ' , justifyContent:'center' , alignItems:'flex-end'}} >
                                    
                                    {
                                        width < 1030  ? null : <span style={{boxShadow: '0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02)' ,  position:'absolute', background:'#ff6464', borderRadius:7, padding:6 , fontSize:12 , color:'white' , left:'5%' , top:'30%' , }}>{ paymentType=='Taksit' && `${index+1}.`}   {paymentType}  </span>
                                    }
    
                                    <KeyboardDatePicker 
                                    
                                        autoOk
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Ödeme Tarihi"  
                                        error={ !item.date && !isAllFilled }  
                                        value={item.date} 
                                        onChange={(value)=>setDate( value , index )} 
                                        style={{margin:'0 35px 0 0'}}
                                    
                                    />
    
                                    <TextField
                                        error={ !item.amount && !isAllFilled } 
                                        value={ '$ ' +  ( item.amount || '' )  } 
                                        onChange={(e)=> setMount( e.target.value , index ) }  
                                        label='Ödenecek Miktar'/> 
                    
                            </FileListElement> 
    
                        )
    
                    } ) )


   }

    
   
    return  loading 

             ?

             <Circle position='static' marginTop={30} Load={loading}/>

             :

             <MainWrapper>

                            <BackStage backStage={modalType || backStageLoading} close={closeModal} loading={backStageLoading} />

                            <Modal backStage={modalType} handler={ requestHandler }   closeModal={closeModal}   type={modalType}/>
                            
                            <Title> <i style={{marginRight:8}} class="fas fa-file-alt"></i> Ön Kayıt Bilgileri  </Title>

                            <InnerItems> 
                                  
                                  {
                                        <InfoCapsule>

                                            { getStatusUI.text }

                                            { getStatusUI.icon  }

                                        </InfoCapsule> 
                                  }

                                  {                                
                                         (  user.role === 'Admin' &&  getStatusUI.text === 'Onay Bekleniyor' ) ? 

                                         <ConfirmStudent handler={ ()=>setModalType( 'CONFİRM_STUDENT' ) } /> : null                                        
                                  }


                                  {
                                         ( user.role === 'Admin'  &&  getStatusUI.text === 'Onay Bekleniyor' ) ? 

                                          <IconsendToRosedale/> : null
                                  }
                                           

                                  {                                     
                                          ( user.role === 'Temsilci' &&  getStatusUI.text === 'Belgeler Tamamlandı' ) ?
                                       
                                        <IconSendConfirmation handler={ ()=>setModalType( 'SEND_CONFIRMATION' ) } /> : null 
                                  }   


                                  {   

                                         ( updatePermissionResult ) &&  

                                          <IconEdit handler = { ()=>setDisabled(false) } /> 

                                  } 


                                  {
                                        user.permissions.Öğrenci_Bilgileri.includes(PermissionsNumbers.REMOVE) && 

                                        <IconRemove handler = { ()=>setModalType( 'DELETE_STUDENT' ) }   deletedText = 'Öğrenciyi Sil' /> 
                                  }
                            
                            </InnerItems>

                            <FileList style={{padding:'65px 15px 40px  15px'}}  isActive = { getStatusUI.text === 'Sözleşme Yapıldı' || getStatusUI.text === 'Öğrenci Onaylandı'  } >

                                    <FileListElement style={{background:'#00909e' , borderRadius :'7px 7px 0 0' , justifyContent:'center' , alignItems:'center'   , width:'100%' , top:0 , left:0 , position:'absolute' , color:'white', textAlign:'center',padding:7}}>

                                        Ödeme Planı  <i style={{marginLeft:10}} class="fas fa-dollar-sign"></i>

                                    </FileListElement>


                                    {
                                        getStatusUI.text === 'Öğrenci Onaylandı' && 

                                        <FileListElement style={{boxShadow:'none'  , justifyContent:'center' , alignItems:'center' , marginBottom:50}} >
                                                            
                                                        <TextField  style={{minWidth:'30%',padding:'10px 0' , marginRight:15}}   onChange={ setPaymentTypeFunc }  id="select" label="Ödeme Şekli" value={paymentType}  select >
                                                            
                                                            <MenuItem value='Peşin' > Peşin </MenuItem>
                                                            <MenuItem value='Taksit' > Taksit </MenuItem>

                                                        </TextField> 

                                                        {

                                                            paymentType === 'Taksit' && <TextField type='number'   style={{minWidth:'30%'}}  label='Taksit Sayısı' value = { paymentSchedule.length.toString()  }    onChange={reduceInstallmentCount}/>
                                                    
                                                        }

                                        </FileListElement> 


                                    }

                                    
                                     
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                               
                                               {

                                                   paymentTable

                                               }

                                    </MuiPickersUtilsProvider>
                                       
                                        {

                                            getStatusUI.text === 'Öğrenci Onaylandı' && 

                                            <Submit style={{minWidth:250 , minHeight:45}} uploadFileLoading={paymentRequest}  type='button' onClick={paymentScheduleRequest} >

                                                    {
                                                        paymentRequest ? <Circle Load  height={25} width={25} position='static' marginTop={2} marginBot={2} />   : 
                                                        
                                                        <React.Fragment>
      
                                                            Sözleşmeyi Tamamla  <i style={{marginLeft:7}} className="fas fa-file-signature"></i>

                                                        </React.Fragment>    

                                                    }                                                 
                                                    

                                            </Submit> 

                                        }


                            </FileList>

                            <FileList isAllowed = {uploadFilePermission}  isActive = { student.registerState.docState }>
                                      
                                    <FileListElement style={{background:'#00909e', alignItems:'center'  , borderRadius :'7px 7px 0 0' , justifyContent:'center'   , width:'100%' , top:0 , left:0 , position:'absolute' , color:'white', textAlign:'center',padding:7}}>

                                         Belgeler <i style={{marginLeft:10}} class="fas fa-folder-open"></i>

                                    </FileListElement>

                                    {                                   
                                        student.StudentInfo.Images.map( ( fileName , index )=>{


                                            return (

                                                <FileListElement key = {fileName} isDeleted = { deletedFile === index }  >

                                                    <InnerLink className='responsiveLink' style={{textDecoration:'none' , color:'#00909e' }}   href={'https://study-online.herokuapp.com/api/' + fileName} target="_blank" > 
                                                    
                                                        { ImageFields[index] || fileName.split('_')[2].split('.')[0] } 
                                                    
                                                    </InnerLink>

                                                      {  user.role === 'Admin' && (

                                                            <IconCapsule isDeleted = { deletedFile === index }  onClick = { deleteFile( fileName , index ) } > 
                                                              
                                                              {

                                                                  deletedFile === index  ?  
                                                                  
                                                                  ( <Circle Load  height={22} width={22} position='static' marginTop={2} marginBot={2} />  ) :
                                                                  
                                                                  ( <TrashIcon className="far fa-trash-alt"/> ) 
                                                                

                                                              }
                                                                

                                                            </IconCapsule>  )  
                                                      
                                                      }
                                                    
                                                </FileListElement>

                                            )

                                        })
                                    }   


                                          
                                    {
                                           (  uploadFilePermission  )  && 

                                           <Submit uploadFileLoading={uploadFileLoading}  type='button' onClick={loadFileHandler} >

                                                {
                                                    uploadFileLoading ? <Circle Load  height={25} width={25} position='static' marginTop={2} marginBot={2} />   : 
                                                    
                                                    <React.Fragment>

                                                        <input type="file" name="myfile" accept=".png, .jpg, .jpeg , .pdf" ref={inputRef} onChange={uploadFileHandler}  style={{display:'none'}}  />
        
                                                        Dosya Ekle <i style={{marginLeft:7}} className="fas fa-plus"></i>

                                                    </React.Fragment>    

                                                }                                                 
                                                

                                           </Submit> 

                                    }

                            
                            </FileList>     

                           <RegisterForm student = {student.StudentInfo} {...rest} disabled={disabled} setDisabled={setDisabled} id={id} setBackStageLoading={setBackStageLoading} setModalType={setModalType} />                                  

             </MainWrapper>
           
}


export default StudentInformations;