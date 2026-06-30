# 🚀 Amdox Technologies — AI-Powered Cloud ERP Suite

> **Enterprise-grade, AI-augmented ERP platform** for mid-market and enterprise organisations — unifying finance, HR, supply chain, projects, and business intelligence in a single intelligent platform.

![Version](https://img.shields.io/badge/Version-1.0-blue?style=flat-square)
![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)
![License](https://img.shields.io/badge/License-Internal-red?style=flat-square)
![Uptime Target](https://img.shields.io/badge/Uptime%20SLA-99.9%25-brightgreen?style=flat-square)
![Project Code](https://img.shields.io/badge/Project%20Code-AMX--ERP--2026--04-purple?style=flat-square)

---

# Team Members:

- **1. Nithish**
- **2. Alona**
- **3. Aksa Kunjumon**
- **4. Vishal Thakur**
- **5. Vishnu Vardhan**

---

## 📋 Table of Contents

- [Overview](#overview)
- [What the Platform Can Do](#what-the-platform-can-do)
  - [Multi-Tenant Authentication & SSO](#1-multi-tenant-authentication--sso)
  - [Financial Ledger (GL)](#2-financial-ledger-gl)
  - [AP / AR Automation](#3-ap--ar-automation)
  - [HR & Payroll Engine](#4-hr--payroll-engine)
  - [Supply Chain & Inventory](#5-supply-chain--inventory)
  - [AI Demand Forecasting](#6-ai-demand-forecasting)
  - [Project Management](#7-project-management)
  - [Business Intelligence](#8-business-intelligence)
  - [Audit & Compliance Log](#9-audit--compliance-log)
  - [Notification Engine](#10-notification-engine)
  - [API Gateway & Webhooks](#11-api-gateway--webhooks)
  - [Offline / PWA Support](#12-offline--pwa-support)
- [Target Users](#target-users)
- [Business Value](#business-value)
- [Non-Functional Requirements](#non-functional-requirements)
- [Local Setup](#local-setup)
- [Architecture](#architecture)
- [Screenshots](#screenshots)
- [Demo](#demo)
- [Project Info](#project-info)

---

## Overview

**Amdox Cloud ERP Suite** is a scalable, AI-augmented, multi-tenant ERP platform delivering:

- 💰 Financial management
- 🔗 Supply chain automation
- 👥 HR & payroll processing
- 📊 Project tracking
- 🧠 Business intelligence

Built purpose-first for **mid-market and enterprise organisations operating across geographies**, the platform integrates machine learning models for demand forecasting, anomaly detection, and intelligent approval workflows — while meeting enterprise-grade standards for security, compliance, and reliability.

| Metric | Target |
|--------|--------|
| Uptime SLA | **99.9%** monthly |
| API Latency | **< 300ms** P95 |
| Concurrent Users | **≥ 2,000** per tenant |
| Compliance | **SOC 2 Type II · GDPR · ISO 27001** |

---

## What the Platform Can Do

### 1. Multi-Tenant Authentication & SSO
Secure, enterprise-ready identity management with **SAML 2.0 / OIDC** integration for Azure AD and Google Workspace. MFA enforcement is configurable per tenant, and complete tenant isolation is guaranteed at the data and session layer.

- Login response under 2 seconds
- MFA enforced per tenant policy
- Full tenant data isolation

---

### 2. Financial Ledger (GL)
A complete **double-entry accounting engine** supporting multi-currency operations, period-close workflows, and intercompany transfers.

- Zero unbalanced entries enforced
- FX rates auto-fetched daily
- Period-lock with role-based overrides

---

### 3. AP / AR Automation
Automated accounts payable and receivable powered by **Invoice OCR** and intelligent 3-way matching (PO / Goods Receipt / Invoice).

- OCR accuracy ≥ 95%
- Auto-approval in under 30 seconds
- Payment runs, aging reports, customer invoicing

---

### 4. HR & Payroll Engine
Full employee lifecycle management — from onboarding to payslip generation — with statutory compliance built in.

- Payroll processed in under 5 minutes for 10,000 employees
- Configurable tax slabs and statutory deductions
- Leave management, attendance tracking, org chart

---

### 5. Supply Chain & Inventory
End-to-end procurement and inventory management with **real-time stock levels** and automatic reorder triggers.

- Purchase requisition → PO → goods receipt workflow
- Reorder triggered at configurable thresholds
- Vendor notifications via email and webhooks

---

### 6. AI Demand Forecasting 🤖
An ML-powered microservice using **Prophet and LSTM models** for SKU-level demand prediction — retrained weekly for accuracy.

- Mean Absolute Percentage Error (MAPE) < 12% on a 90-day horizon
- Weekly automated model retraining
- Cached predictions served via NestJS integration

---

### 7. Project Management
Integrated project tracking with **Gantt charts, resource allocation, milestone alerts, and budget tracking**.

- Visual Gantt chart rendering under 1 second
- Overrun alerts when actual cost exceeds budget by 10%
- Resource utilisation heatmaps

---

### 8. Business Intelligence
A **drag-and-drop dashboard builder** with scheduled reports, drill-down analytics, and real-time data refresh.

- Dashboard saves in under 500ms
- Export to PDF and Excel
- Real-time metric refresh via Server-Sent Events

---

### 9. Audit & Compliance Log
An **immutable, tamper-evident audit trail** for every system mutation, with built-in GDPR data subject request handling.

- Hash-chained log for tamper detection
- Data Subject Requests (DSR) fulfilled within 72 hours
- TimescaleDB append-only storage

---

### 10. Notification Engine
A multi-channel notification system supporting **in-app, email, SMS, and webhooks** for any configurable business event.

- Confirmed delivery with up to 3 automatic retries on failure
- Per-user channel preference settings
- Dead-letter queue with retry dashboard

---

### 11. API Gateway & Webhooks
A unified **REST + GraphQL gateway** with outbound webhook subscriptions and full OpenAPI 3.1 documentation.

- All endpoints versioned
- OpenAPI 3.1 spec published and accessible at `/api-docs`
- HMAC-signed webhooks for security

---

### 12. Offline / PWA Support
Critical read views remain functional even **without internet connectivity**, with automatic sync on reconnect — zero data loss.

- Service worker cache for offline access
- Sync completes on reconnect without data loss
- Progressive Web App installable on desktop and mobile

---

## Local Setup & Deployment

This project is fully containerized using Docker, allowing you to run the entire ERP suite (Frontend, Backend, and AI Service) with a single command.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Application

1. Clone the repository and navigate to the root directory.
2. Build and start the microservices:
   ```bash
   docker-compose up --build -d
   ```
3. Access the application:
   - **Frontend UI**: `http://localhost:5173`
   - **FastAPI Backend**: `http://localhost:8000`
   - **AI Microservice**: `http://localhost:8001` (Internal Only)

*Note: The frontend is served via an optimized Nginx multi-stage build, and the API proxies internally to the AI service.*

---

## Target Users

| User Segment | Primary Use Case |
|---|---|
| C-Suite / Executives | Real-time dashboards, KPI monitoring, board-level reporting |
| Finance Teams | GL management, AP/AR automation, multi-currency reconciliation |
| HR & Payroll Teams | Employee lifecycle, attendance, payroll processing, compliance |
| Supply Chain Managers | Procurement, inventory, vendor management, demand planning |
| Project Managers | Resource allocation, milestone tracking, budget management |
| IT Administrators | Tenant configuration, SSO, audit logs, security policies |

---

## Business Value

| Value Driver | Expected Impact |
|---|---|
| Unified Data Platform | Eliminate data silos across 6+ legacy systems |
| AI-Driven Forecasting | Reduce inventory carrying cost by **15–25%** |
| Automated Approvals | Cut approval cycle time from **days to minutes** |
| Self-Serve BI | Reduce ad-hoc reporting requests by **60%** |
| Multi-Tenant SaaS | Enable Amdox to productize for enterprise clients |

---

## Non-Functional Requirements

| Category | Target |
|---|---|
| Availability | 99.9% monthly uptime (excluding planned maintenance) |
| API Latency | < 300ms P95 for all REST endpoints |
| Throughput | ≥ 2,000 concurrent active users per tenant |
| Data Durability | RPO < 15 min, RTO < 60 min |
| Security | OWASP Top 10 2021 + SOC 2 controls |
| Scalability | Horizontal auto-scale on > 70% CPU/memory |


---

## Screenshots

> _Screenshots will be added upon completion of the UI._

---

## Demo

> 🎬 **Demo Video:** _Coming soon — 5–7 min scenario-based walkthrough_
>
> 🌐 **Live Demo:** _Coming soon_

---

## Project Info

| Field | Details |
|---|---|
| **Project Title** | AI-Powered Cloud ERP Suite |
| **Organisation** | Amdox Technologies |
| **Project Code** | AMX-ERP-2026-04 |
| **Version** | 1.0 |
| **Date** | April 2026 |
| **Classification** | Internal |
| **Division** | Engineering Division |

---

<div align="center">

Crafted with precision and modern engineering principles

**Amdox Technologies · Engineering Division · April 2026**

</div>
