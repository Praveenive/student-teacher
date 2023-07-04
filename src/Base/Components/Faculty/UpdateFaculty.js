import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import * as yup from 'yup'
import { useFormik } from 'formik'
import Base from '../../Base'

const filledValidationSchema = yup.object({
  teacherName:yup.string().required("Kindly update the name"),
  subject:yup.string().required("Kindly update the subject").min("5","Fill valid batch"),
  teachergender:yup.string().required("Kindly update gender"),
  Role:yup.string().required("kindly update role")
})
function UpdateFaculty({teacher,setTeacher,editid,setEditid}) {
  const { handleSubmit,values,handleChange,errors } = useFormik({
    initialValues:{
      teacherName: "",subject:"",teachergender:"",Role:""
    },
    validationSchema :filledValidationSchema,
    onSubmit:(x)=>{
      console.log("Onsubmit",x)
      needupdate(x)
    }
  })
    const history =useHistory()
    const editTeacher = teacher[editid]
    const [teacherName,setTeachername]=useState("")
    const [subject,setSubject]=useState("")
    const [teacherGender,setTeacherGender]=useState("")
    const [role,setRole]=useState("")
    useEffect(()=>{
        setTeachername(editTeacher.teacherName)
        setSubject(editTeacher.subject)
         setTeacherGender(editTeacher.teacherGender)
         setRole(editTeacher.Role)
    },[editTeacher])
  
    function needupdate() {
      const updateobj = {teacherName:values.teacherName,subject:values.subject,teacherGender:values.teachergender,Role:values.Role }
    setTeacher((x) => {
      const updated = [...x];
      updated[editid] = updateobj;
      return updated;})
      history.push("/teachers")
}
    return (
      <Base
      title={"Welcome to Faculty Edit Section "}
      about ={"To Fill these and Update Your data "    }
      >
        <form onSubmit={handleSubmit}>
     <div className='input-list'>
        <TextField id="filled-basic" label="Name" variant="filled" name='teacherName' type='teacherName'
        onChange={handleChange} value={values.teacherName} />
        <div style={{color:"crimson"}}>{errors ? errors.teacherName : ""}</div>
        <TextField id="filled-basic" label="Subject" variant="filled" name='subject' type='subject'
         onChange={handleChange} value={values.subject}/>
         <div style={{color:"crimson"}}>{errors ? errors.subject : ""}</div>
        <TextField id="filled-basic" label="Gender" variant="filled" name='teachergender' type='teachergender'
        onChange={handleChange} value={values.teachergender}/>
        <div style={{color:"crimson"}}>{errors ? errors.teachergender : ""}</div>
        <TextField id="filled-basic" label="Role" variant="filled" name='Role' type='Role'
        onChange={handleChange} value={values.Role}/>
        <div style={{color:"crimson"}}>{errors ? errors.Role : ""}</div>
        </div><br/>
        <Button variant="contained" type='submit'>Update Students</Button>
        </form>
  
  
      </Base>
    )
  }

export default UpdateFaculty