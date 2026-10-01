import { createContext, useContext, useEffect, useState } from "react";
import { socket, connectSocket } from "../src/services/socket";
import { DEVICE_ID } from "../src/constants/config";

const HealthContext = createContext(null);

export function HealthProvider({ children }) {
  const [connected, setConnected] = useState(false);

  const [health, setHealth] = useState({
    heartRate: 82,
    spo2: 98,
    temp: 36.7,
    envtemp: 25,
    humidity: 60,
    ecg: 0,
    dust: 0,
    riskLevel: "Low",
    riskScore: 25,
  });

 useEffect(() => {
  console.log("🚀 HEALTH SOCKET USEEFFECT RUNNING");

  const handleConnect = () => {
    console.log("🟢 SOCKET CONNECTED:", socket.id);

    setConnected(true);

    socket.emit("joinDevice", DEVICE_ID);
  };

  const handleDisconnect = () => {
    console.log("🔴 SOCKET DISCONNECTED");
    setConnected(false);
  };

  const handleHealthData = (data) => {
    console.log("❤️❤️ SOCKET RAW DATA:", data);

    setHealth({
      heartRate: Number(data.heartRate) || 0,
      spo2: Number(data.spo2) || 0,
      temp: Number(data.temp) || 0,
      envtemp: Number(data.envtemp) || 0,
      humidity: Number(data.humidity) || 0,
      ecg: Number(data.ecg) || 0,
      dust: Number(data.dust) || 0,
      riskLevel: data.riskLevel || "Low",
      riskScore: Number(data.riskScore) || 0,
      
      airQualityLevel: data.airQualityLevel || "Low",
      airQualityScore: Number(data.airQualityScore) || 0,


    });
  };

  socket.on("connect", handleConnect);
  socket.on("disconnect", handleDisconnect);
  socket.on("healthData", handleHealthData);

  console.log("🔌 CALLING CONNECT SOCKET");

  connectSocket();

  if (socket.connected) {
    handleConnect();
  }

  return () => {
    socket.off("connect", handleConnect);
    socket.off("disconnect", handleDisconnect);
    socket.off("healthData", handleHealthData);
  };
}, []);

  return (
    <HealthContext.Provider
      value={{
        health,
        setHealth,
        connected,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  return useContext(HealthContext);
}