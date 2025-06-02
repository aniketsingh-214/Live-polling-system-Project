# Live Polling Application

## Overview

The Live Polling Application is a real-time polling system built for classrooms, events, or group settings. It allows one user to create and conduct live polls while others can join, participate, and see the results instantly. The app uses **React** for the frontend and **Node.js with Express and Socket.io** for the backend to provide a smooth and interactive experience.

## Key Features

### Poll Creator (Teacher/Host)

* Create Polls: Add custom questions with multiple-choice options.
* Set Timer: Choose how long each question is active.
* Live Results: View student responses in real-time.
* Ask Next Question: Move easily to the next poll question.

### Participant (Student)

* Join Session: Enter a name to participate.
* Answer Questions: Submit responses to active polls.
* See Results: Results are shown after answering or when time runs out.
* Countdown Timer: Visual countdown to track remaining time.

### Real-Time Sync

* Socket.io Integration: Real-time data updates between users.
* Response Validation: Ensures each user can submit only once per poll.

## Technology Stack

### Frontend

* React: Frontend framework.
* React Bootstrap: For UI components and layout.
* Socket.io Client: Handles real-time communication.

### Backend

* Node.js: Server-side runtime.
* Express: Manages server routes and APIs.
* Socket.io: Enables real-time communication.
* CORS: Supports cross-origin requests.

## How to Use

1. For Hosts (Teachers/Organizers):

   Open the application and choose the "Host" or "Teacher" role.
   Create a poll with a question and answer options.
   Set a timer and publish the poll.
   Watch responses update in real-time.

2. For Participants (Students):

   * Open the application and choose the "Participant" or "Student" role.
   * Enter a name to join.
   * Submit answers to active polls.
   * View the results once the poll ends.

## Getting Started

###  Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the backend server:

   ```bash
   npm start
   ```

---

### 💻 Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the frontend development server:

   ```bash
   npm run dev
   ```

