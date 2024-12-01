import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // CSS dosyanızın yolu
import App from './App.jsx'; // App bileşeni

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // public/index.html içindeki "root" div'ine gömer
);
