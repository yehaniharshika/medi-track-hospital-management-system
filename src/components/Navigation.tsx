import {NavLink} from "react-router-dom";
import { useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import {
    FaFileMedical,
    FaGear,
    FaHouseMedicalCircleCheck, FaPersonCirclePlus,
    FaUserDoctor,
    FaUserNurse
} from "react-icons/fa6";

import {FaMoneyCheckAlt, FaSignOutAlt} from "react-icons/fa";


import {RiMenu3Line} from "react-icons/ri";
import {GiMedicines} from "react-icons/gi";
import {LuCalendarPlus2} from "react-icons/lu";


export const Navigation = () => {

    const [open, setOpen] = useState(true);

    return (
        <section className="flex gap-3 bg-purple-500">
            {/* Sidebar container */}
            <div
                className={`z-[999] h-screen ${open ? 'w-64' : 'w-28'} duration-500 text-gray-100 px-4 md:relative fixed top-0`}>
                {/* Logo Section */}

                <div className="py-3 flex justify-end">
                    <RiMenu3Line size={24} className="cursor-pointer" onClick={() => setOpen(!open)}/>
                </div>

                <div className="flex justify-center items-center font-medium border-b border-gray-300 py-3 px-4">
                    <img
                        src="/src/images/LOGO.png"
                        alt="Logo"
                        width={open ? 180 : 180}
                        className="transition-all duration-300"
                    />
                </div>


                <div className="flex flex-col h-full">
                    <ul className="whitespace-pre px-3 text-[0.9rem] py-5 flex flex-col gap-3 font-bold overflow-x-hidden">
                        <li>
                            <NavLink
                                to="/dashboard"
                                className={({isActive}) => `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-[15.5px] 
                                ${isActive ? "bg-violet-400 text-blue-950 shadow-md scale-105" : "text-gray-800"} 
                                hover:bg-violet-400 hover:text-white hover:scale-105 hover:shadow-[0_4px_8px_rgba(0,0,0,0.3)]`}
                                style={{
                                    fontFamily: "'Ubuntu', sans-serif",
                                    textDecoration: "none",
                                }}>
                                <AiOutlineAppstore size={24} className="min-w-max"/>Dashboard
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/department" className={({isActive}) => `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-[15.5px] 
                                ${isActive ? "bg-teal-400 text-blue-950 shadow-md scale-105" : "text-gray-800"} 
                                hover:bg-violet-400 hover:text-white hover:scale-105 hover:shadow-[0_4px_8px_rgba(0,0,0,0.3)]`}
                                     style={{fontFamily: "'Ubuntu', sans-serif",
                                textDecoration: "none",
                                }}>
                                <FaHouseMedicalCircleCheck  size={24} className="min-w-max"/>Department
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/doctor" className={({isActive}) => `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-[15.5px] 
                                ${isActive ? "bg-teal-400 text-blue-950 shadow-md scale-105" : "text-gray-800"} 
                                hover:bg-violet-400 hover:text-white hover:scale-105 hover:shadow-[0_4px_8px_rgba(0,0,0,0.3)]`}
                                     style={{
                                         fontFamily: "'Ubuntu', sans-serif",
                                         textDecoration: "none",
                            }}>
                                <FaUserDoctor size={24} className="min-w-max"/>Doctor
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/nurse" className={({isActive}) => `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-[15.5px] 
                                ${isActive ? "bg-teal-400 text-blue-950 shadow-md scale-105" : "text-gray-800"} 
                                hover:bg-violet-400 hover:text-white hover:scale-105 hover:shadow-[0_4px_8px_rgba(0,0,0,0.3)]`}
                                     style={{fontFamily: "'Ubuntu', sans-serif", textDecoration: "none",}}>
                                <FaUserNurse size={24} className="min-w-max"/>Nurse

                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/patient" className={({isActive}) => `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-[15.5px] 
                                ${isActive ? "bg-teal-400 text-white shadow-md scale-105" : "text-gray-800"} 
                                hover:bg-teal-400 hover:text-white hover:scale-105 hover:shadow-[0_4px_8px_rgba(0,0,0,0.3)]`}
                                     style={{fontFamily: "'Ubuntu', sans-serif", textDecoration: "none",color: "white"}}>
                                <FaPersonCirclePlus  size={24} className="min-w-max"/>Patient
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/appointment" className={({isActive}) => `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-[15.5px] 
                                ${isActive ? "bg-teal-400 text-white shadow-md scale-105" : "text-gray-800"} 
                                hover:bg-teal-400 hover:text-white hover:scale-105 hover:shadow-[0_4px_8px_rgba(0,0,0,0.3)]`}
                                     style={{fontFamily: "'Ubuntu', sans-serif", textDecoration: "none",}}>
                                <LuCalendarPlus2 size={24} className="min-w-max"/>appointment
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/medicine" className={({isActive}) => `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-[15.5px] 
                                ${isActive ? "bg-teal-400 text-white shadow-md scale-105" : "text-gray-800"} 
                                hover:bg-teal-400 hover:text-white hover:scale-105 hover:shadow-[0_4px_8px_rgba(0,0,0,0.3)]`}
                                     style={{fontFamily: "'Ubuntu', sans-serif", textDecoration: "none",}}>
                                <GiMedicines  size={24} className="min-w-max"/>Medicine
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/report" className={({isActive}) => `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-[15.5px] 
                                ${isActive ? "bg-teal-400 text-white shadow-md scale-105" : "text-gray-800"} 
                                hover:bg-teal-400 hover:text-white hover:scale-105 hover:shadow-[0_4px_8px_rgba(0,0,0,0.3)]`}
                                     style={{fontFamily: "'Ubuntu', sans-serif", textDecoration: "none",}}>
                                <FaFileMedical  size={24} className="min-w-max"/>Medical Report
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/payment" className={({isActive}) => `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-[15.5px] 
                                ${isActive ? "bg-teal-400 text-white shadow-md scale-105" : "text-gray-800"} 
                                hover:bg-teal-400 hover:text-white hover:scale-105 hover:shadow-[0_4px_8px_rgba(0,0,0,0.3)]`}
                                     style={{fontFamily: "'Ubuntu', sans-serif", textDecoration: "none",}}>
                                <FaMoneyCheckAlt  size={24} className="min-w-max"/>Payment
                            </NavLink>
                        </li>

                        <br/>
                        <li>
                            <NavLink to="/setting" className={({isActive}) => `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-[15.5px] 
                                ${isActive ? "bg-teal-400 text-white shadow-md scale-105" : "text-gray-800"} 
                                hover:bg-teal-400 hover:text-white hover:scale-105 hover:shadow-[0_4px_8px_rgba(0,0,0,0.3)]`}
                                     style={{fontFamily: "'Ubuntu', sans-serif", textDecoration: "none",}}>
                                <FaGear  size={24} className="min-w-max"/>
                                Settings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className={({isActive}) => `flex items-center gap-3 p-2 rounded-lg transition-all duration-300 text-[15.5px] 
                                ${isActive ? "bg-teal-400 text-white shadow-md scale-105" : "text-gray-800"} 
                                hover:bg-teal-400 hover:text-white hover:scale-105 hover:shadow-[0_4px_8px_rgba(0,0,0,0.3)]`}
                                     style={{fontFamily: "'Ubuntu', sans-serif", textDecoration: "none",}}>
                                <FaSignOutAlt size={24} className="min-w-max"/>
                                Sign Out
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
