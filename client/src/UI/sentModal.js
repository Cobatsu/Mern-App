import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {CopyToClipboard} from 'react-copy-to-clipboard'

const Modal = styled.div`
position:fixed;
display:${(props) => props.display};
justify-content:space-around;
align-items:center;
flex-flow:column;
max-width:300px;
min-height:210px;
margin:0 auto;
left:0;
right:0;
border-radius:8px;
padding:15px;
box-sizing:border-box;
top:25%;
background:white;
transition:2000ms;
z-index:5;

box-shadow: 0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02);

`
const CloseIcon = styled.div`
position:absolute;
right:13px;
top:5px;
font-size:18px;
color:#f57170;
&:hover{
    cursor:pointer;
}
`


const CloseButton = styled.div`
outline:none;
border:none;
padding:5px;
font-size:12px;
background:#d63447;
color:white;
border-radius:6px;
text-align:center;
&:hover{
  cursor:pointer;
  box-shadow: 0 1px 6px -1px rgba(0, 0, 0, 3), 0 2px 4px -1px rgba(0, 0, 0, 0.03) !important;
}
`


const aStyle = {
  textDecoration: 'none',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  color: 'white',
}
const ButtonStyle = {
  borderRadius: 7,
  outline: 'none',
  border: 'none',
  boxShadow: '0 1px 5px black',
  height: '18%',
  width: '62%',
  padding: 0,
  background: '#d63447'
}

const completedModalTexts = {
UPDATED_REPORT:'Raporunuz Güncellenmiştir.',
REPORT_ADDED :'Raporunuz Gönderilmiştir.',
CHANGED_PASSWORD:'Şifreniz Değiştirilmiştir.',
DELETED : 'Personel Başarıyla Silinmiştir.',
STUDENT_DELETED:'Öğrenci Ön Kayıttan Silinmiştir.' ,
DELETED_REPORT:'Raporunuz Başarıyla Silinmiştir.',
UPDATE_PERSONEL:'Personel Başarıyla Güncellenmiştir!.',
ADD_PERSONEL:'Yeni Personel Başarıyla Eklenmiştir.',
STUDENT_UPDATED:'Öğrenci Başarıyla Güncellenmiştir',
CONFİRMATİON_SENT:'Öğrenci Başarıyla Onaya Gönderilmiştir',
CONFİRMED_STUDENT:'Öğrenci Başarıyla Onaylanmıştır' , 
FILE_UPLOADED:'Dosyanız Başarıyla Eklenmiştir.'
}

const deletedModalTexts = {

  DELETE_REPORT:{ text:'Bu Raporu Silmek İstediğinizden Emin misiniz' , accept: 'SİL' , Icon:<i style={{

    fontSize: 50,
    color: '#f73859'

  }} className="fas fa-exclamation"></i> ,

   color:'#f73859' } ,


   DELETE_STUDENT:{ text:'Bu Öğrenciyi Silmek İstediğinizden Emin misiniz ?' , accept: 'SİL' , Icon:<i style={{

    fontSize: 50,
    color: '#f73859'

   }} className="fas fa-exclamation"></i> ,

   color:'#f73859' } ,


  DELETE_USER:{ text:'Bu Kullanıcıyı Silmek İstediğinizden Emin misiniz ?' , accept: 'SİL' ,  Icon:<i style={{
    fontSize: 50,
    color: '#f73859'
  }} className="fas fa-exclamation"></i> , 

   color:'#f73859' } ,


  SEND_CONFIRMATION:{ text:'Bu Öğrenciyi Onay İçin  Göndermek İstediğinizden Emin misiniz ?' , accept: 'GÖNDER' , Icon:
  <i style={{
    fontSize: 50,
    color: '#ff6464'
  }}

  className="fas fa-search"></i> , 
  
  color:'#ff6464' } , 

  CONFİRM_STUDENT:{ text:'Bu Öğrenciyi Onaylamak İstediğinizden Emin misiniz ?' , accept: 'ONAYLA' , Icon:
  <i  style={{
    fontSize: 50,
    color: '#ff6464'
  }} class="far fa-check-circle"></i>, 
  
  color:'#ff6464' } , 



}


const SentModal = React.memo(({backStage, type, closeModal, handler , formSent , sendForm , result}) => {

  let modalY = {
    display: 'none'
  }

  if (backStage) //if there is no need to use eseffect or  useState pls dont use !
  {
      modalY = {
        display: 'flex'
      };
      
  } else if (!backStage) {
      modalY = {
        display: 'none'
      };
  }

  if(Object.keys(completedModalTexts).includes(type))
  {

    return <Modal display={modalY.display}><i style={{ fontSize: 50,color: '#52de97'}} className="far fa-check-circle"></i>
    <h2 style={{textAlign: 'center',fontSize: 15,color: '#52de97',fontWeight: 'bolder'}}> {completedModalTexts[type]}  </h2>
    <CloseButton onClick={closeModal}>KAPAT</CloseButton>
    </Modal>

  } else if(Object.keys(deletedModalTexts).includes(type)) {
    
    return <Modal display={modalY.display}>

        {deletedModalTexts[type].Icon}

       <h2 style={{ textAlign: 'center', fontSize: 15, color: deletedModalTexts[type].color, fontWeight: 'bolder'}}>{deletedModalTexts[type].text}  </h2>

       <div style={{ display: 'flex',width: '90%', justifyContent: 'space-around'}}><CloseButton style={{ flex: 1, marginRight: 20 , background:deletedModalTexts[type].color }}  onClick={closeModal}>VAZGEÇ</CloseButton> <CloseButton style={{flex: 1 , background:deletedModalTexts[type].color}} onClick={handler}>{deletedModalTexts[type].accept}</CloseButton></div>

    </Modal>

  } else if( type === 'SEND_STUDENT_FORM' ) {

     if( formSent.text == 'REQUEST' ) {

        return  <Modal  display={modalY.display} style = {{ maxWidth:500, minHeight:210 }} >

        <CloseIcon onClick={closeModal} > <i class="fas fa-times"></i> </CloseIcon>
    
        <div style={{
          display: 'flex',
          width: '90%',
          justifyContent: 'space-around'
        }}>
          
        <CloseButton style={{ flex: 1, marginRight: 20 , padding:20 , fontSize:15 , background:'#58b4ae' }}  onClick={sendForm('MAİL')}> 
        
              MAİL İLE GÖNDER 
    
            <i style={{marginLeft:10}} class="fas fa-envelope"></i>
    
        </CloseButton>

    
        <CloseButton style={{ flex: 1,  padding:20 , fontSize:15  , background:'#58b4ae'}} onClick={sendForm('LİNK')}> 
        
            LİNK OLUŞTUR 
    
            <i style={{marginLeft:10}} class="fas fa-link"></i>
    
        </CloseButton>
        
        </div>   
    
        </Modal>

     } else if (formSent.text === 'LİNK' ) {
       
            
           if ( formSent.result === 'Error ' ) {

                return <Modal  display={modalY.display} >

                          <CloseIcon onClick={closeModal} > <i class="fas fa-times"></i> </CloseIcon>
              
                          <span style={{ background:'#e00543' , color:'white' , display:'block' , textAlign:'center',  padding:10 , fontSize:14 , borderRadius:5 , boxShadow:'0 1px 6px -1px rgba(0, 0, 0,0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.05)' }}> 
                          
                              Bir Sorun Oluştu , Link Oluşturulamadı .
              
                          </span>
    
                </Modal>

           } else {

              return  <Modal  display={modalY.display} style = {{ maxWidth:500, minHeight:210  , justifyContent:'center'}} >

                    <CloseIcon onClick={closeModal} > <i class="fas fa-times"></i> </CloseIcon>

                    <span style={{marginBottom:25, display:'block' , padding:8 , fontSize:14 , borderRadius:5 , boxShadow:'0 1px 6px -1px rgba(0, 0, 0,0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.05)' , background:'#58b4ae' , color:'white' }}> Linkiniz Oluşturuldu !  </span>

                  
                        <input className="foo" value = {formSent.payload} style={{width:'80%'}}/>

                        <CopyToClipboard text={formSent.payload} >
                            <CloseButton style ={{marginTop:15 , padding:10}} type='button'> Linki Kopyala </CloseButton>
                      </CopyToClipboard>
                          
                    
              </Modal>

           }
        
            

     } else if (formSent.text === 'MAİL') {



            if ( formSent.result === 'Error ' ) {

                  return <Modal  display={modalY.display} >

                          <CloseIcon onClick={closeModal} > <i class="fas fa-times"></i> </CloseIcon>
              
                          <span style={{ background:'#e00543' , color:'white' , display:'block' , textAlign:'center',  padding:10 , fontSize:14 , borderRadius:5 , boxShadow:'0 1px 6px -1px rgba(0, 0, 0,0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.05)' }}> 
                          
                              Bir Sorun Oluştu , Ön Kayıt Formu Gönderilemedi . 
              
                          </span>

                </Modal>

            } else {

              return <Modal  display={modalY.display} >

                    <CloseIcon onClick={closeModal} > <i class="fas fa-times"></i> </CloseIcon>

                    <span style={{ background:'#58b4ae' , color:'white' , display:'block' , textAlign:'center',  padding:10 , fontSize:14 , borderRadius:5 , boxShadow:'0 1px 6px -1px rgba(0, 0, 0,0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.05)' }}> 
                    
                              Ön Kayıt Formu Başarıyla Gönderildi . 

                    </span>

              </Modal>

            }


     }  

  } else if (type === 'STUDENT_FORM') {

    if ( result === 'Success' ) {

      
        return <Modal  display={modalY.display} >

              <span style={{ background:'#58b4ae' , color:'white' , display:'block' , textAlign:'center',  padding:10 , fontSize:14 , borderRadius:5 , boxShadow:'0 1px 6px -1px rgba(0, 0, 0,0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.05)' }}> 
              
                  Ön Kayıt Formunuz Başarıyla Gönderildi . E-posta Adresinize Gönderilen Bağlantıdan ,  Belgeleriniz Hazır Olduğunda Yükleyebilirsiniz . 

              </span>

        </Modal>

    } else {

      return <Modal  display={modalY.display}  style={{justifyContent:'space-between'}} >

          <span style={{ display:'block', background:'#e7305b', color:'white'  , textAlign:'center' , padding:'20px 10px' , fontSize:14 , borderRadius:5 , boxShadow:'0 1px 6px -1px rgba(0, 0, 0,0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.05)' }}> 
           
               Bir Hata Oluştu Formunuz Gönderilmedi ! 

          </span>

          <span style={{ display:'block' , textAlign:'center' , padding:'20px 10px' , fontSize:14 , borderRadius:5 , boxShadow:'0 1px 6px -1px rgba(0, 0, 0,0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.05)' }}> 
           
               Bu Bağlantıyı Yalnızca Bir Sefer Kullanabilirsiniz . 

         </span>

      </Modal>


    }

    
  }

  switch (type) {

    case 'STUDENT_FORM':

      return <Modal  display={modalY.display} >

          <CloseIcon onClick={closeModal} > <i class="fas fa-times"></i> </CloseIcon>

          <span style={{marginBottom:25, display:'block' , padding:8 , fontSize:14 , borderRadius:5 , boxShadow:'0 1px 6px -1px rgba(0, 0, 0,0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.05)' }}> 
          
            Ön Kayıt Formunuz Başarıyla Gönderildi . E-posta Adresinize Gönderilen Bağlantıdan ,  Belgeleriniz Hazır Olduğunda Yükleyebilirsiniz . 

          </span>

     </Modal>

      break;

    case 'NOT_UNİQUE':

      return <Modal  display={modalY.display}><i style={{
          fontSize: 50,
          color: '#f73859'
        }} className="fas fa-fingerprint"></i>
        <h2 style={{
          textAlign: 'center',
          fontSize: 17,
          color: '#f73859',
          fontWeight: 'bolder'
        }}>Bu Kullanıcı İsmi Zaten Kayıtlı ! </h2>
        <h3 style={{
          textAlign: 'center',
          fontSize: 13,
          color: '#f73859',
          fontWeight: 'bolder'
        }}>Lütfen Kullanıcı İsmini Değiştirip , Tekrar Deneyiniz.</h3>
        <CloseButton onClick={closeModal}>KAPAT</CloseButton>
        </Modal>

      break;

    case 'EMPTY_FİELD':

      return <Modal   display={modalY.display}><i style={{
          fontSize: 50,
          color: '#f73859'
        }} className="fas fa-align-left"></i>
        <h2 style={{
          textAlign: 'center',
          padding: 0,
          fontSize: 15,
          color: '#f73859',
          fontWeight: 'bolder'
        }}> Lütfen Alanlari Tam Doldurunuz ! </h2>
        <CloseButton onClick={closeModal}>KAPAT</CloseButton>
        </Modal>

      break;

    
   
    case 'PASSWORDS_DONT_MATCH':

      return <Modal  display={modalY.display}><i style={{
          fontSize: 50,
          color: '#f73859'
        }} className="fas fa-not-equal"></i>
        <h2 style={{
          textAlign: 'center',
          fontSize: 15,
          color: '#f73859',
          fontWeight: 'bolder'
        }}> Onay Şifreniz Eşleşmiyor !   </h2>
        <CloseButton onClick={closeModal}>KAPAT</CloseButton>
        </Modal>

      break;

    case 'OLD_PASSWORD_WRONG':
      return <Modal  display={modalY.display}><i style={{
          fontSize: 50,
          color: '#f73859'
        }} className="fas fa-not-equal"></i>
        <h2 style={{
          textAlign: 'center',
          fontSize: 15,
          color: '#f73859',
          fontWeight: 'bolder'
        }}> Eski Şifreniz Hatalı!  </h2>
        <h3 style={{
          textAlign: 'center',
          fontSize: 13,
          color: '#f73859',
          fontWeight: 'bolder'
        }}>Lütfen Eski Şifrenizi Doğru Girdiğinizden Emin Olunuz.</h3>
        <CloseButton onClick={closeModal}>KAPAT</CloseButton>
        </Modal>
      break;

  


  }

  return null;
})

export default SentModal;
