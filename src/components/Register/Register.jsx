import { useContext, useState } from "react";
import { ImGoogle } from "react-icons/im";
import { authContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const { createUser } = useContext(authContext);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const [showPassword, setShowPassword] = useState(false);

    const handleGoogleRegister = () => {
        signInWithPopup(auth, provider)
            .then((res) => {
                const user = res.user;
                const userData = {
                    name: user.displayName,
                    email: user.email,
                    img: user.photoURL,
                    uid: user.uid,
                };

                // Send the user data to your backend (MongoDB)
                fetch('https://equi-sports-server-side-beryl.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        toast.success("Registration successful!");
                        navigate("/login");
                    })
                    .catch((error) => {
                        toast.error("Error saving user to database!");
                    });
            })
            .catch((error) => {
                toast.error("Registration failed!");
            });
    };


    const handleRegister = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const name = event.target.name.value;
        const password = event.target.password.value;
        const img = event.target.img.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            toast.error("Password must contain at least 6 characters, an uppercase letter, and a lowercase letter.");
            return;
        }

        createUser(email, password)
            .then(() => {
                updateProfile(auth.currentUser, { photoURL: img, displayName: name })
                    .then(() => {
                        // Prepare user data
                        const user = {
                            name,
                            email,
                            photoURL: img,
                        };

                        // Send user data to MongoDB using fetch
                        fetch('https://equi-sports-server-side-beryl.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(user),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                toast.success("Registration successful and user saved to database!");
                                navigate("/login");
                            })
                            .catch((error) => {
                                toast.error("Failed to save user data to database");
                            });
                    })
                    .catch(() => {
                        toast.error("Profile update failed!");
                    });
            })
            .catch(() => {
                toast.error("Registration failed!");
            });
    };

    return (
        <div className="flex w-full md:w-[40%] lg:w-[30%] my-5 justify-center items-center h-auto rounded-xl p-6 bg-gray-900 shadow-xl">
            <div className="w-full bg-transparent p-8 rounded-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
                    Register with Email
                </h2>
                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Full Name</label>
                        <input
                            type="text" name="name"
                            className="mt-1 w-full p-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-800 text-white"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email" name="email"
                            className="mt-1 w-full p-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-800 text-white"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Profile Image URL</label>
                        <input
                            type="text" name="img"
                            className="mt-1 w-full p-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-800 text-white"
                            placeholder="Enter your image URL"
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type={showPassword ? "text" : "password"} name="password"
                            className="mt-1 w-full p-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-800 text-white"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-10 text-gray-400 hover:text-gray-200"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium p-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </form>
                <div className="flex my-4 justify-center">
                    <button onClick={handleGoogleRegister}
                        className="flex items-center gap-2 w-full md:w-[70%] bg-gray-700 text-white font-medium p-3 rounded-xl shadow-md hover:bg-gray-600 transition"
                    >
                        <ImGoogle /> Register with Google
                    </button>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <Link to={'/login'} className="text-white font-medium py-3 hover:text-blue-400">
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
