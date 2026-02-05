import React, { useState, useEffect } from 'react';
import { attendanceAPI, employeeAPI } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const AttendanceList = ({ refresh }) => {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState('all');

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [attendanceRes, employeesRes] = await Promise.all([
        attendanceAPI.getAll(),
        employeeAPI.getAll()
      ]);
      
      setAttendance(attendanceRes.data);
      
      const empMap = {};
      employeesRes.data.forEach(emp => {
        empMap[emp.employee_id] = emp;
      });
      setEmployees(empMap);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAttendance = selectedEmployee === 'all' 
    ? attendance 
    : attendance.filter(a => a.employee_id === selectedEmployee);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontWeight: '500', marginRight: '1rem' }}>
          Filter by Employee:
        </label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '1rem'
          }}
        >
          <option value="all">All Employees</option>
          {Object.values(employees).map(emp => (
            <option key={emp.id} value={emp.employee_id}>
              {emp.employee_id} - {emp.full_name}
            </option>
          ))}
        </select>
      </div>

      {filteredAttendance.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          color: '#6c757d'
        }}>
          <p style={{ fontSize: '1.1rem' }}>No attendance records found.</p>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Employee ID</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Employee Name</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((record) => (
                <tr key={record.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '1rem' }}>{record.employee_id}</td>
                  <td style={{ padding: '1rem' }}>
                    {employees[record.employee_id]?.full_name || 'Unknown'}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      backgroundColor: record.status === 'Present' ? '#d4edda' : '#f8d7da',
                      color: record.status === 'Present' ? '#155724' : '#721c24'
                    }}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceList;