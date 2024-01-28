import React, { useState } from 'react'
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom'


function AddTeachers({teachers, setTeachers}) {
  const history = useHistory()
    const [name, setName] = useState("")
    const [batch, setBatch] = useState("")
    const [gender, setGender] = useState("")
    const [qualification, setQualification] = useState("")

const createTeacher = async () =>{
    // creating object from input states
    const newTeachers = {
      name:name,
      batch:batch,
      qualification:qualification,
      gender: gender,
}

const response = await fetch("https://646202d9185dd9877e48af11.mockapi.io/teachers", {
  method:"POST",
  body:JSON.stringify(newTeachers),
  headers :{
    "Content-Type":"application/json"
  },
})
const data = await response.json()
  setTeachers([...teachers, data])
  history.push("/teachers")
}

  return (
    <Base
    title={"Add New Teacher"}
    description={"We can able to add new teachers data here"}
    >
    <div>
        <input
        placeholder='Enter Name'
        type ="text"
        value = {name}
        onChange={(e)=>setName(e.target.value)}
        />
        <input
        placeholder='Enter Batch'
        type ="text"
        value ={batch}
        onChange={(e)=>setBatch(e.target.value)}
        />

        <input
        placeholder='Enter Gender'
        type ="text"  
        value ={gender}
        onChange={(e)=>setGender(e.target.value)}
        />

        <input
        placeholder='Enter Qualification'
        type ="text" 
        value= {qualification}
        onChange={(e)=>setQualification(e.target.value)}
        />

        <button
        onClick={createTeacher}
        >Add Teacher</button>
    </div>
    </Base>
  )
}

export default AddTeachers