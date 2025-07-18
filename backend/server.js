const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const connectDB = require("./config/connectDB")
const UserRouter = require("./routes/userRoutes")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const StockRouter = require("./routes/stockRoutes")
const { createServer } = require('http');
const { Server } = require('socket.io');


const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});


const PORT = process.env.PORT || 3000
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

app.use("/", UserRouter)
app.use("/api",StockRouter)

const initSocketIO = require('./service/finnhubSocket');
initSocketIO(io);

connectDB()
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



