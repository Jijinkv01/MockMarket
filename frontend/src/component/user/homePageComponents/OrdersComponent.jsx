import React, { useState } from 'react'


const OrdersComponent = ({ active }) => {
    const [activeTab, setActiveTab] = useState("Pending");
    return (
        <div className='  mx-2  w-full'>
            <div className='flex items-center px-10 py-3 font-semibold underline '>
                <h1 className='text-lg'>{active}</h1>
            </div>
            <div className='py-1 '>
                <div className='flex gap-2 text-white px-2 '>
                    <button onClick={() => setActiveTab("Pending")}

                        className={`px-3  rounded-lg cursor-pointer transition-all duration-300 text-sm 
          ${activeTab === "Pending"
                                ? 'bg-blue-600 text-white'         // active style
                                : 'bg-gray-200 text-gray-600'      // inactive style
                            }`}>Pending</button>

                    <button onClick={() => setActiveTab("Executed")}

                        className={`px-3  rounded-lg cursor-pointer transition-all duration-300 text-sm
          ${activeTab === "Executed"
                                ? 'bg-blue-600 text-white'         // active style
                                : 'bg-gray-200 text-gray-600'      // inactive style
                            }`}>Executed</button>
                    <button onClick={() => setActiveTab("Trade Book")}

                        className={`px-3 py-  rounded-lg cursor-pointer transition-all duration-300 text-sm
          ${activeTab === "Trade Book"
                                ? 'bg-blue-600 text-white'         // active style
                                : 'bg-gray-200 text-gray-600'      // inactive style
                            }`}>Trade Book</button>

                </div>
            </div>
        </div>
    )
}

export default OrdersComponent