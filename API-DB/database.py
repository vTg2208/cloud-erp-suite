# filepath: database.py
import sqlalchemy
from sqlalchemy import Column, Float, Integer, String, Date, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql://amdox_db_9fia_user:vaIjA7EEl4Zk0MRdUWlKKhGhiUfFek3k@dpg-d8l2ms7lk1mc73cgd4ug-a.oregon-postgres.render.com/amdox_db_9fia"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. The Base class (All our tables will "inherit" from this)
Base = declarative_base()

# 5. Define the "Messages" Table structure

class UserModel(Base):
    __tablename__ = "User"


    userid = Column(String, primary_key=True, index=True) # Unique ID
    username = Column(String)
    password = Column(String)


class EmployeeModel(Base):
    __tablename__ = "Employee"

    eid = Column(String, primary_key=True, index=True) # Unique ID
    employee_name = Column(String)
    department = Column(String)
    salary = Column(Integer)
    doj = Column(Date) 
    email = Column(String) # The Secret
    password = Column(String)

class InventoryModel(Base):
    __tablename__ = "Inventory"

    item_id = Column(String, primary_key=True, index=True) # Unique ID
    item_name = Column(String)
    quantity = Column(Integer)
    price = Column(Float)

class FinanceModel(Base):
    __tablename__ = "Finance"

    f_id = Column(String, primary_key=True, index=True) # Unique ID
    description = Column(String)
    date = Column(Date)
    type = Column(String)  # "Expense" or "Income"
    catergory = Column(String)  
    amount = Column(Float)
    status = Column(String)  # "Pending", "Approved", "Rejected"

class ProjectModel(Base):
    __tablename__ = "Project"

    p_id = Column(String, primary_key=True, index=True)
    project_name = Column(String)
    department = Column(String)
    budget = Column(Float)
    team = Column(Integer)
    status = Column(String)
    start_date = Column(String)

class TaskModel(Base):
    __tablename__ = "Task"

    t_id = Column(String, primary_key=True, index=True)
    title = Column(String)
    assignee = Column(String)
    project_id = Column(String)
    priority = Column(String)
    status = Column(String)

class LeaveRequestModel(Base):
    __tablename__ = "LeaveRequest"

    l_id = Column(String, primary_key=True, index=True)
    employee_id = Column(String)
    start_date = Column(String)
    end_date = Column(String)
    reason = Column(String)
    status = Column(String)  # Pending, Approved, Rejected

class InvoiceModel(Base):
    __tablename__ = "Invoice"

    inv_id = Column(String, primary_key=True, index=True)
    client_name = Column(String)
    amount = Column(Float)
    due_date = Column(String)
    status = Column(String)  # Draft, Unpaid, Paid


# This command tells SQLAlchemy to go find all models inheriting 
# from "Base" and create the tables in the database file.
Base.metadata.create_all(bind=engine)
