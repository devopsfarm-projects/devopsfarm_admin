import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/authContext';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Make sure TypeScript knows the element won't be null

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);