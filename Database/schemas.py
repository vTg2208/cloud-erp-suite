from pydantic import BaseModel
from datetime import date
from typing import Optional

class UserCreate(BaseModel):
    userid: str
    username: str
    password: str

class UserResponse(UserCreate):
    class Config:
        from_attributes = True

class EmployeeCreate(BaseModel):
    eid: str
    employee_name: str
    department: str
    salary: int  
    doj: date    # Pydantic automatically converts "YYYY-MM-DD" strings to date objects

class EmployeeResponse(EmployeeCreate):
    class Config:
        from_attributes = True


class EmployeeEdit(BaseModel):
    
    employee_name: str
    department: str
    salary: str  
    doj: date  

class EmployeeEditResponse(EmployeeEdit):
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


class InventoryEdit(BaseModel):
    item_name: str
    quantity: int
    price: float

class InventoryEditResponse(InventoryEdit):
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

class SupplierCreate(BaseModel):
    supplier_id: str
    supplier_name: str
    contact_info: str   

class SupplierResponse(SupplierCreate):
    class Config:
        from_attributes = True

class FinanceCreate(BaseModel):
    f_id: str
    description: str
    date: date
    type: str  # "Expense" or "Income"
    catergory: str  
    amount: float
    status: str  # "Pending", "Approved", "Rejected"    

class FinanceResponse(FinanceCreate):
    class Config:
        from_attributes = True