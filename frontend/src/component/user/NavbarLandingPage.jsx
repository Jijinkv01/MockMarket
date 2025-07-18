import React from 'react'
import logo from "../../assets/Mok-market.png"
import { Link } from 'react-router-dom'

const NavbarLandingPage = () => {
  return (
    <div>
        <nav className="w-full flex items-center justify-between px-6 py-4 shadow-sm bg-white">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src={logo} // Replace with your logo path
          alt="Logo"
          className="h-15 w-20"
        />
        <Link to={"/"}><span className="text-2xl font-bold text-blue-600 tracking-wide text-shadow-md cursor-pointer">Mok Market</span></Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 text-gray-600 text-lg font-medium ">
        <Link className='hover:text-blue-600' to={"/about"}>About</Link>
        <Link className='hover:text-blue-600' to={"/products"}>Products</Link>
        <Link className='hover:text-blue-600' to={"/pricing"}>Pricing</Link>
        <Link className='hover:text-blue-600' to={"/tutorials"}>Tutorials</Link>
        <Link className='hover:text-blue-600' to={"/login"}>Login</Link>
      </div>

      {/* Hamburger Menu */}
      <div className="md:hidden">
        <button className="text-gray-700 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
    </div>
  )
}

export default NavbarLandingPage