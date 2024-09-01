import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
        this.client = redis.createClient();

        // Handle Redis connection errors
        this.client.on('error', (err) => {
            console.error(`Redis client not connected to the server: ${err.message}`);
        });

        // Promisify Redis functions for easier use
        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setAsync = promisify(this.client.set).bind(this.client);
        this.delAsync = promisify(this.client.del).bind(this.client);
    }

    // Check if Redis is alive
    isAlive() {
        return this.client.connected;
    }

    // Get the value for a key
    async get(key) {
        return await this.getAsync(key);
    }

    // Set the value for a key with an expiration time
    async set(key, value, duration) {
        await this.setAsync(key, value, 'EX', duration);
    }

    // Delete a key
    async del(key) {
        await this.delAsync(key);
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
