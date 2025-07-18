import React from 'react'
import { CiSearch } from "react-icons/ci";

const Watchlist = () => {
  return (
    <div className='px-'>
        <div className='border-r-2 border-r-gray-200 w-90 py-1 h-screen overflow-y-auto'>
            <div className=' flex items-center justify-center font-bold text-gray-600'><p>Watchlist</p></div>
            <div className='flex items-center border border-gray-300 h-8 rounded-lg'>
                <CiSearch />
                <input type="text" placeholder='Search for Stocks' className='w-full px-5  border-none outline-none text-sm' />
            </div>
            <div className='border-b border-gray-300 px-3 py-1 '>
                <div className='flex justify-between  '>
                    <h1>ACC</h1>
                    <h1>2355</h1>
                </div>
                <div className='flex justify-between text-[12px] py-1 text-gray-400 '>
                    <p>BSE</p>
                    <p>2355</p>
                </div>

            </div>
            <div className='border-b border-gray-300 px-3 py-1 '>
                <div className='flex justify-between  '>
                    <h1>SUNPHARMA</h1>
                    <h1>2355</h1>
                </div>
                <div className='flex justify-between text-[12px] py-1 text-gray-400 '>
                    <p>BSE</p>
                    <p>2355</p>
                </div>

            </div>
            <div className='border-b border-gray-300 px-3 py-1 '>
                <div className='flex justify-between  '>
                    <h1>POWERGRID</h1>
                    <h1>2355</h1>
                </div>
                <div className='flex justify-between text-[12px] py-1 text-gray-400 '>
                    <p>BSE</p>
                    <p>2355</p>
                </div>

            </div>
            <div className='border-b border-gray-300 px-3 py-1 '>
                <div className='flex justify-between  '>
                    <h1>POWERGRID</h1>
                    <h1>2355</h1>
                </div>
                <div className='flex justify-between text-[12px] py-1 text-gray-400 '>
                    <p>BSE</p>
                    <p>2355</p>
                </div>

            </div>
            <div className='border-b border-gray-300 px-3 py-1 '>
                <div className='flex justify-between  '>
                    <h1>POWERGRID</h1>
                    <h1>2355</h1>
                </div>
                <div className='flex justify-between text-[12px] py-1 text-gray-400 '>
                    <p>BSE</p>
                    <p>2355</p>
                </div>

            </div>
            
            
            
            
            
        </div>
    </div>
  )
}

export default Watchlist