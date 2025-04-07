import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Home = () => {
    return (
        <div className="w-full min-h-screen max-h-auto flex flex-col items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Home;
