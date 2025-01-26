import { Server } from "socket.io";
import { handleTaskEvents } from "./events.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Update this to match your client URL
      methods: ["GET", "POST"],
    },
  });

  console.log("Socket.IO initialized");

  // Listen for connection events
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Call event handlers
    handleTaskEvents(io, socket);

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};

export const getSocketIO = () => io; 
