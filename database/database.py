# filepath: database.py
import sqlalchemy
from sqlalchemy import Column, String, Date, create_engine
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



# This command tells SQLAlchemy to go find all models inheriting 
# from "Base" and create the tables in the database file.
Base.metadata.create_all(bind=engine)
