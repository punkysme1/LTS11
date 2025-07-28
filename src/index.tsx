// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// import { AuthProvider } from './contexts/AuthContext'; // Hapus ini
import { BrowserRouter } from 'react-router-dom';

console.log('MAIN_APP_ENTRY_POINT: Application is starting...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    {/* AuthProvider tidak lagi membungkus App,
        sekarang state diakses langsung via useAuth dari authStore */}
    <App /> 
  </BrowserRouter>
);