import React from 'react';
import './register.css'
import {makeRequest} from '../../request/requset'
import StudentInformations  from './sections/Student-Information';
import StudentsHomeAdress from './sections/Students-Home-Adress';
import AboutRegisteringStudent from './sections/About-registering-Student';
import ParentInformation from './sections/Parent-Information';
import PrevSchoolInfo from './sections/Prevıous-school-information';
import Submit from './sections/Submit';
import Header from './sections/Header';
import styled from 'styled-components';



const ErrorCapsule = styled.div`

padding:30px;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
min-width:200px;
text-align:center;
background:#e00543;
color:white;

`



class Register extends React.Component{
   
   state={
        studentInformations:{
          name:'',
          surname:'',
          phone_number:'',
          e_mail:'',
          date_of_birth:new Date(),
          gender:'Male',
          street:'',
          apartment_and_number:'',
          town:'',
          city:'',
          postal_code:'',
          country_of_birth:'',
          country_of_citizenship:'',
          first_date_of_grade_9:new Date(),
          native_language:'',
          parent_guardian_first_name:'',
          parent_guardian_last_name:'',
          relationship_to_student:'Father',
          parent_guardian_e_mail_address:'',
          parent_guardian_mobile_phone_number:'',
          currently_attending_a_high_school:'Yes',
          currentor_last_attended_school_name:'',
          english_language_proficiency:'TOEFL',
          look_forward_to_study_at_rosedale:'Grade 10',
          desired_university_studies:'Engineering &  Physics',
        },
        warning:null,
        warning_text:null,
        circle:false,
        backStage:false,
        warningModal:false,
        result:'',
        users:[],
   }

   token = new URLSearchParams(this.props.location.search).get('token'); 

   
   activeCircle=(value) => {
     this.setState({circle:value});
   }
  
   backStage = (value) => {
     this.setState({backStage:value});
   }

   setResult = (value) => {
    this.setState({result:value});
   }


   SubmitHandler=(e)=> {

       e.preventDefault();

       const registeredStudent = {...this.state.studentInformations};
      
       var scroll = 0 ;

        for (const key in registeredStudent) {

         if (registeredStudent.hasOwnProperty(key)) {

            const element = registeredStudent[key];

            scroll++;

            if(!element)
            { 
                window.scrollTo(0,scroll*66); 
                this.setState({warning:<i className="fas fa-exclamation-circle warning"></i>,warning_text:'warning-text',warningModal:true}) 
                return;
            } 

         }

       }  

        makeRequest('post', { token:this.token , ...this.state.studentInformations  } ,this.activeCircle,this.backStage,this.setResult);
   }

   changeHandlerFactory=(type)=> {

      return (e)=>{

            let value = e.target.value;

            if( type === 'date_of_birth' || type === 'first_date_of_grade_9') {
             
              value = new Date(e.target.value)
              
            } 
          
            const copyStudent = {...this.state.studentInformations}         
           
            this.setState({studentInformations:{...copyStudent,[type]:value},warningModal:false})        
      }
   }

   
   render()
   {

      console.log(this.state.studentInformations)

      if(!this.token) {

        return <div style={{display:'flex' , justifyContent:'center',alignItems:'center' , width:'100%' , height:'100%'}}>
            
        <ErrorCapsule > 

            Hatalı Token ,

            Bu Bağlantıyı Yalnızca Bir Kez Kullanabilirsiniz !  
            
        </ErrorCapsule>

       </div>

      }
    
      return (
        
         <div className='Container'>
             
               <Header backStage={this.state.backStage} result={this.state.result} warning={this.state.warningModal}/>
               
               <form onSubmit={this.SubmitHandler} className='Inner-Register'>             
                            
               <StudentInformations changeHandler={this.changeHandlerFactory}  name={this.state.studentInformations.name} warning={this.state.warning} warningText={this.state.warning_text} surname={this.state.studentInformations.surname} phoneNumber={this.state.studentInformations.phone_number} eMail={this.state.studentInformations.e_mail} />
               <StudentsHomeAdress changeHandler={this.changeHandlerFactory} street={this.state.studentInformations.street} apartmentAndNumber={this.state.studentInformations.apartment_and_number} warning={this.state.warning}  warning_text={this.state.warning_text} town={this.state.studentInformations.town} city={this.state.studentInformations.city} postalCode={this.state.studentInformations.postal_code} />
               <AboutRegisteringStudent country_of_birth={this.state.studentInformations.country_of_birth} country_of_citizenship={this.state.studentInformations.country_of_citizenship} native_language={this.state.studentInformations.native_language}  changeHandler={this.changeHandlerFactory} warning={this.state.warning} warning_text={this.state.warning_text}/>
               <ParentInformation   parentFirstName={this.state.studentInformations.parent_guardian_first_name} parentLastName={this.state.studentInformations.parent_guardian_last_name} parenEmailAdress={this.state.studentInformations.parent_guardian_e_mail_address} parentPhoneNumber={this.state.studentInformations.parent_guardian_mobile_phone_number} warning={this.state.warning} warning_text={this.state.warning_text} changeHandler={this.changeHandlerFactory}/>
               <PrevSchoolInfo   currentorlastAttendedSchool={this.state.studentInformations.currentor_last_attended_school_name} warning={this.state.warning}  warning_text={this.state.warning_text} changeHandler={this.changeHandlerFactory} />
               <Submit circle={this.state.circle}/>  

               </form>


         </div>
     )
   }
}


export default Register;