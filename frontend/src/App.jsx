import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import ChatAssistant from './pages/ChatAssistant';
import CodingAssistant from './pages/CodingAssistant';
import StudyAssistant from './pages/StudyAssistant';
import HackathonGenerator from './pages/HackathonGenerator';
import ProjectPlanner from './pages/ProjectPlanner';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chat" element={<ChatAssistant />} />
          <Route path="code" element={<CodingAssistant />} />
          <Route path="study" element={<StudyAssistant />} />
          <Route path="hackathon" element={<HackathonGenerator />} />
          <Route path="plan" element={<ProjectPlanner />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
