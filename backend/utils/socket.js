import { Server } from "socket.io";

let io;  // To hold the socket instance

export const initializeSocket = (server) => {
  if (io) return io;  // If io is already initialized, return it.

  // Initialize Socket.IO server
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // React App URL
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });

  console.log("Socket.IO server initialized");

  return io;
};

// This function retrieves the socket instance
export const getSocketInstance = () => {
  if (!io) {
    throw new Error("Socket instance is not initialized. Call initializeSocket first.");
  }
  return io;
};
