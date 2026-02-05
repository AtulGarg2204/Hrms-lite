# HRMS Lite - Human Resource Management System

A lightweight, web-based Human Resource Management System designed for managing employee records and tracking daily attendance. Built as a full-stack application demonstrating end-to-end development skills.

## 🎯 Project Overview

HRMS Lite is an internal HR tool that allows administrators to efficiently manage employee information and monitor attendance records through a clean, professional interface.

## ✨ Features

### 1. Employee Management
- **Add New Employee**: Register employees with unique ID, full name, email, and department
- **View All Employees**: Display comprehensive list of all registered employees
- **Delete Employee**: Remove employee records (cascading deletion of associated attendance)

### 2. Attendance Management
- **Mark Attendance**: Record daily attendance with date and status (Present/Absent)
- **View Attendance Records**: Track attendance history for each employee
- **Filter by Employee**: View attendance records filtered by specific employees

## 🛠️ Technology Stack

### Frontend
- **React** (v18+) - Modern UI library for building interactive interfaces
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **Lucide React** - Icon library

### Backend
- **FastAPI** - High-performance Python web framework
- **Pydantic** - Data validation using Python type annotations
- **Uvicorn** - ASGI server for running FastAPI

### Database
- **MongoDB** - NoSQL database for flexible data storage
- **PyMongo** - MongoDB driver for Python

## 📋 Functional Requirements Met

✅ **Employee Management**
- Unique employee ID validation
- Full name, email, and department tracking
- Complete CRUD operations (Create, Read, Delete)

✅ **Attendance Tracking**
- Date-based attendance records
- Present/Absent status
- Employee-specific attendance history

✅ **Data Validation**
- Required field validation
- Email format validation
- Duplicate employee prevention
- Proper error handling with meaningful messages

✅ **Professional UI**
- Clean, intuitive layout
- Consistent typography and spacing
- Loading states
- Empty states
- Error states
- Responsive design

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.9 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Backend Setup

1. **Navigate to backend directory**
```bash
   cd backend
```

2. **Create and activate virtual environment**
```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Mac/Linux
   python3 -m venv venv
   source venv/bin/activate
```

3. **Install dependencies**
```bash
   pip install -r requirements.txt
```

4. **Configure environment variables**
   
   Create a `.env` file in the backend directory:
```env
   MONGODB_URL=mongodb://localhost:27017
   DATABASE_NAME=hrms_lite
```

   For MongoDB Atlas (cloud):
```env
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/
   DATABASE_NAME=hrms_lite
```

5. **Start the backend server**
```bash
   uvicorn app.main:app --reload --port 8000
```

   The API will be available at `http://localhost:8000`
   
   API documentation: `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
   cd frontend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure environment variables**
   
   Create a `.env` file in the frontend directory:
```env
   REACT_APP_API_URL=http://localhost:8000
```

4. **Start the development server**
```bash
   npm start
```

   The application will open at `http://localhost:3000`

## 📁 Project Structure
```
hrms-lite/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── models.py            # Pydantic data models
│   │   ├── database.py          # MongoDB connection setup
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── employees.py     # Employee CRUD endpoints
│   │       └── attendance.py    # Attendance tracking endpoints
│   ├── venv/                    # Virtual environment
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   └── requirements.txt         # Python dependencies
├── frontend/
│   ├── public/
│   │   └── _redirects           # Routing configuration for deployment
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.jsx   # Navigation bar
│   │   │   ├── EmployeeList.jsx # Employee listing and management
│   │   │   ├── AddEmployee.jsx  # Add employee form
│   │   │   ├── AttendanceForm.jsx    # Mark attendance form
│   │   │   ├── AttendanceList.jsx    # Attendance records display
│   │   │   └── LoadingSpinner.jsx    # Loading indicator
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── App.js               # Main application component
│   │   ├── App.css              # Application styles
│   │   └── index.css            # Global styles
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   └── package.json             # Node dependencies
└── README.md
```

## 🔌 API Endpoints

### Employee Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/employees/` | Create new employee |
| GET | `/employees/` | Get all employees |
| GET | `/employees/{employee_id}` | Get employee by ID |
| DELETE | `/employees/{employee_id}` | Delete employee |

### Attendance Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/attendance/` | Mark attendance |
| GET | `/attendance/` | Get all attendance records |
| GET | `/attendance/employee/{employee_id}` | Get attendance by employee |

## 🎨 Design Decisions

### Backend Architecture
- **RESTful API Design**: Clear, resource-based endpoints
- **Pydantic Models**: Type-safe request/response validation
- **Error Handling**: Proper HTTP status codes and descriptive error messages
- **Data Validation**: Server-side validation for all inputs

### Frontend Architecture
- **Component-Based**: Reusable, modular components
- **Service Layer**: Centralized API communication
- **State Management**: React hooks for local state
- **Error Handling**: User-friendly error messages and loading states

### Database Design
- **Collections**: `employees` and `attendance`
- **Indexing**: Unique index on `employee_id` for fast lookups
- **Referential Integrity**: Cascading delete for attendance records

## 🚢 Deployment

### Backend (Render)
- Platform: Render.com
- Deployed as: Web Service
- Environment: Python 3.9+

### Frontend (Vercel)
- Platform: Vercel
- Framework Preset: Create React App
- Environment Variables: `REACT_APP_API_URL`

## 🔒 Security Considerations

- Email validation using `email-validator`
- Unique constraint on employee IDs
- CORS configured for specific origins
- Environment variables for sensitive data
- Input sanitization through Pydantic models

## 🧪 Testing the Application

1. **Add Employee**: Create test employees across different departments
2. **View Employees**: Verify all employees display correctly
3. **Delete Employee**: Test deletion and confirm cascade to attendance
4. **Mark Attendance**: Record attendance for multiple employees and dates
5. **View Attendance**: Test filtering by employee
6. **Error Scenarios**: 
   - Try duplicate employee IDs
   - Try invalid email formats
   - Try marking attendance for non-existent employee

## 📝 Assignment Constraints

- ✅ Single admin user (no authentication required)
- ✅ No leave management or payroll features
- ✅ Professional, production-ready UI
- ✅ Clean, modular, readable code
- ✅ Proper error handling and validations
- ✅ RESTful API design
- ✅ Database persistence

## 👨‍💻 Development Time

Estimated completion time: 6-8 hours
- Backend Development: 2-3 hours
- Frontend Development: 2-3 hours
- Testing: 30 minutes
- Deployment: 1 hour
- Documentation: 30 minutes

## 📄 License

This project is created for educational and assignment purposes.

## 🤝 Contributing

This is an assignment project. For suggestions or improvements, please contact the developer.

---

**Developed as a Full-Stack Coding Assignment - HRMS Lite**
```

---

## 📦 GitHub Setup

### **File: `.gitignore`** (root level)
```
# Backend
backend/venv/
backend/__pycache__/
backend/*.pyc
backend/.env

# Frontend
frontend/node_modules/
frontend/build/
frontend/.env

# General
.DS_Store
*.log