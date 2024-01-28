import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Base from '../Base/Base';
import { useHistory } from 'react-router-dom';

function UpdateTeachers({teachers, setTeachers}) {
    const {id} = useParams();
     const editTeacher = teachers[id]
    const [name, setName] = useState("")
    const [batch, setBatch] = useState("")
    const [gender, setGender] = useState("")
    const [qualification, setQualification] = useState("")
    const history = useHistory();

    useEffect(()=>{
       setName(editTeacher.name)
       setBatch(editTeacher.batch)
       setGender(editTeacher.gender)
       setQualification(editTeacher.qualification)
    }, [editTeacher])

    async function updateTeacher (){
         const updatedObject = {
            name : name,
            batch : batch,
            gender: gender,
            qualification :qualification
         }
     const response = await fetch(`https://646202d9185dd9877e48af11.mockapi.io/teachers/${editTeacher.id}`, {
      method:"PUT",
      body:JSON.stringify(updatedObject),
      headers:{
        "Content-Type":"application/json"
      }
     })

     const data = await response.json()
     if(data){
         console.log(updatedObject)
         teachers[id] = updatedObject
         setTeachers([...teachers])
         history.push("/teachers")
     }
    }

  return (
    <Base
    title={"Edit a Teacher data"}
    description={"Edit Teachers data is here"}
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
    onClick={updateTeacher}
    >Update Teacher</button>
</div>
</Base>
  )
}

export default UpdateTeachers