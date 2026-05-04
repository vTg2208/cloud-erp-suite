# filepath: database.py
import sqlalchemy
from sqlalchemy import Column, Float, Integer, String, Date, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./amdox_erp.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL , connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. The Base class (All our tables will "inherit" from this)
Base = declarative_base()

# 5. Define the "Messages" Table structure
class EmployeeModel(Base):
    __tablename__ = "Employee"

    eid = Column(String, primary_key=True, index=True) # Unique ID
    employee_name = Column(String)
    department = Column(String)
    salary = Column(String)
    doj = Column(Date)                        # The Secret

class InventoryModel(Base):
    __tablename__ = "Inventory"

    item_id = Column(String, primary_key=True, index=True) # Unique ID
    item_name = Column(String)
    quantity = Column(Integer)
    price = Column(Float)

class Expenses(Base):
    __tablename__ = "Expenses"

    item_id = Column(String, primary_key=True, index=True) # Unique ID
    item_name = Column(String)
    quantity = Column(Integer)
    price = Column(Float)


class Supplier(Base):
    __tablename__ = "Supplier"

    supplier_id = Column(String, primary_key=True, index=True) # Unique ID
    supplier_name = Column(String)
    contact_info = Column(String)

class Orders(Base):
    __tablename__ = "Orders"

    order_id = Column(String, primary_key=True, index=True) # Unique ID
    supplier_id = Column(String)
    item_name = Column(String)
    quantity = Column(Integer)
    price = Column(Float)

# This command tells SQLAlchemy to go find all models inheriting 
# from "Base" and create the tables in the database file.
Base.metadata.create_all(bind=engine)