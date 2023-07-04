import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import Base from '../../Base';

const filledValidationSchema = yup.object({
  teacherName: yup.string().required("Fill Faculty name"),
  subject: yup.string().required("Fill the subject"),
  teacherGender: yup.string().required("Fill the gender"),
  Role: yup.string().required("Fill the Role")
});

function Addteacher({ teacher, setTeacher }) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      teacherName: "",
      subject: "",
      teacherGender: "",
      Role: ""
    },
    validationSchema: filledValidationSchema,
    onSubmit: (values) => {
      console.log("Onsubmit", values);
      createFaculty(values);
    }
  });

  async function createFaculty(teacherData) {
    const response =await fetch(`https://644f880bba9f39c6ab65caa9.mockapi.io/teacher`,{
      method:"POST",
      body:JSON.stringify(teacherData),
      headers:{
        "Content-type":"application/json"
      }

    })
    const data =await response.json();
    if(data){
    setTeacher([...teacher, teacherData]);
    history.push("/teachers");
  }
  }
  const { handleSubmit, values, handleChange, errors } = formik;

  return (
    <Base
      title={"WELCOME TO OUR ACADEMY"}
      about={"Please fill these Form"}
    >
      <form onSubmit={handleSubmit}>
        <div className='input-list'>
          <TextField
            label="Name"
            name='teacherName'
            type="text"
            variant="filled"
            onChange={handleChange}
            value={values.teacherName}
          />
          <div style={{ color: "crimson" }}>{errors.teacherName}</div>

          <TextField
            label="Subject"
            variant="filled"
            name="subject"
            type="text"
            onChange={handleChange}
            value={values.subject}
          />
          <div style={{ color: "crimson" }}>{errors.subject}</div>

          <TextField
            label="Gender"
            variant="filled"
            name="teacherGender"
            type="text"
            onChange={handleChange}
            value={values.teacherGender}
          />
          <div style={{ color: "crimson" }}>{errors.teacherGender}</div>

          <TextField
            label="Role"
            variant="filled"
            name="Role"
            type="text"
            onChange={handleChange}
            value={values.Role}
          />
          <div style={{ color: "crimson" }}>{errors.Role}</div>
        </div>
        <br />
        <Button variant="contained" type="submit">Add Faculty</Button>
      </form>
    </Base>
  );
}

export default Addteacher;
