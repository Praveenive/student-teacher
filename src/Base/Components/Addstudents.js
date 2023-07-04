import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import Base from '../Base'
import { useHistory } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from 'formik';

const filledValidationSchema = yup.object({
  name: yup.string().required("Fill Student name"),
  batch:yup.string().required("Fill Student batch").min("5","Fill valid Batch"),
  gender:yup.string().required("Fill Student gender"),
  qualification:yup.string().required("Fill Student Qualification")
})

function Addstudents({student,setStudent}) {

const { handleSubmit,values,handleChange,errors } = useFormik({
  initialValues :{
    name:"",batch:"",gender:"",qualification:""
  },
  validationSchema:filledValidationSchema,
  onSubmit:(x)=>{
    console.log("Onsubmit",x)
    createstudent(x)
  }
})

  const history =useHistory( )
  function createstudent(x) {
    setStudent([...student, x]);
    history.push("/students");
  }
  return (
    <Base 
    title={"WELCOME TO OUR ACADEMY"}
    about={"Please fill these Form"}
    >
    <form onSubmit={handleSubmit}>
      <div className='input-list'>
      <TextField  label="Name" name="name" type="name" variant="filled" onChange={handleChange} value={values.name} /><div style={{color:"crimson"}}>{errors ? errors.name : ""}</div>
      <TextField  label="Batch" name="batch" type="batch" variant="filled" onChange={handleChange} value={values.batch}/><div style={{color:"crimson"}}>{errors ? errors.batch : ""}</div>
      <TextField  label="Gender" name="gender" type="gender" variant="filled" onChange={handleChange} value={values.gender}/><div style={{color:"crimson"}}>{errors ? errors.gender : ""}</div>
      <TextField  label="Qualification" name="qualification" type="qualification" variant="filled" onChange={handleChange} value={values.qualification}/><div style={{color:"crimson"}}>{errors ? errors.qualification : ""}</div>
      </div><br/>
      <Button variant="contained" type="submit">Add Students</Button>
     </form>
     </Base>
  )
}

export default Addstudents