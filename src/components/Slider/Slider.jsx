import { useState, useEffect } from 'react';
import img1 from '../../assets/slider/img1.jpg';
import img2 from '../../assets/slider/img2.jpg';
import img3 from '../../assets/slider/img3.jpg';
import { Link } from 'react-router-dom';

const Slider = () => {
  const slides = [
    { image: img1, title: "Slide 1" },
    { image: img3, title: "Slide 2" },
    { image: img2, title: "Slide 3" },
    { image: img2, title: "Slide 4" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch car data from the API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('https://ride-on-server.vercel.app/cars');
        const data = await response.json();
        const sortedCars = data.sort((a, b) => b.bookingCount - a.bookingCount);
        setCars(sortedCars.slice(0, 8)); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getDaysSincePosted = (bookingCount) => {
    return `Added ${Math.floor(Math.random() * 7 + 1)} days ago`;
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Slider Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="title my-3 text-4xl font-bold text-center">
          Welcome to Ride On
        </div>
        <div className="text-center mb-6">
          <Link
            to={'/cars'}
            className="cursor-pointer text-white text-lg border-2 px-3 py-2 font-semibold hover:bg-gray-700 hover:text-white"
          >
            Our Cars
          </Link>
        </div>
        <div className="w-full flex justify-center py-10">
          <div className="relative w-[70%]">
            <div className="w-full overflow-hidden relative">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div className="flex-shrink-0 w-full" key={index}>
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute bottom-5 left-5 text-white text-3xl font-bold">
                      {slide.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              onClick={prevSlide}
            >
              ❮
            </button>
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              onClick={nextSlide}
            >
              ❯
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: 'Wide Variety of Cars',
                description: 'From budget-friendly options to luxury vehicles.',
                icon: '🚗',
              },
              {
                title: 'Affordable Prices',
                description: 'Competitive daily rates you can count on.',
                icon: '💰',
              },
              {
                title: 'Easy Booking Process',
                description: 'Seamlessly book your ride in just a few clicks.',
                icon: '📱',
              },
              {
                title: 'Customer Support',
                description: '24/7 assistance for all your queries.',
                icon: '📞',
              },
            ].map((point, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-gray-700 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{point.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                <p className="text-gray-300">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Listings Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Recent Listings</h2>
        {loading ? (
          <p className="text-center">Loading cars...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={car.image}
                  alt={car.carModel}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{car.carModel}</h3>
                  <p className="text-gray-300 mb-2">
                    ${car.dailyRentalPrice}/day
                  </p>
                  <p className="text-gray-400 mb-2">
                    {car.availability ? (
                      <span className="text-green-500">Available</span>
                    ) : (
                      <span className="text-red-500">Booked</span>
                    )}
                  </p>
                  <p className="text-gray-400 mb-2">
                    Bookings: {car.bookingCount}
                  </p>
                  <p className="text-gray-400">
                    {getDaysSincePosted(car.bookingCount)}
                  </p>
                 
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Special Offers Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Weekend Getaway Deal',
                description: 'Get 15% off for weekend rentals!',
                buttonText: 'Book Now',
              },
              {
                title: 'Luxury Experience',
                description: 'Luxury cars at $99/day this holiday season!',
                buttonText: 'Learn More',
              },
            ].map((offer, index) => (
              <div
                key={index}
                className="bg-gray-700 p-8 rounded-lg flex flex-col items-center text-center hover:animate-bounce transition-transform"
              >
                <h3 className="text-2xl font-semibold mb-4">{offer.title}</h3>
                <p className="text-gray-300 mb-6">{offer.description}</p>
                <Link
                  to="/cars"
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                >
                  {offer.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;