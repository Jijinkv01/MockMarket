import React from 'react'


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-xl font-semibold">Mok Market</h1>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Mok Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer