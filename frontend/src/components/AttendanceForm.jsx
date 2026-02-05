import React, { useState, useEffect } from 'react';
import { employeeAPI, attendanceAPI } from '../services/api';

const AttendanceForm = ({ onAttendanceMarked }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
    } catch (err) {
      console.error('Failed to fetch employees', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      await attendanceAPI.mark(formData);
      setSuccess('Attendance marked successfully!');
      setFormData({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present'
      });
      if (onAttendanceMarked) onAttendanceMarked();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to mark attendance');
    } finally {
      setSubmitting(false);
    }
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    marginTop: '0.5rem'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#333'
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3 style={{ marginTop: 0 }}>Mark Attendance</h3>

      {error && (
        <div style={{
          backgroundColor: '#fee',
          color: '#c33',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {success}
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <label style={labelStyle}>
          Employee *
          <select
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.employee_id}>
                {emp.employee_id} - {emp.full_name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={labelStyle}>
          Date *
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={inputStyle}
            max={new Date().toISOString().split('T')[0]}
          />
        </label>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>
          Status *
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '4px',
          cursor: submitting ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
          opacity: submitting ? 0.6 : 1
        }}
      >
        {submitting ? 'Marking...' : 'Mark Attendance'}
      </button>
    </form>
  );
};

export default AttendanceForm;