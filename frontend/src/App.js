import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import EmployeeList from './components/EmployeeList';
import AttendanceForm from './components/AttendanceForm';
import AttendanceList from './components/AttendanceList';
import './App.css';

function App() {
  const [attendanceRefresh, setAttendanceRefresh] = useState(0);

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route 
            path="/attendance" 
            element={
              <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h2>Attendance Management</h2>
                <AttendanceForm onAttendanceMarked={() => setAttendanceRefresh(prev => prev + 1)} />
                <AttendanceList refresh={attendanceRefresh} />
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;