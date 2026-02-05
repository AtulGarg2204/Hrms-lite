import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee APIs
export const employeeAPI = {
  getAll: () => api.get('/employees/'),
  getById: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post('/employees/', data),
  delete: (id) => api.delete(`/employees/${id}`),
};

// Attendance APIs
export const attendanceAPI = {
  getAll: () => api.get('/attendance/'),
  getByEmployeeId: (employeeId) => api.get(`/attendance/employee/${employeeId}`),
  mark: (data) => api.post('/attendance/', data),
};

export default api;