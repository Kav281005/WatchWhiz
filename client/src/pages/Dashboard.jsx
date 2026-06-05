// client/src/pages/Dashboard.jsx
// export default function Dashboard() {
//   return (
//     <div className="text-black p-4">Welcome to the Dashboard</div>
//   );
// }
// src/pages/Dashboard.jsx
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Background section */}
      <div className="dashboard-hero">
        <div className="dashboard-overlay" />
        <div className="dashboard-hero-content">
          <h1 className="dashboard-title">Welcome back to WatchWhiz.x</h1>
          <p className="dashboard-subtitle">Here’s your movie universe, personalized.</p>
        </div>
      </div>

      {/* Main content */}
      <div className="dashboard-main">
        <section className="dashboard-section">
          <h2>Your Watchlist</h2>
          <p>You have 8 movies saved to watch later.</p>
        </section>

        <section className="dashboard-section">
          <h2>Recently Watched</h2>
          <p>Last movie: Interstellar</p>
        </section>
      </div>
      
    </div>
  );
};

export default Dashboard;
