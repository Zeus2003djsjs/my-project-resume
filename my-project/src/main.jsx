// src/main.jsx (Final Corrected Code)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 🛑 ADD THIS IMPORT
import { BrowserRouter } from 'react-router-dom'; 
import { ResumeProvider } from './context/ResumeContext.jsx'; 
import { Toaster } from 'react-hot-toast'; // ✨ IMPORT THE TOASTER

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 🛑 FIX: BrowserRouter MUST be the top-level element that uses context */}
    <BrowserRouter> 
      <ResumeProvider>
        <App /> {/* App now defines ONLY the Routes and components */}
        <Toaster // ✨ ADD THE TOASTER COMPONENT HERE
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: '#4ade80', // Green
                color: 'white',
              },
            },
            error: {
              style: {
                background: '#f87171', // Red
                color: 'white',
              },
            },
          }}
        />
      </ResumeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);