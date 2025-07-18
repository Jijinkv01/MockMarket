import React from 'react'
import { useState,useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { io } from 'socket.io-client';
import axiosInstance from '../../../api/axiosInstance';
import { MdDelete } from "react-icons/md";



const Watchlist = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [socket, setSocket] = useState(null);
  const [stockData, setStockData] = useState({});
  console.log("stock data", stockData)

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL);
    setSocket(newSocket);

    newSocket.on('stockUpdate', (update) => {
      setStockData(prev => ({
        ...prev,
        [update.symbol]: update.data
      }));
    });

    return () => newSocket.close();
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await axiosInstance.get(`/api/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const addToWatchlist = (symbol) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol]);
      setResults([])
      setQuery("")
      // Subscribe to updates via WebSocket
      socket.emit('subscribe', symbol);
    }
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist(watchlist.filter(item => item !== symbol));
    socket.emit('unsubscribe', symbol);
  };


  return (
    <div className=''>
      <div className='border-r-2 border-r-gray-200 w-90 py-1 h-screen overflow-y-auto'>
        <div className=' flex items-center justify-center text-2xl font-bold text-gray-600 '><p>Watchlist</p></div>
        <div className='flex items-center border border-gray-300 h-10 rounded-lg  mx-2'>
          <CiSearch />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text" placeholder='Search for Stocks' className='w-full px-5  border-none outline-none text-sm' />
            <button className=' bg-gray-300 rounded-2xl p-1 cursor-pointer hover:bg-blue-500 hover:text-white ' onClick={handleSearch} >Search</button>
        </div>


        <div>
          {results.map((stock) => (
          <div key={stock.displaySymbol} className="stock-result p-2 flex justify-between">
            <span>{stock.displaySymbol} - {stock.description}</span>
            <div className=''>
              <button className='bg-blue-500 rounded-full w-10 cursor-pointer text-white hover:bg-blue-700' onClick={() => addToWatchlist(stock.displaySymbol)}>Add</button>
            </div>
          </div>
        ))}
        </div>

        <div className='px-3 py-1 '>
          {watchlist.map((symbol) => (
            <div className='border-b border-b-gray-400' key={symbol}>
              <div className='flex justify-between  '>
            <h1>{symbol}</h1>
            <h1>${stockData[symbol]?.c ?? '—'}</h1>
          </div>
          <div className='flex justify-between items-center text-[12px] py-1 text-gray-400 '>
            <p>BSE</p>
            <div className='flex gap-6 justify-center items-center'>
              <MdDelete className='  text-xl text-black rounded-md cursor-pointer hover:bg-red-500 hover:text-white'  onClick={() => removeFromWatchlist(symbol)} />
              <button className='text-lg border font-bold text-green-500 hover:bg-green-500 hover:text-white cursor-pointer rounded-md w-10' >B</button>
              <button className='text-lg border font-bold text-red-500 hover:bg-red-500 hover:text-white cursor-pointer rounded-md w-10' >S</button>
            </div>
              

            <p>2355</p>
          </div>
          
          {/* <button className='bg-red-500 text-white text-sm rounded-md' onClick={() => removeFromWatchlist(symbol)}>Remove</button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Watchlist