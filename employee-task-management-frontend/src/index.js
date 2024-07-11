// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Ensure this line is correct and matches the file path
import App from './App';
import { createRoot } from 'react-dom/client';




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

createRoot(document.getElementById('root')).render(<App />);

