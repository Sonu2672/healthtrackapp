import express from "express";
import http from "http";
import { Server } from "socket.io";

import "./auth/google.js";

import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/Db.js";

import healthRoutes from "./route/healthRoutes.js";
import userRoutes from "./route/userRoutes.js";
import deviceRoutes from "./route/deviceRoutes.js";
import doctorRoutes from "./route/doctorRoutes.js";
import documentRoutes from "./route/documentRoutes.js";

import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

/* =====================================================
   HTTP SERVER
===================================================== */

const server = http.createServer(app);

/* =====================================================
   SOCKET.IO
===================================================== */

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

/* =====================================================
   SOCKET CONNECTION
===================================================== */

io.on("connection", (socket) => {
  console.log("🟢 SOCKET CONNECTED:", socket.id);

  // Mobile joins its ESP32 device room
  socket.on("joinDevice", (deviceId) => {
    console.log("📡 DEVICE JOIN REQUEST:", deviceId);

    if (!deviceId) {
      console.log("❌ DEVICE ID MISSING");
      return;
    }

    socket.join(deviceId);

    console.log(`✅ SOCKET JOINED ROOM: ${deviceId}`);
  });

  socket.on("disconnect", (reason) => {
    console.log("🔴 SOCKET DISCONNECTED:", socket.id, "Reason:", reason);
  });
});

/* =====================================================
   MIDDLEWARE
===================================================== */

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: false,
  }),
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

app.use(passport.initialize());

/* =====================================================
   ROUTES
===================================================== */

app.use("/api/users", userRoutes);

app.use("/api/health", healthRoutes);

app.use("/api/doctors", doctorRoutes);

app.use("/api/devicedata", deviceRoutes);

app.use("/api/document", documentRoutes);

/* =====================================================
   HEALTH CHECK
===================================================== */

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "ML server is running",
  });
});

/* =====================================================
   START SERVER
===================================================== */

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 SERVER RUNNING`);

      console.log(`📡 LOCAL API: http://192.168.1.8:${PORT}`);

      console.log(`❤️ SOCKET.IO READY`);
    });
  })
  .catch((error) => {
    console.error("❌ DATABASE CONNECTION FAILED:", error);
  });
