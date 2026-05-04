from pydantic import BaseModel
from datetime import date
from typing import Optional

class EmployeeCreate(BaseModel):
    eid: str
    employee_name: str
    department: str
    salary: str  
    doj: date    # Pydantic automatically converts "YYYY-MM-DD" strings to date objects

class EmployeeResponse(EmployeeCreate):
    class Config:
        from_attributes = True

class InventoryCreate(BaseModel):
    item_id: str
    item_name: str
    quantity: int
    price: float

class InventoryResponse(InventoryCreate):
    class Config:
        from_attributes = True


class ExpensesCreate(BaseModel):
    item_id: str
    item_name: str
    quantity: int
    price: float

class ExpensesResponse(ExpensesCreate):
    class Config:
        from_attributes = True
