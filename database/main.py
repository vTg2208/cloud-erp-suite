from fastapi import FastAPI, Depends , HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, EmployeeModel
from schemas import EmployeeCreate, EmployeeResponse


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
