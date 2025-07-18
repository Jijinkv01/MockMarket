import React from 'react'

const InvestmentComponent = () => {
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
                    <p>₹ 0.00</p>
                    </div>
                   <div className='flex flex-col gap-2'>
                    <p className='text-xs text-blue-700 font-semibold'>Current Value</p>
                    <p>₹ 0.00</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                    <p className='text-xs text-blue-700 font-semibold'>Overall Profits / Loss</p>
                    <p>₹ 0.00</p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default InvestmentComponent