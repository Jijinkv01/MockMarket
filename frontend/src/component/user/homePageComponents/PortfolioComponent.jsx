import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { setGrossPL } from '../../../store/profitLossSlice '


const PortfolioComponent = ({ active }) => {
    const [activeTab, setActiveTab] = useState("Holdings");
    const [holdings, setHoldings] = useState([]);
    const dispatch = useDispatch()

    const stockData = useSelector((state) => state.stocks.stockData);
   


    useEffect(() => {
  if (holdings.length && Object.keys(stockData).length) {
    let gross = 0;
    holdings.forEach(item => {
      const ltp = stockData[item.symbol]?.c || 0;
      const profitLoss = (ltp - item.avgPrice) * item.quantity;
      gross += profitLoss;
    });

    dispatch(setGrossPL(Number(gross.toFixed(2))));
  }
}, [holdings, stockData]);
    



    useEffect(() => {
        const fetchHoldings = async () => {
            try {
                const response = await axiosInstance.get("/getHoldings", { withCredentials: true });
                setHoldings(response.data);
            } catch (err) {
                console.error("Error fetching holdings", err);
            }
        };

        if (activeTab === "Holdings") {
            fetchHoldings();
        }
    }, [activeTab]);


    return (
        <div className='  mx-2  w-full'>
            <div className='flex items-center px-10 py-3 font-semibold underline '>
                <h1 className='text-lg'>{active}</h1>
            </div>
            <div className='py-1 '>
                <div className='flex gap-2 text-white px-2 '>
                    <button onClick={() => setActiveTab("Holdings")}

                        className={`px-3  rounded-lg cursor-pointer transition-all duration-300 text-sm 
              ${activeTab === "Holdings"
                                ? 'bg-blue-600 text-white'         // active style
                                : 'bg-gray-200 text-gray-600'      // inactive style
                            }`}>Holdings</button>

                    <button onClick={() => setActiveTab("Position")}

                        className={`px-3  rounded-lg cursor-pointer transition-all duration-300 text-sm
              ${activeTab === "Position"
                                ? 'bg-blue-600 text-white'         // active style
                                : 'bg-gray-200 text-gray-600'      // inactive style
                            }`}>Position</button>


                </div>
            </div>

            {activeTab === "Holdings" && (
                <div className='mt-4 px-4'>
                    <table className='min-w-full bg-white border border-gray-200 rounded-md shadow text-sm'>
                        <thead>
                            <tr className='bg-gray-100 text-gray-700 text-left'>
                                <th className='px-4 py-2'>Symbol</th>
                                <th className='px-4 py-2'>Quantity</th>
                                <th className='px-4 py-2'>Avg.Price</th>
                                <th className='px-4 py-2'>LTP</th>
                                <th className='px-4 py-2'>P/L</th>
                            </tr>
                        </thead>
                        <tbody>
                            {holdings.length > 0 ? holdings.map((item, index) => (
                                <tr key={index} className='border-t border-gray-300'>
                                    <td className='px-4 py-2'>{item.symbol}</td>
                                    <td className='px-4 py-2'>{item.quantity}</td>
                                    <td className='px-4 py-2'>${item.avgPrice.toFixed(2)}</td>
                                    <td className='px-4 py-2'> ${(stockData[item.symbol]?.c || 0).toFixed(2)}</td>
                                    <td className={`px-4 py-2 ${((stockData[item.symbol]?.c || 0) - item.avgPrice) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        ${(((stockData[item.symbol]?.c || 0) - item.avgPrice) * item.quantity).toFixed(2)}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-sm text-gray-500">
                                        No Holdings.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    )
}

export default PortfolioComponent