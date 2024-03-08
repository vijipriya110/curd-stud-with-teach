// import { createContext } from 'react';


import { createContext, useState } from "react";

export const MyContext = createContext();


export const MyProvider = ({ children }) => {

    const [students, setStudents] = useState([]);

    const [teachers, setTeachers] = useState([]);

//    const handleMarkDownChange = (newMarkDown) => {
//      setMarkDown(newMarkDown);
//    };
 
   return (
    <MyContext.Provider
      value ={{
        students,
        setStudents,
        teachers, 
        setTeachers
      }}
      
      >
        {children}

      </MyContext.Provider>

    //  <MarkDownContext.Provider value={{MarkDown, handleMarkDownChange}}>
    //    {children}
    //  </MarkDownContext.Provider>
   );
 };
 
//  export const useMarkDown = () => useContext(MarkDownContext);
