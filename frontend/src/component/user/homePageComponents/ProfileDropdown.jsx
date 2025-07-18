import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { logout } from '../../../store/userSlice';



const ProfileDropdown = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const user = useSelector((state) => state.user)
    console.log("user ", user)

    const toggleDropdown = () => setIsOpen(!isOpen);

    // const handleBlur = (e) => {
    //     // Close dropdown if click is outside
    //     if (!dropdownRef.current.contains(e.relatedTarget)) {
    //         setIsOpen(false);
    //     }
    // };

    const handleLogout = async () => {
        console.log("log out log out hahaha")
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
        <div className="relative inline-block text-left"  ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-medium "
            >

                {user?.user?.email ? user.user.email.slice(0, 2).toUpperCase() : "NA"}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                    <div className="py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer">
                        Settings
                    </div>
                    <div onClick={handleLogout} className="py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer">
                        Sign out
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown