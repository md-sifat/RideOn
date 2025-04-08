import { useContext, useEffect, useState } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cars = () => {
  const { user } = useContext(authContext);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [bookingLoading, setBookingLoading] = useState({}); // New state for tracking booking status

  // Fetch cars and bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsResponse = await fetch('https://ride-on-server.vercel.app/cars');
        const carsData = await carsResponse.json();
        setCars(carsData);

        if (user) {
          const bookingsResponse = await fetch('https://ride-on-server.vercel.app/bookings');
          const bookingsData = await bookingsResponse.json();
          const userBookings = bookingsData.filter((booking) => booking.userEmail === user.email);
          setBookings(userBookings);
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to load cars. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [user]);

  // Handle booking
  const handleBook = async (car) => {
    if (!user) {
      toast.error('Please log in to book a car!');
      return;
    }

    // Set loading state for this specific car
    setBookingLoading(prev => ({ ...prev, [car._id]: true }));

    const bookingData = {
      carId: car._id,
      carModel: car.carModel,
      dailyRentalPrice: car.dailyRentalPrice,
      vehicleRegNumber: car.vehicleRegNumber,
      image: car.image,
      features: car.features,
      description: car.description,
      location: car.location,
      userEmail: user.email,
      status: 'pending',
      bookingDate: new Date().toISOString(),
    };

    try {
      const response = await fetch('https://ride-on-server.vercel.app/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        toast.success('Booking request submitted successfully!');
        const newBooking = await response.json();
        setBookings([...bookings, newBooking]);
      } else {
        toast.error('Failed to book car.');
      }
    } catch (err) {
      toast.error('Error booking car.');
      console.error('Booking error:', err);
    } finally {
      // Reset loading state for this car
      setBookingLoading(prev => ({ ...prev, [car._id]: false }));
    }
  };

  // Handle sorting
  const handleSort = (option) => {
    setSortOption(option);
    let sortedCars = [...cars];

    if (option === 'price') {
      sortedCars.sort((a, b) => Number(a.dailyRentalPrice) - Number(b.dailyRentalPrice));
    } else if (option === 'addedTime') {
      sortedCars.sort((a, b) => {
        const dateA = a.addedTime ? new Date(a.addedTime) : new Date(0);
        const dateB = b.addedTime ? new Date(b.addedTime) : new Date(0);
        return dateB - dateA;
      });
    }

    console.log('Sorted cars:', sortedCars);
    setCars(sortedCars);
  };

  if (loading) {
    return <div className="text-center text-white py-16">Loading cars...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400 py-16">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-900 min-h-screen">
      <ToastContainer />
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold text-white">Available Cars</h2>
        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded-lg border border-gray-600 focus:outline-none"
          >
            <option value="">Sort By</option>
            <option value="price">Sort by Price</option>
            <option value="addedTime">Sort by Added Time</option>
          </select>
        </div>
      </div>
      {cars.length === 0 ? (
        <p className="text-center text-gray-300">No cars available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cars.map((car) => {
            const isAvailable = car.availability === 'Available' || car.availability === true;
            const isBookable = user && isAvailable;
            const isBooking = bookingLoading[car._id];

            return (
              <div
                key={car._id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={car.image}
                  alt={car.carModel}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{car.carModel}</h3>
                  <p className="text-gray-300 mb-2">${car.dailyRentalPrice}/day</p>
                  <p className="text-gray-400 mb-2">
                    Availability:{' '}
                    {isAvailable ? (
                      <span className="text-green-500">Available</span>
                    ) : (
                      <span className="text-red-500">Not Available</span>
                    )}
                  </p>
                  <p className="text-gray-400 mb-2">Bookings: {car.bookingCount || 0}</p>
                  <p className="text-gray-400 mb-2">
                    Added on:{' '}
                    {car.addedTime
                      ? new Date(car.addedTime).toLocaleDateString()
                      : 'N/A'}
                  </p>
                  <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                    Details: {car.description || 'No description available'}
                  </p>
                  <button
                    onClick={() => handleBook(car)}
                    disabled={!isBookable || isBooking}
                    className={`inline-block w-full text-white px-4 py-2 rounded transition relative ${
                      isBookable && !isBooking
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {isBooking ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 text-white mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Booking...
                      </div>
                    ) : (
                      'Book'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cars;