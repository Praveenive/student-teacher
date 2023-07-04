
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Addstudents from './Base/Components/Students/Addstudents'
import Dashboard from './Base/Components/Dashboard';
import Errorpage from './Base/Components/Errorpage';
import Addteacher from './Base/Components/Faculty/Addteacher';
import Students from './Base/Components/Students/Students';
import Teachers from './Base/Components/Faculty/Teachers';
import Updatestudents from './Base/Components/Students/Updatestudents';
import UpdateFaculty from './Base/Components/Faculty/UpdateFaculty';

function App() {
  const [student,setStudent]=useState([])
  const[teacher,setTeacher]=useState([])
  const [editIdx,setEditIdx]= useState();
  const [editid,setEditId] = useState()
  return (
    <div className="App">
     <Switch>
      <Route exact path="/">
        <Dashboard/>
        </Route>
        <Route path="/add">
          <Addstudents
          student={student}
          setStudent={setStudent}
          setEditIdx={setEditIdx}
          />
          </Route>
          <Route path="/edit">
          <Updatestudents
          student={student}
          setStudent={setStudent}
          editIdx={editIdx}
          />
          </Route> 
          <Route path="/students">
            <Students
             student={student}
             setStudent={setStudent}
             editIdx={editIdx}
             setEditIdx={setEditIdx}/>
          
            </Route>
            <Route path="/teachers">
              <Teachers
               teacher={teacher}
               setTeacher={setTeacher}
               setEditId={setEditId}/>
              </Route>  
              <Route path="/addteachers">
              <Addteacher
             teacher={teacher}
              setTeacher={setTeacher}/>
                </Route>  
                <Route path="/editteacher">
          <UpdateFaculty
          teacher={teacher} setTeacher={setTeacher}
         editid={editid} setEditId={setEditId}
          /></Route>
          <Route path="**">
            <Errorpage/>
            </Route> 
        
        </Switch>
    </div>
  );
}

export default App;
