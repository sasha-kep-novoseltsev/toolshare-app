import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Початкова тема: збережена в LocalStorage або системна
let dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
try {
  const saved = localStorage.getItem('toolshare-theme');
  if (saved) dark = JSON.parse(saved) === 'dark';
} catch (e) { /* LocalStorage недоступний — лишаємо системну тему */ }
document.documentElement.dataset.theme = dark ? 'dark' : 'light';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
