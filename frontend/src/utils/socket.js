// socketService.js

import io from 'socket.io-client';

const socket = io('http://127.0.0.1:5000');

// Callback to be executed after the connection is established
const onConnectCallback = () => {
  console.log('Socket connected. ID:', socket.id);
};

// Check if the socket is already connected
if (socket.connected) {
  // If already connected, execute the callback immediately
  onConnectCallback();
} else {
  // If not connected, execute the callback when the 'connect' event occurs
  socket.on('connect', onConnectCallback);
}

const receiveMessage = (callback) => {
  socket.on('receive-message', (msg) => {
    // Access socket.id and pass it along with the message to the callback
    callback({ message: msg, socketId: socket.id });
  });
};

export { receiveMessage };
