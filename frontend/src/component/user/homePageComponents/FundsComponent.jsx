import React, { useState } from 'react'
import { FaSackDollar } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../../../api/axiosInstance';
import { setBalance } from '../../../store/balanceSlice';


const FundsComponent = ({ active }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [amount, setAmount] = useState("")

    const balance = useSelector((state) => state.balance.amount).toFixed(2)

    const handleReset = async() => {
        try {
            const newAmount = parseFloat(amount);
            const response = await axiosInstance.post("/fundReset", { amount:newAmount}, { withCredentials: true })
            dispatch(setBalance(newAmount));
            setAmount("")
            setIsModalOpen(false)
            alert("Balance reset successful")
        } catch (error) {
            console.error("Failed to reset balance:", error);
            alert("Failed to reset balance.");
        }
    }

    return (
        <div className='  mx-2  w-full'>
            <div className='flex items-center px-10 py-3 font-semibold underline '>
                <h1 className='text-lg'>{active}</h1>
            </div>
            <div className='m-5 border border-gray-300 rounded-t-2xl bg-gray-50'>
                <div className='p-5 flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center gap-6'>
                        <div className='flex items-center gap-4'>
                            <FaSackDollar className='text-yellow-500 text-4xl' />
                            <h1 className='text-green-600 font-medium text-2xl'>Account Balance</h1>

                        </div>
                        <p className='text-xl font-bold border border-t-red-500 border-b-green-500 rounded-lg px-3'>$ {balance}</p>
                    </div>
                    <div >
                        <button onClick={() => setIsModalOpen(true)} className='w-20 h-8 mt-5 bg-blue-400 text-gray-100 rounded-lg cursor-pointer'>Reset</button>
                    </div>

                </div>
            </div>
            {/* Modal */}
            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-80'>
                        <h2 className='text-lg font-semibold mb-4'>Enter New Balance</h2>
                        <input
                            type='number'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className='border border-gray-300 rounded px-3 py-2 w-full mb-4'
                            placeholder='Enter amount'
                        />
                        <div className='flex justify-end gap-2'>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className='bg-gray-300 text-gray-800 px-4 py-2 rounded cursor-pointer'

                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReset}
                                className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FundsComponent