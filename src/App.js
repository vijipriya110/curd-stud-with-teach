import { Switch,Route } from 'react-router-dom';
import './App.css';
import Students from './Components/Students.js';
import AddStudents from './Components/AddStudents';
import UpdateStudents from './Components/UpdateStudents';
import { useContext, useEffect } from 'react';
import DashBoard from './Components/DashBoard';
import Teachers from './Components/Teachers.js';
import AddTeachers from './Components/AddTeachers.js';
import UpdateTeachers from './Components/UpdateTeachers.js';
import { MyContext } from './Components/MyContext.js';




function App() {
  const { setStudents, setTeachers} = useContext(MyContext);

  useEffect(()=>{
    const getStudents = async () =>{
        const response = await fetch("https://646202d9185dd9877e48af11.mockapi.io/students", {
          method:"GET",
        }); 
        const data = await response.json();
        if(data){
          setStudents(data)
        }
    }
    getStudents();
  }, )

  useEffect(()=>{
    const getTeachers = async () =>{
        const response = await fetch("https://646202d9185dd9877e48af11.mockapi.io/teachers", {
          method:"GET",
        }); 
        const data = await response.json();
        if(data){
          setTeachers(data)
        }
    }
    getTeachers();
  }, )


  return (
    <div className="App">

      
      
       <Switch>
        {/* Exact path first page to load */}
         <Route exact path="/">
             <DashBoard/>
         </Route>

          <Route path="/students">
            <Students/>
          </Route>

          <Route path="/teachers">
            <Teachers/>
          </Route>

          
         <Route path="/add">
            <AddStudents/>
         </Route>

         <Route path="/addnew">
            <AddTeachers/>
         </Route>

         <Route path="/edit/:id">
            <UpdateStudents/>
         </Route>

         <Route path="/editt/:id">
            <UpdateTeachers/>
         </Route>

         
       </Switch>
    </div>
  );
}

export default App;