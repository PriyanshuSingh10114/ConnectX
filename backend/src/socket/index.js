const Message = require('../models/Message');

let onlineUsers = new Map(); // socket.id -> username

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // User joins chat
    socket.on('join', (username) => {
      if (username) {
        onlineUsers.set(socket.id, username);
        console.log(`${username} joined with socket ${socket.id}`);
        // Broadcast updated online users count
        io.emit('user:online', Array.from(onlineUsers.values()));
      }
    });

    // Handle new message
    socket.on('message:send', async (data) => {
      try {
        const { username, message } = data;
        
        if (!username || !message) return;

        // Save to DB
        const newMessage = await Message.create({ username, message });

        // Broadcast to all connected clients including sender
        io.emit('message:new', newMessage);
      } catch (error) {
        console.error('Socket message error:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle typing start
    socket.on('typing:start', (username) => {
      socket.broadcast.emit('typing:start', username);
    });

    // Handle typing stop
    socket.on('typing:stop', (username) => {
      socket.broadcast.emit('typing:stop', username);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
      const username = onlineUsers.get(socket.id);
      if (username) {
        onlineUsers.delete(socket.id);
        io.emit('user:offline', Array.from(onlineUsers.values()));
      }
    });
  });
};

module.exports = socketHandler;
