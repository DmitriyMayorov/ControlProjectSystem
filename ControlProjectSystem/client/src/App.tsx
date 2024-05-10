import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Project from './Components/Projects/Projects';
import Worker from './Components/Workers/Workers';
import ProjectChoose from './Components/Projects/ProjectChoose';
import Task from './Components/Tasks/Tasks';
import UserObj from './Components/Enitities/UserObj';
import LogOff from './Components/RegisterAndLogin/Logout';
import Login from './Components/RegisterAndLogin/Login';
import Layout from './Components/Layout/Layout';
import { useEffect, useState } from 'react';
import Register from './Components/RegisterAndLogin/Register';
import TaskCurrent from './Components/Tasks/TaskCurrent';
import axios from 'axios';

interface ResponseModel {
  message: string;
  responseUser: UserObj;
}

function App() {

  const [user, setUser] = useState<UserObj | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (user !== null) {
          console.log(user);
          return;
        }
        const response = await axios.get("api/account/isauthenticated", {
          withCredentials: true,
        })
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout ChooseUser={user}/>}>
          <Route path='/login' element={<Login setUser={setUser}/>}/>
          <Route path='/logout' element={<LogOff setUser={setUser}/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/projects' element={<Project/>}/>
          <Route path='/workers' element={<Worker/>}/>
          <Route path='/projectsChoose' element={<ProjectChoose/>}/>
          <Route path='/currentProject' element={<Task ChooseUser={user}/>}/>
          <Route path='/currentTask' element={<TaskCurrent/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
