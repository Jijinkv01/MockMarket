import React, { useState } from 'react'
import ProfileDropdown from './ProfileDropdown';


const NavbarHomepage = ({active, setActive}) => {
    // const [active, setActive] = useState('Dashboard'); // default active tab

    const navItems = ['Dashboard', 'Orders', 'Portfolio', 'Funds'];
    return (
        <div className='  flex justify-between items-center  border-b-2 border-b-gray-200 ' >
            <div className='border-r-2 border-r-gray-200 flex gap-5 w-90 p-1'>
                <div className=''>
                    <h3>Nifty 50</h3>
                    <p className='text-sm'>25095.50-54.35 (-0.22%)</p>
                </div>
                <div className=''>
                    <h3>Nifty Bank</h3>
                    <p className='text-sm'>56799.8545.15 (0.08%)</p>
                </div>
            </div>
            <div className='flex gap-10 px-5 items-center justify-center '>
                <h1 className="text-2xl font-bold text-blue-600 tracking-wide text-shadow-md cursor-pointer">Mok Market</h1>
                {navItems.map((item) => (
                    <div key={item} onClick={() => setActive(item)}
                        className={`cursor-pointer transition-all duration-300 
                        border-b-2 
            ${active === item ? 'border-red-600' : 'border-transparent'} 
            hover:border-red-600
          `} > <p className='text-sm'>{item}</p></div>
                ))}
                {/* <div className='hover:border-b-2 border-b-transparent  hover:border-red-600 w-15 cursor-pointer transition-all duration-400 '><p >Home</p></div>
                <div><p>Orders</p></div>
                <div><p>Portfolio</p></div>
                <div><p>Funds</p></div> */}
            </div>

            <ProfileDropdown />

        </div>
    )
}

export default NavbarHomepage