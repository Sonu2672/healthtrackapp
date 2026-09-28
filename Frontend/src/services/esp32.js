import { ESP32_URL } from "../constants/config";
// export const getESP32Data = async () => {
//   return {
//     deviceId: "ESP32_HEALTH_01",

//     heartRate: 82,

//     spo2: 8,

//     temp: 36.7,

//     riskLevel: "Low",

//     riskScore: 12,
//   };
// };
export const getESP32Data = async () => {
  const response = await fetch(`${ESP32_URL}/data`);

  if (!response.ok) {
    throw new Error("ESP32 request failed");
  }

  const data = await response.json();

  return {
    deviceId: data.deviceId || "ESP32_HEALTH_01",

    heartRate: Number(data.heartRate) || 0,

    spo2: Number(data.spo2) || 0,

    temp: Number(data.temp) || 0,

    riskLevel: data.riskLevel || data.mlStatus || data.status || "Unknown",

    riskScore: Number(data.riskScore || data.mlConfidence || 0),
  };
};
