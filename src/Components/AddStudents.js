import Base from '../Base/Base'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useContext } from 'react'
import { MyContext } from './MyContext'


const feildValidationShema = yup.object({
  name : yup.string().required("Please Enter the Student name"),
  batch : yup.string().required("Please enter the batch name"),
  gender : yup.string().required("please spcify the gender"),
  qualification : yup.string().required("please enter the qualification"),


}) 


function AddStudents() {
  const {students, setStudents} = useContext(MyContext);

  const {handleSubmit,handleChange,values,handleBlur,touched,errors} = useFormik({
    initialValues : {
      name : "",
      batch : "",
      gender : "",
      qualification : "",

    },
    validationSchema : feildValidationShema,
    onSubmit : (newStudentData)=>{
      console.log("onsubmit");
      createStudent(newStudentData);
    },
  })

  const history = useHistory()
    
const createStudent = async (newStudents) =>{
    

const response = await fetch("https://646202d9185dd9877e48af11.mockapi.io/students", {
  method:"POST",
  body:JSON.stringify(newStudents),
  headers :{
    "Content-Type":"application/json"
  },
})
const data = await response.json()
  setStudents([...students, data])
  history.push("/students")
}

  return (
    <Base
    title={"Add New Student"}
    description={"We can able to add new students data here"}
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
        

        <div style={{color:"crimson"}}>{touched.name && errors.name? errors.name : ""}</div>
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
        type="onSubmit"
        >Add Students</button>
        </form>

    </div>
    </Base>
  )
}

export default AddStudents