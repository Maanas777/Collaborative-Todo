
import express from 'express'
import dotenv from 'dotenv'
import http from "http";
import cors from 'cors'
import { setupSocketEvents } from './socket/events.js';
import { initializeSocket } from "./utils/socket.js";
import { connectDB } from './utils/db.js'
import authRoutes from './routes/auth.routes.js'
import todoRoutes from './routes/todo.routes.js'
import userRoutes from './routes/user.routes.js'

dotenv.config()

const app=express()

app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,              
}));

const server = http.createServer(app);
initializeSocket(server);
const io = initializeSocket(server);

const port=process.env.PORT


app.use(express.json());

// app.use(cookieparser())
app.use("/api/auth", authRoutes);
app.use('/api/todos',todoRoutes)
app.use('/api',userRoutes)



server.listen(port,()=>{
    console.log(`server is running on ${port}`)
    connectDB()
})