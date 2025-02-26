import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {resetPassword} from "../reducers/AuthSlice.ts";

const ForgetPw = () => {
    const [formData, setFormData] = useState({
        email: '',
        newPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {

        if (!formData.email || !formData.newPassword) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            dispatch(resetPassword({ email: formData.email, newPassword: formData.newPassword }));
            setSuccess('Password reset successfully!');
            setError('');
            setFormData({ email: '', newPassword: '' });
        } catch (err: any) {
            setError(err.message);
            setSuccess('');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-amber-600">
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
                {error && (
                    <div className="text-red-500 text-center font-bold mb-4" style={{ fontFamily: "'Montserrat', serif" }}>
                        {error}
                    </div>
                )}
                {success && (
                    <div className="text-green-600 text-center font-bold mb-4" style={{ fontFamily: "'Montserrat', serif" }}>
                        {success}
                    </div>
                )}
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
                    name="newPassword"
                    placeholder="Enter New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded border-solid border-black"
                    style={{
                        fontFamily: "'Montserrat', serif",
                        fontSize: '14px',
                    }}
                />
                <br />
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-purple-900 text-white p-2 w-32 border border-amber-50 rounded-full font-bold"
                        style={{ fontFamily: "'Montserrat', serif", fontSize: '14px',borderRadius:"10px" }}
                    >
                        Save Changes
                    </button>
                </div>
                <br />
                <div className="flex justify-center">
                    <span
                        className="text-white"
                        style={{ fontFamily: "'Montserrat', serif", fontSize: '14px',fontWeight:"500"  }}
                    >
                        Back to Login page{' '}
                        <Link className="font-bold cursor-pointer" to="/login" style={{textDecoration: "none",color: "darkblue"}}>
                            Login
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default ForgetPw;
