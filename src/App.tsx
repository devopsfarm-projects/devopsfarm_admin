import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './login/Login.tsx'; // Import the LoginForm component
import { AuthProvider } from './context/AuthContext.tsx'; // Import the AuthProvider
import './App.css'; 
import Getstart from './components/Getstart.tsx';
import Navbar from './navbar/navbar.jsx'
import Userdata from './userdata/userdata.jsx';
import Certificate from './Certificate Data/certificate.jsx'
import Coursedata from './coursedata/coursedata.jsx'
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Getstart />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/userdata" element={<Userdata />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/coursedata" element={<Coursedata />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
