import React from 'react'
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logout } from '../../store/userSlice';
import { setUser } from '../../store/userSlice';
import { setBalance } from "../../store/balanceSlice"

import NavbarHomepage from '../../component/user/homePageComponents/NavbarHomepage';
import Watchlist from '../../component/user/homePageComponents/Watchlist';
import DashboardComponent from '../../component/user/homePageComponents/DashboardComponent';
import OrdersComponent from '../../component/user/homePageComponents/OrdersComponent';
import FundsComponent from '../../component/user/homePageComponents/FundsComponent';
import BuyModal from '../../component/user/homePageComponents/BuyModal';



const Home = () => {
  const [active, setActive] = useState("Dashboard")
  const [showBuySellModal, setShowBuySellModal] = useState(null)



  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/home", { withCredentials: true });
        if (isMounted) {
          console.log("User received from backend:", res.data.user);
          dispatch(setUser(res.data.user));
          localStorage.setItem("user", JSON.stringify(res.data.user));
          const balanceRes = await axiosInstance.get("/balance", { withCredentials: true });
          dispatch(setBalance(balanceRes.data.balance));
        }

      } catch (err) {
        if (isMounted) {
          console.error("Auth failed:", err);
          navigate("/login");
        }
      }
    };
    checkAuth();
    return () => {
      isMounted = false; //  Prevents setState after logout
    };
  }, [dispatch, navigate]);


  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout", {}, { withCredentials: true })
      dispatch(logout())
      localStorage.removeItem("user");
      navigate("/login")
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <div className='p-2'>
      <NavbarHomepage active={active} setActive={setActive} />

      <div className='flex' >
        <Watchlist setShowBuySellModal={setShowBuySellModal}/>
        {active === "Dashboard" ? <DashboardComponent active={active} /> : ""}

        {active === "Orders" ? <OrdersComponent active={active} /> : ""}

        {active === "Funds" ? <FundsComponent active={active} /> : ""}
      </div>


       {showBuySellModal && <BuyModal type={showBuySellModal} onClose={() => setShowBuySellModal(null)} />}
      



    </div>
  )
}

export default Home