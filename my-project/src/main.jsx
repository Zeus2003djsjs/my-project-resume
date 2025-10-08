// src/main.jsx (Final Corrected Code)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 🛑 ADD THIS IMPORT
import { BrowserRouter } from 'react-router-dom'; 
import { ResumeProvider } from './context/ResumeContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 🛑 FIX: BrowserRouter MUST be the top-level element that uses context */}
    <BrowserRouter> 
      <ResumeProvider>
        <App /> {/* App now defines ONLY the Routes and components */}
      </ResumeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);