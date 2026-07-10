import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Dashboard2 from './pages/Dashboard2'; 
import Dashboard3 from './pages/Dashboard3';
import CampusSetup from './pages/CampusSetup';
import Academic from './pages/Academic';
import ClassesSection from './pages/Classes&Session';
import SubjectManagement from './pages/SubjectManagement';
import FeeType from './pages/FeeType';
import ChartAccount from './pages/ChartAccount';
import Examination from './pages/Examination';
import Departs from './pages/Departs';
import Salary from './pages/Salary';
import Roles from './pages/Roles';
import TeacherTimings from './pages/TeacherTimings';
import Logs from './pages/Logs';
import SubjectAssignment from './pages/SubjectAssignment';
import LessonPlanning from './pages/LessonPlanning';
import TopicCoverage from './pages/TopicCoverage';
import Homework from './pages/Homework';
import Attendance from './pages/Attendance';
import MarksEntry from './pages/MarksEntry';
import ResultGeneration from './pages/ResultGeneration';

// Branch Admin Pages
import Academic2 from './pages/Academic2';
import ClassesSection2 from './pages/ClassesSection2';
import SubjectManagement2 from './pages/SubjectManagement2';
import FeeType2 from './pages/FeeType2';
import ChartAccount2 from './pages/ChartAccount2';
import Examination2 from './pages/Examination2';
import Departs2 from './pages/Departs2';
import Salary2 from './pages/Salary2';
import Roles2 from './pages/Roles2'; // FIXED: Added the missing import for Roles2
import TeacherTimings2 from './pages/TeacherTimings2';

function App() {
  return (
    <Router>
      <Routes>
        {/* The Login page */}
        <Route path="/" element={<Login />} />
        
        {/* Route for Teachers */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/SubjectAssignment' element={<SubjectAssignment/>} />  
        <Route path='/LessonPlanning' element={<LessonPlanning/>} />        
        <Route path='/TopicCoverage' element={<TopicCoverage/>} />   
        <Route path='/Homework' element={<Homework/>} />  
        <Route path='/Attendance' element={<Attendance/>} /> 
        <Route path='/MarksEntry' element={<MarksEntry/>} />   
        <Route path='/ResultGeneration' element={<ResultGeneration/>} />  

        {/* Route for Super Admin */}
        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="/CampusSetup" element={<CampusSetup/>} />
        <Route path="/Academic" element={<Academic/>} />
        <Route path='/ClassesSection' element={<ClassesSection/>}/>
        <Route path='/SubjectManagement' element={<SubjectManagement/>} />
        <Route path='/FeeType' element={<FeeType/>} />
        <Route path='/ChartAccount' element={<ChartAccount/>} />
        <Route path='/Examination' element={<Examination/>} />  
        <Route path='/Departs' element={<Departs/>} />  
        <Route path='/salary' element={<Salary/>} />    
        <Route path='/Roles' element={<Roles/>} />          
        <Route path='/TeacherTimings' element={<TeacherTimings/>} />          
        <Route path='/Logs' element={<Logs/>} />   

        {/* Route for Admin panel */}
        <Route path="/dashboard3" element={<Dashboard3 />} />
        <Route path="/Academic2" element={<Academic2 />} />
        <Route path="/ClassesSection2" element={<ClassesSection2 />} />
        <Route path="/SubjectManagement2" element={<SubjectManagement2/>} />
        <Route path="/FeeType2" element={<FeeType2 />} />
        <Route path="/ChartAccount2" element={<ChartAccount2 />} />
        <Route path="/Examination2" element={<Examination2 />} />
        <Route path="/Departs2" element={<Departs2 />} />
        <Route path="/Salary2" element={<Salary2 />} />
        <Route path="/Roles2" element={<Roles2 />} />
        <Route path="/TeacherTimings2" element={<TeacherTimings2 />} />
      </Routes>
    </Router>
  );
}

export default App;