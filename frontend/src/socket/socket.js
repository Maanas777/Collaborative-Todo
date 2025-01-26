import { io } from "socket.io-client";

let socket

export const initializeSocket = () => {
  if (!socket) {
    socket = io('http://localhost:5000');
  }
};

export const getSocketInstance = () => {
  if (!socket) {
    throw new Error('Socket is not initialized');
  }
  return socket;
};
