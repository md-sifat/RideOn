import { useContext, useState } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useContext(authContext);

    const toggleMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                toast.success("Log Out successful!");
                setUser(null);
                navigate('/');
            })
            .catch((error) => {
                toast.error("Log Out error!");
                console.log(error);
            });
    };

    const disabledLinkStyle = user ? 'text-white hover:text-gray-400' : 'text-gray-500 pointer-events-none cursor-not-allowed';

    return (
        <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-5 w-full shadow-md">
            <ToastContainer />
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h1 className="text-white text-3xl font-extrabold">Ride On</h1>

                {/* Desktop Menu */}
                <div className="hidden sm:flex space-x-8 text-lg">
                    <Link to={'/'} className="text-white hover:text-gray-400">Home</Link>
                    <Link to={'/cars'} className="text-white hover:text-gray-400">Available Cars</Link>
                    <Link to={'/addCar'} className={disabledLinkStyle}>Add Cars</Link>
                    <Link to={'/mycars'} className={disabledLinkStyle}>My Cars</Link>
                    <Link to={'/booking'} className={disabledLinkStyle}>My Booking</Link>
                    <Link to={'/about'} className="text-white hover:text-gray-400">About</Link>
                    <Link to={'/contact'} className="text-white hover:text-gray-400">Contact</Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="sm:hidden flex items-center">
                    <button
                        className="text-white hover:text-gray-300 focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="h-8 w-8"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* User Profile or Sign In/Register */}
                {user ? (
                    <div className="flex items-center">
                        <img
                            src={user.photoURL}
                            alt="Profile"
                            className="h-12 w-12 mx-2 border-2 border-white rounded-full object-cover"
                        />
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 mx-5 text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md"
                        >
                            Log Out
                        </button>
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        <Link
                            to={'/login'}
                            className="text-white px-5 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-gray-900 transition"
                        >
                            Sign In
                        </Link>
                        <Link
                            to={'/register'}
                            className="text-white px-5 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-gray-900 transition"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden bg-gray-900 p-4 rounded-lg mt-2`}>
                <div className="flex flex-col space-y-4 text-lg">
                    <Link to={'/'} className="text-white hover:text-gray-400">Home</Link>
                    <Link to={'/cars'} className="text-white hover:text-gray-400">Available Cars</Link>
                    <Link to={'/addCar'} className={disabledLinkStyle}>Add Cars</Link>
                    <Link to={'/mycars'} className={disabledLinkStyle}>My Cars</Link>
                    <Link to={'/booking'} className={disabledLinkStyle}>My Booking</Link>
                    <Link to={'/about'} className="text-white hover:text-gray-400">About</Link>
                    <Link to={'/contact'} className="text-white hover:text-gray-400">Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;