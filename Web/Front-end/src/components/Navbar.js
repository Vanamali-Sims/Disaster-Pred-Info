import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { WEB_LOGO } from "../utils/config";
import Sidebar from "./Sidebar";

const Title = () => {
    return (
        <img className="h-16 w-24 ml-2" src={WEB_LOGO} alt="Disasters" />
    );
}

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    
    return (
        <div className="relative">
            {showDropdown && (
                <div className="bg-black bg-opacity-50 absolute inset-0" onClick={() => setShowDropdown(false)}></div>
            )}
            <div className="flex justify-between p-2 text-cyan-200 bg-gray-900 shadow-xl z-10 relative">
                <ul className="flex">
                    <li className="m-2" ><Sidebar /></li>
                    <li className="ml-3"><Title /></li>
                    <li className="p-2 m-2 italic" >Disaster Predictor</li>
                </ul>
                <ul className="flex">
                    <Link to='/'>
                        <li className="p-2 m-2 border-b-2 border-transparent hover:border-cyan-200 focus:outline-none">Home</li>
                    </Link>
                    <li
                        className="p-2 m-2 relative"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >
                        <div className="flex items-center">
                            Predictions
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-4 h-4 ml-1 ${showDropdown ? 'rotate-180' : ''}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.293 11.707a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L10 9.586 6.707 6.293a1 1 0 00-1.414 1.414l4 4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-300 rounded shadow-xl">
                                <Link to='/forestfires'
                                    className="block px-4 py-2 text-sm font-bold text-cyan-700 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    Forest Fires
                                </Link>
                                <Link to="/earthquakes"
                                    className="block px-4 py-2 text-sm font-bold text-cyan-700 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    Earthquakes
                                </Link>
                            </div>
                        )}
                    </li>
                    <Link to='/contact'>
                        <li className="p-2 m-2 border-b-2 border-transparent hover:border-cyan-200 focus:outline-none">Contact</li>
                    </Link>
                        <li className="p-2 my-2 mr-20 border-b-2 border-transparent hover:border-cyan-200 focus:outline-none"><Link to='/about'>About</Link></li>
                    <li className="p-2">
                        {(token) ? (
                            <li className="mt-1.5 mr-5 italic text-lg border-b-2 border-transparent hover:border-cyan-200 focus:outline-none">{userName}</li>
                        ) : (
                            <Login/>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
