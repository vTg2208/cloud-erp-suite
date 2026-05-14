#  Cloud ERP Backend System

<p align="left">
  <img src="https://img.shields.io/badge/Status-In%20Development-yellow" />
  <img src="https://img.shields.io/badge/Backend-NestJS-red" />
  <img src="https://img.shields.io/badge/ORM-Prisma-blue" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-blue" />
  <img src="https://img.shields.io/badge/Language-TypeScript-3178c6" />
</p>

<p align="left">
  <img src="https://github-readme-stats.vercel.app/api?username=vTg2208&show_icons=true&theme=tokyonight" width="48%" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=vTg2208&layout=compact&theme=tokyonight" width="40%" />
</p>

---

##  Description

This is a backend ERP system built using **NestJS**, **Prisma ORM**, and **PostgreSQL**. It provides RESTful APIs for managing core ERP functionalities such as employee management, authentication, and data operations. The project follows a modular and scalable architecture designed for maintainability and team collaboration.

---

##  Tech Stack

- NestJS (Node.js Framework)
- Prisma ORM
- PostgreSQL
- TypeScript
- Node.js

---

##  Features

- Employee management (Create, Read, Update, Delete)
- Modular backend architecture using NestJS modules
- Prisma ORM integration for database handling
- PostgreSQL database support
- REST API structure
- Scalable and maintainable codebase

---

##  Project Structure

```bash
src/
 ├── employee/        # Employee module
 ├── auth/            # Authentication module (if applicable)
 ├── prisma/          # Prisma service and configuration
 ├── common/          # Shared utilities
 └── main.ts          # Application entry point
## Project Setup
1. Clone the repository
git clone https://github.com/vTg2208/cloud-erp-suite.git
cd cloud-erp-suite
2. Install dependencies
npm install
3. Setup environment variables

Create a .env file in the root directory:

DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
4. Setup database (Prisma)
npx prisma generate
npx prisma migrate dev
5. Run the application
Development mode
npm run start:dev
Production mode
npm run start:prod
## Testing
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
## Common Issues
Ensure PostgreSQL is running before starting the project
Always run Prisma migrations before starting the server
If dependencies break, delete node_modules and run npm install again
Make sure .env file is properly configured
## Deployment

Refer to official NestJS deployment guide:
https://docs.nestjs.com/deployment

Optional NestJS deployment platform:

npm install -g @nestjs/mau
mau deploy
 Team Guidelines
Do NOT push .env file to GitHub
Always pull latest changes before starting work
Use feature branches for new features
Commit small and meaningful changes
Coordinate before modifying shared modules
 Future Improvements
JWT Authentication system
Role-based access control (RBAC)
File upload system
Swagger API documentation
Frontend integration
Docker deployment
 Resources
https://docs.nestjs.com
https://www.prisma.io/docs
https://nodejs.org
 Author
Developed by: vTg2208

