import React from 'react';
import './register.css'
import { makeRequest , makeUpdateStudentRequest , makeUpdateNewAddedStudentRequest } from '../../request/requset'
import StudentInformations  from './sections/Student-Information';
import StudentsHomeAdress from './sections/Students-Home-Adress';
import AboutRegisteringStudent from './sections/About-registering-Student';
import ParentInformation from './sections/Parent-Information';
import PrevSchoolInfo from './sections/Prevıous-school-information';
import Submit from './sections/Submit';
import Header from './sections/Header';
import styled from 'styled-components';
import { Link , useLocation , useRouteMatch , useHistory } from 'react-router-dom'
import queryString from 'querystring'


const initialState = {
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
  desired_university_studies:'Engineering & Physics',
}

const additionState = {
  warning:null,
  disabled:false, 
  warning_text:null,
  circle:false,
  backStage:false,
  warningModal:false,
  tokenCheck:true , 
  result:''
}

const ErrorCapsule = styled.div`

padding:30px;
box-shadow: 0 1px 6px -1px rgba(0, 0, 0,0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
min-width:200px;
text-align:center;
background:#e00543;
color:white;

`

class RegisterForm extends React.Component{

    constructor(props) {

    super(props);
      
      const queryObject = queryString.parse(props.location.search.slice(1));
      
      let { token , origin , ...allStudentData } = queryObject;

      if(props.student) { origin = 'UPDATE' }

      this.state = { studentInformations:props.student || { ...initialState, ...allStudentData } , ...additionState , origin }

      this.token = token ; 

    }
   
  

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
      
       const { origin } = this.state; 

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

       const setUpdatedStudent = (student)=>{
           
        this.setState({studentInformations:student})

       }

        if ( origin === 'REGISTER' ) {

                return  makeRequest( 'post' , { token:this.token , ...this.state.studentInformations  } ,this.activeCircle,this.backStage,this.setResult);

        } else if ( origin === 'UPDATE' && this.props.student ){
               
                this.props.setBackStageLoading(true);

                return makeUpdateStudentRequest( 'patch' ,  this.state.studentInformations , this.props.id  , setUpdatedStudent , this.props.setBackStageLoading , this.props.setModalType) ;

        } else {

                return makeUpdateNewAddedStudentRequest( 'post' , { token:this.token , ...this.state.studentInformations } ,this.activeCircle,this.backStage,this.setResult   )

        }
        
   }

   changeHandlerFactory=(type)=> {

      return (e)=>{

            let value = e.target.value;

            if( type === 'date_of_birth' || type === 'first_date_of_grade_9') {
             
              value = new Date(e.target.value) ;
              
            } 
          
            const copyStudent = {...this.state.studentInformations}         
           
            this.setState({studentInformations:{...copyStudent,[type]:value},warningModal:false})        
      }
   }


   
   render() {

       const { origin } = this.state ; 

       var { disabled } = this.props ;

       console.log(this.state.result)
       

       if( this.token && origin === 'UPDATE' && this.props.student) {

         return <div style={{display:'flex' , justifyContent:'center',alignItems:'center' , width:'100%' , height:'100%'}}>
            
          <ErrorCapsule > 

              Hatalı Token ,

              Bu Bağlantıyı Yalnızca Bir Kez Kullanabilirsiniz !  
              
          </ErrorCapsule>

        </div>

       }

       const reStoreStudent = ()=>{

         this.props.setDisabled(true);

         this.setState({studentInformations:this.props.student});

       }
    
 
      return (
        
         <div className='Container'>

              
                {

                    ( origin === 'REGISTER' ||  origin === 'UPDATE' && !this.props.student ) &&  <Header origin={origin} backStage={this.state.backStage} result={this.state.result} warning={this.state.warningModal}/>

                }
                
              
               <form onSubmit={this.SubmitHandler} style={{ width : origin === 'REGISTER' || !this.props.student ? '55%' : '90%' }} className='Inner-Register'>             
                            
                  <StudentInformations disabled={disabled} student={this.props.student} origin={this.state.origin} birthDate={this.state.studentInformations.date_of_birth} changeHandler={this.changeHandlerFactory}  name={this.state.studentInformations.name} warning={this.state.warning} warningText={this.state.warning_text} surname={this.state.studentInformations.surname} phoneNumber={this.state.studentInformations.phone_number} eMail={this.state.studentInformations.e_mail} gender={this.state.studentInformations.gender} />
                  <StudentsHomeAdress disabled={disabled} changeHandler={this.changeHandlerFactory} street={this.state.studentInformations.street} apartmentAndNumber={this.state.studentInformations.apartment_and_number} warning={this.state.warning}  warning_text={this.state.warning_text} town={this.state.studentInformations.town} city={this.state.studentInformations.city} postalCode={this.state.studentInformations.postal_code} />
                  <AboutRegisteringStudent disabled={disabled} first9Date={this.state.studentInformations.first_date_of_grade_9} country_of_birth={this.state.studentInformations.country_of_birth} country_of_citizenship={this.state.studentInformations.country_of_citizenship} native_language={this.state.studentInformations.native_language}  changeHandler={this.changeHandlerFactory} warning={this.state.warning} warning_text={this.state.warning_text}/>
                  <ParentInformation   student={this.props.student} relative={ this.state.studentInformations.relationship_to_student } origin={this.state.origin}  disabled={disabled}  parentFirstName={this.state.studentInformations.parent_guardian_first_name} parentLastName={this.state.studentInformations.parent_guardian_last_name} parenEmailAdress={this.state.studentInformations.parent_guardian_e_mail_address} parentPhoneNumber={this.state.studentInformations.parent_guardian_mobile_phone_number} warning={this.state.warning} warning_text={this.state.warning_text} changeHandler={this.changeHandlerFactory}/>
                  <PrevSchoolInfo  student={this.props.student} origin={this.state.origin}  disabled={disabled}  currentorlastAttendedSchool={this.state.studentInformations.currentor_last_attended_school_name} warning={this.state.warning}  warning_text={this.state.warning_text} changeHandler={this.changeHandlerFactory}  school={this.state.studentInformations.currently_attending_a_high_school} language={this.state.studentInformations.english_language_proficiency} grade={this.state.studentInformations.look_forward_to_study_at_rosedale} desiredCourse={this.state.studentInformations.desired_university_studies}/>


               
                  <Submit  student={this.props.student}  disabled={ disabled } setDisabled={reStoreStudent} origin={origin} circle={this.state.circle}/> 
               
          

               </form>

         </div>
     )
   }
}


export default RegisterForm;