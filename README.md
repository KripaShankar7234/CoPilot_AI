# AI Co-Pilot: Human + AI Collaboration Platform

A modern, dynamic, AI-powered web platform designed to function as an intelligent teammate for students, developers, and creators.

## Features Built
1. **AI Chat Assistant**: General-purpose AI chat with contextual support.
2. **AI Coding Assistant**: Code generation, debugging, explanation, and optimization in various languages.
3. **AI Study Assistant**: Explain topics, summarize content, create quizzes, and generate learning roadmaps.
4. **AI Hackathon Idea Generator**: Input a domain to immediately generate project names, statements, and tech stacks.
5. **AI Project Planner**: Breakdown an idea into development roadmaps and task tickets.
6. **Smart Productivity Dashboard**: View focus trends via interactive charts and get AI-suggested next steps.
7. **Platform Settings**: Customizable mock-up settings profile.

## Tech Stack
* **Frontend**: React + Vite, TailwindCSS (Dark Glassmorphic Theme), Framer Motion, Recharts, Lucide Icons, React Markdown (with Prism Highlighting)
* **Backend**: Node.js + Express.js
* **Database**: MongoDB (Structure provided)
* **AI Model**: Google Gemini API via `@google/genai` sdk.

## How to Run
1. Make sure you have your `GEMINI_API_KEY` set inside `backend/.env`.
2. Make sure MongoDB is running or update `MONGODB_URI` in `backend/.env`.
3. In the root directory, run `npm install` first. Then run `npm run dev`. Both the frontend and backend servers will start concurrently.
4. Navigate to `http://localhost:5173` to explore the workspace!
