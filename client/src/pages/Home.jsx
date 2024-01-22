import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="font-medium ">
      <h1>Welcome to the Home Page</h1>
      <Link to="/register">
        <button>Go to Register</button>
      </Link>
      <Link to="/login">
        <button>Go to Login</button>
      </Link>
      <Link to={`/profile/${user._id}`}>
        <button>Go to Profile</button>
      </Link>
    </div>
  );
};

export default Home;
