import { useParams } from 'react-router-dom'
import Base from '../Base/Base';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useContext } from 'react';
import { MyContext } from './MyContext';

const feildValidationShema = yup.object({
  name : yup.string().required("Please Enter the Student name"),
  batch : yup.string().min(5).required("Please enter the batch name"),
  gender : yup.string().required("Please spcify the gender"),
  qualification : yup.string().required("please enter the qualification"),


}) 

function UpdateStudents() {
    const {students, setStudents} = useContext(MyContext);
    const {id} = useParams();
    const editStudent = students[id]
    const history = useHistory();

    
    const {handleSubmit,handleChange,values,handleBlur,touched,errors} = useFormik({
      initialValues : {
        name : (editStudent.name),
        batch : (editStudent.batch),
        gender : (editStudent.gender),
        qualification : (editStudent.qualification),
  
      },
      validationSchema : feildValidationShema,
      onSubmit : (editStudentData)=>{
        console.log("onsubmit");
        updateStudent(editStudentData);
      },
    })


    async function updateStudent (updatedObject){
        
     const response = await fetch(`https://646202d9185dd9877e48af11.mockapi.io/students/${editStudent.id}`, {
      method:"PUT",
      body:JSON.stringify(updatedObject),
      headers:{
        "Content-Type":"application/json"
      }
     })

     const data = await response.json()
     if(data){
         console.log(updatedObject)
         students[id] = updatedObject
         setStudents([...students])
         history.push("/students")
     }
    }

  return (
    <Base
    title={"Edit a Student data"}
    description={"Edit Students data is here"}
    >
    <div>
    <form onSubmit={handleSubmit}>
    <input
        placeholder='Enter Name'
        name = "name"
        type ="name"
        onBlur={handleBlur}
        value = {values.name}
        onChange={handleChange}
        />
        

        <div style={{color:"crimson"}}>{errors.name? errors.name : ""}</div>
        <br></br>
        <input
        placeholder='Enter Batch'
        name = "batch"
        type ="batch"
        onBlur={handleBlur}
        value ={values.batch}
        onChange={handleChange}
        />

        <div style={{color:"crimson"}}>{touched.batch && errors.batch? errors.batch : ""}</div>  

        <br></br>
        <input
        placeholder='Enter Gender'
        name = "gender"
        type ="gender" 
        onBlur={handleBlur}
        value ={values.gender}
        onChange={handleChange}
        />

        <div style={{color:"crimson"}}>{touched.gender && errors.gender? errors.gender : ""}</div>

        <br></br>

        <input
        placeholder='Enter Qualification'
        name = "qualification"
        type ="qualification"
        onBlur={handleBlur}
        value= {values.qualification}
        onChange={handleChange}
        />

        <div style={{color:"crimson"}}>{touched.qualification && errors.qualification? errors.qualification : ""}</div>

        <br></br>
    <button
    // onClick={updateStudent}
    type="onSubmit"
    >Update Students</button>
    </form>
</div>
</Base>
  )
}

export default UpdateStudents