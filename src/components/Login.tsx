import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import {useDispatch} from "react-redux";

import {login} from "../reducers/AuthSlice.ts";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            dispatch(login(formData));
            alert('Login Successful!');
            navigate('/dashboard'); // Navigate to a dashboard page after successful login
        } catch (error: any) {
            alert(error.message); // Handle incorrect password or no account found
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-amber-600">
            <div className="absolute top-0 left-0 w-full h-full">
                <img
                    src="/src/images/photoScreen.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-teal-500 border border-b-gray-600 p-8 backdrop-blur-lg rounded shadow-md w-96 relative"
                style={{
                    backdropFilter: 'blur(5px)',
                    backgroundColor: 'rgba(85, 239, 196, 0.3)',
                }}>
                <div className="flex justify-center items-center font-medium border-b border-gray-300 py-3 px-9">
                    <img src="/src/images/logo.png" alt="Logo" width={120} />
                </div>
                <br />
                <h2
                    className="text-2xl text-white font-bold mb-4 text-center"
                    style={{ fontFamily: "'Montserrat', serif" }}
                >
                    Login
                </h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded border-solid border-black"
                    style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: '14px',
                    }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded border-solid border-black"
                    style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: '14px',
                    }}
                />
                <div className="flex justify-between w-full">
                    <div className="flex gap-2">
                        <input type="checkbox" id="rememberMe" />
                        <label
                            className="text-white"
                            style={{ fontFamily: "'Montserrat', serif", fontSize: '14px' }}
                            htmlFor="rememberMe"
                        >
                            Remember Me
                        </label>
                    </div>
                    <Link to="/forgot-password" className="text-red-700 cursor-pointer font-medium" style={{ fontFamily: "'Montserrat', serif", fontSize: '14px' }}>
                        Forgot Password?
                    </Link>
                </div>
                <br />
                <div className="flex justify-center">
                    <button type="submit" className="bg-teal-500 text-white p-2 w-32 border border-amber-50 rounded-full font-bold" style={{ fontFamily: "'Montserrat', serif", fontSize: '14px' }}>Login</button>
                </div>
                <br />
                <div className="flex justify-center">
          <span
              className="text-white"
              style={{ fontFamily: "'Montserrat', serif", fontSize: '14px' }}>Don't have an account?{' '}
              <Link className="font-bold cursor-pointer" to="/signup">Sign up</Link>
          </span>
                </div>
            </form>
        </div>
    );
};

export default Login;
