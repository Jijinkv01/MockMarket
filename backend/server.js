const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const connectDB = require("./config/connectDB")
const UserRouter = require("./routes/userRoutes")
const cors = require("cors")
const cookieParser = require("cookie-parser")


const PORT = process.env.PORT || 3000
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

app.use("/", UserRouter)


connectDB()
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})


