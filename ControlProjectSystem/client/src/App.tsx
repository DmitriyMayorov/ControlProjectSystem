import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Project from './Components/Projects/Projects';
import Worker from './Components/Workers/Workers';
import ProjectList from './Components/Projects/ProjectList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/projects' element={<Project/>}/>
        <Route path='/workers' element={<Worker/>}/>
        <Route path='/projectsList' element={<ProjectList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
