# Task Management System (Kanban Based)

## Project Overview
A full-stack Task Management application with user authentication and Kanban-style task board.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, @dnd-kit for drag & drop
- **Backend**: Node.js, Express.js, MongoDB, JWT Authentication

## Setup Instructions

### Backend Setup
1. Navigate to backend directory:





2. Install dependencies:

ayush@Ayush MINGW64 ~ (master)
$ cd backend
npm install
bash: cd: backend: No such file or directory
npm error code ENOENT
npm error syscall open
npm error path C:\Users\ayush\package.json
npm error errno -4058
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory, open 'C:\Users\ayush\package.json'
npm error enoent This is related to npm not being able to find a file.
npm error enoent
npm error A complete log of this run can be found in: C:\Users\ayush\AppData\Local\npm-cache\_logs\2026-01-13T07_47_02_447Z-debug-0.log

ayush@Ayush MINGW64 ~ (master)
$ cd /c/Users/ayush/Downloads

ayush@Ayush MINGW64 ~/Downloads (master)
$ /c/Users/ayush/Downloads/New Folder(9)
bash: syntax error near unexpected token `('

ayush@Ayush MINGW64 ~/Downloads (master)
$ cd C:\Users\ayush\Downloads\New folder (9)
bash: syntax error near unexpected token `('

ayush@Ayush MINGW64 ~/Downloads (master)
$ ^C

ayush@Ayush MINGW64 ~/Downloads (master)
$ cd "C:/Users/ayush/Downloads/New folder (9)"

ayush@Ayush MINGW64 ~/Downloads/New folder (9) (master)
$ ls
Backend/  Forntend/

ayush@Ayush MINGW64 ~/Downloads/New folder (9) (master)
$ cat > README.md << 'EOF'
# Task Management System (Kanban Based)

## Project Overview
A full-stack Task Management application with user authentication and Kanban-style task board.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, @dnd-kit for drag & drop
- **Backend**: Node.js, Express.js, MongoDB, JWT Authentication

## Setup Instructions

### Backend Setup
1. Navigate to backend directory:
>
>
>
>
>
> 2. Install dependencies:
>
 





3. Start the development server:

## API Endpoints
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Database
Use MongoDB (local or MongoDB Atlas)

## Deployment
- Backend: Render/Railway
- Frontend: Vercel/Netlify
