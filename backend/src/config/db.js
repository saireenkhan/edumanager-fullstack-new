const mongoose = require("mongoose");
const dns = require("dns");

// Fix SRV DNS resolution on networks where the default DNS
// resolver blocks/refuses MongoDB Atlas SRV queries.
if (process.env.NODE_ENV === "production") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

async function connectDB() {
  try {
    const mongoURI =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_ATLAS
        : process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MongoDB connection URI is missing");
    }

    await mongoose.connect(mongoURI);

    console.log("MongoDB connected:", mongoose.connection.name);
    console.log(
      "Database type:",
      process.env.NODE_ENV === "production"
        ? "MongoDB Atlas"
        : "Local MongoDB"
    );
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;