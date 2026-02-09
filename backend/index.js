const express = require("express");
const redis = require("redis");

const app = express();
const PORT = 3000;

// Create Redis client (DO NOT block startup)
const redisClient = redis.createClient({
  url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:6379`,
  socket: {
    reconnectStrategy: retries => Math.min(retries * 100, 2000)
  }
});

redisClient.on("error", err => {
  console.error("Redis error:", err.message);
});

// Connect asynchronously
(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Redis connection failed, retrying in background");
  }
})();

// Health endpoint (DO NOT depend on Redis)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// API endpoint (Redis used only here)
app.get("/api/time", async (req, res) => {
  try {
    const now = new Date().toISOString();
    await redisClient.set("last_time", now);
    const value = await redisClient.get("last_time");

    res.json({
      message: "Time stored in Redis",
      time: value
    });
  } catch (err) {
    res.status(503).json({
      error: "Redis unavailable"
    });
  }
});

// 🔥 LISTEN ON ALL INTERFACES
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on porryrkrne tt  ${PORT} and listening on 0.0.0.0`);
});
