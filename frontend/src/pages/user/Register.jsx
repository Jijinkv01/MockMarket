import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginImage from "../../assets/Login-Image.png"
import { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { setUser } from '../../store/userSlice';


const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState({ message: "", id: 0 })

  const showError = (msg) => {
    setError({ message: msg, id: Date.now() }); // ensures a unique key each time
  };

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!email.trim()) return showError("Email is Required")
    if (!password) return showError("Password is Required")
    if (password.length < 6) return showError("Password length should morethan 6")
    if (password !== confirmPassword) return showError("Password donot match")
    showError("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    try {
      const res = await axiosInstance.post("/register", { email, password })
      console.log(email, password)
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(setUser(res.data.user));
        alert(res.data.message)
        navigate("/home")
      }
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || 'Something went wrong')
    }
  }






  return (
    <motion.div
      initial={{ x: -900 }}
      animate={{ x: 0 }}
      transition={{ duration: .5 }}
      className="min-h-screen flex flex-col md:flex-row bg-black text-white ">
      {/* Left Image Side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: .5 }}

        className="hidden md:flex md:w-1/2 items-center justify-center">
        <img src={loginImage} alt="Login Visual" className="max-h-[80%] max-w-[80%] object-contain rounded-2xl" />
      </motion.div>

      {/* Right Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 px-30">
        <div className="w-full max-w-md flex flex-col gap-6 ">
          <div className=' flex justify-center'>
            <button
              // onClick={onClick}
              className=" items-center justify-center border border-gray-300 rounded-full px-4 py-2 bg-white hover:bg-gray-300 transition flex gap-3 cursor-pointer"
            >

              <FcGoogle />

              <span className="text-gray-800 font-medium ">Create Account with Google</span>
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block mb-1 text-sm">Email </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Re-Enter your password"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {error && (
              <motion.div
                key={error.id}
                initial={{ x: -150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 800,     // Higher = more bouncy (try 120–200)
                  damping: 15,        // Lower = more oscillation (try 8–15)

                }}
                className='flex justify-center items-center text-red-500'>
                <p>{error.message}</p>
              </motion.div>
            )}



            <button
              type="submit"
              className="w-full py-2 bg-white text-black rounded hover:bg-gray-400 transition cursor-pointer"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account? <Link to={"/login"} className='text-blue-500' >Login</Link>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Register