import { io } from "socket.io-client";

import { BACKEND_URL } from "../constants/config";

export const socket = io(BACKEND_URL, {
  autoConnect: false,
  transports: ["websocket"],
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};