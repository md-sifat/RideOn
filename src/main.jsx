import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import AuthProvider from './components/AuthProvider/AuthProvider.jsx'
import AddCars from './components/AddCars/AddCars.jsx'
import Private from './components/Private/Private.jsx'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import Slider from './components/Slider/Slider.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import MyCars from './components/MyCar/MyCar.jsx'
import UpdateCar from './components/UpdateCar/UpdateCar.jsx'
import Cars from './components/Cars/Cars.jsx'
import BookedCar from './components/BookedCar/BookedCar.jsx'


const router = createBrowserRouter(
  [
    {
      path : '/',
      element : <Home></Home>,
      children : [
        {
          index: true,
          element: <Slider></Slider>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path: '/addCar',
          element:   <Private> <AddCars>  </AddCars> </Private>
        },
        {
          path: '/about',
          element: <About></About>
        },
        {
          path: '/contact',
          element: <Contact></Contact> 
        },
        {
          path: '/mycars',
          element: <Private> <MyCars></MyCars> </Private> 
        },
        {
          path : "/update-car/:id",
          element : <Private> <UpdateCar></UpdateCar> </Private>
        },
        {
          path : "/cars",
          element : <Cars> </Cars>
        },
        {
          path : "/booking",
          element : <Private> <BookedCar></BookedCar> </Private>
        }
        

      ]
    }
  ]
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}> </RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
