import { useContext, useEffect, useState } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const MyCars = () => {
  const { user } = useContext(authContext);
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return; // Don’t fetch if user isn’t logged in

    const fetchMyCars = async () => {
      try {
        const response = await fetch('https://ride-on-server.vercel.app/cars');
        const data = await response.json();
        // Filter cars by the logged-in user's email
        const userCars = data.filter((car) => car.userEmail === user.email);
        setMyCars(userCars);
        setLoading(false);
      } catch (err) {
        setError('Failed to load your cars. Please try again later.');
        setLoading(false);
        console.error('Error fetching cars:', err);
      }
    };

    fetchMyCars();
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Please Log In</h2>
        <p>You need to be logged in to view your cars.</p>
        <Link to="/login" className="text-blue-400 hover:underline">
          Go to Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center text-white py-16">Loading your cars...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400 py-16">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-white mb-12">My Cars</h2>
      {myCars.length === 0 ? (
        <p className="text-center text-gray-300">You haven’t added any cars yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myCars.map((car) => (
            <div
              key={car.vehicleRegNumber}
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
                  {car.availability ? (
                    <span className="text-green-500">Available</span>
                  ) : (
                    <span className="text-red-500">Booked</span>
                  )}
                </p>
                <p className="text-gray-400 mb-4">Bookings: {car.bookingCount}</p>
                <Link
                  to={`/update-car/${car._id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Update
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCars;