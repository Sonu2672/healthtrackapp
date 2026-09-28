// import { ESP32_URL } from "../constants/config";
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
import { ESP32_URL } from "../constants/config";

export const getESP32Data = async () => {
  const response = await fetch(
    `${ESP32_URL}/data`
  );

  if (!response.ok) {
    throw new Error(
      "ESP32 request failed"
    );
  }

  const data = await response.json();

  console.log(
    "📦 ESP32 RAW:",
    data
  );

  return {
    // ==============================
    // DEVICE
    // ==============================

    deviceId:
      data.deviceId ||
      "ESP32_HEALTH_01",

    // ==============================
    // HEALTH DATA
    // ==============================

    heartRate:
      Number(data.heartRate) || 0,

    spo2:
      Number(data.spo2) || 0,

    temp:
      Number(data.temp) || 0,

    // ==============================
    // ENVIRONMENT DATA
    // ==============================

    envtemp:
      Number(data.envtemp) || 0,

    humidity:
      Number(data.humidity) || 0,

    dust:
      Number(data.dust) || 0,

    // ==============================
    // ECG
    // ==============================

    ecg:
      Number(data.ecg) || 0,

    // ==============================
    // ESP32 ML RESULT
    // ==============================

    riskLevel:
      data.riskLevel ||
      data.mlStatus ||
      data.status ||
      "Unknown",

    riskScore:
      Number(
        data.riskScore ||
        data.mlConfidence ||
        0
      ),
  };
};
