// socketService.js

import io from "socket.io-client";

const socket = io("http://127.0.0.1:5000");

// Callback to be executed after the connection is established
const onConnectCallback = () => {
  document.cookie = `socketId=${socket.id}`;
};

// Check if the socket is already connected
if (socket.connected) {
  // If already connected, execute the callback immediately
  onConnectCallback();
} else {
  // If not connected, execute the callback when the 'connect' event occurs
  socket.on("connect", onConnectCallback);
}

const receiveMessage = (callback) => {
  socket.on("receive-message", (msg) => {
    callback(msg);
  });
};

const deleteMessage = (callback) => {
  socket.on("delete-message", (msg) => {
    callback(msg);
  });
};

export { receiveMessage, deleteMessage };
