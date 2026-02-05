# HRMS Lite - Human Resource Management System

A lightweight, web-based Human Resource Management System designed for managing employee records and tracking daily attendance. Built as a full-stack application demonstrating end-to-end development skills.

## 🎯 Project Overview

HRMS Lite is an internal HR tool that allows administrators to efficiently manage employee information and monitor attendance records through a clean, professional interface. This project demonstrates full-stack development capabilities including modern frontend design, RESTful API development, database management, and cloud deployment.

---

## 🌐 Live Deployment

### Production URLs
- **Frontend Application**: [https://hrms-lite-two-lovat.vercel.app/](https://hrms-lite-two-lovat.vercel.app/)
- **Backend API**: [https://hrms-lite-9p16.onrender.com](https://hrms-lite-9p16.onrender.com)
- **API Documentation**: [https://hrms-lite-9p16.onrender.com/docs](https://hrms-lite-9p16.onrender.com/docs)

> **Note**: The backend is hosted on Render's free tier and may experience cold starts (~30 seconds) after periods of inactivity. The first request might take longer to respond.

---

## ✨ Features

### 1. Employee Management
- **Add New Employee**: Register employees with unique ID, full name, email, and department
- **View All Employees**: Display comprehensive list of all registered employees in a clean table format
- **Delete Employee**: Remove employee records with confirmation dialog (cascading deletion of associated attendance)
- **Validation**: Real-time email format validation, duplicate ID prevention, required field checks

### 2. Attendance Management
- **Mark Attendance**: Record daily attendance with date and status (Present/Absent)
- **View Attendance Records**: Track complete attendance history with employee details
- **Filter by Employee**: View attendance records filtered by specific employees
- **Smart Updates**: Automatically updates existing attendance if marking for the same employee and date

### 3. User Experience
- **Professional UI**: Clean, modern interface with intuitive navigation
- **Loading States**: Visual feedback during data fetching and API calls
- **Empty States**: Helpful messages when no data is available
- **Error Handling**: User-friendly error messages with actionable guidance
- **Responsive Design**: Works seamlessly across different screen sizes
- **Confirmation Dialogs**: Prevents accidental deletions with confirmation prompts

---

## 🛠️ Technology Stack

### Frontend
- **React** (v18+) - Modern UI library for building interactive interfaces
- **React Router** (v6) - Client-side routing and navigation
- **Axios** - Promise-based HTTP client for API communication
- **Lucide React** - Beautiful, consistent icon library
- **CSS3** - Custom styling with modern CSS features

### Backend
- **FastAPI** (v0.115.0) - High-performance Python web framework
- **Pydantic** (v2.10.3) - Data validation using Python type annotations
- **Uvicorn** (v0.32.1) - Lightning-fast ASGI server
- **PyMongo** (v4.10.1) - Official MongoDB driver for Python
- **Python** (v3.13.2) - Latest stable Python version

### Database
- **MongoDB Atlas** - Cloud-hosted NoSQL database for flexible document storage
- **Collections**: `employees` and `attendance` with proper indexing

### Deployment & DevOps
- **Vercel** - Frontend hosting with automatic deployments
- **Render** - Backend API hosting with auto-deploy from GitHub
- **GitHub** - Version control and CI/CD integration
- **Environment Variables** - Secure configuration management

---

## 📋 Functional Requirements Met

### ✅ Employee Management
- Unique employee ID validation
- Full name, email, and department tracking
- Complete CRUD operations (Create, Read, Delete)
- Cascading delete for related attendance records

### ✅ Attendance Tracking
- Date-based attendance records
- Present/Absent status options
- Employee-specific attendance history
- Automatic update for duplicate date entries

### ✅ Data Validation
- Required field validation on both client and server
- Email format validation (RFC 5322 compliant)
- Duplicate employee ID prevention
- Duplicate email address prevention
- Date range validation (cannot mark future attendance)
- Meaningful HTTP status codes (200, 201, 204, 400, 404)
- Descriptive error messages

### ✅ Professional UI
- Clean, intuitive layout
- Consistent typography and spacing
- Modern color scheme and visual hierarchy
- Loading states during async operations
- Empty states with helpful guidance
- Error states with clear messages
- Smooth transitions and interactions
- Responsive design principles

---

## 🚀 Local Development Setup

### Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.13.2 or higher) - [Download](https://www.python.org/downloads/)
- **MongoDB** - [Local Installation](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (recommended)
- **Git** - [Download](https://git-scm.com/downloads)

### Backend Setup

1. **Clone the repository**
```bash
   git clone https://github.com/AtulGarg2204/Hrms-lite.git
   cd Hrms-lite/backend
```

2. **Verify Python version**
```bash
   python --version
   # Should output: Python 3.13.2 or higher
```

3. **Create and activate virtual environment**
```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Mac/Linux
   python3 -m venv venv
   source venv/bin/activate
```

4. **Install dependencies**
```bash
   pip install -r requirements.txt
```

5. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   
   **For Local MongoDB:**
```env
   MONGODB_URL=mongodb://localhost:27017
   DATABASE_NAME=hrms_lite
```

   **For MongoDB Atlas (Recommended):**
```env
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   DATABASE_NAME=hrms_lite
```
   
   > Replace `username`, `password`, and cluster URL with your actual MongoDB Atlas credentials.

6. **Start the backend server**
```bash
   uvicorn app.main:app --reload --port 8000
```

   The API will be available at:
   - Main endpoint: `http://localhost:8000`
   - Interactive API docs (Swagger): `http://localhost:8000/docs`
   - Alternative docs (ReDoc): `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
   cd ../frontend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure environment variables**
   
   Create a `.env` file in the `frontend` directory:
```env
   REACT_APP_API_URL=http://localhost:8000
```

4. **Start the development server**
```bash
   npm start
```

   The application will automatically open at `http://localhost:3000`

---

## 📁 Project Structure
```
hrms-lite/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── models.py            # Pydantic data models and schemas
│   │   ├── database.py          # MongoDB connection and configuration
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── employees.py     # Employee CRUD endpoints
│   │       └── attendance.py    # Attendance management endpoints
│   ├── venv/                    # Python virtual environment (git-ignored)
│   ├── .env                     # Environment variables (git-ignored)
│   ├── .gitignore
│   ├── runtime.txt              # Python version specification for Render
│   └── requirements.txt         # Python package dependencies
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── _redirects           # Vercel routing configuration
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.jsx        # Top navigation bar
│   │   │   ├── EmployeeList.jsx      # Employee listing and management
│   │   │   ├── AddEmployee.jsx       # Employee creation form
│   │   │   ├── AttendanceForm.jsx    # Attendance marking form
│   │   │   ├── AttendanceList.jsx    # Attendance records display
│   │   │   └── LoadingSpinner.jsx    # Reusable loading component
│   │   ├── services/
│   │   │   └── api.js           # Centralized API service layer
│   │   ├── App.js               # Main application component with routing
│   │   ├── App.css              # Application-specific styles
│   │   └── index.css            # Global styles and animations
│   ├── .env                     # Environment variables (git-ignored)
│   ├── .gitignore
│   └── package.json             # Node.js dependencies and scripts
│
├── .gitignore                   # Root git ignore file
└── README.md                    # This file
```

---

## 🔌 API Endpoints

### Employee Routes

| Method | Endpoint | Description | Request Body | Response | Status Code |
|--------|----------|-------------|--------------|----------|-------------|
| POST | `/employees/` | Create new employee | `EmployeeCreate` | `EmployeeResponse` | 201 |
| GET | `/employees/` | Get all employees | - | `List[EmployeeResponse]` | 200 |
| GET | `/employees/{employee_id}` | Get specific employee | - | `EmployeeResponse` | 200 |
| DELETE | `/employees/{employee_id}` | Delete employee | - | No content | 204 |

### Attendance Routes

| Method | Endpoint | Description | Request Body | Response | Status Code |
|--------|----------|-------------|--------------|----------|-------------|
| POST | `/attendance/` | Mark/update attendance | `AttendanceCreate` | `AttendanceResponse` | 201 |
| GET | `/attendance/` | Get all attendance records | - | `List[AttendanceResponse]` | 200 |
| GET | `/attendance/employee/{employee_id}` | Get employee attendance | - | `List[AttendanceResponse]` | 200 |

### Data Models

**EmployeeCreate Schema:**
```json
{
  "employee_id": "EMP001",
  "full_name": "John Doe",
  "email": "john.doe@company.com",
  "department": "IT"
}
```

**AttendanceCreate Schema:**
```json
{
  "employee_id": "EMP001",
  "date": "2025-02-05",
  "status": "Present"
}
```

**Departments Enum:**
- HR
- IT
- Finance
- Marketing
- Operations

---

## 🚢 Deployment Configuration

### Backend Deployment (Render)

**Platform:** Render.com (Free Tier)

**Configuration:**
- **Service Type:** Web Service
- **Repository:** https://github.com/AtulGarg2204/Hrms-lite
- **Root Directory:** `backend`
- **Python Version:** 3.13.2 (specified in `runtime.txt`)
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

**Environment Variables:**
```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DATABASE_NAME=hrms_lite
```

**Features:**
- ✅ Auto-deploy from `main` branch
- ✅ HTTPS enabled by default
- ✅ Environment variable management
- ⚠️ Free tier: May spin down after 15 minutes of inactivity (cold start ~30s)

### Frontend Deployment (Vercel)

**Platform:** Vercel (Free Tier)

**Configuration:**
- **Framework:** Create React App
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Node Version:** 18.x (auto-detected)

**Environment Variables:**
```env
REACT_APP_API_URL=https://hrms-lite-9p16.onrender.com
```

**Features:**
- ✅ Auto-deploy from `main` branch
- ✅ HTTPS enabled by default
- ✅ Global CDN for fast load times
- ✅ Automatic preview deployments for PRs

### Database (MongoDB Atlas)

**Platform:** MongoDB Atlas (Free Tier - M0)

**Configuration:**
- **Cluster:** Shared (M0 Sandbox)
- **Region:** Auto-selected based on location
- **Storage:** 512 MB (free tier limit)

**Network Access:**
- IP Whitelist: `0.0.0.0/0` (allow from anywhere for development)
- Production: Restrict to Render's IP ranges

---

## 🎨 Design Decisions

### Backend Architecture
- **RESTful API Design**: Clear, resource-based endpoints following REST principles
- **Pydantic Models**: Type-safe request/response validation with automatic API documentation
- **Error Handling**: Consistent HTTP status codes (200, 201, 204, 400, 404, 500) with descriptive error messages
- **Data Validation**: Server-side validation for all inputs prevents invalid data storage
- **Separation of Concerns**: Routes, models, and database logic are properly separated

### Frontend Architecture
- **Component-Based**: Reusable, modular React components for maintainability
- **Service Layer**: Centralized API communication through `api.js` for easy endpoint management
- **State Management**: React hooks (useState, useEffect) for local component state
- **Error Handling**: User-friendly error messages and loading states enhance UX
- **Inline Styling**: CSS-in-JS for component-scoped styling (trade-off for simplicity)

### Database Design
- **Collections**: 
  - `employees`: Stores employee master data
  - `attendance`: Stores attendance records linked by employee_id
- **Indexing**: Unique index on `employee_id` for O(1) lookups and duplicate prevention
- **Referential Integrity**: Cascading delete implemented in application layer (MongoDB doesn't enforce foreign keys)
- **Document Structure**: Flat structure for simplicity, suitable for the application scope

### Technology Choices
- **FastAPI over Django/Flask**: Modern async support, automatic API docs, better performance
- **MongoDB over SQL**: Flexible schema, easier setup, good for prototyping
- **React over Vue/Angular**: Large ecosystem, component reusability, easier learning curve
- **Vercel/Render over AWS/Azure**: Zero-config deployment, better developer experience for small apps

---

## 🚀 Future Enhancements

Potential improvements for future iterations:

1. **Authentication & Authorization**
   - User login/signup
   - Role-based access control (Admin, Manager, Employee)
   - JWT token-based authentication

2. **Advanced Features**
   - Leave management system
   - Payroll calculation
   - Employee performance tracking
   - Report generation (PDF/Excel)

3. **Technical Improvements**
   - Comprehensive unit and integration tests
   - Database migration scripts
   - Real-time updates with WebSockets
   - Caching layer (Redis)
   - Rate limiting for API endpoints

4. **UI/UX Enhancements**
   - Dark mode support
   - Advanced filtering and sorting
   - Data visualization (charts/graphs)
   - Bulk operations (import/export CSV)
   - Mobile-responsive improvements

---

## 📄 License

This project is created for educational and assignment demonstration purposes.

---

## 🤝 Contributing

This is an assignment project and not open for contributions. However, feedback and suggestions are welcome!

For questions or discussions, please open an issue on the [GitHub repository](https://github.com/AtulGarg2204/Hrms-lite).

---

## 📧 Contact

**Developer:** Atul Garg  
**GitHub:** [@AtulGarg2204](https://github.com/AtulGarg2204)  
**Repository:** [Hrms-lite](https://github.com/AtulGarg2204/Hrms-lite)

---

<div align="center">

**Built with ❤️ as a Full-Stack Coding Assignment**

⭐ Star this repository if you found it helpful!

[Live Demo](https://hrms-lite-two-lovat.vercel.app/) • [API Docs](https://hrms-lite-9p16.onrender.com/docs) • [Report Bug](https://github.com/AtulGarg2204/Hrms-lite/issues)

</div>