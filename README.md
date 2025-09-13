📁 Project Architecture

The project is structured into two main parts: the backend API and the frontend client.

Backend

The backend is a RESTful API built with Node.js and Express, connected to MongoDB via Mongoose.

backend/
├── src/
│   ├── controllers/
│   │   └── candidateProfileController.js
│   ├── models/
│   │   └── profile.model.js
│   ├── routes/
│   │   └── profile.route.js
│   └── lib/
│       └── db.js
├── server.js
└── .env

Frontend

The frontend is a single-page application built with React.js, styled with Tailwind CSS, and uses Axios for API calls.

frontend/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   ├── hooks/
│   ├── lib/
│   ├── assets/
│   └── Pages/
├── index.html
├── package.json
└── ...

🚀 Features

RESTful API: Exposes endpoints to GET and PUT candidate profile data.

MongoDB Integration: Uses Mongoose to connect to a MongoDB database for data persistence.

React.js Frontend: A dynamic and responsive user interface.

Axios: A promise-based HTTP client for making API requests.

Tailwind CSS: A utility-first CSS framework for rapid and responsive styling.

Render Deployment: Configured for seamless deployment of both backend API and static frontend.

⚙️ Local Setup

Follow these steps to set up and run the project on your local machine.

1. Backend Setup

Navigate to the backend directory:

cd backend


Install the required Node.js dependencies:

npm install


Create a .env file in the backend folder and add your MongoDB connection string:

MONGO_URI=your_mongodb_connection_string_here


Start the backend server:

npm run dev


The server will run on http://localhost:5001 with Nodemon for automatic restarts.

2. Frontend Setup

Navigate to the frontend directory:

cd frontend


Install the required Node.js dependencies:

npm install


Start the frontend development server:

npm run dev


The frontend will run on a local development server, typically http://localhost:5173.

🌐 API Documentation

The API endpoints are documented and can be tested using Postman.

Endpoints

GET /api/profile/:id — Fetches a specific candidate profile by its unique ID.

PUT /api/profile/:id — Updates an existing candidate profile. The request body should contain the fields to be updated.

☁️ Deployment on Render

This project can be deployed on Render as two separate services: backend (Node.js API) and frontend (React app).

1. Backend Deployment

Push your backend code to a Git repository.

In Render, create a new Web Service and connect your GitHub repo.

Set the environment variable:

MONGO_URI = your_mongodb_connection_string


Build command:

cd backend && npm install


Start command:

cd backend && node server.js


Deploy → Render will provide your backend URL, e.g.:

https://candidate-dashboard-backend.onrender.com

2. Frontend Deployment

Push your frontend code to a Git repository.

In Render, create a new Static Site and connect your repo.

Set environment variable:

VITE_API_BASE_URL = https://candidate-dashboard-backend.onrender.com/api


Build command:

cd frontend && npm install && npm run build


Publish directory:

frontend/dist


Deploy → Render will provide your frontend URL, e.g.:

https://candidate-dashboard-frontend.onrender.com


Make sure your backend allows CORS requests from the frontend URL.

🤝 Known Limitations & Future Improvements

Security: No authentication or authorization. Should be added for production.

Error Handling: Current error handling is basic; can be improved.

UI/UX: Frontend is a proof-of-concept; can be enhanced for better user experience.

📄 Resume

You can view my resume here: Aakash Divakar's Resume
