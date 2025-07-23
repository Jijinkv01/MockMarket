import { useRef, useState } from "react"
import React from 'react'
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import axiosInstance from "../../../api/axiosInstance"
import { toast } from "react-toastify"


const BuyModal = ({ type, symbol, onClose }) => {
  const constraintRef = useRef(null);
  const [isBuy, setIsBuy] = useState(type === "buy");
  const [orderType, setOrderType] = useState("limit");
  const [quantity, setQuantity] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [priceError, setPriceError] = useState("");
  const [qtyError, setQtyError] = useState("");


  const stockData = useSelector(state => state.stocks.stockData)
  const currentPrice = stockData[symbol]?.c.toFixed(2);
  // console.log(currentPrice)


  // close modal
  const handleClose = () => {
    onClose()
  }
  const handleOrderType = (type) => {
    setOrderType(type);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault()


    const marketPrice = Number(stockData[symbol]?.c);
    const enteredPrice = Number(priceInput);
    const enteredQuantity = Number(quantity);
    console.log("marketPrice", marketPrice)
    console.log("enteredPrice", enteredPrice)
    console.log("enteredQuantity", enteredQuantity)

    // Quantity validation
    if (!enteredQuantity || enteredQuantity <= 0) {
      setQtyError("Please enter quantity");
      return;
    }

    setQtyError("")
    // Price validations for limit orders
    if (orderType === "limit") {
      if (isBuy && (!enteredPrice || enteredPrice >= marketPrice)) {
        setPriceError("Price should < market price ");
        return;
      }

      if (!isBuy && (!enteredPrice || enteredPrice <= marketPrice)) {
        setPriceError("Price should > market price");
        return;
      }
    }

    try {
      const finalPrice = orderType === "market" ? marketPrice : enteredPrice;
      const totalAmount = (enteredQuantity * finalPrice)
      console.log("total Amount", totalAmount)

      const orderPayload = {
        symbol,
        quantity: enteredQuantity,
        price: finalPrice,
        orderType,
        totalAmount,
        orderSide: isBuy ? "buy" : "sell",
      };
      // console.log("Placing Order: ", orderPayload);

      const res = await axiosInstance.post("/placeOrder", orderPayload, { withCredentials: true });
      if (res.status === 201 || res.status === 200) {
        toast.success("Order placed successfully!");
        handleClose(); // close modal
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
    }
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
              <p className="text-lg font-medium text-gray-700">{symbol}</p>
              <p className="text-lg font-medium text-gray-700" >{currentPrice ?? "-"}</p>
            </div>
            {/* toogle btn */}
            <div >
              <button
                onClick={() => setIsBuy(!isBuy)}
                className={`w-14 h-8 bg-white rounded-full p-1 flex items-center transition duration-300`}
              >
                <div
                  className={`w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${isBuy
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
            <button
              onClick={() => handleOrderType("limit")}
              className={`border px-2 rounded-sm cursor-pointer ${orderType === "limit" ? "bg-blue-600 text-white" : "text-gray-700 border-gray-500"
                }`}>Limit</button>
            <button
              onClick={() => handleOrderType("market")}
              className={`border px-2 rounded-sm cursor-pointer ${orderType === "market" ? "bg-blue-600 text-white" : "text-gray-700 border-gray-500"
                }`}>Market</button>

          </div>
        </div>
        {/* quantity & price */}
        <div className="flex justify-center gap-10 p-5 text-gray-700">
          <div className="flex flex-col">
            <label htmlFor="">Quantity</label>
            <input onChange={(e) => setQuantity(e.target.value)} value={quantity} type="number" placeholder="Enter quantity" className="border p-2 rounded-md" />
            {qtyError && <p className="text-red-500 text-sm mt-1">{qtyError}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Price</label>
            <input onChange={(e) => setPriceInput(e.target.value)} value={priceInput}
              disabled={orderType === "market"} type="number" placeholder="Enter price" className={`border p-2 transition-all duration-300 ease-in-out rounded-md ${orderType === "market"
                ? "bg-gray-500 cursor-not-allowed opacity-60"
                : "bg-white"
                }`} />
            {priceError && <p className="text-red-500 text-sm mt-1">{priceError}</p>}

          </div>
        </div>
        {/* buy/sell & cancel btn */}
        <div>
          <div className="flex justify-end gap-5 p-5 text-gray-800" >
            {isBuy ? <button onClick={handlePlaceOrder} className="bg-green-400 hover:bg-green-500 py-2 px-10 rounded-lg cursor-pointer  ">Buy</button> :
              <button onClick={handlePlaceOrder} className="bg-red-400 hover:bg-red-500 py-2 px-10 rounded-lg cursor-pointer  ">Sell</button>}
            <button onClick={handleClose} className="bg-gray-200 py-2 px-7 rounded-lg cursor-pointer hover:bg-gray-300 border border-gray-500">Cancel</button>
          </div>
        </div>
      </motion.div>
    </div>




  )
}

export default BuyModal