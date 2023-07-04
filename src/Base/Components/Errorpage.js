import { Button } from '@mui/material'
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Base from '../Base'

function Errorpage() {
  const history= useHistory()
  return (
    <Base
    title={"404 PAGE NOT FOUND  "}
    about={"Back to Dashboard please"}>
      <Button variant="contained" onClick={()=>history.push("/")}>Go To Dashboard</Button>

    </Base>
  )
}

export default Errorpage