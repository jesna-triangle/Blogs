import React, { useState } from 'react';
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" })
  const navigate = useNavigate()
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post('http://localhost:4000/api/users/', formData)
      if (res.status == 201) {
        console.log(res.data);
        navigate("/register/login")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <p className="login-link">
          Already have an account? <NavLink to="/register/login">Login here</NavLink>.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
