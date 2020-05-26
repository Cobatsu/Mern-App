import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
DELETED_REPORT:'Raporunuz Başarıyla Silinmiştir.',
UPDATE_PERSONEL:'Personel Başarıyla Güncellenmiştir!.',
ADD_PERSONEL:'Yeni Personel Başarıyla Eklenmiştir.',
}

const deletedModalTexts = {
  DELETE_REPORT:'Bu Raporu Silmek İstediğinizden Emin misiniz',
  DELETE_USER:'Bu Kullanıcıyı Silmek İstediğinizden Emin misiniz ?',
}


const SentModal = React.memo(({backStage, type, closeModal, deleteUser}) => {

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

  }
  else if(Object.keys(deletedModalTexts).includes(type))
  {
    
    return <Modal display={modalY.display}><i style={{
      fontSize: 50,
      color: '#f73859'
    }} className="fas fa-exclamation"></i>
       <h2 style={{
      textAlign: 'center',
      fontSize: 15,
      color: '#f73859',
      fontWeight: 'bolder'
     }}>{deletedModalTexts[type]}  </h2>
       <div style={{
      display: 'flex',
      width: '90%',
      justifyContent: 'space-around'
    }}><CloseButton style={{
      flex: 1,
      marginRight: 20
    }}  onClick={closeModal}>VAZGEÇ</CloseButton> <CloseButton style={{
      flex: 1
    }} onClick={deleteUser}>SİL</CloseButton></div>

  </Modal>

  } 

  switch (type) {

    case 'STUDENT_FORM':
      return <Modal  display={modalY.display} ><i style={{
          fontSize: 80,
          color: '#52de97'
        }} className="far fa-check-circle"></i>
        <h2 style={{
          textAlign: 'center',
          fontSize: 20,
          color: '#52de97',
          fontWeight: 'bolder'
        }}>Your form  has been sent succesfuly ! </h2>
        <h3 style={{
          textAlign: 'center',
          fontSize: 14,
          color: '#7fcd91',
          fontWeight: 'bolder'
        }}>We will be in contact with you by e-mail.Please Dont forget to check your mails. </h3>
        <button style={ButtonStyle}><a href='https://www.studyonlineincanada.com/' style={aStyle}>Go Back To Page</a></button>
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
        }}>Lütfen Boş Alan Bırakmayınız ! </h2>
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
