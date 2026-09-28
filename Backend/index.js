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

// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import "./auth/google.js";
// import dotenv from "dotenv";
// dotenv.config();
// import passport from "passport";
// import jwt from "jsonwebtoken";
// // import authGoogle from "./auth/google.js"
// // import User from "./model/user.js";
// import {auth} from "./middlewares/userAuth.js"
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import connectDB from "./config/Db.js";
// import healthRoutes from "./route/healthRoutes.js";
// import userRoutes from "./route/userRoutes.js";
// import  deviceRoutes from "./route/deviceRoutes.js";
// // import VITE_FRONTEND_URL from "../config/api.js"
// import doctorRoutes from "./route/doctorRoutes.js";
// // import health from "./model/health.js";
// // import device from "./model/device.js";
// import documentRoutes from "./route/documentRoutes.js"
// import dns from "dns";
// dns.setServers(["1.1.1.1" , "8.8.8.8"])
// dotenv.config();

// const app = express();

// // ---------------- DB CONNECT ----------------
// // connectDB().then(() => {
// //   app.listen(process.env.PORT,"0.0.0.0", () => {
// //     console.log("Server running on port", process.env.PORT);
// //   });
// // });

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "https://healthtrackf.onrender.com",
//     credentials: true,
//   },
// });

// app.set("io", io);

// io.on("connection", (socket) => {
//   console.log("🟢 Socket connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("🔴 Socket disconnected:", socket.id);
//   });
// });

// connectDB().then(() => {
//   server.listen(process.env.PORT, "0.0.0.0", () => {
//     console.log("Server running on port", process.env.PORT);
//   });
// });

// // ---------------- MIDDLEWARE ----------------
// app.use(cors({
//     origin: "https://healthtrackf.onrender.com",
//     credentials: true
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(passport.initialize());
// // app.use(passport.session());
// // ---------------- ROUTES ----------------
// // app.use("/api/note", NoteRoutes);

// app.use("/api/users", userRoutes);
// app.use("/api/health",healthRoutes);
// app.use("/api/doctors", doctorRoutes);

// // app.use("/api/admin", adminRoutes);

// // app.use("/api/user", userRoutes);
// // app.use("/api/profile",profileRoutes);

// //esp32 calling my api
// app.use("/api/devicedata",deviceRoutes)
// app.use("/api/document",documentRoutes)

// app.get("/health", (req, res) => {
//   res.status(200).json({
//     status: "OK",
//     message: "ML server is running"
//   });
// });

// // ==========================================
// // 1. Background Notification Helper Function
// // ==========================================

// // ==========================================
// // SAVE ONESIGNAL PLAYER ID ROUTE (Updated & Safer)
// // ==========================================
// // ==========================================
// // SAVE ONESIGNAL PLAYER ID ROUTE (Public / No Auth Required)
// // ==========================================
// // ==========================================
// // SAVE ONESIGNAL PLAYER ID ROUTE (Public)
// // ==========================================

// // ==========================================
// // 3. ESP32 HEALTH DATA & NOTIFICATION ROUTE
// // ==========================================
// // app.post("/api/health/healthdata", async (req, res) => {
// //    console.log("🔥🔥🔥 HEALTHDATA ROUTE HIT 🔥🔥🔥");
// //   try {
// //     const {
// //       deviceId,
// //       heartRate,
// //       spo2,
// //       temp,
// //       envtemp,
// //       ecg,
// //       humidity,
// //       dust,
// //     } = req.body;

// //     if (!deviceId) {
// //       return res.status(400).json({ success: false, message: "Device ID is required" });
// //     }

// //     const existingDevice = await device.findOne({ deviceId });
// //     if (!existingDevice) {
// //       return res.status(404).json({ success: false, message: "Device is not registered" });
// //     }

// //     const userid = existingDevice.userid;

// //     const healthPayload = {
// //       deviceId,
// //       userid,
// //       heartRate: Number(heartRate ?? 0),
// //       spo2: Number(spo2 ?? 0),
// //       temp: Number(temp ?? 0),
// //       envtemp : Number(envtemp ?? 0),
// //       ecg : Number(ecg ?? 0),
// //       humidity : Number(humidity ?? 0),
// //       dust : Number(dust ?? 0)
// //     };

// //     const newHealthData = await health.create(healthPayload);
// //     console.log("✅ SAVED TO MONGODB:", newHealthData);

// //     // OneSignal Background Push Notification Trigger
// //     try {
// //       const hrVal = Number(heartRate ?? 0);
// //       const spo2Val = Number(spo2 ?? 0);
// //       const tempVal = Number(temp ?? 0);

// //       const isCritical = hrVal > 120 || hrVal < 45 || spo2Val < 90 || tempVal > 38.5;

// //       if (isCritical) {
// //         const userDoc = await User.findById(userid);

// //         if (userDoc && userDoc.oneSignalPlayerId) {
// //           await fetch("https://onesignal.com/api/v1/notifications", {
// //             method: "POST",
// //             headers: {
// //               "Content-Type": "application/json",

// //             },
// //             body: JSON.stringify({
// //           
// //               include_player_ids: [userDoc.oneSignalPlayerId],
// //               headings: { en: "🚨 Critical Health Emergency Alert!" },
// //               contents: { en: `Aapka health parameter critical hai! HR: ${hrVal}, SpO2: ${spo2Val}%, Temp: ${tempVal}°C` }
// //             })
// //           });
// //           console.log("🚀 Background Push Notification Sent Successfully via OneSignal!");
// //         }
// //       }
// //     } catch (notifErr) {
// //       console.error("❌ Notification Trigger Error:", notifErr);
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       message: "Health data saved successfully",
// //       data: newHealthData,
// //     });

// //   } catch (error) {
// //     console.error("❌ HEALTH DATA ERROR:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // });

// // app.get('/auth/google',
// //     passport.authenticate('google', { scope: ["profile", "email"],}));

// // app.get(
// //   "/auth/google/callback",
// //   passport.authenticate("google", {
// //     session: false,
// //     failureRedirect: "/",
// //   }),
// //   async (req, res) => {
// //     try {
// //       console.log("USER:", req.user);

// //       if (!req.user) {
// //         return res.status(401).send("Google auth failed");
// //       }

// //       const token = jwt.sign(
// //         {
// //         googleId: req.user.id,
// //         id: req.user._id,
// //         // role:req.user.role,
// //         email:req.user.email,
// //         firstname: req.user.firstname,
// //         lastname: req.user.lastname ,

// //         },
// //         process.env.JWT_SECRET,
// //         { expiresIn: "7d" }
// //       );

// // res.cookie("token", token, {
// //   httpOnly: true,
// //   secure: false,
// //   sameSite: "lax",
// //     maxAge: 7 * 24 * 60 * 60 * 1000,
// // });

// // // if(req.user.role==="admin")
// // // {
// // //   return res.redirect("http://localhost:5173/dashboard");
// // // }
// //       res.redirect("https://localhost:5173/patient");

// //     } catch (err) {
// //       console.log("ERROR:", err);
// //       return res.status(500).send("Internal Server Error");
// //     }
// //   }
// // );
