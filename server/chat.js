// Socket.IO chat server setup for real-time support chat
const { Server } = require('socket.io');

function setupChat(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  // Store messages in memory (for demo; use DB for production)
  let messages = [];

  io.on('connection', (socket) => {
    // Send chat history to new client
    socket.emit('chat history', messages);

    // Listen for new messages
    socket.on('chat message', (msg) => {
      const message = {
        id: Date.now(),
        user: msg.user,
        text: msg.text,
        timestamp: new Date().toISOString()
      };
      messages.push(message);
      io.emit('chat message', message);
    });
  });

  return io;
}

module.exports = setupChat;
