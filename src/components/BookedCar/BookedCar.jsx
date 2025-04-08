import { useContext, useEffect, useState } from 'react';
import { authContext } from '../AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookedCar = () => {
  const { user } = useContext(authContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('');

  // Fetch user bookings
  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const response = await fetch('https://ride-on-server.vercel.app/bookings');
        const data = await response.json();
        const userBookings = data.filter((booking) => booking.userEmail === user.email);
        console.log('Fetched bookings:', userBookings);
        setBookings(userBookings);
        setLoading(false);
      } catch (err) {
        setError('Failed to load your bookings. Please try again later.');
        setLoading(false);
        console.error('Error fetching bookings:', err);
      }
    };

    fetchBookings();
  }, [user]);

  const handleStatusUpdate = async (bookingId, carId, newStatus) => {
    try {
      // Update booking status
      const bookingResponse = await fetch(`https://ride-on-server.vercel.app/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        throw new Error(errorData.error || 'Failed to update booking status');
      }

      const updatedBooking = await bookingResponse.json();
      console.log('Updated booking:', updatedBooking);

      // If confirming, increment bookingCount in cars collection
      if (newStatus === 'confirmed') {
        // Fetch current car data
        const carResponse = await fetch(`https://ride-on-server.vercel.app/cars/${carId}`);
        if (!carResponse.ok) {
          throw new Error('Failed to fetch car data');
        }
        const carData = await carResponse.json();
        const newBookingCount = (carData.bookingCount || 0) + 1;

        const updateCarResponse = await fetch(`https://ride-on-server.vercel.app/cars/${carId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingCount: newBookingCount }),
        });

        if (!updateCarResponse.ok) {
          const carErrorData = await updateCarResponse.json();
          throw new Error(carErrorData.message || 'Failed to update car booking count');
        }

        const carUpdateResult = await updateCarResponse.json();
        console.log('Car update result:', carUpdateResult);

        if (!carUpdateResult.success) {
          throw new Error(carUpdateResult.message || 'Car update failed');
        }
      }

      // Update local state
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
      toast.success(`Booking ${newStatus} successfully!`);
    } catch (err) {
      toast.error(`Error updating booking: ${err.message}`);
      console.error('Status update error:', err);
    }
  };

  const handleSort = (option) => {
    setSortOption(option);
    let sortedBookings = [...bookings];

    if (option === 'price') {
      sortedBookings.sort((a, b) => Number(a.dailyRentalPrice) - Number(b.dailyRentalPrice));
    } else if (option === 'date') {
      sortedBookings.sort((a, b) => {
        const dateA = a.bookingDate ? new Date(a.bookingDate) : new Date(0);
        const dateB = b.bookingDate ? new Date(b.bookingDate) : new Date(0);
        return dateB - dateA; // Newest first
      });
    }

    console.log('Sorted bookings:', sortedBookings);
    setBookings(sortedBookings);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Please Log In</h2>
        <p>You need to be logged in to view your bookings.</p>
        <Link to="/login" className="text-blue-400 hover:underline">
          Go to Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center text-white py-16">Loading your bookings...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400 py-16">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-900 min-h-screen">
      <ToastContainer />
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold text-white">My Booked Cars</h2>
        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded-lg border border-gray-600 focus:outline-none"
          >
            <option value="">Sort By</option>
            <option value="price">Sort by Price</option>
            <option value="date">Sort by Booking Date</option>
          </select>
        </div>
      </div>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-300">You haven’t booked any cars yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={booking.image}
                alt={booking.carModel}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{booking.carModel}</h3>
                <p className="text-gray-300 mb-2">${booking.dailyRentalPrice}/day</p>
                <p className="text-gray-400 mb-2">
                  Status:{' '}
                  <span
                    className={
                      booking.status === 'confirmed'
                        ? 'text-green-500'
                        : booking.status === 'cancelled'
                        ? 'text-red-500'
                        : 'text-yellow-500'
                    }
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </p>
                <p className="text-gray-400 mb-4">
                  Booked on:{' '}
                  {booking.bookingDate
                    ? new Date(booking.bookingDate).toLocaleDateString()
                    : 'N/A'}
                </p>
                {booking.status === 'pending' && (
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleStatusUpdate(booking._id, booking.carId, 'confirmed')}
                      className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(booking._id, booking.carId, 'cancelled')}
                      className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedCar;