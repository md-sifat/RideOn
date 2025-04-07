import { useState, useContext } from "react";
import { authContext } from "../AuthProvider/AuthProvider"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCars = () => {
    const { user } = useContext(authContext);
    const [image, setImage] = useState("");
    const [carModel, setCarModel] = useState("");
    const [dailyRentalPrice, setDailyRentalPrice] = useState("");
    const [availability, setAvailability] = useState("");
    const [vehicleRegNumber, setVehicleRegNumber] = useState("");
    const [features, setFeatures] = useState("");
    const [description, setDescription] = useState("");
    const [bookingCount] = useState(0); 
    const [location, setLocation] = useState("");
    const navigate = useNavigate();

    const handleAddCar = (event) => {
        event.preventDefault();

        const carData = {
            image,
            carModel,
            dailyRentalPrice,
            availability,
            vehicleRegNumber,
            features,
            description,
            bookingCount,
            location,
            userEmail: user.email,
            userName: user.displayName,
        };

        // Post the data to the backend
        fetch("https://ride-on-server.vercel.app/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(carData),
        })
            .then((response) => response.json())
            .then((data) => {
                toast.success("Car added successfully!");
                navigate("/addCars"); 
            })
            .catch((error) => {
                toast.error("Failed to add car!");
            });
    };

    return (
        <div className="flex w-full md:w-[50%] lg:w-[40%] my-5 justify-center items-center h-auto rounded-xl p-6 bg-gray-900 shadow-xl">
            <div className="w-full bg-transparent p-8 rounded-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
                    Add New Car
                </h2>
                <form onSubmit={handleAddCar} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Car Model</label>
                        <input
                            type="text"
                            value={carModel}
                            onChange={(e) => setCarModel(e.target.value)}
                            className="mt-1 w-full p-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-800 text-white"
                            placeholder="Enter the car model"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Daily Rental Price</label>
                        <input
                            type="number"
                            value={dailyRentalPrice}
                            onChange={(e) => setDailyRentalPrice(e.target.value)}
                            className="mt-1 w-full p-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-800 text-white"
                            placeholder="Enter the daily rental price"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Availability</label>
                        <select
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            className="mt-1 w-full p-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-800 text-white"
                        >
                            <option value="">Select Availability</option>
                            <option value="Available">Available</option>
                            <option value="Not Available">Not Available</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Vehicle Registration Number</label>
                        <input
                            type="text"
                            value={vehicleRegNumber}
                            onChange={(e) => setVehicleRegNumber(e.target.value)}
                            className="mt-1 w-full p-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-800 text-white"
                            placeholder="Enter the vehicle registration number"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Features</label>
                        <input
                            type="text"
                            value={features}
                            onChange={(e) => setFeatures(e.target.value)}
                            className="mt-1 w-full p-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-800 text-white"
                            placeholder="e.g., GPS, AC, Bluetooth"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 w-full p-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-800 text-white"
                            placeholder="Enter a description"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="mt-1 w-full p-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-800 text-white"
                            placeholder="Enter the location"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">User Email</label>
                        <input
                            type="text"
                            value={user.email}
                            readOnly
                            className="mt-1 w-full p-3 border border-gray-600 rounded-xl bg-gray-800 text-white cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">User Name</label>
                        <input
                            type="text"
                            value={user.displayName}
                            readOnly
                            className="mt-1 w-full p-3 border border-gray-600 rounded-xl bg-gray-800 text-white cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Image URL</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="mt-1 w-full p-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-800 text-white"
                            placeholder="Enter the image URL"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium p-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        Add Car
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCars;