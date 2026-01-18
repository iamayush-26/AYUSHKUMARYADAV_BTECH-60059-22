# TaskFlow — Kanban Task Management App 

TaskFlow is a **Kanban-based Task Management System** built for the SDE assignment.  
It supports **Authentication (Login/Register)**, **User-specific tasks**, **CRUD operations**, and a **Drag & Drop Kanban Board** with task status tracking.

---

## 📌 Features

### Authentication
- Register (Name, Email, Password)
- Login (Email, Password)
- Logout
- JWT-based authentication
- Protected routes

### User Profile
- View logged-in user profile (Name, Email, ID)

### Task Management (CRUD)
- Add a new task
- Edit task details
- Delete task
- View all tasks

### Kanban Board
- 3 Columns:
  - **Pending**
  - **In Progress**
  - **Completed**
- Drag & Drop tasks between columns
- Auto update task status in backend

### Task Fields
Each task contains:
- `title`
- `description`
- `status` (`pending`, `progress`, `completed`)
- `dueDate`
- `createdAt`

---

## 🛠 Tech Stack

### Frontend
- HTML5
- Bootstrap 5
- JavaScript (Fetch API)
- Font Awesome

### Backend
- REST API (Node.js / Express or Python based API)
- JWT Authentication

### Database
- MongoDB / SQL (depending on backend setup)

---

## 📂 Project Structure (Recommended)

TaskFlow/
│── frontend/
│ └── index.html
│
│── backend/
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── middleware/
│ ├── server.js (or app.py)
│ └── .env
│
└── README.md


## ⚙️ Setup Instructions

### 1) Backend Setup

Go to backend folder:

In bash
cd backend
npm install
PORT=5000
JWT_SECRET=your_secret_key
DB_URI=your_database_connection_string
npm start
http://localhost:5000
2) Frontend Setup

Go to frontend folder:

cd frontend


Open index.html directly in browser
OR run with Live Server extension (recommended).

"http://localhost:5000/api


If backend runs on a different port or host, update this value.

- `node_modules` is not uploaded to GitHub (recommended best practice).

- Make sure MongoDB is running locally or provide a MongoDB Atlas URI.

---

## Final Output
- Fully working Kanban Board UI
- Authentication integrated
- Tasks are stored user-wise
- Drag & Drop updates task status instantly

<img width="2559" height="1439" alt="Screenshot 2026-01-14 023139" src="https://github.com/user-attachments/assets/ce9040c9-3a7a-434b-b018-2ba3cee3a784" />
<img width="2559" height="1439" alt="Screenshot 2026-01-14 023200" src="https://github.com/user-attachments/assets/5b578a42-3e40-4623-8984-e59cc046634d" />
<img width="2559" height="1439" alt="Screenshot 2026-01-14 023214" src="https://github.com/user-attachments/assets/c0f28b1c-5665-4b28-b4d9-8cb6347e3c72" />


Video: https://drive.google.com/file/d/113xen2axDvBECP8rZk7_fMkJNbTm6VCQ/view?usp=sharing
---

## 👨‍💻 Author
**Ayush Kumar Yadav**
