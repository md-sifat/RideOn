import { useState } from 'react';
import img1 from '../../assets/slider/img1.jpg'
import img2 from '../../assets/slider/img2.jpg'
import img3 from '../../assets/slider/img3.jpg'
import { Link } from 'react-router-dom';

const Slider = () => {
  const slides = [
    { image: img1, title: "Slide 1" },
    { image: img3, title: "Slide 2" },
    { image: img2, title: "Slide 3" },
    { image: img2, title: "Slide 4" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <div className="title my-3 text-4xl font-bold text-white">
        Welcome to Ride On
      </div>
      <Link to={'/cars'} className='cursor-pointer text-white text-lg border-2 px-3 py-2 font hover:bg-gray-700 hover:text-white' >Our Cars</Link>
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
            &#10094;
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            onClick={nextSlide}
          >
            &#10095;
          </button>
        </div>
      </div>
    </>

  );
};

export default Slider;
