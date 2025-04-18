# 🎓 Student Management System

A full-stack web application for managing students, tracking attendance, storing marksheets, and handling user authentication.
## 📽️ Project Demo :
   📹 Click the link below to see how the Student Management System works:
   👉 [Watch Demo Video on Google Drive](https://drive.google.com/file/d/1hO_SYdiFYFtvPNYNgaFFz6kOYMCgkmn3/view?usp=sharing)

---

## 🚀 Features

- User Signup & Login (with password encryption using bcrypt)
- Add, Edit, Delete student records
- Attendance tracking with Present/Absent counts
- Marksheet entry and grade calculation
- PostgreSQL database integration
- Clean UI with HTML, CSS, and TypeScript
- Fully modular backend with REST API using Express.js

---

## 🛠️ Technologies Used

### Frontend
- HTML, CSS
- TypeScript
- DOM manipulation

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- bcrypt (for password hashing)

### Dev Tools
- VS Code
- Postman (for API testing)
- Git + GitHub

---

## 📁 Project Structure

->Backend
 ->node_modules
 ->package-lock.json
 ->pakage.json
 ->tsconfig.json
 ->src
   index.ts   //Api's
   index.js
  ->Login
    Login_Index.html
    Login_Index.css
    Login.js
    Login.ts
  ->Signup
    Signup_Index.html
    Signup_Index.css
    Signup.ts
    Signup.js
  ->Choose
    ->Choose_index.html
      Choose_index.css
      Choose.ts
      Choose.js
  
---

## 📦 Modules to Install

Run this in your backend folder:

```bash
npm install express pg bcrypt
npm install -D typescript ts-node-dev @types/node @types/express****
