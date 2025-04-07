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
