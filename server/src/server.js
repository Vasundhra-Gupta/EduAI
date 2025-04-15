import './config/envLoader.js';
import { connectDB } from './db/connectMongodb.js';
import { http } from './socket.js';
import { connectRedis } from './db/connectRedis.js';
// import { seedDatabase } from './seeder.js';

const PORT = process.env.PORT || 4000;

// MongoDB connection
await connectDB();

// Redis connection
export const redisClient = await connectRedis();

// await seedDatabase();

http.listen(PORT, () => console.log(`✅ server listening on port ${PORT}...`));
