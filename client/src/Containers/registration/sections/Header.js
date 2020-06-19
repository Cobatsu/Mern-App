import React from 'react';
import Modal from '../../../UI/sentModal';
import Stage from '../../../UI/backStage';
import Warning from '../../../UI/warningModal'

const Header = ( { backStage , warning , result })=><React.Fragment> 

      <Warning warning = {warning}/>
      <Stage backStage = {backStage}/>
      <Modal backStage= {backStage} type='STUDENT_FORM' result={result}/> 
        
      <h1 style={{width:'80%',textAlign:'center',fontSize:30 , padding:30}}>PRE-REGİSTRATİON FORM</h1>
</React.Fragment>


export default Header;