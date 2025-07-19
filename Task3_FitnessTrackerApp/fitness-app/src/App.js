import React from 'react';

import { BrowserRouter as Router, Routes, Route, NavLink, Link, Navigate } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import FitnessDashboard from './components/FitnessDashboard';
import Notifications from './components/Notifications';
import DataVisualization from './components/DataVisualization';
import StepCountPrediction from './components/StepCountPrediction';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-links">
         
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/notifications">Notifications</NavLink>
          <NavLink to="/data-visualization">Data Visualization</NavLink>
          <NavLink to="/step-prediction">Step Prediction</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>
      </nav>
      
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/dashboard" element={<FitnessDashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/data-visualization" element={<DataVisualization />} />
          <Route path="/step-prediction" element={<StepCountPrediction userStepData={[]} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          
          <Route path="*" element={
            <div className="container card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h2 style={{ color: 'var(--text-color)', fontSize: 'var(--font-size-xl)' }}>404 - Page Not Found</h2>
              <p style={{ color: 'var(--light-text-color)', marginBottom: 'var(--spacing-lg)' }}>The page you are looking for does not exist.</p>
             
              <Link to="/dashboard" className="button-primary">Go to Dashboard</Link>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;