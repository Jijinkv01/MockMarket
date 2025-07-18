import React from 'react'
import NavbarLandingPage from '../../component/user/NavbarLandingPage'
import Footer from '../../component/user/Footer'


const tutorialData = [
    {title:"What is Stock Market & How Does It Work? Introduction & Basics of Share Market Malayalam",
        src:"https://www.youtube.com/embed/QlUS5mUSHjo?si=98GXpGOSsjmhd3t7"
    },
    {title:"What is Sensex & NIFTY? What is Index? Introduction & Basics of Share Market Malayalam",
       src: "https://www.youtube.com/embed/_SiyBTzoAZE?si=Eggl5ccR7hzBH5Ut"
    },
    {title:"What is a Demat & Trading & Savings Account? 3-in-1 Account | Learn Share Market Malayalam",
       src: "https://www.youtube.com/embed/aZnjiWHORZ0?si=E445XU-ZM-RIscT5"
    },
    {title:"Intraday Trading for Beginners Part 1! What? How? Benefits? | Learn Share Market Malayalam",
       src: "https://www.youtube.com/embed/Lqg6o6piBeU?si=RjyKfAepUmEr_dvG"
    },
    {title:"30 Must Know Stock Market Terms for Beginners | Learn Share Market Malayalam",
       src: "https://www.youtube.com/embed/ayR84Go77No?si=Juwh731JnAS9R1rP"
    },
    {title:"How to Select Stocks for Intraday Trading? Perfect Stock Selection Strategy",
       src: "https://www.youtube.com/embed/1pADqTHncxk?si=cl30kPsEVV9nVpyX"
    },
    {title:"How to Place Intraday Orders? All Order Types Explained | BO, CO, OCO, Stop Loss, Market, Limit",
       src: "https://www.youtube.com/embed/rpFKB2Tp6jU?si=EKjqiC3yd9QRo6MG"
    },
    {title:"How to Place Intraday Orders? All Order Types Explained | BO, CO, OCO, Stop Loss, Market, Limit",
       src: "https://www.youtube.com/embed/rpFKB2Tp6jU?si=EKjqiC3yd9QRo6MG"
    },
]


const Tutorials = () => {
  return (
    <>
    <NavbarLandingPage />

    <div className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Tutorials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tutorialData.map((card, index) => (
          <div
      key={index}
      className="bg-gray-100 rounded overflow-hidden shadow-md flex flex-col"
    >
      <div className="aspect-video w-full">
        <iframe
          src={card.src}
          title={`tutorial-${index}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <p className=" text-sm font-medium text-black py-2 px-2 bg-white">
        {card.title}
      </p>
    </div>
          
        ))}
      </div>
    </div>

    <Footer />

        
    </>
  )
}

export default Tutorials