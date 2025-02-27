import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';


import {loginUser} from "../reducers/AuthSlice.ts";
import {AppDispatch} from "../store/Store.ts";
import {useDispatch} from "react-redux";

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser(formData))
            .then((response: any) => {
                console.log('Access Token:', response.payload.accessToken);
                console.log('Refresh Token:', response.payload.refreshToken);
                alert('Login Successful!');
                navigate('/dashboard');
            })
            .catch((error: any) => {
                console.error('Login Error:', error);
            });
    };


    return (
        <div className="flex justify-center items-center h-screen relative">
            <div className="absolute top-0 left-0 w-full h-full">
                <img src="/src/images/background04.png" alt="Background" className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-purple-900 opacity-60"></div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-teal-500 border border-b-gray-600 p-8 backdrop-blur-lg rounded shadow-md w-96 relative"
                style={{
                    backdropFilter: 'blur(5px)',
                    backgroundColor: 'rgba(155, 89, 182, 0.3)',
                }}>
                <div className="flex justify-center items-center font-medium border-b border-gray-300 py-3 px-9">
                    <img src="/src/images/logo.png" alt="Logo" width={120} />
                </div>
                <br />
                <h2 className="text-2xl text-white font-bold mb-4 text-center" style={{ fontFamily: "'Montserrat', serif" }}>
                    Login
                </h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Email"
                    value={formData.username}
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
                    <Link to="/forgot-password" className="text-red-700 cursor-pointer font-medium" style={{ fontFamily: "'Montserrat', serif", fontSize: '14px' ,textDecoration: "none",color: "darkred"}}>
                        Forgot Password?
                    </Link>
                </div>
                <br />
                <div className="flex justify-center">
                    <button type="submit" className="bg-purple-900 text-white p-2 w-32 border border-amber-50 rounded-full font-bold" style={{ fontFamily: "'Montserrat', serif", fontSize: '14px',borderRadius:"10px" }}>Login</button>
                </div>
                <br />
                <div className="flex justify-center">
          <span
              className="text-white"
              style={{ fontFamily: "'Montserrat', serif", fontSize: '14px',fontWeight:"500" }}>Don't have an account?{' '}
              <Link className="font-bold cursor-pointer" to="/signup" style={{textDecoration: "none",color: "darkblue"}}>Sign up</Link>
          </span>
                </div>
            </form>
        </div>
    );
};

export default Login;
