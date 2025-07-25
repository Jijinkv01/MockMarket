import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axiosInstance from "../../../api/axiosInstance"
import { useSelector } from 'react-redux';

const InvestmentComponent = () => {
    const [investment, setInvestment] = useState("")
    const [currentValue, setCurrentValue] = useState("")
     const grossPL = useSelector(state => state.profitLoss.grossPL);

    useEffect(() => {
    const fetchInvestment = async () => {
      try {
        const res = await axiosInstance.get('/totalInvestment', {withCredentials:true})
        setInvestment(res.data.totalInvestment.toFixed(2))
      } catch (error) {
        console.error('Failed to fetch investment amount:', error)
      }
    }
    fetchInvestment()
  }, [])

   useEffect(() => {
        if (investment !== "") {
            const total = Number(investment) + Number(grossPL)
            setCurrentValue(total.toFixed(2))
        }
    }, [investment, grossPL])


  return (
    <div>
        <div className='m-5 border border-gray-300 rounded-t-2xl bg-gray-50'>
            <div className='p-5'>
                <div>
                    <h1>Portfolio Value</h1>
                </div>
                <div className='flex justify-between py-5'>
                    <div className='flex flex-col gap-2'>
                    <p className='text-xs text-blue-700 font-semibold'>Investment</p>
                    <p>$ {investment}</p>
                    </div>
                   <div className='flex flex-col gap-2'>
                    <p className='text-xs text-blue-700 font-semibold'>Current Value</p>
                    <p>$ {currentValue}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                    <p className='text-xs text-blue-700 font-semibold'>Overall Profits / Loss</p>
                    <p className={`${grossPL >= 0 ? "text-green-600" : "text-red-600"}`}>$ {Number(grossPL).toFixed(2)}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default InvestmentComponent