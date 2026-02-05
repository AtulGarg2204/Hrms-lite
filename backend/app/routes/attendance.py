from fastapi import APIRouter, HTTPException, status
from app.models import AttendanceCreate, AttendanceResponse
from app.database import employees_collection, attendance_collection
from bson import ObjectId
from typing import List
from datetime import datetime

router = APIRouter(prefix="/attendance", tags=["attendance"])

def attendance_helper(attendance) -> dict:
    return {
        "id": str(attendance["_id"]),
        "employee_id": attendance["employee_id"],
        "date": attendance["date"].isoformat(),
        "status": attendance["status"]
    }

@router.post("/", response_model=AttendanceResponse, status_code=status.HTTP_201_CREATED)
async def mark_attendance(attendance: AttendanceCreate):
    # Check if employee exists
    employee = employees_collection.find_one({"employee_id": attendance.employee_id})
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {attendance.employee_id} not found"
        )
    
    # Check if attendance for this date already exists
    existing = attendance_collection.find_one({
        "employee_id": attendance.employee_id,
        "date": datetime.combine(attendance.date, datetime.min.time())
    })
    
    if existing:
        # Update existing attendance
        attendance_collection.update_one(
            {"_id": existing["_id"]},
            {"$set": {"status": attendance.status.value}}
        )
        updated = attendance_collection.find_one({"_id": existing["_id"]})
        return attendance_helper(updated)
    
    # Create new attendance record
    attendance_dict = {
        "employee_id": attendance.employee_id,
        "date": datetime.combine(attendance.date, datetime.min.time()),
        "status": attendance.status.value
    }
    
    result = attendance_collection.insert_one(attendance_dict)
    created_attendance = attendance_collection.find_one({"_id": result.inserted_id})
    
    return attendance_helper(created_attendance)

@router.get("/employee/{employee_id}", response_model=List[AttendanceResponse])
async def get_employee_attendance(employee_id: str):
    # Check if employee exists
    employee = employees_collection.find_one({"employee_id": employee_id})
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {employee_id} not found"
        )
    
    attendance_records = []
    for record in attendance_collection.find({"employee_id": employee_id}).sort("date", -1):
        attendance_records.append(attendance_helper(record))
    
    return attendance_records

@router.get("/", response_model=List[AttendanceResponse])
async def get_all_attendance():
    attendance_records = []
    for record in attendance_collection.find().sort("date", -1):
        attendance_records.append(attendance_helper(record))
    return attendance_records