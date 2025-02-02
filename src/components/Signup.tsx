import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {signup} from "../reducers/AuthSlice.ts";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { name, email, password, role } = formData;

        if (!name || !email || !password || !role || role === 'Select role') {
            alert('Please input all fields.');
            return;
        }

        try {
            dispatch(signup({ name, email, password, role }));
            alert(`Sign-Up Successful for ${name}`);
            navigate('/login');
        } catch (error: any) {
            alert(error.message); // Handle existing email error
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-amber-600">
            <div className="absolute top-0 left-0 w-full h-full">
                <img src="/src/images/photoScreen.jpg" alt="Background" className="w-full h-full object-cover" />
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-teal-500 border border-b-gray-600 p-8 backdrop-blur-lg rounded shadow-md w-96 relative"
                style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(85, 239, 196, 0.3)' }}>
                <div className="flex justify-center items-center font-medium border-b border-gray-300 py-3 px-9">
                    <img src="/src/images/logo.png" alt="Logo" width={120} />
                </div>
                <br />
                <h2 className="text-2xl text-white font-bold mb-4 text-center"
                    style={{ fontFamily: "'Montserrat', serif" }}>Sign Up</h2>
                <input type="text" name="name" placeholder="Name" value={formData.name}
                    onChange={handleChange} className="w-full mb-4 p-2 border rounded border-solid border-black"
                       style={{
                           fontFamily: "'Montserrat', serif",
                           fontSize: '14px',
                       }}
                />
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
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded border-black"
                    style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: '14px',
                    }}>
                    <option value="Select role">Select role</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="SCIENTIST">SCIENTIST</option>
                    <option value="ADMINISTRATIVE">ADMINISTRATIVE</option>
                    <option value="OTHER">OTHER</option>
                </select>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-teal-500 text-white p-2 w-32 border border-amber-50 rounded-full font-bold"
                    >
                        Sign Up
                    </button>
                </div>
                <br />
                <div className="flex justify-center">
                    <span className="text-white">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold cursor-pointer">
                            Login
                        </Link>
                    </span>
                </div>
                <br />
            </form>
        </div>
    );
};

export default SignUp;
