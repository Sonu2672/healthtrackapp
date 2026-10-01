import { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useHealth } from "../../../context/HealthContext";
import { BACKEND_URL } from "../../constants/config";

export default function Risk() {
  const { health, connected } = useHealth();

  // =========================
  // AI RECOMMENDATIONS
  // DEFAULT DEMO DATA
  // =========================

  const [recommendations, setRecommendations] = useState([
    "Maintain a balanced and healthy lifestyle.",
    "Stay hydrated and monitor your health regularly.",
    "Keep your surrounding environment comfortable and clean.",
  ]);

  const [loadingRecommendations, setLoadingRecommendations] =
    useState(true);

  // =========================
  // FETCH AI RECOMMENDATIONS
  // =========================

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoadingRecommendations(true);

        const response = await fetch(
          `${BACKEND_URL}/api/health/gethealthdata`
        );

        const result = await response.json();

        console.log("🧠 HEALTH HISTORY:", result);

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Failed to fetch health history"
          );
        }

        const data = result?.recommendations;

        // Backend recommendation available
        if (Array.isArray(data) && data.length > 0) {
          setRecommendations(data);
        } else if (data) {
          setRecommendations([data]);
        }

        // Agar backend se recommendation nahi aayi,
        // default demo recommendations visible rahengi.
      } catch (error) {
        console.log(
          "❌ RECOMMENDATIONS ERROR:",
          error
        );

        // Error hone par bhi default demo
        // recommendations visible rahengi.
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, []);

  // =========================
  // CURRENT RISK
  // =========================

  const risk = String(
    health?.riskLevel || "Low Risk"
  ).trim();

  const riskScore = Number(
    health?.riskScore || 0
  );

  // =========================
  // RISK COLOR
  // =========================

  let riskColor = "#16A34A";
  let riskBg = "#ECFDF5";
  let riskBorder = "#86EFAC";

  if (risk === "Moderate Risk") {
    riskColor = "#D97706";
    riskBg = "#FFFBEB";
    riskBorder = "#FBBF24";
  }

  if (risk === "High Risk") {
    riskColor = "#DC2626";
    riskBg = "#FEF2F2";
    riskBorder = "#F87171";
  }

  if (risk === "Critical Risk") {
    riskColor = "#B91C1C";
    riskBg = "#FEE2E2";
    riskBorder = "#EF4444";
  }

  // =========================
  // RISK FACTOR STATUS
  // =========================

  const getHeartRateStatus = () => {
    const value = Number(
      health?.heartRate || 0
    );

    if (value >= 60 && value <= 100) {
      return "Normal";
    }

    if (value > 0) {
      return "Abnormal";
    }

    return "Monitoring";
  };

  const getSpo2Status = () => {
    const value = Number(
      health?.spo2 || 0
    );

    if (value >= 95) {
      return "Normal";
    }

    if (value >= 90) {
      return "Low";
    }

    return "Critical";
  };

  const getBodyTempStatus = () => {
    const value = Number(
      health?.temp || 0
    );

    if (value >= 36 && value <= 37.5) {
      return "Normal";
    }

    if (value > 37.5 && value <= 39) {
      return "Elevated";
    }

    return "Abnormal";
  };

  const getHumidityStatus = () => {
    const value = Number(
      health?.humidity || 0
    );

    if (value >= 30 && value <= 70) {
      return "Normal";
    }

    return "Abnormal";
  };

  const getDustStatus = () => {
    const value = Number(
      health?.dust || 0
    );

    if (value < 100) {
      return "Good";
    }

    if (value < 200) {
      return "Moderate";
    }

    return "Poor";
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      {/* =========================
          HEADER
      ========================= */}

      <Text style={styles.heading}>
        AI Risk Analysis
      </Text>

      <Text style={styles.subtitle}>
        AI-powered health risk assessment
      </Text>

      {/* =========================
          RISK SCORE
      ========================= */}

      <View style={styles.scoreCard}>

        <Text style={styles.label}>
          CURRENT RISK SCORE
        </Text>

        <View style={styles.scoreContent}>

          {/* SCORE CIRCLE */}

          <View
            style={[
              styles.scoreCircle,
              {
                backgroundColor: riskBg,
                borderColor: riskBorder,
              },
            ]}
          >

            <Text style={styles.score}>
              {riskScore}
            </Text>

            <Text style={styles.outOf}>
              /100
            </Text>

            <Text
              style={[
                styles.lowRisk,
                {
                  color: riskColor,
                },
              ]}
            >
              {risk}
            </Text>

          </View>

          {/* RISK INFORMATION */}

          <View style={styles.riskInfo}>

            <Text style={styles.infoLabel}>
              Risk Level
            </Text>

            <Text
              style={[
                styles.riskLevel,
                {
                  color: riskColor,
                },
              ]}
            >
              {risk}
            </Text>

            <Text style={styles.description}>
              AI analyzes your health and
              environmental parameters to
              estimate your current health risk.
            </Text>

            {/* RISK SEVERITY */}

            <Text style={styles.confidenceLabel}>
              Risk Severity
            </Text>

            <View style={styles.progress}>

              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min(
                      Math.max(riskScore, 0),
                      100
                    )}%`,
                    backgroundColor: riskColor,
                  },
                ]}
              />

            </View>

            <Text
              style={[
                styles.confidence,
                {
                  color: riskColor,
                },
              ]}
            >
              {riskScore}% Risk
            </Text>

          </View>

        </View>

      </View>

      {/* =========================
          RISK FACTORS
      ========================= */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          AI Risk Factors
        </Text>

        <Text style={styles.cardSubtitle}>
          Current parameter monitoring
        </Text>

        {/* HEART RATE */}

        <RiskFactor
          icon="♥"
          name="Heart Rate"
          value={`${health?.heartRate ?? 0} BPM`}
          status={getHeartRateStatus()}
        />

        {/* SPO2 */}

        <RiskFactor
          icon="◉"
          name="SpO₂"
          value={`${health?.spo2 ?? 0}%`}
          status={getSpo2Status()}
        />

        {/* BODY TEMPERATURE */}

        <RiskFactor
          icon="♨"
          name="Body Temperature"
          value={`${health?.temp ?? 0} °C`}
          status={getBodyTempStatus()}
        />

        {/* ENVIRONMENT TEMPERATURE */}

        <RiskFactor
          icon="♨"
          name="Environment Temperature"
          value={`${health?.envtemp ?? 0} °C`}
          status="Monitoring"
        />

        {/* HUMIDITY */}

        <RiskFactor
          icon="≈"
          name="Humidity"
          value={`${health?.humidity ?? 0}%`}
          status={getHumidityStatus()}
        />

        {/* ECG */}

        <RiskFactor
          icon="〰"
          name="ECG Signal"
          value={health?.ecg ?? 0}
          status="Monitoring"
        />

        {/* DUST */}

        <RiskFactor
          icon="≋"
          name="Dust / Air Quality"
          value={health?.dust ?? 0}
          status={getDustStatus()}
        />

      </View>

      {/* =========================
          AI RECOMMENDATIONS
      ========================= */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          AI Recommendations
        </Text>

        {loadingRecommendations ? (
          <Text style={styles.loadingText}>
            Analyzing your health data...
          </Text>
        ) : (
          recommendations.map(
            (recommendation, index) => (
              <Recommendation
                key={index}
                text={recommendation}
              />
            )
          )
        )}

      </View>

      <View style={{ height: 90 }} />

    </ScrollView>
  );
}


/* =================================
   RISK FACTOR
================================= */

function RiskFactor({
  icon,
  name,
  value,
  status,
}) {
  let statusColor = "#16A34A";

  if (
    status === "Abnormal" ||
    status === "Low" ||
    status === "Moderate" ||
    status === "Elevated"
  ) {
    statusColor = "#D97706";
  }

  if (
    status === "Critical" ||
    status === "Poor"
  ) {
    statusColor = "#DC2626";
  }

  return (
    <View style={styles.factor}>

      <View style={styles.factorIcon}>
        <Text>{icon}</Text>
      </View>

      <View style={styles.factorInfo}>

        <Text style={styles.factorName}>
          {name}
        </Text>

        <Text
          style={[
            styles.factorStatus,
            {
              color: statusColor,
            },
          ]}
        >
          {status}
        </Text>

      </View>

      <Text style={styles.factorValue}>
        {value}
      </Text>

    </View>
  );
}


/* =================================
   RECOMMENDATION
================================= */

function Recommendation({ text }) {
  return (
    <View style={styles.recommendation}>

      <View style={styles.check}>
        <Text>✓</Text>
      </View>

      <Text style={styles.recommendationText}>
        {text}
      </Text>

    </View>
  );
}


/* =================================
   STYLES
================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

  content: {
    padding: 20,
    paddingTop: 55,
  },

  heading: {
    fontSize: 27,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 5,
    marginBottom: 22,
  },

  scoreCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
  },

  label: {
    fontSize: 10,
    fontWeight: "800",
    color: "#6B7280",
    marginBottom: 18,
  },

  scoreContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  scoreCircle: {
    width: 135,
    height: 135,
    borderRadius: 68,
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },

  score: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111827",
  },

  outOf: {
    fontSize: 10,
    color: "#9CA3AF",
  },

  lowRisk: {
    fontSize: 11,
    fontWeight: "800",
    marginTop: 2,
    textAlign: "center",
  },

  riskInfo: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 10,
    color: "#6B7280",
  },

  riskLevel: {
    fontSize: 21,
    fontWeight: "800",
    marginTop: 3,
  },

  description: {
    fontSize: 10,
    color: "#6B7280",
    lineHeight: 15,
    marginTop: 7,
  },

  confidenceLabel: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 12,
    marginBottom: 5,
  },

  progress: {
    height: 7,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 10,
  },

  confidence: {
    fontSize: 9,
    marginTop: 4,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  cardSubtitle: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 4,
    marginBottom: 12,
  },

  factor: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  factorIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  factorInfo: {
    flex: 1,
  },

  factorName: {
    fontSize: 11,
    fontWeight: "700",
    color: "#374151",
  },

  factorStatus: {
    fontSize: 9,
    marginTop: 2,
  },

  factorValue: {
    fontSize: 11,
    fontWeight: "700",
    color: "#111827",
  },

  recommendation: {
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  check: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  recommendationText: {
    flex: 1,
    fontSize: 12,
    color: "#374151",
    lineHeight: 17,
  },

  loadingText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 12,
  },

});