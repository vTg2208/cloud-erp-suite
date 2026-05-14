## Contributor: Nithish

---

# FastAPI ERP Backend (Nithish)

A robust, privacy-focused Enterprise Resource Planning (ERP) backend built with **FastAPI** and **SQLAlchemy**. This system provides a comprehensive API for managing users, employees, inventory, and financial records, utilizing a PostgreSQL database for persistent storage.

## 🚀 Features

* **Authentication**: User registration and login functionality with unique identity management.
* **Employee Management**: Full CRUD operations for employee records, including department tracking and salary management.
* **Inventory Control**: Tools to track items, quantities, and pricing in real-time.
* **Finance Tracking**: Comprehensive logging of income and expenses with status approval workflows (Pending/Approved/Rejected).
* **CORS Enabled**: Pre-configured middleware to allow seamless integration with frontend frameworks like Vite, React, or Live Server.

---

## 🛠️ Tech Stack

* **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
* **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
* **Database**: PostgreSQL (Hosted on Render)
* **Validation**: [Pydantic](https://www.google.com/search?q=https://docs.pydantic.dev/)
* **Language**: Python 3.x

---

## 📂 Project Structure

```text
├── database.py    # Database connection setup and SQLAlchemy models
├── main.py        # FastAPI app initialization and API endpoints
├── schemas.py     # Pydantic models for data validation and serialization
└── requirements.txt

```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone [<your-repo-url>](https://github.com/vTg2208/cloud-erp-suite/tree/main/Database)
cd Database

```

### 2. Install Dependencies

```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic

```

### 3. Database Configuration

The project is currently configured to connect to a PostgreSQL instance. You can modify the `SQLALCHEMY_DATABASE_URL` in `database.py` to point to your local or cloud database:

```python
SQLALCHEMY_DATABASE_URL = "postgresql://user:password@host:port/db_name"

```

### 4. Run the Server

```bash
uvicorn main:app --reload

```

The API will be available at `http://127.0.0.1:8000`.

---

## 🚦 API Endpoints

### Authentication

* `POST /register/` - Create a new user account.
* `POST /login/` - Authenticate and receive a user ID.

### Employee Management

* `GET /employees/` - List all employees.
* `POST /employees/` - Onboard a new employee.
* `DELETE /employees/{employee_id}` - Remove an employee record.

### Inventory

* `GET /inventory/` - View current stock.
* `POST /inventory/` - Add new items to inventory.
* `PUT /inventory/{item_id}` - Update item details (quantity/price).

### Finance

* `GET /finance/` - Fetch all financial transactions.
* `POST /finance/` - Log a new income or expense record.
* `DELETE /finance/{f_id}` - Delete a specific finance record.

---

## 📝 Documentation

Once the server is running, you can access the interactive API documentation at:

* **Swagger UI**: `http://127.0.0.1:8000/docs`
* **ReDoc**: `http://127.0.0.1:8000/redoc`

---

## 🛡️ Privacy & Security

This project implements `Base.metadata.create_all()`, ensuring that the database schema is automatically synchronized with the Python models. Sensitive data management and structured validation are handled via Pydantic schemas to ensure data integrity.
