import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CustomerHome from './pages/CustomerHome';
import ManagerHome from './pages/ManagerHome';
import BookingsPage from './pages/BookingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer-home" element={<CustomerHome />} />
        <Route path="/manager-home" element={<ManagerHome />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
