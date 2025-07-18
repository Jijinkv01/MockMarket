import { AiFillSafetyCertificate } from "react-icons/ai";
import { GiCash } from "react-icons/gi";
import { MdCandlestickChart } from "react-icons/md";
import {motion} from "framer-motion"
import React from 'react';

const LandingPageBody2 = () => {
    return (
        <motion.div
    initial={{opacity:0, y:150}}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
    transition={{duration:.7, delay:.2}}
     className='bg-gray-100 pb-5 border-b-2 border-gray-200'>

            <div className='p-10 flex flex-col items-center justify-center gap-5'>
                <h1 className='text-4xl font-bold'>Experience Mok Market Paper Trading Right Here!</h1>
                <h1 className='text-2xl font-bold text-blue-500'>Level Up Your Trading & Investment Skills  in a Risk-Free Environment</h1>
            </div>
            <div >
                <div className='flex py-5 px-10 gap-6  '>
                    <div className='w-1/3 flex flex-col justify-center items-center p-5  rounded-4xl  bg-white'>
                        <div className='flex flex-col  items-center p-5 gap-2'>
                            <AiFillSafetyCertificate className='text-5xl' />
                            <h1 className='text-2xl font-bold'>ZERO Risk</h1>
                            <div className='flex flex-col justify-center items-center pt-5 text-gray-600 font-medium'>
                                <p>Use our FREE trading simulator to</p>
                                <p>practice trading risk-free and</p>
                                <p>commission-free.</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/3 flex flex-col justify-center items-center p-5  rounded-4xl  bg-white'>
                        <div className='flex flex-col  items-center p-5 gap-2'>
                            <GiCash className='text-5xl' />
                            <h1 className='text-2xl font-bold'>Endless Virtual Funds</h1>
                            <div className='flex flex-col justify-center items-center pt-5 text-gray-600 font-medium'>
                                <p>Explore strategies and Test your </p>
                                <p>skills without running </p>
                                <p>out of funds.</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/3 flex flex-col justify-center items-center p-5  rounded-4xl  bg-white'>
                        <div className='flex flex-col  items-center p-5 gap-2'>
                            <MdCandlestickChart className='text-5xl' />
                            <h1 className='text-2xl font-bold'>Real-Time Data​</h1>
                            <div className='flex flex-col justify-center items-center pt-5 text-gray-600 font-medium'>
                                <p>Monitor real-time price action, </p>
                                <p>explore dynamic charts, and get </p>
                                <p>alerts when prices move.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </motion.div>
    )
}

export default LandingPageBody2