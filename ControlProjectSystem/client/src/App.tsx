import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Project from './Components/Projects/Projects';
import Worker from './Components/Workers/Workers';
import ProjectChoose from './Components/Projects/ProjectChoose';
import Task from './Components/Tasks/Tasks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<h3>Система управления программными проектами</h3>}/>
        <Route path='/projects' element={<Project/>}/>
        <Route path='/workers' element={<Worker/>}/>
        <Route path='/projectsChoose' element={<ProjectChoose/>}/>
        <Route path='/projectsChoose/currentProject' element={<Task/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
