import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCar = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    carModel: '',
    dailyRentalPrice: '',
    availability: true,
    image: '',
    features: '',
    description: '',
    location: '',
  });

  // Fetch car details
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch('https://ride-on-server.vercel.app/cars');
        const data = await response.json();
        const selectedCar = data.find((c) => c._id === id);
        if (selectedCar) {
          setCar(selectedCar);
          setFormData({
            carModel: selectedCar.carModel,
            dailyRentalPrice: selectedCar.dailyRentalPrice,
            availability: selectedCar.availability,
            image: selectedCar.image,
            features: selectedCar.features,
            description: selectedCar.description,
            location: selectedCar.location,
          });
        }
        setLoading(false);
      } catch (err) {
        toast.error('Failed to load car details.');
        setLoading(false);
        console.error('Error fetching car:', err);
      }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://ride-on-server.vercel.app/cars/${id}`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success('Car updated successfully!');
        setTimeout(() => navigate('/mycars'), 1000); 
      } else {
        toast.error('Failed to update car.');
      }
    } catch (err) {
      toast.error('Error updating car.');
      console.error('Update error:', err);
    }
  };

  if (loading) {
    return <div className="text-center text-white py-16">Loading car details...</div>;
  }

  if (!car) {
    return <div className="text-center text-red-400 py-16">Car not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-900 min-h-screen">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center text-white mb-12">Update Car</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-white mb-2">Car Model</label>
          <input
            type="text"
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Daily Rental Price ($)</label>
          <input
            type="number"
            name="dailyRentalPrice"
            value={formData.dailyRentalPrice}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center text-white">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="mr-2"
            />
            Available
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Features</label>
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Car
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;