// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Path ini seharusnya benar jika index.css ada di src/
import { AuthProvider } from './contexts/AuthContext';

console.log('MAIN_APP_ENTRY_POINT: Application is starting...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  // PASTIKAN BENAR-BENAR TIDAK ADA <React.StrictMode> DI SINI
  <AuthProvider>
    <App />
  </AuthProvider>
);