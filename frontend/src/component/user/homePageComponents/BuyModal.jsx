import { useRef, useState } from "react"
import React from 'react'
import { motion } from "framer-motion"
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

const BuyModal = ({ type }) => {
  const constraintRef = useRef(null);
    const [isBuy, setIsBuy] = useState(type === "buy");
  return (

    <div ref={constraintRef}
      className="fixed inset-0 z-40 pointer-events-none">


      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={constraintRef}

        className="absolute top-25 left-100 w-[600px]  border-gray-300  shadow-lg bg-white z-50 pointer-events-auto">
        <div className={`${type === "buy" ? "bg-green-400" : "bg-red-400"} p-4`}>
          <div className="flex justify-between">
            <div>
              <p>Symbol</p>
              <p>Price</p>
            </div>
            <div>
              <button onClick={() => setIsBuy(!isBuy)} className="text-3xl">
                {isBuy ? (
                  <FaToggleOn className="text-white text-4xl" />
                ) : (
                  <FaToggleOff className="text-white text-4xl" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">Market Price</div>
      </motion.div>
    </div>




  )
}

export default BuyModal