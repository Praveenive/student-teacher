import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Base from '../../Base'
import * as yup from 'yup'
import { useFormik } from 'formik'

const filledValidationSchema = yup.object({
  name: yup.string().required("Kindly update the name"),
  batch: yup.string().required("Kindly valid the batch").min(5, "Fill valid batch"),
  gender: yup.string().required("Kindly update gender"),
  qualification: yup.string().required("kindly update qualification")
})

function Updatestudents({ student, setStudent, editIdx, setEditIdx }) {
  const { id } = useParams()
  const history = useHistory()

  const { handleSubmit, values, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      batch: "",
      gender: "",
      qualification: ""
    },
    validationSchema: filledValidationSchema,
    onSubmit: (x) => {
      console.log("Onsubmit", x)
      needUpdate(x)
    }
  })

  const editStudent = student[editIdx]

  useEffect(() => {
    if (editStudent) {
      handleChange({ target: { name: 'name', value: editStudent.name } })
      handleChange({ target: { name: 'batch', value: editStudent.batch } })
      handleChange({ target: { name: 'gender', value: editStudent.gender } })
      handleChange({ target: { name: 'qualification', value: editStudent.qualification } })
    }
  }, [editStudent, handleChange])

  async function needUpdate(updateData) {
    const updateObj = {
      name: updateData.name,
      batch: updateData.batch,
      qualification: updateData.qualification,
      gender: updateData.gender
    }

    const response = await fetch(`https://644f880bba9f39c6ab65caa9.mockapi.io/users/${editStudent.id}`, {
      method: "PUT",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-type": "application/json"
      }
    })

    const data = await response.json()
    if (data) {
      console.log(updateObj)
      student[id] = updateObj
      setStudent([...student])
    }
    history.push("/students")
  }

  return (
    <Base
      title={"Welcome to Student Edit Section "}
      about={"To Fill these and Update Your data"}
    >
      <form onSubmit={handleSubmit}>
        <div className='input-list'>
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            name='name'
            type='name'
            onChange={handleChange}
            value={values.name}
          />
          <div style={{ color: "crimson" }}>{errors ? errors.name : ""}</div>

          <TextField
            id="filled-basic"
            label="Batch"
            variant="filled"
            name='batch'
            type='batch'
            onChange={handleChange}
            value={values.batch}
          />
          <div style={{ color: "crimson" }}>{errors ? errors.batch : ""}</div>

          <TextField
            id="filled-basic"
            label="Gender"
            variant="filled"
            name='gender'
            type='gender'
            onChange={handleChange}
            value={values.gender}
          />
          <div style={{ color: "crimson" }}>{errors ? errors.gender : ""}</div>

          <TextField
            id="filled-basic"
            label="Qualification"
            variant="filled"
            name='qualification'
            type='qualification'
            onChange={handleChange}
            value={values.qualification}
          />
          <div style={{ color: "crimson" }}>{errors ? errors.qualification : ""}</div>
        </div>
        <br />
        <Button variant="contained" type='submit'>Update Students</Button>
      </form>
    </Base>
  )
}

export default Updatestudents
