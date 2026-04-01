# 💰 Finance Data Processing and Access Control Backend

## 📌 Project Overview

This project is a backend system for a finance dashboard where users can manage financial records based on their roles.
It demonstrates API design, data handling, access control, and basic analytics.

---

## 🚀 Tech Stack

* Node.js
* Express.js
* lowdb (JSON database)

---

## ⚙️ Setup Instructions

1. Clone the repository

```bash
git clone <your-repo-link>
cd finance-backend
```

2. Install dependencies

```bash
npm install
```

3. Run the server

```bash
node server.js
```

Server will run on:

```
http://localhost:5000
```

---

## 👤 User Roles

* **Viewer** → Can only view data
* **Analyst** → Can view records and dashboard insights
* **Admin** → Full access (create, update, delete users & records)

---

## 📦 API Endpoints

### 🔹 Users

* `POST /users` → Create user
* `GET /users` → Get all users
* `PATCH /users/:id` → Update user

---

### 🔹 Records

* `POST /records` → Create record
* `GET /records` → Get all records
* `PUT /records/:id` → Update record
* `DELETE /records/:id` → Delete record

---

### 🔹 Dashboard

* `GET /dashboard/summary` → Total income, expense, balance
* `GET /dashboard/category` → Category-wise totals
* `GET /dashboard/recent` → Recent records

---

## 🔐 Access Control

Role-based access control is implemented using middleware.

* Viewer → Read only
* Analyst → Read + insights
* Admin → Full access

Unauthorized actions return:

```
403 Access Denied
```

---

## ⚠️ Validation & Error Handling

* Missing fields → 400 Bad Request
* Invalid ID → 404 Not Found
* Unauthorized access → 403 Forbidden

---

## 💾 Data Persistence

* Data is stored in `db.json` using lowdb
* Data persists even after server restart

---

## 🧠 Assumptions

* Authentication is mocked (no real login system)
* Single user context is used for role testing
* lowdb is used for simplicity instead of a full database

---

## 📌 Notes

This project focuses on backend design, clean structure, and logical implementation rather than production-level complexity.

---

## 👨‍💻 Author

Aditya Kumar
