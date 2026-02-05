from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import date
from enum import Enum

class Department(str, Enum):
    HR = "HR"
    IT = "IT"
    FINANCE = "Finance"
    MARKETING = "Marketing"
    OPERATIONS = "Operations"

class AttendanceStatus(str, Enum):
    PRESENT = "Present"
    ABSENT = "Absent"

class EmployeeCreate(BaseModel):
    employee_id: str = Field(..., min_length=1)
    full_name: str = Field(..., min_length=1)
    email: EmailStr
    department: Department

class EmployeeResponse(BaseModel):
    id: str
    employee_id: str
    full_name: str
    email: str
    department: str

class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: AttendanceStatus

class AttendanceResponse(BaseModel):
    id: str
    employee_id: str
    date: str
    status: str
