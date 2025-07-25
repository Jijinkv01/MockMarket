import React from 'react'
import { FaSackDollar } from "react-icons/fa6";
import { useSelector } from 'react-redux';


const FundsComponent = ({active}) => {

    const balance = useSelector((state)=>state.balance.amount).toFixed(2)

  return (
    <div className='  mx-2  w-full'>
        <div className='flex items-center px-10 py-3 font-semibold underline '>
            <h1 className='text-lg'>{active}</h1>
        </div>
        <div className='m-5 border border-gray-300 rounded-t-2xl bg-gray-50'>
            <div className='p-5 flex items-center justify-center'>
                <div className='flex flex-col items-center gap-6'>
                    <div className='flex items-center gap-4'>
                        <FaSackDollar className='text-yellow-500 text-4xl' />
                        <h1 className='text-green-600 font-medium text-2xl'>Account Balance</h1>
                
                    </div>
                    <p className='text-xl font-bold border border-t-red-500 border-b-green-500 rounded-lg px-3'>$ {balance}</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default FundsComponent