
import React, { useEffect, useState } from 'react'
import Base from '../../Base'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router-dom';


function Students({student,setStudent,editIdx,setEditIdx}) {

const history = useHistory()
async function deleteStudent(studId) {
    const response = await fetch(`https://644f880bba9f39c6ab65caa9.mockapi.io/users/${studId}`,{
      method:"DELETE"
    })
    const data = await response.json()
     if(data){
       const remainingStudents = 
       student.filter((stud, idx)=> stud.id !== studId)
       setStudent(remainingStudents)
  }
}
  useEffect(()=>{
    const fetchallStudents = async()=>{
      const response = await fetch(`https://644f880bba9f39c6ab65caa9.mockapi.io/users`,{
        method:"GET"
      })
   
    const data = await response.json();
    setStudent(data)
  }
    fetchallStudents()
  },[])
  
  return (
    
    <Base
    title={"BEGINNER ACADEMY"}
    about={"All the Students details"}>
<div className='container'>
      {student.map((stud,idx)=>(
      <div className='card' key={idx}>        
 <h3>{stud.name}</h3>
 <p>{stud.batch}</p>
 <p>{stud.gender}</p>
 <p>{stud.qualification}</p>

 <div className='button-list'>
 <Button variant="outlined" onClick={()=>history.push(`/edit/${idx}`
 ,setEditIdx(idx))}  startIcon={<EditIcon/>}>
  Edit
</Button>{" "}
 <Button variant="outlined"   onClick={()=>deleteStudent(idx)} startIcon={<DeleteIcon/>}>
  Delete
</Button>
 </div></div>
      ))}
       
      </div>
    </Base>

  )
}

export default Students