from fastapi import FastAPI, Depends , HTTPException 
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, EmployeeModel , InventoryModel , UserModel , FinanceModel
from schemas import EmployeeEdit , EmployeeEditResponse , FinanceCreate , FinanceResponse
from schemas import EmployeeCreate, EmployeeResponse, InventoryResponse , InventoryCreate , UserCreate , UserResponse , InventoryEdit , InventoryEditResponse



app = FastAPI()


origins = [
    "http://localhost:3000",
    "http://localhost:5173",  # Default Vite port
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5500/" ,
    "http://127.0.0.1:5500/src/ed.html"
]

# 2. Add the middleware to your app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # Allows specific origins
    allow_credentials=True,
    allow_methods=["*"],             # Allows all methods (GET, POST, PUT, etc.)
    allow_headers=["*"],             # Allows all headers
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Logic: Fetch all employees from the database

@app.post("/register/", response_model=UserResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # 1. Logic: Check for existing username to prevent duplicates
    existing_user = db.query(UserModel).filter(UserModel.userid == user_data.userid).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    # 2. Logic: Create the Database Object
    new_user = UserModel(
        userid=user_data.userid,
        username=user_data.username,
        password=user_data.password
    )

    # 3. Logic: Commit to the Database
    db.add(new_user)
    db.commit()
    db.refresh(new_user) # This pulls the fresh data (like auto-ids) back from DB
    
    return new_user


@app.post("/login/")
def login(userid: str, password: str, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.userid == userid, UserModel.password == password).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {"message": "Login successful", "user_id": user.userid}


@app.get("/employees/")
def read_employees(db: Session = Depends(get_db)):
    # The .all() command is like writing "SELECT * FROM Employee"
    employees = db.query(EmployeeModel).all()
    return employees


@app.get("/employees/{employee_id}")
def read_employee(employee_id: str, db: Session = Depends(get_db)):
    # .filter() is like writing "WHERE eid = employee_id"
    return db.query(EmployeeModel).filter(EmployeeModel.eid == employee_id).first()

@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    employee = db.query(EmployeeModel).filter(EmployeeModel.eid == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    db.delete(employee)
    db.commit()
    return {"detail": "Employee deleted successfully"}

@app.post("/employees/", response_model=EmployeeResponse)
def create_employee(employee_data: EmployeeCreate, db: Session = Depends(get_db)):
    # 1. Logic: Check for existing EID to prevent duplicates
    existing_emp = db.query(EmployeeModel).filter(EmployeeModel.eid == employee_data.eid).first()
    if existing_emp:
        raise HTTPException(status_code=400, detail="Employee with this ID already exists")

    # 2. Logic: Create the Database Object
    # We unpack the Pydantic data into the SQLAlchemy model
    new_employee = EmployeeModel(
        eid=employee_data.eid,
        employee_name=employee_data.employee_name,
        department=employee_data.department,
        salary=employee_data.salary,
        doj=employee_data.doj
    )

    # 3. Logic: Commit to the Database
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee) # This pulls the fresh data (like auto-ids) back from DB
    
    return new_employee

@app.post("/inventory/", response_model=InventoryResponse)
def create_inventory_item(inventory_data: InventoryCreate, db: Session = Depends(get_db)):
    # 1. Logic: Check for existing Item ID to prevent duplicates
    existing_item = db.query(InventoryModel).filter(InventoryModel.item_id == inventory_data.item_id).first()
    if existing_item:
        raise HTTPException(status_code=400, detail="Inventory item with this ID already exists")

    # 2. Logic: Create the Database Object
    # We unpack the Pydantic data into the SQLAlchemy model
    new_item = InventoryModel(
        item_id=inventory_data.item_id,
        item_name=inventory_data.item_name,
        quantity=inventory_data.quantity,
        price=inventory_data.price
    )

    # 3. Logic: Commit to the Database
    db.add(new_item)
    db.commit()
    db.refresh(new_item) # This pulls the fresh data (like auto-ids) back from DB

    return new_item



@app.get("/inventory/")
def read_inventory(db: Session = Depends(get_db)):
    # The .all() command is like writing "SELECT * FROM Inventory"
    inventory = db.query(InventoryModel).all()
    return inventory

@app.get("/inventory/{item_id}")
def read_inventory_item(item_id: str, db: Session = Depends(get_db)):
    # .filter() is like writing "WHERE item_id = item_id"
    return db.query(InventoryModel).filter(InventoryModel.item_id == item_id).first()

@app.put("/inventory/{item_id}", response_model=InventoryEditResponse)
def update_inventory_item(item_id: str, inventory_data: InventoryEdit, db: Session = Depends(get_db)):
    item = db.query(InventoryModel).filter(InventoryModel.item_id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    
    # Update fields
    item.item_name = inventory_data.item_name
    item.quantity = inventory_data.quantity
    item.price = inventory_data.price

    db.commit()
    db.refresh(item)
    return item

@app.delete("/inventory/{item_id}")
def delete_inventory_item(item_id: str, db: Session = Depends(get_db)):
    item = db.query(InventoryModel).filter(InventoryModel.item_id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    
    db.delete(item)
    db.commit()
    return {"detail": "Inventory item deleted successfully"}


@app.post("/finance/", response_model=FinanceResponse)
def create_finance_record(finance_data: FinanceCreate, db: Session = Depends(get_db)):
    # 1. Logic: Check for existing Finance ID to prevent duplicates
    existing_record = db.query(FinanceModel).filter(FinanceModel.f_id == finance_data.f_id).first()
    if existing_record:
        raise HTTPException(status_code=400, detail="Finance record with this ID already exists")

    # 2. Logic: Create the Database Object
    new_record = FinanceModel(
        f_id=finance_data.f_id,
        description=finance_data.description,
        date=finance_data.date,
        type=finance_data.type,
        catergory=finance_data.catergory,
        amount=finance_data.amount,
        status=finance_data.status
    )

    # 3. Logic: Commit to the Database
    db.add(new_record)
    db.commit()
    db.refresh(new_record) # This pulls the fresh data (like auto-ids) back from DB

    return new_record

@app.get("/finance/")
def read_finance_records(db: Session = Depends(get_db)):
    # The .all() command is like writing "SELECT * FROM Finance"
    records = db.query(FinanceModel).all()
    return records


@app.get("/finance/{f_id}")
def read_finance_record(f_id: str, db: Session = Depends(get_db)):
    # .filter() is like writing "WHERE f_id = f_id"
    return db.query(FinanceModel).filter(FinanceModel.f_id == f_id).first() 

@app.delete("/finance/{f_id}")
def delete_finance_record(f_id: str, db: Session = Depends(get_db)):    
    record = db.query(FinanceModel).filter(FinanceModel.f_id == f_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Finance record not found")
    
    db.delete(record)
    db.commit()
    return {"detail": "Finance record deleted successfully"}

