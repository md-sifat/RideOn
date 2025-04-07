import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 w-full text-white text-center p-6 mt-10">
      <h3 className="text-xl font-semibold">Ride On</h3>
      <p className="text-gray-400 mt-2">Guiding you toward a successful future.</p>

      <div className="flex justify-center space-x-6 mt-4">
        <a className="text-blue-500 hover:text-blue-400 text-2xl"><FaFacebook /></a>
        <a className="text-pink-500 hover:text-pink-400 text-2xl"><FaInstagram /></a>
        <a className="text-blue-400 hover:text-blue-300 text-2xl"><FaTwitter /></a>
        <a className="text-blue-600 hover:text-blue-500 text-2xl"><FaLinkedin /></a>
      </div>

      <p className="text-gray-500 mt-4">&copy; 2025 Ride On. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
