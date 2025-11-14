require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const http = require('http');
const socketio = require('socket.io');
const { startMemoryDb, stopMemoryDb } = require('./config/memoryDb');

const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Make io globally available
global.io = io;

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static('uploads'));

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Internship Management System API',
    version: '1.0.0'
  });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/internships', require('./routes/internships'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/messages', require('./routes/messages'));

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected: - server.js:66', socket.id);

  // Join user room
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room - server.js:71`);
  });

  // Handle chat messages
  socket.on('sendMessage', (data) => {
    io.to(data.recipientId).emit('receiveMessage', data);
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    io.to(data.recipientId).emit('userTyping', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected: - server.js:85', socket.id);
  });
});

// Database connection and server start
async function startServer() {
  try {
    // Start in-memory MongoDB (development only)
    if (process.env.NODE_ENV === 'development') {
      await startMemoryDb();
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected - server.js:99');

    // Start server
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} - server.js:104`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'} - server.js:105`);
    });
  } catch (error) {
    console.error('❌ Server Startup Error: - server.js:108', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully... - server.js:115');
  await stopMemoryDb();
  await mongoose.connection.close();
  process.exit(0);
});

startServer();
