# YouTube Search and Player

<div align='center'>
<a href="https://youtube-player-app-client.vercel.app/">
<img src="https://i.postimg.cc/gjFVry67/yout.png"/>
</a>
</div>

This project is a web application that allows users to search for YouTube videos, play them, and save them to a history list. It's built with a React frontend and a Node.js backend with Express, using MongoDB for data storage.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
6. [Deployment](#deployment)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4 or later)
- A YouTube Data API key

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SagiMines/youtube-player-app.git
   cd youtube-player-app
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

## Configuration

1. Backend Configuration:

   - In the `backend` directory, create a `.env` file with the following content:

     ```javascript
     MONGODB_URI = your_mongodb_connection_string;
     YOUTUBE_API_KEY = your_first_youtube_api_key;
     YOUTUBE_API_KEY2 = your_second_youtube_api_key;
     YOUTUBE_API_KEY3 = your_third_youtube_api_key;
     ```

     Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

     Replace `your_first_youtube_api_key`, `your_second_youtube_api_key`, and `your_third_youtube_api_key` with your actual YouTube Data API keys.

2. Frontend Configuration:
   - In the `frontend` directory, create a `.env` file with the following content:
     ```javascript
     VITE_API_BASE_URL=http://localhost:5000/api
     ```

## Running the Application

1. Start the backend server:

   ```
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend development server:

   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` (or the URL provided by Vite) to see the application.

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/videos`: Get all watched videos history list
- `GET /api/youtube-search`: Get relevant YouTube videos by "search" query
- `POST /api/videos`: Add a new watched video to the history list
- `DELETE /api/videos/:id`: Delete a video from the history list

## Deployment

This application is deployed on Vercel, check it out!

- **[Live Demo](https://youtube-player-app-client.vercel.app/)**
