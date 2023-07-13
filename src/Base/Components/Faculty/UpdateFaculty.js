import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import * as yup from 'yup'
import { useFormik } from 'formik'
import Base from '../../Base'

const filledValidationSchema = yup.object({
  teacherName: yup.string().required("Kindly update the name"),
  subject: yup.string().required("Kindly update the subject").min(5, "Fill valid subject"),
  teacherGender: yup.string().required("Kindly update gender"),
  Role: yup.string().required("Kindly update role")
})

function UpdateFaculty({ teacher, setTeacher, editid, setEditid }) {
  const history = useHistory()
  const editTeacher = teacher[editid]

  const { handleSubmit, values, handleChange, errors } = useFormik({
    initialValues: {
      teacherName: editTeacher.teacherName || "",
      subject: editTeacher.subject || "",
      teacherGender: editTeacher.teacherGender || "",
      Role: editTeacher.Role || ""
    },
    validationSchema: filledValidationSchema,
    onSubmit: (x) => {
      console.log("Onsubmit", x)
      needUpdate(x)
    }
  })

  useEffect(() => {
    handleChange({ target: { name: 'teacherName', value: editTeacher.teacherName || "" } })
    handleChange({ target: { name: 'subject', value: editTeacher.subject || "" } })
    handleChange({ target: { name: 'teacherGender', value: editTeacher.teacherGender || "" } })
    handleChange({ target: { name: 'Role', value: editTeacher.Role || "" } })
  }, [editTeacher, handleChange])

  async function needUpdate(updateData) {
    const updateObj = {
      teacherName: updateData.teacherName,
      subject: updateData.subject,
      teacherGender: updateData.teacherGender,
      Role: updateData.Role
    }

    const response = await fetch(`https://644f880bba9f39c6ab65caa9.mockapi.io/teacher/${editTeacher.id}`, {
      method: "PUT",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-type": "application/json"
      }
    })

    const data = await response.json()
    if (data) {
      setTeacher((teachers) => {
        const updatedTeachers = [...teachers];
        updatedTeachers[editid] = updateObj;
        return updatedTeachers;
      });
    }

    history.push("/teachers")
  }

  return (
    <Base
      title={"Welcome to Faculty Edit Section"}
      about={"To Fill these and Update Your data"}
    >
      <form onSubmit={handleSubmit}>
        <div className='input-list'>
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            name='teacherName'
            type='text'
            onChange={handleChange}
            value={values.teacherName}
          />
          <div style={{ color: "crimson" }}>{errors ? errors.teacherName : ""}</div>

          <TextField
            id="filled-basic"
            label="Subject"
            variant="filled"
            name='subject'
            type='text'
            onChange={handleChange}
            value={values.subject}
          />
          <div style={{ color: "crimson" }}>{errors ? errors.subject : ""}</div>

          <TextField
            id="filled-basic"
            label="Gender"
            variant="filled"
            name='teacherGender'
            type='text'
            onChange={handleChange}
            value={values.teacherGender}
          />
          <div style={{ color: "crimson" }}>{errors ? errors.teacherGender : ""}</div>

          <TextField
            id="filled-basic"
            label="Role"
            variant="filled"
            name='Role'
            type='text'
            onChange={handleChange}
            value={values.Role}
          />
          <div style={{ color: "crimson" }}>{errors ? errors.Role : ""}</div>
        </div>
        <br />
        <Button variant="contained" type='submit'>Update Faculty</Button>
      </form>
    </Base>
  )
}

export default UpdateFaculty;
