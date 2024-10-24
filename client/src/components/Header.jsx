import React, { useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuth } from '../contexts/Authcontext';
 
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
 
  useEffect(() => {
    if (currentUser && currentUser.userId) {
      setUserId(currentUser.userId);
    } else {
      setUserId(null);
    }
  }, [currentUser]);
 
  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      console.log(response.message);
      navigate('/');
    }
    else {
      console.log(response.message);
    }
  };
 
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
 
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <NavLink to="/">MyBlog</NavLink>
        </div>
 
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/following">Following</NavLink>
          <NavLink to="/aboutus">AboutUs</NavLink>
          <NavLink to="/contact">Contact</NavLink>
 
        </nav>
 
        {!currentUser && (
        <div className="auth-buttons">
          <NavLink to="/register/login" className="login-btn">Login</NavLink>
          <NavLink to="/register" className="signup-btn">Signup</NavLink>
          </div>
         )}
 
 
 {currentUser && ( // Show content for logged-in users
            <div>
                {location.pathname !== "/post" && ( // Check if not on /post page
                    <NavLink to="/post" className="createpost-btn">
                        Create Post {currentUser.username}
                    </NavLink>
                )}
                {/* Add other logged-in user content here if needed */}
            </div>
        )}
 
 
          <div className="menu-btn-container">
 
 
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <NavLink to="/user" className="dropdown-item">Profile</NavLink>
                <button onClick={handleLogout} className="dropdown-item logout-btn">Logout</button>
              </div>
            )}
 
            <button className="menu-btn" onClick={toggleDropdown}>
              <RxHamburgerMenu />
            </button>
          </div>
       
 
 
      </div>
    </header>
   
  );
};
 
export default Header;