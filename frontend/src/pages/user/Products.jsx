import React from 'react'
import NavbarLandingPage from '../../component/user/NavbarLandingPage'
import Footer from '../../component/user/Footer';
import { IoIosConstruct } from "react-icons/io";
import { Link } from 'react-router-dom';


const Products = () => {
  return (
    <>
    <NavbarLandingPage />

    <div className="flex flex-col items-center justify-center h-[80vh] px-4 text-center">
      {/* Optional Icon */}
      <IoIosConstruct size={80} className="text-yellow-500 mb-6" />

      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Products Page Under Construction
      </h1>
      <p className="text-gray-600 max-w-xl mb-6">
        We’re working hard to bring you the best pricing options tailored just for you.
        Stay tuned — exciting things are coming soon!
      </p>
      <Link to={"/"}><button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-2 rounded-full shadow-md transition cursor-pointer">
        Back to Home
      </button></Link>
    </div>

    <Footer />
    </>

    
  )
}

export default Products