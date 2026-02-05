import React, { useState, useEffect } from 'react';
import { employeeAPI } from '../services/api';
import AddEmployee from './AddEmployee';
import LoadingSpinner from './LoadingSpinner';
import { Trash2, UserPlus } from 'lucide-react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employees');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.delete(employeeId);
        fetchEmployees();
      } catch (err) {
        alert('Failed to delete employee');
        console.error(err);
      }
    }
  };

  const handleEmployeeAdded = () => {
    setShowAddForm(false);
    fetchEmployees();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2>Employee Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem'
          }}
        >
          <UserPlus size={18} />
          {showAddForm ? 'Cancel' : 'Add Employee'}
        </button>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#e74c3c',
          color: 'white',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {showAddForm && (
        <AddEmployee 
          onEmployeeAdded={handleEmployeeAdded}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {employees.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          color: '#6c757d'
        }}>
          <p style={{ fontSize: '1.1rem' }}>No employees found. Add your first employee to get started!</p>
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
                <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Department</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '1rem' }}>{employee.employee_id}</td>
                  <td style={{ padding: '1rem' }}>{employee.full_name}</td>
                  <td style={{ padding: '1rem' }}>{employee.email}</td>
                  <td style={{ padding: '1rem' }}>{employee.department}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(employee.employee_id)}
                      style={{
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
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

export default EmployeeList;