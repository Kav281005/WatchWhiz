// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
//   // import Home from './pages/home';
// import Watchlist from './pages/Watchlist';
// //  import Dashboard from './pages/Dashboard';
//  import MovieDetail from './pages/MovieDetail';
// import HomeDashboard from './pages/HomeDashboard';
// import Login from './pages/Login';
// import Register from './pages/Register';

// function App() {
//   return (
    
//     <Router>
//       <div className="bg-black text-white min-h-screen">
//       <Navbar />
//       <Routes>
//         {/* <Route path="/" element={<Home />} /> */}
//         <Route path="/" element={<HomeDashboard />} />
//          <Route path="/movie/:id" element={<MovieDetail />} /> 
//          <Route path="/watchlist" element={<Watchlist />} />
//          <Route path="/login" element={<Login />} />
//          <Route path="/register" element={<Register />} />
//         {/* <Route path="/Dashboard" element={<Dashboard />} />  */}
//       </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
// App.jsx
// import React from 'react';






//  ==================================================================
import {  Routes,Route , useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeDashboard from './pages/HomeDashboard';
import MovieDetail from './pages/MovieDetail';
import Watchlist from './pages/Watchlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/profile';
import { useAuth } from './context/AuthContext';
import { FaFilm } from 'react-icons/fa';
import './App.css';

export default function App() {
   const location = useLocation();
   const { loading } = useAuth();
   const hideNav = ['/login', '/register'].includes(location.pathname);

   if (loading) {
     return (
       <div className="loading-screen">
         <FaFilm className="loading-icon" />
         <h1 className="loading-text">WATCHWHIZ.X</h1>
       </div>
     );
   }

  return (
    <>
    {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}



// function App() {
//   return <h1>App Works</h1>;
// }

// export default App;