const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

async function startMemoryDb() {
  try {
    mongoServer = await MongoMemoryServer.create({
      instance: {
        port: 27017,
        dbName: 'internship-management'
      }
    });
    
    const uri = mongoServer.getUri();
    console.log('📦 In-Memory MongoDB started at:', uri);
    return uri;
  } catch (error) {
    console.error('❌ Failed to start in-memory MongoDB:', error);
    throw error;
  }
}

async function stopMemoryDb() {
  if (mongoServer) {
    await mongoServer.stop();
    console.log('📦 In-Memory MongoDB stopped');
  }
}

module.exports = { startMemoryDb, stopMemoryDb };
