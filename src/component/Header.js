import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { isLoggedIn } from '../authUtils';
import { getAuth, signOut } from 'firebase/auth'; 
import { FaHome, FaUser, FaPlus, FaList, FaSignOutAlt } from 'react-icons/fa';
import './header.css'; 
import logo from "../assets/metalmonkeysmall.png";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log('User logged out successfully');
      
      document.cookie = 'loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="header">
      <div className="navbar-menu-flex">
        <img src={logo} alt="logo" className="header-logo" />
        {isLoggedIn() ? (
          <>
            <Link to="/" className="navbar-item"><FaHome /><span>Home</span></Link>
            <Link to="/admin/allposts" className="navbar-item"><FaList /><span>All Reviews</span></Link>
            <Link to="/admin/createPost" className="navbar-item"><FaPlus /><span>Add a Review</span></Link>
            <Link className="navbar-item" onClick={handleLogout}><FaSignOutAlt /><span>Logout</span></Link>
            <Link to="/admin/users" className="navbar-item"><FaUser /><span>User</span></Link>
          </>
        ) : (
          <>
            <Link to="/" className="navbar-item"><FaHome /><span>Home</span></Link>
            <Link to="/register" className="navbar-item"><FaUser /><span>Register</span></Link>
            <Link to="/login" className="navbar-item"><FaSignOutAlt /><span>Login</span></Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;