import { useContext } from 'react';
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom';
import { MyContext } from './MyContext';

function Students() {
  const {students, setStudents} = useContext(MyContext);
  const history = useHistory();
  
      const deleteStudent = async (studId)=>{
      
      const response = await fetch(`https://646202d9185dd9877e48af11.mockapi.io/students/${studId}`, {
         method:"DELETE",
      });

      const data = await response.json()
     if(data){
       const remainingStudents = 
       students.filter((stud, idx)=> stud.id !== studId)
       setStudents(remainingStudents)
     }
    }

  
  return (
    <Base 
    title={"Students Data"}
    description={" Here can EDIT and DELETE the Student Data"}
    >

         <div className='card-container'>
            {students.map((stud, idx)=>(
                     <div className='card' key={idx}>
                        <div className='content'>
                     <h3>{stud.name}</h3>
                     <p>{stud.batch}</p>
                     <p>{stud.gender}</p>
                     <p>{stud.qualification}</p>
                     </div>

                     <div className='control'>
                     <button onClick={()=>history.push(`/edit/${stud.id}`)}>Edit</button> {" "}
                     <button onClick={()=>deleteStudent(stud.id)}>Delete</button>
                     </div>
                    </div>
            ))}
     </div>

    </Base>
  )
}

export default Students