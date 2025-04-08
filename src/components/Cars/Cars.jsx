import { useContext, useEffect, useState } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cars = () => {
  const { user } = useContext(authContext);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cars and bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all cars
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
    }
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
      <h2 className="text-3xl font-bold text-center text-white mb-12">Available Cars</h2>
      {cars.length === 0 ? (
        <p className="text-center text-gray-300">No cars available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cars.map((car) => {
            const isAvailable = car.availability === 'Available' || car.availability === true;
            const isBooked = 0;
            const isBookable = user && isAvailable;

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
                  <p className="text-gray-400 mb-4">Bookings: {car.bookingCount || 0}</p>
                  <button
                    onClick={() => handleBook(car)}
                    disabled={!isBookable}
                    className={`inline-block w-full text-white px-4 py-2 rounded transition ${
                      isBookable
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {isBooked ? 'Already Booked' : 'Book'}
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