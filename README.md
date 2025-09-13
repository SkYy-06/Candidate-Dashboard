Candidate Profile Management Application
This is a full-stack web application designed to manage candidate profiles. It features a RESTful API for creating, viewing, and updating profiles, and a React.js frontend to interact with the API.

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

Vercel Deployment: Configured for seamless deployment of both the serverless API and the static frontend.

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
The API endpoints are documented and can be tested using the following Postman collection.

Postman Collection Link

Endpoints
GET /api/profile/:id: Fetches a specific candidate profile by its unique ID.

PUT /api/profile/:id: Updates an existing candidate profile. The request body should contain the fields to be updated.

☁️ Deployment on Vercel
This project is configured for deployment on Vercel. Both the backend and the frontend will be deployed as separate projects.

1. Backend Deployment
Push your backend code to a Git repository.

Import the repository into your Vercel dashboard.

In the project settings, add the MONGO_URI environment variable with your MongoDB Atlas connection string.

Vercel will automatically detect the Node.js project and deploy it.

2. Frontend Deployment
Push your frontend code to a separate Git repository.

Import this repository into your Vercel dashboard.

In the project settings, add a new environment variable:

Name: VITE_API_BASE_URL

Value: https://your-backend-api-url.vercel.app/api (replace with the URL of your deployed backend)

Vercel will detect the Vite setup and deploy your React application.

Important: After deploying the backend, you must get its Vercel URL and add it to the VITE_API_BASE_URL environment variable in the frontend project settings.

🤝 Known Limitations & Future Improvements
Security: The API lacks authentication and authorization. This should be implemented in a production environment.

Error Handling: The current error handling is basic. More robust and specific error responses could be added.

UI/UX: The frontend is a simple proof-of-concept. It can be enhanced with better styling and improved user experience.

📄 Resume
You can view my resume here: (https://drive.google.com/file/d/1MYcHToOZqveY9up3ZSYwY74Lr5JDv1_4/view?usp=drive_link)
