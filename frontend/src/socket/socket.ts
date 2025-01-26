import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

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
