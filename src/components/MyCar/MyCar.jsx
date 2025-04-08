import { useContext, useEffect, useState } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyCars = () => {
  const { user } = useContext(authContext);
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchMyCars = async () => {
      try {
        const response = await fetch('https://ride-on-server.vercel.app/cars');
        const data = await response.json();
        const userCars = data.filter((car) => car.userEmail === user.email);
        console.log('Fetched cars:', userCars); 
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

  // Handle sorting
  const handleSort = (option) => {
    setSortOption(option);
    let sortedCars = [...myCars]; 

    if (option === 'price') {
      sortedCars.sort((a, b) => Number(a.dailyRentalPrice) - Number(b.dailyRentalPrice));
    } else if (option === 'date') {
      sortedCars.sort((a, b) => {
        const dateA = a.addedTime ? new Date(a.addedTime) : new Date(0); 
        const dateB = b.addedTime ? new Date(b.addedTime) : new Date(0);
        console.log(dateA);
        console.log(dateB);
        return dateB - dateA; 
      });
    }

    console.log('Sorted cars:', sortedCars); 
    setMyCars(sortedCars);
  };

  // Handle delete
  const handleDelete = async (carId) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;

    try {
      const response = await fetch(`https://ride-on-server.vercel.app/cars/${carId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMyCars(myCars.filter((car) => car._id !== carId));
        toast.success('Car deleted successfully!');
      } else {
        toast.error('Failed to delete car.');
      }
    } catch (err) {
      toast.error('Error deleting car.');
      console.error('Delete error:', err);
    }
  };

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
      <ToastContainer />
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold text-white">My Cars</h2>
        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded-lg border border-gray-600 focus:outline-none"
          >
            <option value="">Sort By</option>
            <option value="price">Sort by Price</option>
            <option value="date">Sort by Added Date</option>
          </select>
        </div>
      </div>
      {myCars.length === 0 ? (
        <p className="text-center text-gray-300">You haven’t added any cars yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {myCars.map((car) => (
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
                  {car.availability ? (
                    <span className="text-green-500">Available</span>
                  ) : (
                    <span className="text-red-500">Booked</span>
                  )}
                </p>
                <p className="text-gray-400 mb-4">Bookings: {car.bookingCount}</p>
                <div className="flex space-x-4">
                  <Link
                    to={`/update-car/${car._id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCars;