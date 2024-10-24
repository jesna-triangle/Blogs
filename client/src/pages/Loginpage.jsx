import React, { useState, } from 'react';
import {NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../contexts/Authcontext'

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const navigate = useNavigate()
    const { login } = useAuth()
    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        try {
            const res = await login(formData)
            console.log(res);
            if (res.success) {
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>

                {/* {error && <p className="error">{error}</p>} */}

                <form onSubmit={handleSubmit}>
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

                    <button type="submit" className="login-btn">Login</button>
                </form>

                <p className="signup-link">
                    Don't have an account? <NavLink to="/register">Sign up here</NavLink>.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
