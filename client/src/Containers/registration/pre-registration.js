import React from 'react';
import './register.css'
import {makeRequest,makeFileRequest,makeGetRequest} from '../../request/requset'
import StudentInformations  from './sections/Student-Information';
import StudentsHomeAdress from './sections/Students-Home-Adress';
import AboutRegisteringStudent from './sections/About-registering-Student';
import ParentInformation from './sections/Parent-Information';
import PrevSchoolInfo from './sections/Prevıous-school-information';
import RequiredDocs from './sections/Required-Document';
import Submit from './sections/Submit';
import moment from 'moment';
import Header from './sections/Header';


class Register extends React.Component{

   date_of_birth_ref = React.createRef();
   gender_ref = React.createRef();
   relationship_to_student_ref = React.createRef();
   first_date_of_grade_9_ref = React.createRef();
   currently_attending_a_high_school_ref= React.createRef();
   english_language_proficiency_ref = React.createRef();
   look_forward_to_study_at_rosedale_ref=React.createRef();
   desired_university_studies_ref=React.createRef();
   
   state={

        fileInputs:{
          I1:{name:''}
          ,
          I2:{name:''}
          ,
          I3:{name:''}
          ,
          I4:{name:''},
        },
        studentInformations:{
          name:'',
          surname:'',
          phone_number:'',
          e_mail:'',
          date_of_birth:'',
          gender:'',
          street:'',
          apartment_and_number:'',
          town:'',
          city:'',
          postal_code:'',
          country_of_birth:'',
          country_of_citizenship:'',
          first_date_of_grade_9:'',
          native_language:'',
          parent_guardian_first_name:'',
          parent_guardian_last_name:'',
          relationship_to_student:'',
          parent_guardian_e_mail_address:'',
          parent_guardian_mobile_phone_number:'',
          currently_attending_a_high_school:'',
          currentor_last_attended_school_name:'',
          english_language_proficiency:'',
          look_forward_to_study_at_rosedale:'',
          desired_university_studies:'',
          time:{
            month:moment.locale()=='tr' ?  Number(moment().format('L').split('/')[1]) :Number(moment().format('L').split('/')[0]) ,
            day:moment.locale()=='tr' ? Number(moment().format('L').split('/')[0]) : Number(moment().format('L').split('/')[1] ),
            year:Number(moment().format('L').split('/')[2]),
          }
        },
        warning:null,
        warning_text:null,
        circle:false,
        backStage:false,
        warningModal:false,
        users:[],
   }

   componentDidMount()
   {
     const refsSelect ={
      date_of_birth:this.date_of_birth_ref.current.value.split('-').reverse().join('/'),
      gender:this.gender_ref.current.value,
      first_date_of_grade_9:this.first_date_of_grade_9_ref.current.value.split('-').reverse().join('/'),
      relationship_to_student:this.relationship_to_student_ref.current.value,
      currently_attending_a_high_school:this.currently_attending_a_high_school_ref.current.value,
      english_language_proficiency:this.english_language_proficiency_ref.current.value,
      look_forward_to_study_at_rosedale:this.look_forward_to_study_at_rosedale_ref.current.value,
      desired_university_studies:this.desired_university_studies_ref.current.value
    }
     this.setState((prev)=>({studentInformations:{...prev.studentInformations,...refsSelect}}));
   }

   activeCircle=(type)=>{
     this.setState({circle:type});
   }
  
   backStage = (type)=>{
     this.setState({backStage:type});
   }

   SubmitHandler=(e)=>
   {
       e.preventDefault();
       const registeredStudent = {...this.state.studentInformations};
       let scroll = 0;

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

      for (const key in this.state.fileInputs) {
         if (this.state.fileInputs.hasOwnProperty(key)) {
           const element = this.state.fileInputs[key];
           if(!element.name)
           {
            this.setState({warning:<i className="fas fa-exclamation-circle warning"></i>,warning_text:'warning-text',warningModal:true}) 
             return;
           }
         }     
      }

      makeRequest('post',registeredStudent,this.state.fileInputs,this.activeCircle,this.backStage);
   }
   changeHandlerFactory=(type)=>
   {
      return (e)=>{
            const copyStudent = {...this.state.studentInformations}         
            let value = e.target.value;
            if(type==='date_of_birth' || type==='first_date_of_grade_9' )
            {
              value=e.target.value.split('-').reverse().join('/');
            }
           this.setState({studentInformations:{...copyStudent,[type]:value},warningModal:false})        
      }
   }

   imageHandlerFactory=(type)=>{       
        return (e)=>{  
          this.setState({fileInputs:{...this.state.fileInputs,[type]:e.target['files'][0] || {name:''}},warningModal:false})
        }
   }
   
   render()
   {
      return( 
        
         <div className='Container'>
             
               <Header backStage={this.state.backStage} warning={this.state.warningModal}/>
               
               <form onSubmit={this.SubmitHandler} className='Inner-Register'>             
                            
               <StudentInformations changeHandler={this.changeHandlerFactory}  name={this.state.studentInformations.name} warning={this.state.warning} warningText={this.state.warning_text} surname={this.state.studentInformations.surname} phoneNumber={this.state.studentInformations.phone_number} eMail={this.state.studentInformations.e_mail} date_of_birth_ref={this.date_of_birth_ref} gender_ref={this.gender_ref}/>
               <StudentsHomeAdress changeHandler={this.changeHandlerFactory} street={this.state.studentInformations.street} apartmentAndNumber={this.state.studentInformations.apartment_and_number} warning={this.state.warning}  warning_text={this.state.warning_text} town={this.state.studentInformations.town} city={this.state.studentInformations.city} postalCode={this.state.studentInformations.postal_code} />
               <AboutRegisteringStudent country_of_birth={this.state.studentInformations.country_of_birth} country_of_citizenship={this.state.studentInformations.country_of_citizenship} native_language={this.state.studentInformations.native_language} first_date_of_grade_9_ref={this.first_date_of_grade_9_ref} changeHandler={this.changeHandlerFactory} warning={this.state.warning} warning_text={this.state.warning_text}/>
               <ParentInformation relationship_to_student_ref={this.relationship_to_student_ref}  parentFirstName={this.state.studentInformations.parent_guardian_first_name} parentLastName={this.state.studentInformations.parent_guardian_last_name} parenEmailAdress={this.state.studentInformations.parent_guardian_e_mail_address} parentPhoneNumber={this.state.studentInformations.parent_guardian_mobile_phone_number} warning={this.state.warning} warning_text={this.state.warning_text} changeHandler={this.changeHandlerFactory}/>
               <PrevSchoolInfo look_forward_to_study_at_rosedale_ref={this.look_forward_to_study_at_rosedale_ref} desired_university_studies_ref={this.desired_university_studies_ref}  currently_attending_a_high_school_ref={this.currently_attending_a_high_school_ref} currentorlastAttendedSchool={this.state.studentInformations.currentor_last_attended_school_name} warning={this.state.warning}  warning_text={this.state.warning_text} changeHandler={this.changeHandlerFactory} english_language_proficiency_ref={this.english_language_proficiency_ref}/>
               <RequiredDocs I1={this.state.fileInputs.I1} warning={this.state.warning} I2={this.state.fileInputs.I2} I3={this.state.fileInputs.I3} I4={this.state.fileInputs.I4} imageHandler={this.imageHandlerFactory}/>
               <Submit circle={this.state.circle}/>  

               </form>


         </div>
     )
   }
}


export default Register;