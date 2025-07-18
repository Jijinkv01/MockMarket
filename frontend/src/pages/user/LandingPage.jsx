import React from 'react'
import NavbarLandingPage from '../../component/user/NavbarLandingPage'
import Footer from '../../component/user/Footer'
import LandingPageBody from '../../component/user/LandingPageBody'
import TikerTap from "../../component/user/TikerTap"
import LandingPageBody2 from '../../component/user/LandingPageBody2'
import LandingPageBody3 from '../../component/user/LandingPageBody3'

const LandingPage = () => {
  return (
     <div className="flex flex-col min-h-screen">
      <NavbarLandingPage />
      <div className="flex-grow">
        
        <TikerTap />
        <LandingPageBody />
        <LandingPageBody2 />
        <LandingPageBody3 />

        

      </div>
      <Footer />
    </div>
  )
}

export default LandingPage