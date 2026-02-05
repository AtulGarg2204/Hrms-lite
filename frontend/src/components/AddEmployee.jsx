import React, { useState } from 'react';
import { employeeAPI } from '../services/api';

const AddEmployee = ({ onEmployeeAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: 'IT'
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const departments = ['HR', 'IT', 'Finance', 'Marketing', 'Operations'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await employeeAPI.create(formData);
      setFormData({ employee_id: '', full_name: '', email: '', department: 'IT' });
      onEmployeeAdded();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add employee');
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
      <h3 style={{ marginTop: 0 }}>Add New Employee</h3>
      
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

      <div style={{ marginBottom: '1rem' }}>
        <label style={labelStyle}>
          Employee ID *
          <input
            type="text"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="e.g., EMP001"
          />
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={labelStyle}>
          Full Name *
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="e.g., John Doe"
          />
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={labelStyle}>
          Email Address *
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="e.g., john.doe@company.com"
          />
        </label>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>
          Department *
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          type="submit"
          disabled={submitting}
          style={{
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            padding: '0.75rem 2rem',
            borderRadius: '4px',
            cursor: submitting ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            opacity: submitting ? 0.6 : 1
          }}
        >
          {submitting ? 'Adding...' : 'Add Employee'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            backgroundColor: '#95a5a6',
            color: 'white',
            border: 'none',
            padding: '0.75rem 2rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddEmployee;