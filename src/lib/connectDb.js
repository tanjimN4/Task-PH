import { MongoClient, ServerApiVersion } from 'mongodb';

let db;

export const connectDB = async () => {
  if (db) return db;  // Return existing connection if already connected
  
  try {
    const uri = process.env.MONGODB_URI;  // Use server-side environment variable
    if (!uri) {
      throw new Error('Please add your Mongo URI to .env.local');
    }

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();  // Connect to MongoDB
    db = client.db('Task');  // Replace with your actual database name
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Database connection failed');
  }
};
