import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserProfile from './components/profile/UserProfile';

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    </div>
  );
}

export default App;
