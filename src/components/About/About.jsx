import React from 'react';
import { FaCar, FaRoad, FaUserFriends, FaStar } from 'react-icons/fa'; 

const About = () => {
  return (
    <div className="bg-gray-900 text-white py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          About RideOn
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          RideOn is your ultimate destination for premium car rentals and unforgettable driving experiences. 
          We’re here to fuel your journey with top-tier vehicles and exceptional service.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-lg hover:bg-gray-700 transition duration-300">
            <FaCar className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Vehicles</h3>
            <p className="text-gray-400 text-sm">
              Explore our fleet of top-quality cars designed for every type of driver.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-lg hover:bg-gray-700 transition duration-300">
            <FaRoad className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tailored Journeys</h3>
            <p className="text-gray-400 text-sm">
              Customize your ride with options that suit your travel needs.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-lg hover:bg-gray-700 transition duration-300">
            <FaUserFriends className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">For Everyone</h3>
            <p className="text-gray-400 text-sm">
              From enthusiasts to casual travelers, we’ve got you covered.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-lg hover:bg-gray-700 transition duration-300">
            <FaStar className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Top Reliability</h3>
            <p className="text-gray-400 text-sm">
              Enjoy peace of mind with our commitment to quality and comfort.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-lg md:text-xl text-gray-200 italic max-w-3xl mx-auto">
            "Our mission is to deliver the best driving experiences to car lovers and adventurers worldwide, 
            one ride at a time."
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;