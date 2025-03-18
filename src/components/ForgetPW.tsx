import { Link } from "react-router-dom";

const ForgetPw = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-amber-600">
            <div className="absolute top-0 left-0 w-full h-full">
                <img src="/src/images/background04.png" alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-purple-900 opacity-60"></div>
            </div>
            <form
                className="bg-teal-500 border border-b-gray-600 p-8 backdrop-blur-lg rounded shadow-md w-96 relative"
                style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(155, 89, 182, 0.3)' }}
            >
                <div className="flex justify-center items-center font-medium border-b border-gray-300 py-3 px-9">
                    <img src="/src/images/logo.png" alt="Logo" width={120} />
                </div>
                <br />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full mb-4 p-2 border rounded border-solid border-black"
                    style={{ fontFamily: "'Montserrat', serif", fontSize: '14px' }}
                />
                <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter New Password"
                    className="w-full mb-4 p-2 border rounded border-solid border-black"
                    style={{ fontFamily: "'Montserrat', serif", fontSize: '14px' }}
                />
                <br />
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="bg-purple-900 text-white p-2 w-32 border border-amber-50 rounded-full font-bold"
                        style={{ fontFamily: "'Montserrat', serif", fontSize: '14px', borderRadius: "10px" }}
                    >
                        Save Changes
                    </button>
                </div>
                <br />
                <div className="flex justify-center">
                    <span className="text-white" style={{ fontFamily: "'Montserrat', serif", fontSize: '14px', fontWeight: "500" }}>
                        Back to Login page{' '}
                        <Link className="font-bold cursor-pointer" to="/login" style={{ textDecoration: "none", color: "darkblue" }}>
                            Login
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default ForgetPw;
