import React, { useState } from 'react'
import TradingComponent from './TradingComponent';
import InvestmentComponent from './InvestmentComponent';



const DashboardComponent = ({ active }) => {
    const [activeTab, setActiveTab] = useState("Investment");
    return (
        <div className=' mx-2  w-full'>
            <div className='flex items-center px-10 py-3 font-semibold underline '>
                <h1 className='text-lg'>{active}</h1>
            </div>
            <div className='py-1 '>
                <div className='flex gap-2 text-white px-5 '>
                    {/* <button onClick={() => setActiveTab("Trading")}

                        className={`px-3  rounded-lg cursor-pointer transition-all duration-300 text-sm 
          ${activeTab === "Trading"
                                ? 'bg-blue-600 text-white'         // active style
                                : 'bg-gray-200 text-gray-600'      // inactive style
                            }`}>Trading</button> */}
                    <button onClick={() => setActiveTab("Investment")}

                        className={`px-3  rounded-lg cursor-pointer transition-all duration-300 text-sm
          ${activeTab === "Investment"
                                ? 'bg-blue-600 text-white'         // active style
                                : 'bg-gray-200 text-gray-600'      // inactive style
                            }`}>Investment</button>
                </div>
            </div>
            <div>
                {activeTab === "Trading" ? <TradingComponent /> : <InvestmentComponent />}
            </div>



        </div>
    )
}

export default DashboardComponent