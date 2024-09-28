// /src/App
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext'; // Make sure this is the correct path
import Login from './login/Login';
import Register from './login/Register';
import CourseList from './components/CourseList';
import ProtectedRoute from './components/ProtectedRoute';
import Certificates from './Certificates/Certificates';
import Users from './Users/Users';
import Navbar from "./navbar/navbar"
const App = () => {
  return (
    // <Router>
      <AuthProvider> {/* Ensure this is inside Router */}
      <Navbar/>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/certigicates" element={<Certificates />} />
          <Route path="/users" element={<Users />} />
          <Route
            path="/courses"
            element={
               <ProtectedRoute>
                <CourseList />
               </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    // </Router>
  );
};

export default App;
