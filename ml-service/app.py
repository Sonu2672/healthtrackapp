from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)


# ==========================================
# LOAD ML MODELS
# ==========================================

health_model = joblib.load("health_model.pkl")

air_quality_model = joblib.load(
    "air_quality_model.pkl"
)

print("✅ Health ML model loaded")
print("✅ Air Quality ML model loaded")


# ==========================================
# ❤️ HEALTH RISK PREDICTION
# ==========================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.json

        if not data:
            return jsonify({
                "success": False,
                "message": "No input data received"
            }), 400


        # ==========================================
        # ❤️ HEALTH FEATURES
        # ==========================================

        heartRate = float(data["heartRate"])
        spo2 = float(data["spo2"])
        temp = float(data["temp"])

        envtemp = float(data["envtemp"])
        humidity = float(data["humidity"])
        ecg = float(data["ecg"])
        dust = float(data["dust"])


        # ==========================================
        # 🤖 7 FEATURES
        # ==========================================

        features = pd.DataFrame([{
            "heartRate": heartRate,
            "spo2": spo2,
            "temp": temp,
            "envtemp": envtemp,
            "humidity": humidity,
            "ecg": ecg,
            "dust": dust
        }])


        # ==========================================
        # 📥 LOG INPUT
        # ==========================================

        print("\n====================================")
        print("📥 HEALTH ML INPUT")
        print("====================================")

        print("❤️ Heart Rate      :", heartRate)
        print("🫁 SpO2            :", spo2)
        print("🌡️ Body Temp       :", temp)
        print("🌍 Environment Temp:", envtemp)
        print("💧 Humidity        :", humidity)
        print("❤️ ECG             :", ecg)
        print("🌫️ Dust            :", dust)


        # ==========================================
        # 🤖 MODEL PREDICTION
        # ==========================================

        prediction = int(
            health_model.predict(features)[0]
        )

        print("\n🤖 MODEL PREDICTION:", prediction)


        # ==========================================
        # 🚨 RISK LEVEL
        # ==========================================

        riskLevels = {
            0: "Low Risk",
            1: "Moderate Risk",
            2: "High Risk",
            3: "Critical Risk"
        }

        riskLevel = riskLevels.get(
            prediction,
            "Unknown Risk"
        )


        # ==========================================
        # 📊 MODEL PROBABILITIES
        # ==========================================

        probabilities = health_model.predict_proba(
            features
        )[0]

        print(
            "📊 MODEL PROBABILITIES:",
            probabilities
        )


        # ==========================================
        # 🔥 RISK SEVERITY SCORE
        #
        # 0   = Low
        # 33  = Moderate
        # 66  = High
        # 100 = Critical
        #
        # NOT MODEL CONFIDENCE
        # ==========================================

        severityMap = {
            0: 0,
            1: 33,
            2: 66,
            3: 100
        }

        riskScore = round(
            sum(
                float(probability)
                * severityMap.get(
                    int(modelClass),
                    0
                )
                for modelClass, probability
                in zip(
                    health_model.classes_,
                    probabilities
                )
            )
        )


        # ==========================================
        # 🛡️ LIMIT SCORE
        # ==========================================

        riskScore = max(
            0,
            min(100, riskScore)
        )


        # ==========================================
        # 📤 HEALTH RESULT
        # ==========================================

        print("\n====================================")
        print("🧠 FINAL HEALTH ML RESULT")
        print("====================================")

        print("Prediction :", prediction)
        print("Risk Level :", riskLevel)
        print("Risk Score :", riskScore)

        print("====================================\n")


        return jsonify({

            "success": True,

            "riskScore": riskScore,

            "riskLevel": riskLevel,

            "prediction": prediction

        })


    except KeyError as error:

        print("\n❌ MISSING FIELD:", error)

        return jsonify({

            "success": False,

            "message": f"Missing required field: {error}"

        }), 400


    except ValueError as error:

        print("\n❌ INVALID VALUE:", error)

        return jsonify({

            "success": False,

            "message": f"Invalid numeric value: {error}"

        }), 400


    except Exception as error:

        print("\n❌ HEALTH ML ERROR:", error)

        return jsonify({

            "success": False,

            "message": str(error)

        }), 500


# ==========================================
# 🌍 AIR QUALITY PREDICTION
# ==========================================

@app.route("/air-quality", methods=["POST"])
def air_quality():

    try:

        data = request.json

        if not data:

            return jsonify({
                "success": False,
                "message": "No input data received"
            }), 400


        # ==========================================
        # 🌍 AIR QUALITY FEATURES
        # ==========================================

        dust = float(data["dust"])

        humidity = float(data["humidity"])

        envtemp = float(data["envtemp"])


        # ==========================================
        # 🤖 AIR QUALITY FEATURES
        #
        # MUST MATCH TRAINING DATA
        # ==========================================

        features = pd.DataFrame([{

            "dust": dust,

            "humidity": humidity,

            "envtemp": envtemp

        }])


        # ==========================================
        # 📥 LOG INPUT
        # ==========================================

        print("\n====================================")
        print("📥 AIR QUALITY ML INPUT")
        print("====================================")

        print("🌫️ Dust     :", dust)
        print("💧 Humidity :", humidity)
        print("🌍 Env Temp :", envtemp)


        # ==========================================
        # 🤖 MODEL PREDICTION
        # ==========================================

        prediction = air_quality_model.predict(
            features
        )[0]


        print(
            "\n🤖 AIR QUALITY PREDICTION:",
            prediction
        )


        # ==========================================
        # 📊 AIR QUALITY SCORE
        #
        # This is an APP SCORE,
        # NOT official AQI.
        #
        # Higher = Better Air Quality
        # ==========================================

        airQualityScores = {

            "Good": 100,

            "Moderate": 70,

            "Poor": 40,

            "Unhealthy": 15

        }


        airQualityScore = airQualityScores.get(

            str(prediction),

            0

        )


        # ==========================================
        # 📤 FINAL AIR QUALITY RESULT
        # ==========================================

        print("\n====================================")
        print("🌍 FINAL AIR QUALITY RESULT")
        print("====================================")

        print(
            "Air Quality Level :",
            prediction
        )

        print(
            "Air Quality Score :",
            airQualityScore
        )

        print("====================================\n")


        return jsonify({

            "success": True,

            "airQualityLevel": str(
                prediction
            ),

            "airQualityScore": airQualityScore

        })


    except KeyError as error:

        print(
            "\n❌ AIR QUALITY MISSING FIELD:",
            error
        )

        return jsonify({

            "success": False,

            "message":
                f"Missing required field: {error}"

        }), 400


    except ValueError as error:

        print(
            "\n❌ AIR QUALITY INVALID VALUE:",
            error
        )

        return jsonify({

            "success": False,

            "message":
                f"Invalid numeric value: {error}"

        }), 400


    except Exception as error:

        print(
            "\n❌ AIR QUALITY ML ERROR:",
            error
        )

        return jsonify({

            "success": False,

            "message": str(error)

        }), 500


# ==========================================
# ❤️ HEALTH + AIR QUALITY ML SERVICE STATUS
# ==========================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({

        "success": True,

        "service":
            "HealthTrack ML Service",

        "healthModel":
            "health_model.pkl",

        "airQualityModel":
            "air_quality_model.pkl",

        "healthEndpoint":
            "/predict",

        "airQualityEndpoint":
            "/air-quality"

    })


# ==========================================
# 🚀 START SERVER
# ==========================================

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5001,

        debug=True

    )