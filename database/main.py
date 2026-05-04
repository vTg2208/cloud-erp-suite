from fastapi import FastAPI, Depends , HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, EmployeeModel , InventoryModel , Expenses ,Supplier , Orders
from schemas import EmployeeCreate, EmployeeResponse, InventoryResponse , InventoryCreate , ExpensesCreate , ExpensesResponse


app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Logic: Fetch all employees from the database
@app.get("/employees/")
def read_employees(db: Session = Depends(get_db)):
    # The .all() command is like writing "SELECT * FROM Employee"
    employees = db.query(EmployeeModel).all()
    return employees


@app.get("/employees/{employee_id}")
def read_employee(employee_id: str, db: Session = Depends(get_db)):
    # .filter() is like writing "WHERE eid = employee_id"
    return db.query(EmployeeModel).filter(EmployeeModel.eid == employee_id).first()

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

@app.post("/expenses/", response_model=ExpensesResponse)
def create_expense(expense_data: ExpensesCreate, db: Session = Depends(get_db)):
    # 1. Logic: Check for existing Item ID to prevent duplicates
    existing_expense = db.query(Expenses).filter(Expenses.item_id == expense_data.item_id).first()
    if existing_expense:
        raise HTTPException(status_code=400, detail="Expense item with this ID already exists")

    # 2. Logic: Create the Database Object
    new_expense = Expenses(
        item_id=expense_data.item_id,
        item_name=expense_data.item_name,
        quantity=expense_data.quantity,
        price=expense_data.price
    )

    # 3. Logic: Commit to the Database
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense) # This pulls the fresh data (like auto-ids) back from DB

    return new_expense