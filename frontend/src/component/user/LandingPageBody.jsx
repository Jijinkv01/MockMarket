import React from 'react'
import LandingPageRight from "../../assets/landingPageBody.webp"
import {motion} from "framer-motion"
import { BiCandles } from "react-icons/bi";
import { Link } from 'react-router-dom';



const LandingPageBody = () => {
  return (
    <motion.div
    initial={{opacity:0, y:150}}
    animate={{opacity:1, y:0}}
    transition={{duration:.7, delay:.5}}
     className="w-full  flex flex-col lg:flex-row items-center justify-between px-10 py-8  border-b-2 border-b-gray-200">
      {/* Left Content */}
      <div className="max-w-xl mb-10 lg:mb-0">
        <h1 className="text-4xl lg:text-5xl  font-bold text-black leading-tight mb-4">
          Paper Trading <br /> 
        </h1>
        <p className="uppercase tracking-widest text-gray-600 text-sm mb-6">
          learn trading, do trade <br /> Practice Makes Perfect
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
          <div className="flex items-center">
            <span className="text-blue-600 text-3xl font-bold mr-2">₹0</span>
            <p className="text-gray-700 text-sm">Charges for Intraday</p>
          </div>
          <div className="flex items-center">
            <span className="text-blue-600 text-3xl font-bold mr-2">₹0</span>
            <p className="text-gray-700 text-sm">
              Charges for Delivery
            </p>
          </div>
        </div>

        {/* Input and Button */}
        <div className="flex items-center gap-3">
          
          <Link to={"/login"}><button className="bg-blue-600 hover:bg-blue-900 text-white font-semibold rounded-full px-6 py-2 cursor-pointer flex items-center justify-center gap-5 ">
            Start Practicing  <BiCandles  className='text-3xl'/>
          </button></Link>
          
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src={LandingPageRight} // Replace this with your actual image path
          alt="Mobile Trading App"
          className="w-full max-w-sm object-contain"
        />
      </div>
    </motion.div>
  )
}

export default LandingPageBody