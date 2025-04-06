import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import AuthProvider from './components/AuthProvider/AuthProvider.jsx'

const router = createBrowserRouter(
  [
    {
      path : '/',
      element : <Home></Home>
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
