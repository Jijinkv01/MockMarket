import React, { useState, useEffect } from 'react'
import axiosInstance from '../../../api/axiosInstance';
import { TiDelete } from "react-icons/ti";
import { toast } from 'react-toastify';



const OrdersComponent = ({ active }) => {
    const [activeTab, setActiveTab] = useState("Pending");
    const [pendingOrders, setPendingOrders] = useState([])
    const [executedOrders, setExecutedOrders] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [executedPage, setExecutedPage] = useState(1);
    const [executedTotalPages, setExecutedTotalPages] = useState(1);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get(`/getPendingOrders?page=${page}&limit=5`, { withCredentials: true });
                setPendingOrders(response.data.orders);
                setTotalPages(response.data.totalPages);
                console.log("response", response.data)
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };

        if (activeTab === "Pending") {
            fetchOrders();
        }
    }, [page]);

    useEffect(() => {
        const fetchExecutedOrders = async () => {
            try {
                const response = await axiosInstance.get(`/getExecutedOrders?page=${executedPage}&limit=5`, { withCredentials: true });
                setExecutedOrders(response.data.orders)
                setExecutedTotalPages(response.data.totalPages)
            } catch (error) {
                console.error("Failed to fetch executed orders:", error);
            }
        };

        if (activeTab === "Executed") {
            fetchExecutedOrders();
        }
    }, [activeTab, executedPage]);


    const handleDelete = async (orderId) => {
        try {
            await axiosInstance.put(`/cancelPendingOrder/${orderId}`, { withCredentials: true })
            toast.success("Order canceled!");
            setPendingOrders(prev => prev.filter(order => order._id !== orderId));
        } catch (error) {
            toast.error("Failed to cancel order.");
        }
    }



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
                    

                </div>
            </div>

            {/* pending order */}
            {activeTab === "Pending" && (
                <div className="mt-4 px-4">
                    <table className="min-w-full bg-white border border-gray-200 rounded-md shadow">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-left text-sm">
                                <th className="px-4 py-2 ">Symbol</th>
                                <th className="px-4 py-2 ">Quantity</th>
                                <th className="px-4 py-2 ">Price</th>
                                <th className="px-4 py-2 ">Buy/Sell</th>
                                <th className="px-4 py-2 ">Status</th>
                                <th className="px-4 py-2 ">orderId</th>
                                <th className="px-4 py-2 "></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-gray-500">
                                        No pending orders.
                                    </td>
                                </tr>
                            ) : (
                                pendingOrders.map((item, index) => (
                                    <tr key={index} className="text-sm text-gray-800 border border-gray-300">
                                        <td className="px-4 py-2 ">{item.symbol}</td>
                                        <td className="px-4 py-2 ">{item.quantity}</td>
                                        <td className="px-4 py-2 ">{item.price}</td>
                                        <td className="px-4 py-2 ">{item.orderSide}</td>
                                        <td className="px-4 py-2  text-yellow-600">{item.orderType}/{item.status}</td>
                                        <td className="px-4 py-2  ">{item.orderId.slice(0, 6)}</td>
                                        <td>
                                            <button onClick={() => handleDelete(item._id)} className='rounded-lg text-lg p-1 cursor-pointer hover:bg-red-500'>
                                                <TiDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <div className="flex justify-center items-center gap-4 mt-4">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <span className="text-sm font-medium">
                            Page {page} of {totalPages}
                        </span>

                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* executed order */}
            {activeTab === "Executed" && (
                <div className="mt-4 px-4">
                    <table className="min-w-full bg-white border border-gray-200 rounded-md shadow">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-left text-sm">
                                <th className="px-4 py-2 ">Symbol</th>
                                <th className="px-4 py-2 ">Quantity</th>
                                <th className="px-4 py-2 ">Price</th>
                                <th className="px-4 py-2 ">Buy/Sell</th>
                                <th className="px-4 py-2 ">Status</th>
                                <th className="px-4 py-2 ">orderId</th>

                            </tr>
                        </thead>
                        <tbody>
                            {executedOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-gray-500">
                                        No pending orders.
                                    </td>
                                </tr>
                            ) : (executedOrders.map((item, index) => (
                                <tr key={index} className="text-sm text-gray-800 border border-gray-300">
                                    <td className="px-4 py-2 ">{item.symbol}</td>
                                    <td className="px-4 py-2 ">{item.quantity}</td>
                                    <td className="px-4 py-2 ">{item.price}</td>
                                    <td className="px-4 py-2 ">{item.orderSide}</td>
                                    <td className="px-4 py-2  text-green-600">{item.orderType}/{item.status}</td>
                                    <td className="px-4 py-2  ">{item.orderId.slice(0, 6)}</td>


                                </tr>
                            ))
                            )}
                        </tbody>
                    </table>
                    <div className="flex justify-center items-center gap-4 mt-4">
                        <button
                            onClick={() => setExecutedPage((prev) => Math.max(prev - 1, 1))}
                            disabled={executedPage === 1}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <span className="text-sm font-medium">
                            Page {executedPage} of {executedTotalPages}
                        </span>

                        <button
                            onClick={() => setExecutedPage((prev) => Math.min(prev + 1, executedTotalPages))}
                            disabled={executedPage === executedTotalPages}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}


        </div>
    )
}

export default OrdersComponent