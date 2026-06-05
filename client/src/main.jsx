// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// import { AuthProvider } from "./context/AuthContext";
// import { BrowserRouter } from 'react-router-dom'; // ✅ Import BrowserRouter

// ReactDOM.createRoot(document.getElementById('root')).render(
//    <React.StrictMode>
//     <BrowserRouter>
//     <AuthProvider> {/* ✅ Wrap App in Router */}
//       <App />
//       </AuthProvider>
//     </BrowserRouter>
//     </React.StrictMode> 
// );
// index.jsx





//=========================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
   </React.StrictMode>,
);









// import React from 'react';
// import React from 'react';
// import ReactDOM from 'react-dom/client';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <h1>Hello World</h1>
// );


