from pymongo import MongoClient # type: ignore
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = MongoClient(MONGODB_URL)
db = client[DATABASE_NAME]

# Collections
employees_collection = db["employees"]
attendance_collection = db["attendance"]

# Create unique index on employee_id
employees_collection.create_index("employee_id", unique=True)