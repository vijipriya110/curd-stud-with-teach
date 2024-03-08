import { useContext } from 'react';
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom';
import { MyContext } from './MyContext';

function Teachers() {
  const { teachers, setTeachers} = useContext(MyContext);
  const history = useHistory();
    // delete functionality
  const deleteTeacher = async (teachId)=>{
      
      const response = await fetch(`https://646202d9185dd9877e48af11.mockapi.io/teachers/${teachId}`, {
         method:"DELETE",
      });

      const data = await response.json()
     if(data){
       const remainingTechers = 
       teachers.filter((teach, idx)=> teach.id !== teachId)
       setTeachers(remainingTechers)
     }
    }

  
  return (
    <Base 
    title={"Teachers Data"}
    description={" Here can EDIT and DELETE the Teacher Data"}
    >

         <div className='card-container'>
            {teachers.map((teach, idx)=>(
                     <div className='card' key={idx}>
                        <div className='content'>
                     <h3>{teach.name}</h3>
                     <p>{teach.batch}</p>
                     <p>{teach.gender}</p>
                     <p>{teach.qualification}</p>
                     </div>

                     <div className='control'>
                     <button onClick={()=>history.push(`/editt/${teach.id}`)}>Edit</button> {" "}
                     <button onClick={()=>deleteTeacher(teach.id)}>Delete</button>
                     </div>
                    </div>
            ))}
     </div>

    </Base>
  )
}

export default Teachers