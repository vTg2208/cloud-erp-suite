from fastapi import FastAPI, Depends, HTTPException, status, Request
import httpx
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import SessionLocal, EmployeeModel, InventoryModel, UserModel, FinanceModel, ProjectModel, TaskModel, LeaveRequestModel, InvoiceModel
from schemas import EmployeeEdit, EmployeeEditResponse, FinanceCreate, FinanceResponse, ProjectCreate, ProjectResponse, TaskCreate, TaskResponse, LeaveRequestCreate, LeaveRequestResponse, InvoiceCreate, InvoiceResponse
from schemas import EmployeeCreate, EmployeeResponse, InventoryResponse, InventoryCreate, UserCreate, UserResponse, InventoryEdit, InventoryEditResponse
from security import verify_password, get_password_hash, create_access_token, SECRET_KEY, ALGORITHM
from jose import JWTError, jwt

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173",  # Default Vite port
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5500/" ,
    "http://127.0.0.1:5500/src/ed.html"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        userid: str = payload.get("userid")
        if userid is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(UserModel).filter(UserModel.userid == userid).first()
    if user is None:
        raise credentials_exception
    return user

@app.get("/")
def themain():
    return {"Message" : "Welcome to Amdox API, You can Visit the Docs of the API for" , "Developer" : "Nithish (Group 1) (2month intern)"}
    
@app.post("/register/", response_model=UserResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(UserModel).filter(UserModel.userid == user_data.userid).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_password = get_password_hash(user_data.password)
    new_user = UserModel(
        userid=user_data.userid,
        username=user_data.username,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.userid == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"userid": user.userid})
    return {"access_token": access_token, "token_type": "bearer", "user": {"userid": user.userid, "username": user.username}}

@app.get("/employees/")
def read_employees(db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return db.query(EmployeeModel).all()

@app.get("/employees/{employee_id}")
def read_employee(employee_id: str, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return db.query(EmployeeModel).filter(EmployeeModel.eid == employee_id).first()

@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: str, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    employee = db.query(EmployeeModel).filter(EmployeeModel.eid == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    db.delete(employee)
    db.commit()
    return {"detail": "Employee deleted successfully"}

@app.post("/employees/", response_model=EmployeeResponse)
def create_employee(employee_data: EmployeeCreate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    existing_emp = db.query(EmployeeModel).filter(EmployeeModel.eid == employee_data.eid).first()
    if existing_emp:
        raise HTTPException(status_code=400, detail="Employee with this ID already exists")

    new_employee = EmployeeModel(
        eid=employee_data.eid,
        employee_name=employee_data.employee_name,
        department=employee_data.department,
        salary=employee_data.salary,
        doj=employee_data.doj ,
        email=employee_data.email ,
        password = employee_data.password
    )
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee

@app.post("/inventory/", response_model=InventoryResponse)
def create_inventory_item(inventory_data: InventoryCreate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    existing_item = db.query(InventoryModel).filter(InventoryModel.item_id == inventory_data.item_id).first()
    if existing_item:
        raise HTTPException(status_code=400, detail="Inventory item with this ID already exists")

    new_item = InventoryModel(
        item_id=inventory_data.item_id,
        item_name=inventory_data.item_name,
        quantity=inventory_data.quantity,
        price=inventory_data.price
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@app.get("/inventory/")
def read_inventory(db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return db.query(InventoryModel).all()

@app.get("/inventory/{item_id}")
def read_inventory_item(item_id: str, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return db.query(InventoryModel).filter(InventoryModel.item_id == item_id).first()

@app.put("/inventory/{item_id}", response_model=InventoryEditResponse)
def update_inventory_item(item_id: str, inventory_data: InventoryEdit, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    item = db.query(InventoryModel).filter(InventoryModel.item_id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    
    item.item_name = inventory_data.item_name
    item.quantity = inventory_data.quantity
    item.price = inventory_data.price
    db.commit()
    db.refresh(item)
    return item

@app.delete("/inventory/{item_id}")
def delete_inventory_item(item_id: str, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    item = db.query(InventoryModel).filter(InventoryModel.item_id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    db.delete(item)
    db.commit()
    return {"detail": "Inventory item deleted successfully"}

@app.post("/finance/", response_model=FinanceResponse)
def create_finance_record(finance_data: FinanceCreate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    existing_record = db.query(FinanceModel).filter(FinanceModel.f_id == finance_data.f_id).first()
    if existing_record:
        raise HTTPException(status_code=400, detail="Finance record with this ID already exists")

    new_record = FinanceModel(
        f_id=finance_data.f_id,
        description=finance_data.description,
        date=finance_data.date,
        type=finance_data.type,
        catergory=finance_data.catergory,
        amount=finance_data.amount,
        status=finance_data.status
    )
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record

@app.get("/finance/")
def read_finance_records(db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return db.query(FinanceModel).all()

@app.get("/finance/{f_id}")
def read_finance_record(f_id: str, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return db.query(FinanceModel).filter(FinanceModel.f_id == f_id).first() 

@app.delete("/finance/{f_id}")
def delete_finance_record(f_id: str, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):    
    record = db.query(FinanceModel).filter(FinanceModel.f_id == f_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Finance record not found")
    db.delete(record)
    db.commit()
    return {"detail": "Finance record deleted successfully"}

@app.get("/api/ai/forecast/{item_id}")
async def get_ai_forecast(item_id: str, request: Request, current_user: UserModel = Depends(get_current_user)):
    # Proxy the request to the internal AI microservice running on port 8001
    AI_SERVICE_URL = f"http://127.0.0.1:8001/forecast/inventory/{item_id}"
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(AI_SERVICE_URL, timeout=10.0)
            response.raise_for_status()
            return response.json()
    except httpx.RequestError as exc:
        raise HTTPException(status_code=503, detail=f"AI Service unavailable: {exc}")
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail="AI Service returned an error")

@app.post("/projects/", response_model=ProjectResponse)
def create_project(project_data: ProjectCreate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    existing_project = db.query(ProjectModel).filter(ProjectModel.p_id == project_data.p_id).first()
    if existing_project:
        raise HTTPException(status_code=400, detail="Project with this ID already exists")
    new_project = ProjectModel(
        p_id=project_data.p_id,
        project_name=project_data.project_name,
        department=project_data.department,
        budget=project_data.budget,
        team=project_data.team,
        status=project_data.status,
        start_date=project_data.start_date
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@app.get("/projects/")
def read_projects(db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return db.query(ProjectModel).all()

@app.delete("/projects/{p_id}")
def delete_project(p_id: str, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    project = db.query(ProjectModel).filter(ProjectModel.p_id == p_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"detail": "Project deleted successfully"}

@app.post("/tasks/", response_model=TaskResponse)
def create_task(task_data: TaskCreate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    existing_task = db.query(TaskModel).filter(TaskModel.t_id == task_data.t_id).first()
    if existing_task:
        raise HTTPException(status_code=400, detail="Task with this ID already exists")
    new_task = TaskModel(
        t_id=task_data.t_id,
        title=task_data.title,
        assignee=task_data.assignee,
        project_id=task_data.project_id,
        priority=task_data.priority,
        status=task_data.status
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@app.get("/tasks/")
def read_tasks(db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return db.query(TaskModel).all()

@app.put("/tasks/{t_id}")
def update_task_status(t_id: str, status: str, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    task = db.query(TaskModel).filter(TaskModel.t_id == t_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.status = status
    db.commit()
    db.refresh(task)
    return task

@app.delete("/tasks/{t_id}")
def delete_task(t_id: str, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    task = db.query(TaskModel).filter(TaskModel.t_id == t_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"detail": "Task deleted successfully"}

@app.post("/hr/leaves/", response_model=LeaveRequestResponse)
def create_leave(leave_data: LeaveRequestCreate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    new_leave = LeaveRequestModel(
        l_id=leave_data.l_id,
        employee_id=leave_data.employee_id,
        start_date=leave_data.start_date,
        end_date=leave_data.end_date,
        reason=leave_data.reason,
        status=leave_data.status
    )
    db.add(new_leave)
    db.commit()
    db.refresh(new_leave)
    return new_leave

@app.get("/hr/leaves/")
def read_leaves(db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return db.query(LeaveRequestModel).all()

@app.put("/hr/leaves/{l_id}")
def update_leave_status(l_id: str, status: str, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    leave = db.query(LeaveRequestModel).filter(LeaveRequestModel.l_id == l_id).first()
    if not leave:
        raise HTTPException(status_code=404, detail="Leave request not found")
    leave.status = status
    db.commit()
    db.refresh(leave)
    return leave

@app.post("/finance/invoices/", response_model=InvoiceResponse)
def create_invoice(invoice_data: InvoiceCreate, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    new_invoice = InvoiceModel(
        inv_id=invoice_data.inv_id,
        client_name=invoice_data.client_name,
        amount=invoice_data.amount,
        due_date=invoice_data.due_date,
        status=invoice_data.status
    )
    db.add(new_invoice)
    db.commit()
    db.refresh(new_invoice)
    return new_invoice

@app.get("/finance/invoices/")
def read_invoices(db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    return db.query(InvoiceModel).all()

@app.put("/finance/invoices/{inv_id}")
def update_invoice_status(inv_id: str, status: str, db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    invoice = db.query(InvoiceModel).filter(InvoiceModel.inv_id == inv_id).first()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    invoice.status = status
    db.commit()
    db.refresh(invoice)
    return invoice
