from fastapi import APIRouter, HTTPException, status
from app.models import EmployeeCreate, EmployeeResponse
from app.database import employees_collection, attendance_collection
from bson import ObjectId
from typing import List

router = APIRouter(prefix="/employees", tags=["employees"])

def employee_helper(employee) -> dict:
    return {
        "id": str(employee["_id"]),
        "employee_id": employee["employee_id"],
        "full_name": employee["full_name"],
        "email": employee["email"],
        "department": employee["department"]
    }

@router.post("/", response_model=EmployeeResponse, status_code=status.HTTP_201_CREATED)
async def create_employee(employee: EmployeeCreate):
    # Check if employee_id already exists
    existing = employees_collection.find_one({"employee_id": employee.employee_id})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Employee with ID {employee.employee_id} already exists"
        )
    
    # Check if email already exists
    existing_email = employees_collection.find_one({"email": employee.email})
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Employee with email {employee.email} already exists"
        )
    
    employee_dict = employee.dict()
    result = employees_collection.insert_one(employee_dict)
    created_employee = employees_collection.find_one({"_id": result.inserted_id})
    
    return employee_helper(created_employee)

@router.get("/", response_model=List[EmployeeResponse])
async def get_all_employees():
    employees = []
    for employee in employees_collection.find():
        employees.append(employee_helper(employee))
    return employees

@router.get("/{employee_id}", response_model=EmployeeResponse)
async def get_employee(employee_id: str):
    employee = employees_collection.find_one({"employee_id": employee_id})
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {employee_id} not found"
        )
    return employee_helper(employee)

@router.delete("/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_employee(employee_id: str):
    employee = employees_collection.find_one({"employee_id": employee_id})
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {employee_id} not found"
        )
    
    # Delete employee
    employees_collection.delete_one({"employee_id": employee_id})
    
    # Delete associated attendance records
    attendance_collection.delete_many({"employee_id": employee_id})
    
    return None