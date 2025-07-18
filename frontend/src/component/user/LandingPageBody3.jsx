import React from 'react'
import {motion} from "framer-motion"
import LandingPageBody3Image from "../../assets/landingPageBody-3.jpg"
import { Link } from 'react-router-dom'

const LandingPageBody3 = () => {
    return (
        <motion.div
    initial={{opacity:0, y:150}}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
    transition={{duration:.7, delay:.2}}
     className="w-full  flex flex-col lg:flex-row items-center justify-between px-10  border-b-2 border-b-gray-200" >
            <div className="max-w-xl mb-10 lg:mb-0 ">
                <h1 className="text-4xl lg:text-5xl  font-extrabold text-black leading-tight mb-4 ">
                    Start Your Journey ! 
                </h1>
                <p className='text-lg font-bold text-gray-600'>Open an account and bring your investment ideas </p>
                <p className='text-lg font-bold text-gray-600'>to life-risk-free and hands-on.</p>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 flex justify-center p-10">
                <img
                    src={LandingPageBody3Image} // Replace this with your actual image path
                    alt="Mobile Trading App"
                    className="w-full max-w-sm object-contain  rounded-4xl p-2"
                />
            </div>









            {/* <div className='flex  p-10 border-gray-200'>
                    <div className='w-1/2   flex  items-center '>
                    <div className='  p-15 flex flex-col gap-2'>
                            <h1 className='text-4xl font-bold'>Start Your Journey!</h1>
                            <p>Open an account and bring your investment ideas </p>
                            <p>to life-risk-free and hands-on.</p>
                    </div>
                    

                </div>
                <div className='w-1/2 '>
                    <div>
                        <img src={LandingPageRight} alt=""
                            className="w-full max-w-sm object-contain border"
                        />
                    </div>

                </div>
                </div> */}

        </motion.div>
    )
}

export default LandingPageBody3