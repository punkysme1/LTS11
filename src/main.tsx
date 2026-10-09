import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './AppV11';
import './styles.css';
import './catalog-card.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
