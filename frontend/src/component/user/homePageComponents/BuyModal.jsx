import { useRef, useState } from "react"
import React from 'react'
import { motion } from "framer-motion"
import { useSelector } from "react-redux"


const BuyModal = ({ type, symbol, onClose }) => {
  const constraintRef = useRef(null);
    const [isBuy, setIsBuy] = useState(type === "buy");
    
    const stockData = useSelector(state => state.stocks.stockData)
    const currentPrice = stockData[symbol]?.c.toFixed(2);
    // console.log(currentPrice)


    // close modal
    const handleClose = () => {
      onClose()
    }


  return (

    <div 
      ref={constraintRef}
      className="absolute top-0 left-0 w-full h-screen pointer-events-none">
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={constraintRef}
        className="absolute top-25 left-100 w-[600px]  border-gray-300  shadow-lg bg-white z-50 pointer-events-auto">

          {/* header with background color  */}
        <div className={`${isBuy ? "bg-green-400" : "bg-red-400"} p-4`}>
          <div className="flex justify-between cursor-move ">
            <div className="text-gray-800">
              <p>{symbol}</p>
              <p>{currentPrice ?? "-"}</p>
            </div>
            {/* toogle btn */}
            <div >
              <button
                onClick={() => setIsBuy(!isBuy)}
                className={`w-14 h-8 bg-white rounded-full p-1 flex items-center transition duration-300`}
              >
                <div
                  className={`w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
                    isBuy
                      ? "bg-green-500 translate-x-6"
                      : "bg-red-500 translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* limit price / market price */}
        <div>
          <div className="flex justify-center gap-10 p-5 ">
            <button className="border border-gray-500 px-2 rounded-sm cursor-pointer text-gray-700">Limit</button>
            <button className="border border-gray-500 px-2 rounded-sm cursor-pointer text-gray-700">Market</button>
        
          </div>
        </div>
        {/* quantity & price */}
        <div className="flex justify-center gap-10 p-5 text-gray-700">
          <div className="flex flex-col">
            <label htmlFor="">Quantity</label>
            <input type="number" className="border p-2" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Price</label>
            <input type="number" className="border p-2"/>
          </div>
        </div>
        {/* buy/sell & cancel btn */}
        <div>
          <div className="flex justify-end gap-5 p-5 text-gray-800" >
            {isBuy ? <button className="bg-green-400 hover:bg-green-500 py-2 px-10 rounded-lg cursor-pointer  ">Buy</button> :
            <button className="bg-red-400 hover:bg-red-500 py-2 px-10 rounded-lg cursor-pointer  ">Sell</button>}
            <button onClick={handleClose}  className="bg-gray-200 py-2 px-7 rounded-lg cursor-pointer hover:bg-gray-300 border border-gray-500">Cancel</button>
          </div>
        </div>
      </motion.div>
    </div>




  )
}

export default BuyModal