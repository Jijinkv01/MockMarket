import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/user/LandingPage'
import Products from './pages/user/Products'
import Pricing from './pages/user/Pricing'
import Tutorials from './pages/user/Tutorials'
import Register from './pages/user/Register'
import Login from './pages/user/Login'
import Home from "./pages/user/Home"
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'


const App = () => {

  return (
    <Routes>
      <Route path='/' element={<PublicRoute> <LandingPage /> </PublicRoute>}  />
      <Route path='/products' element={<Products />}  />
      <Route path='/pricing' element={<Pricing />}  />
      <Route path='/tutorials' element={<Tutorials />}  />
      <Route path='/register' element={<PublicRoute> <Register /> </PublicRoute>}  />
      <Route path='/login' element={<PublicRoute> <Login /> </PublicRoute>}  />
      <Route path='/home' element={<PrivateRoute> <Home /> </PrivateRoute>}  />
      
      
      
      
    </Routes>
  )
}

export default App