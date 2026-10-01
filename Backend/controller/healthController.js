import health from "../model/health.js";
import device from "../model/device.js";

// ======================================================
// POST HEALTH DATA
// ESP32 → Backend → Local ML → MongoDB → Socket.IO
// ======================================================

export const healthData = async (req, res) => {
  console.log("🔥 HEALTHDATA CONTROLLER HIT");

  try {
    const {
      deviceId,
      heartRate,
      spo2,
      temp,
      envtemp,
      ecg,
      humidity,
      dust,
    } = req.body;

    console.log("📦 REQUEST BODY:", req.body);

    // ==================================================
    // DEVICE ID CHECK
    // ==================================================

    if (!deviceId) {
      return res.status(400).json({
        success: false,
        message: "Device ID is required",
      });
    }

    // ==================================================
    // DEVICE CHECK
    // ==================================================

    const existingDevice = await device.findOne({
      deviceId,
    });

    if (!existingDevice) {
      console.log(
        "❌ DEVICE NOT REGISTERED:",
        deviceId
      );

      return res.status(404).json({
        success: false,
        message: "Device is not registered",
      });
    }

    console.log(
      "✅ DEVICE FOUND:",
      deviceId
    );

    // ==================================================
    // USER ID
    // ==================================================

    const userid = existingDevice.userid;

    // ==================================================
    // HEALTH PAYLOAD
    // ==================================================

    const healthPayload = {
      deviceId,
      userid,

      heartRate: Number(heartRate ?? 0),
      spo2: Number(spo2 ?? 0),
      temp: Number(temp ?? 0),

      envtemp: Number(envtemp ?? 0),
      ecg: Number(ecg ?? 0),
      humidity: Number(humidity ?? 0),
      dust: Number(dust ?? 0),
    };

    console.log(
      "📊 HEALTH DATA:",
      healthPayload
    );

    // ==================================================
    // 🤖 LOCAL ML PREDICTION
    // Flask → http://127.0.0.1:5001
    // ==================================================

    console.log(
      "🤖 CALLING LOCAL ML SERVICE..."
    );

    const mlResponse = await fetch(
      // "http://127.0.0.1:5001/predict",
      "https://healthtrackapp2ml.onrender.com/predict",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          heartRate: healthPayload.heartRate,
          spo2: healthPayload.spo2,
          temp: healthPayload.temp,
          envtemp: healthPayload.envtemp,
          humidity: healthPayload.humidity,
          ecg: healthPayload.ecg,
          dust: healthPayload.dust,
        }),
      }
    );




    // ==================================================
    // ML RESPONSE CHECK
    // ==================================================

    if (!mlResponse.ok) {
      throw new Error(
        `ML service failed: ${mlResponse.status}`
      );
    }

    const mlData = await mlResponse.json();
    
    console.log("🔥 ML STATUS:", mlResponse.status);
console.log("🔥 ML RAW RESPONSE:", mlData);
console.log("🔥 ML RISK:", {
  riskScore: mlData.riskScore,
  riskLevel: mlData.riskLevel,
});

    console.log(
      "🤖 ML RESULT:",
      mlData
    );

    // ==================================================
    // ADD ML RESULT TO HEALTH DATA
    // ==================================================

    healthPayload.riskScore =
      Number(mlData.riskScore) || 0;

    healthPayload.riskLevel =
      mlData.riskLevel ||
      "Unknown Risk";

    healthPayload.prediction =
      Number.isFinite(
        Number(mlData.prediction)
      )
        ? Number(mlData.prediction)
        : null;

    console.log(
      "🧠 FINAL HEALTH PAYLOAD:",
      healthPayload
    );


    // 🌍 AIR QUALITY ML
const airQualityResponse = await fetch(
  // "http://127.0.0.1:5001/air-quality",
   "https://healthtrackapp2ml.onrender.com/air-quality",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    // ONLY AIR QUALITY INPUTS
    body: JSON.stringify({
      dust: healthPayload.dust,
      humidity: healthPayload.humidity,
      envtemp: healthPayload.envtemp,
    }),
  }
);

const airQualityML = await airQualityResponse.json();


// ONLY AIR QUALITY FIELDS
healthPayload.airQualityLevel =
  airQualityML.airQualityLevel || "Unknown";

healthPayload.airQualityScore =
  Number(airQualityML.airQualityScore) || 0;



    // ==================================================
    // SAVE TO MONGODB
    // ==================================================

    const newHealthData =
      await health.create(
        healthPayload
      );

    console.log(
      "✅ MONGODB SAVED"
    );

    // ==================================================
    // SOCKET.IO
    // ==================================================

    const io = req.app.get("io");

    if (io) {
      console.log(
        "📡 EMITTING HEALTH DATA:",
        deviceId
      );

      io.emit(
        "healthData",
        newHealthData
      );

      console.log(
        "✅ HEALTH DATA SENT:",
        deviceId
      );

      console.log(
        "👥 CONNECTED SOCKETS:",
        io.engine.clientsCount
      );
    } else {
      console.log(
        "❌ SOCKET.IO NOT FOUND"
      );
    }

    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(200).json({
      success: true,

      message:
        "Health data saved successfully",

      data: newHealthData,
    });

  } catch (error) {
    console.error(
      "❌ HEALTH DATA ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};









// ======================================================
// GET LATEST HEALTH DATA
// GET /api/health/getHealthData
// ======================================================

export const gethealthdata = async (
  req,
  res
) => {
  try {
    const userid = req.user.id;

    console.log(
      "=========================================="
    );

    console.log(
      "📥 GET LATEST HEALTH DATA"
    );

    console.log(
      "👤 USER ID:",
      userid
    );

    // ==================================================
    // GET LATEST RECORD
    // ==================================================

    const hd = await health
      .findOne({ userid })
      .sort({ createdAt: -1 })
      .lean();

    // ==================================================
    // NO DATA
    // ==================================================

    if (!hd) {
      return res.status(200).json({
        success: true,

        message:
          "No device data found",

        hd: null,

        sensorData: {
          heartRate: 0,
          spo2: 0,
          temp: 0,
          envtemp: 0,
          humidity: 0,
          ecg: 0,
          dust: 0,
        },

        riskScore: 0,
        riskLevel: "No Data",
        prediction: null,

        recommendations: [],
        riskFactors: [],
      });
    }

    // ==================================================
    // SENSOR VALUES
    // ==================================================

    const heartRate =
      Number(hd.heartRate ?? 0);

    const spo2 =
      Number(hd.spo2 ?? 0);

    const temp =
      Number(hd.temp ?? 0);

    const envtemp =
      Number(hd.envtemp ?? 0);

    const humidity =
      Number(hd.humidity ?? 0);

    const ecg =
      Number(hd.ecg ?? 0);

    const dust =
      Number(hd.dust ?? 0);

    // ==================================================
    // ML DATA ALREADY SAVED
    // ==================================================

    const riskScore =
      Number(hd.riskScore ?? 0);

    const riskLevel =
      hd.riskLevel ||
      "Unknown Risk";

    const prediction =
      hd.prediction ?? null;

    // ==================================================
    // RECOMMENDATIONS
    // ==================================================

    const recommendations = [];

    // TEMPERATURE

    if (temp > 38) {
      recommendations.push(
        "Your body temperature is elevated. Rest and monitor your temperature."
      );
    } else if (temp < 35) {
      recommendations.push(
        "Your body temperature is lower than normal. Keep yourself warm and monitor it."
      );
    } else {
      recommendations.push(
        "Your body temperature is within the normal range."
      );
    }

    // HEART RATE

    if (heartRate > 100) {
      recommendations.push(
        "Your heart rate is elevated. Monitor your heart rate closely."
      );
    } else if (heartRate < 60) {
      recommendations.push(
        "Your heart rate is relatively low. Continue monitoring it."
      );
    } else {
      recommendations.push(
        "Your heart rate is within a normal range."
      );
    }

    // SPO2

    if (spo2 < 90) {
      recommendations.push(
        "Your SpO₂ level is low. Seek medical attention if this persists or you have breathing difficulty."
      );
    } else if (spo2 < 95) {
      recommendations.push(
        "Your SpO₂ is slightly below the usual range. Continue monitoring it."
      );
    } else {
      recommendations.push(
        "Your SpO₂ level is within a healthy range."
      );
    }

    // ML RISK

    if (riskLevel === "Critical Risk") {
      recommendations.push(
        "Critical risk detected. Immediate medical attention is recommended."
      );
    } else if (riskLevel === "High Risk") {
      recommendations.push(
        "High health risk detected. Please monitor your vital signs closely."
      );
    } else if (riskLevel === "Moderate Risk") {
      recommendations.push(
        "Moderate risk detected. Continue monitoring your health parameters."
      );
    } else if (riskLevel === "Low Risk") {
      recommendations.push(
        "Low risk detected. Maintain healthy habits and continue monitoring."
      );
    }

    // ==================================================
    // RISK FACTORS
    // ==================================================

    const riskFactors = [];

    // HEART RATE

    riskFactors.push({
      factor: "Heart Rate",
      value: heartRate,
      status:
        heartRate > 100
          ? "High"
          : heartRate < 60
          ? "Low"
          : "Normal",
    });

    // SPO2

    riskFactors.push({
      factor: "SpO₂",
      value: spo2,
      status:
        spo2 < 90
          ? "Low"
          : spo2 < 95
          ? "Slightly Low"
          : "Normal",
    });

    // TEMPERATURE

    riskFactors.push({
      factor: "Temperature",
      value: temp,
      status:
        temp > 38
          ? "High"
          : temp < 35
          ? "Low"
          : "Normal",
    });

    // ENVIRONMENT TEMP

    riskFactors.push({
      factor: "Environment Temp",
      value: envtemp,
      status:
        envtemp > 40
          ? "High"
          : envtemp < 10
          ? "Low"
          : "Normal",
    });

    // HUMIDITY

    riskFactors.push({
      factor: "Humidity",
      value: humidity,
      status:
        humidity > 80
          ? "High"
          : humidity < 30
          ? "Low"
          : "Normal",
    });

    // ECG

    riskFactors.push({
      factor: "ECG",
      value: ecg,
      status:
        Math.abs(ecg) > 2
          ? "High"
          : "Normal",
    });

    // DUST

    riskFactors.push({
      factor: "Dust",
      value: dust,
      status:
        dust > 300
          ? "High"
          : dust > 150
          ? "Moderate"
          : "Normal",
    });

    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(200).json({
      success: true,

      message:
        "Data received successfully",

      hd,

      sensorData: {
        heartRate,
        spo2,
        temp,
        envtemp,
        humidity,
        ecg,
        dust,
      },

      riskScore,
      riskLevel,
      prediction,

      recommendations,
      riskFactors,
    });

  } catch (error) {
    console.error(
      "❌ GET HEALTH DATA ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to get health data",

      error: error.message,
    });
  }
};


// ======================================================
// GET HEALTH HISTORY
// GET /api/health/history?days=7
// ======================================================

export const getHealthHistory = async (
  req,
  res
) => {
  try {
    const userId = req.user.id;

    const days =
      Number(req.query.days) || 7;

    // ==================================================
    // START DATE
    // ==================================================

    const startDate = new Date();

    startDate.setDate(
      startDate.getDate() - days
    );

    // ==================================================
    // GET HEALTH DATA
    // ==================================================

    const healthData =
      await health
        .find({
          userid: userId,

          createdAt: {
            $gte: startDate,
          },
        })
        .sort({
          createdAt: 1,
        })
        .lean();

    // ==================================================
    // NO DATA
    // ==================================================

    if (!healthData.length) {
      return res.status(200).json({
        success: true,

        summary: null,

        trends: {
          heartRate: [],
          spo2: [],
          temperature: [],
        },

        recentRecords: [],
      });
    }

    // ==================================================
    // HEART RATE SUMMARY
    // ==================================================

    const heartRates =
      healthData
        .map(
          (item) =>
            Number(item.heartRate)
        )
        .filter(
          (value) =>
            !Number.isNaN(value)
        );

    const lowest =
      Math.min(...heartRates);

    const highest =
      Math.max(...heartRates);

    const average =
      Math.round(
        heartRates.reduce(
          (sum, value) =>
            sum + value,
          0
        ) /
          heartRates.length
      );

    const latestData =
      healthData[
        healthData.length - 1
      ];

    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(200).json({
      success: true,

      summary: {
        heartRate: {
          lowest,
          highest,
          average,
          today:
            latestData.heartRate,
        },
      },

      trends: {
        heartRate:
          healthData.map(
            (item) => ({
              value:
                Number(
                  item.heartRate
                ),

              date:
                item.createdAt,
            })
          ),

        spo2:
          healthData.map(
            (item) => ({
              value:
                Number(
                  item.spo2
                ),

              date:
                item.createdAt,
            })
          ),

        temperature:
          healthData.map(
            (item) => ({
              value:
                Number(
                  item.temp
                ),

              date:
                item.createdAt,
            })
          ),
      },

      // ==================================================
      // RECENT RECORDS
      // ==================================================

      recentRecords:
        healthData
          .slice(-10)
          .reverse()
          .map(
            (item) => ({
              id: item._id,

              heartRate:
                item.heartRate,

              spo2:
                item.spo2,

              temperature:
                item.temp,

              date:
                item.createdAt,
            })
          ),
    });

  } catch (error) {
    console.error(
      "❌ HEALTH HISTORY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
