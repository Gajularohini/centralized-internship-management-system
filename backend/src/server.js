require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const http = require('http');
const socketio = require('socket.io');

// Only import memoryDb in development
let startMemoryDb, stopMemoryDb;
if (process.env.NODE_ENV === 'development') {
  const memoryDb = require('./config/memoryDb');
  startMemoryDb = memoryDb.startMemoryDb;
  stopMemoryDb = memoryDb.stopMemoryDb;
}

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
  console.log('New client connected: - server.js:73', socket.id);

  // Join user room
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room - server.js:78`);
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
    console.log('Client disconnected: - server.js:92', socket.id);
  });
});

// Database connection and server start
async function startServer() {
  try {
    // Start in-memory MongoDB (development only)
    if (process.env.NODE_ENV === 'development') {
      // startMemoryDb returns a connection URI; use it if MONGODB_URI is not set
      try {
        const memUri = await startMemoryDb();
        if (!process.env.MONGODB_URI) {
          process.env.MONGODB_URI = memUri;
        }
      } catch (err) {
        console.error('Failed to start inmemory DB: - server.js:108', err);
        throw err;
      }
    }

    // Connect to MongoDB with better error handling and optional fallback
    function getMongoHostFromUri(uri) {
      if (!uri) return 'MONGODB_URI not set';
      try {
        const at = uri.indexOf('@');
        let hostPart = at !== -1 ? uri.slice(at + 1) : uri.replace(/^mongodb(\+srv)?:\/\//, '');
        hostPart = hostPart.split('/')[0];
        return hostPart;
      } catch (e) {
        return 'unknown';
      }
    }
    console.log('🔎 Mongo host (masked): - server.js:125', getMongoHostFromUri(process.env.MONGODB_URI));

    async function connectWithFallback(uri) {
      try {
        await mongoose.connect(uri);
        console.log('✅ MongoDB Connected - server.js:130');
        return;
      } catch (err) {
        // Detect DNS SRV resolution errors (common with mongodb+srv)
        const isSrvDnsError = err && (err.code === 'ENOTFOUND' || (err.message && err.message.includes('querySrv')));
        console.error('❗ MongoDB connection error - server.js:135', (err && err.message) || err);

        // If we have an explicit non-SRV seed list, try it next
        if (process.env.MONGODB_SEED && process.env.MONGODB_SEED !== uri) {
          console.log('➡️ Trying nonSRV seed hosts from MONGODB_SEED - server.js:139');
          try {
            await mongoose.connect(process.env.MONGODB_SEED);
            console.log('✅ MongoDB Connected via MONGODB_SEED - server.js:142');
            return;
          } catch (seedErr) {
            console.error('❗ MONGODB_SEED connection failed - server.js:145', seedErr && seedErr.message ? seedErr.message : seedErr);
          }
        }

        // If DNS SRV failed and fallback is allowed, start an in-memory DB and retry
        const allowFallback = process.env.FALLBACK_TO_MEMORY === 'true' || process.env.NODE_ENV !== 'production';
        if (isSrvDnsError && allowFallback && startMemoryDb) {
          try {
            console.log('🔁 DNS SRV lookup failed; starting inmemory MongoDB as fallback - server.js:153');
            const memUri = await startMemoryDb();
            process.env.MONGODB_URI = memUri;
            await mongoose.connect(memUri);
            console.log('✅ Connected to inmemory MongoDB fallback - server.js:157');
            return;
          } catch (memErr) {
            console.error('❌ Inmemory fallback failed - server.js:160', memErr && memErr.message ? memErr.message : memErr);
          }
        }

        // No fallback succeeded - rethrow to be handled by outer catch
        throw err;
      }
    }

    await connectWithFallback(process.env.MONGODB_URI);

    // Start server
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} - server.js:174`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'} - server.js:175`);
    });
  } catch (error) {
    console.error('❌ Server Startup Error: - server.js:178', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully... - server.js:185');
  if (process.env.NODE_ENV === 'development' && stopMemoryDb) {
    await stopMemoryDb();
  }
  await mongoose.connection.close();
  process.exit(0);
});

startServer();
