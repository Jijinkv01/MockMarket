import React from 'react'
import { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { io } from 'socket.io-client';
import axiosInstance from '../../../api/axiosInstance';
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import {
  setWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  updateStockData
} from "../../../store/stockSlice"



const Watchlist = ({ setShowBuySellModal }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [socket, setSocket] = useState(null);

 const dispatch = useDispatch();
 const watchlist = useSelector(state => state.stocks.watchlist);
  const stockData = useSelector(state => state.stocks.stockData);

  // const [stockData, setStockData] = useState({});
  // const [watchlist, setWatchlist] = useState([]);

  console.log("stock data ", stockData)

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axiosInstance.get("/api/watchlist")
        if (Array.isArray(res.data.watchlist)) {
           dispatch(setWatchlist(res.data.watchlist));
          console.log("avvaavava", res.data.watchlist)
          res.data.watchlist.forEach(symbol => {
            socket?.emit('subscribe', symbol);
          });
        } else {
          console.error("Watchlist format unexpected:", res.data);
        }
      } catch (error) {
        console.error('Failed to fetch watchlist:', error);
      }
    }
    if (socket) {
      fetchWatchlist();
    }
  }, [socket, dispatch])



  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL);
    setSocket(newSocket);

    newSocket.on('stockUpdate', (update) => {
       dispatch(updateStockData({ symbol: update.symbol, data: update.data }));
    });


    return () => newSocket.close();
  }, [dispatch]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await axiosInstance.get(`/api/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleAddToWatchlist  = async (symbol) => {
    if (watchlist.includes(symbol)) return;
    try {
      await axiosInstance.post('/api/watchlist', { symbol });
       dispatch(addToWatchlist(symbol));
      socket?.emit('subscribe', symbol);
      setQuery('');
      setResults([]);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }

    // if (!watchlist.includes(symbol)) {
    //   setWatchlist([...watchlist, symbol]);
    //   setResults([])
    //   setQuery("")
    //   // Subscribe to updates via WebSocket
    //   socket.emit('subscribe', symbol);
    // }
  };

  const removeFromWatchlist = async (symbol) => {
    try {
      const res = await axiosInstance.delete(`/api/watchlist/${symbol}`);

      dispatch(setWatchlist(res.data.watchlist));
      socket.emit('unsubscribe', symbol);

    } catch (error) {
      console.error("Delete error", error.message)
    }
    // setWatchlist(watchlist.filter(item => item !== symbol));
    // socket.emit('unsubscribe', symbol);
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
          {/* <button className=' bg-gray-300 rounded-2xl p-1 cursor-pointer hover:bg-blue-500 hover:text-white ' onClick={handleSearch} >Search</button> */}
          <button
            className="bg-gray-300 rounded-full px-4 py-1 text-sm font-medium cursor-pointer hover:bg-blue-500 hover:text-white transition-all"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>


        <div>
          {results.map((stock) => (
            <div key={stock.displaySymbol} onClick={() => handleAddToWatchlist(stock.displaySymbol)} className="stock-result p-2 flex justify-between border-b-2 border-b-gray-300 cursor-pointer hover:bg-gray-100">
              <span>{stock.displaySymbol} - {stock.description}</span>

            </div>
          ))}
        </div>

        <div className='px-3 py-1 '>
          {watchlist.map((symbol) => (
            <div className='border-b border-b-gray-400' key={symbol}>
              <div className='flex justify-between  '>
                <h1 className={`${stockData[symbol]?.d > 0 ? "text-green-400" : "text-red-400"}`} >{symbol}</h1>
                <h1 className={`${stockData[symbol]?.d > 0 ? "text-green-400" : "text-red-400"}`}>${stockData[symbol]?.c.toFixed(2) ?? '—'}</h1>
              </div>
              <div className='flex justify-between items-center text-[12px] py-1 text-gray-400 '>
                <p>NASDAQ</p>
                <div className='flex gap-6 justify-center items-center '>
                  <MdDelete className='  text-xl text-black rounded-md cursor-pointer hover:bg-red-500 hover:text-white' onClick={() => removeFromWatchlist(symbol)} />
                  <button onClick={() => setShowBuySellModal({type: "buy", symbol})} className='text-lg border font-bold text-green-500 hover:bg-green-500 hover:text-white cursor-pointer rounded-md w-10' >B</button>
                  <button onClick={() => setShowBuySellModal({type: "sell", symbol})} className='text-lg border font-bold text-red-500 hover:bg-red-500 hover:text-white cursor-pointer rounded-md w-10' >S</button>
                </div>


                <p>{stockData[symbol]?.d ?? '—'} ({stockData[symbol]?.dp ?? '—'})</p>
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