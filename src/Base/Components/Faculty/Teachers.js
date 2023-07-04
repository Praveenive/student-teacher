import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Base from '../../Base'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



function Teachers({teacher,setTeacher,setEditId}) {
    const history=useHistory()
    async function removeFaculty(teachId){
      const response =await fetch(`https://644f880bba9f39c6ab65caa9.mockapi.io/teacher/${teachId}`,{
        method:"DELETE"
      })
      const data =await response.json();
      if(data){
   const remaingFacult= teacher.filter((teach,idx)=>teach.id!==teachId)
   setTeacher(remaingFacult)
      }
    }
    useEffect(()=>{
      const fetchFaculty = async()=>{
      const response =await fetch(`https://644f880bba9f39c6ab65caa9.mockapi.io/teacher`,{
        method:"GET"
      })
    
      const data = await response.json();
      setTeacher(data)
    }
    fetchFaculty()
    })
  return (
   <Base
   title={"Welcome To B45 Faculty List" }
   about={"All the Teachers details"}>
   
   
    <div>
   <div className='container'>
    {teacher.map((teach,idx)=>(
     <div className='card' key={idx}>        
     <h3>Name: { teach.teacherName}</h3>
     <p>Subject: {teach.subject}</p>
     <p>Gender: {teach.teacherGender}</p>
     <p>Role: {teach.Role}</p>
     <div className='button-list'>
     <Button variant="outlined"   startIcon={<EditIcon/>} onClick={()=>history.push(`/editteacher/${idx}`
 ,setEditId(idx))}>
  Edit
</Button>{" "}
 <Button variant="outlined"  onClick={()=>removeFaculty(idx)} startIcon={<DeleteIcon/>}>
  Delete
</Button>
     </div></div>

    ))
    }
    </div>
   </div>
   </Base>
  )
}

export default Teachers