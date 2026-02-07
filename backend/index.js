const express = require("express");
const redis = require("redis");

const app = express();
const PORT = 3000;

// Redis connection
const redisClient = redis.createClient({
  url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:6379`
});

redisClient.connect().catch(console.error);

// Health endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Redis test endpoint
app.get("/api/time", async (req, res) => {
  const now = new Date().toISOString();
  await redisClient.set("last_time", now);
  const value = await redisClient.get("last_time");

  res.json({
    message: "Time stored in Redis",
    time: value
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port 3 ${PORT}`);
});

