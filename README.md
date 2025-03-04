# Task Manager Application

A full-stack task management application built with React and Django.

## Features

- User authentication (sign up, login)
- Create, read, update, and delete tasks
- Assign categories to tasks
- Set priority levels (high, medium, low)
- Mark tasks as completed or pending
- Filter tasks by category or completion status
- Search tasks by title
- Dashboard with task statistics

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- React Hook Form for form handling
- Tailwind CSS for styling
- Axios for API requests
- Lucide React for icons

### Backend
- Django
- Django REST Framework
- JWT Authentication
- SQLite database (can be easily switched to PostgreSQL)

## Setup Instructions

### Frontend Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Run migrations:
   ```
   python manage.py migrate
   ```

6. Create a superuser (admin):
   ```
   python manage.py createsuperuser
   ```

7. Start the development server:
   ```
   python manage.py runserver
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login and get JWT token
- `POST /api/auth/refresh/` - Refresh JWT token
- `GET /api/auth/me/` - Get current user details

### Tasks
- `GET /api/tasks/` - List all tasks (with optional filters)
- `POST /api/tasks/` - Create a new task
- `GET /api/tasks/{id}/` - Retrieve a specific task
- `PUT /api/tasks/{id}/` - Update a task
- `DELETE /api/tasks/{id}/` - Delete a task
- `GET /api/tasks/stats/` - Get task statistics
- `GET /api/categories/` - Get all categories

## Project Structure

### Frontend
```
src/
├── components/     # Reusable UI components
├── contexts/       # React context providers
├── pages/          # Page components
├── services/       # API service functions
└── main.tsx        # Application entry point
```

### Backend
```
backend/
├── task_manager/   # Project settings
├── tasks/          # Tasks app
└── users/          # User authentication app
```

## Future Enhancements

- Email notifications for due tasks
- Task sharing with other users
- Recurring tasks
- Mobile app version
- Dark mode support#   T a s k - I n d r o  
 