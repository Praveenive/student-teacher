import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Base from '../Base'
import * as yup from 'yup'
import { useFormik } from 'formik'

const filledValidationSchema = yup.object({
  name:yup.string().required("Kindly update the name"),
  batch:yup.string().required("Kindly valid the batch").min("5","Fill valid batch"),
  gender:yup.string().required("Kindly update gender"),
  qualification:yup.string().required("kindly update qualification")
})
function Updatestudents({student,setStudent,editIdx,setEditIdx}) {
  const { handleSubmit,values,handleChange,errors } = useFormik({
    initialValues:{
      name: "",batch:"",gender:"",qualification:""
    },
    validationSchema :filledValidationSchema,
    onSubmit:(x)=>{
      console.log("Onsubmit",x)
      needupdate(x)
    }
  })

  const history =useHistory()
  const editStudent = student[editIdx]
  const [name,setName]=useState("")
  const [batch,setBatch]=useState("")
  const [gender,setGender]=useState("")
  const [qualification,setQualification]=useState("")
  
  useEffect(()=>{
       setName(editStudent.name)
       setBatch(editStudent.batch)
       setGender(editStudent.gender)
       setQualification(editStudent.qualification)
       console.log(editStudent)
  },[editStudent])

  function needupdate() {
    const updateobj = { name:values.name, batch:values.batch, qualification:values.qualification, gender:values.gender }
    setStudent((x) => {
      const updatedStudents = [...x];
      updatedStudents[editIdx] = updateobj;
      return updatedStudents;
    })
    history.push("/students")
  }
  
  return (
    <Base
    title={"Welcome to Student Edit Section "}
    about ={"To Fill these and Update Your data"}
    >
      <form onSubmit={handleSubmit}>
   <div className='input-list'>
      <TextField id="filled-basic" label="Name" variant="filled"  name='name' type='name' 
      onChange={handleChange} value={values.name} />
      <div style={{color:"crimson"}}>{errors ? errors.name : ""}</div>
      <TextField id="filled-basic" label="Batch" variant="filled" name='batch' type='batch'
      onChange={handleChange} value={values.batch}/>
      <div style={{color:"crimson"}}>{errors ? errors.batch : ""}</div>
      <TextField id="filled-basic" label="Gender" variant="filled"  name='gender' type='gender'
      onChange={handleChange} value={values.gender}/>
      <div style={{color:"crimson"}}>{errors ? errors.gender : ""}</div>
      <TextField id="filled-basic" label="Qualification" variant="filled"  name='qualification' type='qualification'
      onChange={handleChange} value={values.qualification}/>
      <div style={{color:"crimson"}}>{errors ? errors.qualification : ""}</div>
      </div><br/>
      <Button variant="contained" type='submit'>Update Students</Button>
      </form>
    </Base>
  )
}

export default Updatestudents