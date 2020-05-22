import React from 'react';
import Modal from '../../../UI/sentModal';
import Stage from '../../../UI/backStage';
import Warning from '../../../UI/warningModal'

const Header = ({backStage,warning})=><React.Fragment> 
<Warning warning = {warning}/>
<Stage backStage = {backStage}/>
<Modal backStage= {backStage} type='STUDENT_FORM'/> 
<div style={{width:'60%',padding:5, borderRadius:5 }}>
  <img style={{width:'100%'}} alt="ercan" src='https://www.studyonlineincanada.ca/wp-content/uploads/2020/02/cropped-kanada-lisediplomas%C4%B1.png' ></img>
</div>     

<hr style={{border:'.5px solid black',width:'70%'}}/>

<h1 style={{width:'80%',textAlign:'center',fontSize:30 , color:''}}>PRE-REGİSTRATİON FORM</h1>
</React.Fragment>


export default Header;