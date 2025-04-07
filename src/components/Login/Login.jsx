import { useContext, useState } from "react";
import { ImGoogle } from "react-icons/im";
import { authContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const { loginUser } = useContext(authContext);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const [showPassword, setShowPassword] = useState(false);

    const handleGoogleRegister = () => {
        signInWithPopup(auth, provider)
            .then((res) => {
                toast.success("Log In successful!");
                navigate("/login");
            }).catch((error) => {
                toast.error("Log In failed!");
            });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        loginUser(email, password)
            .then(() => {
                toast.success("Log In successful!");
                navigate("/login");
            })
            .catch(() => {
                toast.error("Log In failed!");
            });
    };

    return (
        <div className="flex w-full md:w-[40%] lg:w-[30%] my-5 justify-center items-center h-auto rounded-xl p-6 bg-gray-900 shadow-xl">
            <div className="w-full bg-transparent p-8 rounded-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
                    Login with Email
                </h2>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email" name="email"
                            className="mt-1 w-full p-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-800 text-white"
                            placeholder="Enter your email"
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
                        Login
                    </button>
                </form>
                <div className="flex my-4 justify-center">
                    <button onClick={handleGoogleRegister}
                        className="flex items-center gap-2 w-full md:w-[70%] bg-gray-700 text-white font-medium p-3 rounded-xl shadow-md hover:bg-gray-600 transition"
                    >
                        <ImGoogle /> Login With Google
                    </button>
                </div>
                <div className="flex flex-col items-center mt-4">
                    <Link to={'/forgotpassword'} className="text-blue-400 hover:underline">
                        Forgot Password?
                    </Link>
                    <Link to={'/register'} className="text-white font-medium py-3 hover:text-blue-400">
                        Create a new account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;