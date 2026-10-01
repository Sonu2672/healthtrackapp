import { useEffect, useState } from "react";
import { router } from "expo-router";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import {
  socket,
  connectSocket,
} from "../../services/socket";

import { DEVICE_ID } from "../../constants/config";
import { useHealth } from "../../../context/HealthContext";


export default function Home() {
  // const [connected, setConnected] = useState(false);
  const { health, connected } = useHealth();

  console.log("🏠 HOME HEALTH:", health);

  // ==================================================
  // SOCKET.IO
  // ==================================================

  // useEffect(() => {
  //   const handleConnect = () => {
  //     console.log("🟢 SOCKET CONNECTED:", socket.id);

  //     setConnected(true);

  //     // Join this device
  //     socket.emit("joinDevice", DEVICE_ID);
  //   };

  //   const handleDisconnect = () => {
  //     console.log("🔴 SOCKET DISCONNECTED");

  //     setConnected(false);
  //   };

  //   // Socket.IO se jo data aaye
  //   const handleHealthData = (data: any) => {
  //     console.log("❤️ HEALTH DATA:", data);

  //     // Directly state me data daal do
  //     setHealth({
  //       heartRate: Number(data.heartRate) || 0,
  //       spo2: Number(data.spo2) || 0,
  //       temp: Number(data.temp) || 0,

  //       riskLevel:
  //         data.riskLevel ||
  //         data.mlStatus ||
  //         data.status ||
  //         "Normal",

  //       riskScore:
  //         Number(
  //           data.riskScore ||
  //           data.mlConfidence ||
  //           0
  //         ),
  //     });
  //   };

  //   // Listeners
  //   socket.on("connect", handleConnect);
  //   socket.on("disconnect", handleDisconnect);
  //   socket.on("healthData", handleHealthData);

  //   // Connect
  //   connectSocket();

  //   // Agar socket already connected hai
  //   if (socket.connected) {
  //     handleConnect();
  //   }

  //   // Cleanup
  //   return () => {
  //     socket.off("connect", handleConnect);
  //     socket.off("disconnect", handleDisconnect);
  //     socket.off("healthData", handleHealthData);
  //   };
  // }, []);

  // ==================================================
  // RISK
  // ==================================================

  const risk = String(health.riskLevel).toLowerCase();

  let riskColor = "#16A34A";
  let riskBg = "#DCFCE7";
  let riskSymbol = "✓";

  if (risk.includes("moderate")) {
    riskColor = "#D97706";
    riskBg = "#FEF3C7";
    riskSymbol = "!";
  }

  if (risk.includes("high") || risk.includes("critical")) {
    riskColor = "#DC2626";
    riskBg = "#FEE2E2";
    riskSymbol = "!";
  }

  // ==================================================
  // UI
  // ==================================================

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Good Evening, Sonu! 👋
          </Text>

          <Text style={styles.subtitle}>
            Here's your health overview
          </Text>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.notification}>
            <Text style={styles.notificationIcon}>
              ♢
            </Text>

            <View style={styles.notificationDot} />
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              S
            </Text>
          </View>
        </View>
      </View>

      {/* DEVICE STATUS */}

      <View style={styles.deviceCard}>
        <View style={styles.deviceLeft}>
          <View style={styles.deviceIcon}>
            <Text style={styles.deviceIconText}>
              ▣
            </Text>
          </View>

          <View>
            <Text style={styles.deviceTitle}>
              Health Device
            </Text>

            <Text style={styles.deviceId}>
              {DEVICE_ID}
            </Text>
          </View>
        </View>

        <View style={styles.onlineBadge}>
          <View style={styles.onlineDot} />

          <Text style={styles.onlineText}>
            {connected ? "ONLINE" : "OFFLINE"}
          </Text>
        </View>
      </View>

      {/* ==================================================
          DEMO BUTTON
          ================================================== */}

      <Pressable
        onPress={() => router.push("/demo")}
        style={({ pressed }) => [
          styles.demoButton,
          pressed && styles.demoButtonPressed,
        ]}
      >
        <View style={styles.demoButtonGlow} />

        <Text style={styles.demoButtonSparkle}>
          ✦
        </Text>

        <Text style={styles.demoButtonText}>
          Try Demo Data
        </Text>

        <Text style={styles.demoButtonArrow}>
          →
        </Text>
      </Pressable>

      {/* HEALTH OVERVIEW */}

      <Text style={styles.sectionTitle}>
        Health Overview
      </Text>

      <View style={styles.healthGrid}>
        {/* HEART RATE */}

        <MetricCard
          icon="♥"
          iconColor="#EF4444"
          iconBg="#FEE2E2"
          title="Heart Rate"
          value={health.heartRate}
          unit="BPM"
          comparison="Live monitoring"
          graphType="heart"
        />

        {/* SPO2 */}

        <MetricCard
          icon="◉"
          iconColor="#2563EB"
          iconBg="#DBEAFE"
          title="SpO₂"
          value={health.spo2}
          unit="%"
          comparison="Blood oxygen"
          graphType="spo2"
        />

        {/* TEMPERATURE */}

        <MetricCard
          icon="♨"
          iconColor="#F97316"
          iconBg="#FFEDD5"
          title="Temperature"
          value={health.temp}
          unit="°C"
          comparison="Body temperature"
          graphType="temperature"
        />

        {/* ACTIVITY */}

        <MetricCard
          icon="●"
          iconColor="#16A34A"
          iconBg="#DCFCE7"
          title="Activity"
          value="Active"
          unit=""
          comparison="Device connected"
          graphType="activity"
        />
      </View>

      {/* AI RISK SCORE */}

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>
              AI Risk Score
            </Text>

            <Text style={styles.cardSubtitle}>
              Real-time health analysis
            </Text>
          </View>

          <Text style={styles.sparkleIcon}>
            ✦
          </Text>
        </View>

        <View style={styles.riskArea}>
          <View
            style={[
              styles.riskCircleOuter,
              {
                borderColor: riskColor,
              },
            ]}
          >
            <View
              style={[
                styles.riskCircleInner,
                {
                  backgroundColor: riskBg,
                },
              ]}
            >
              <Text
                style={[
                  styles.riskScore,
                  {
                    color: riskColor,
                  },
                ]}
              >
                {health.riskScore}
              </Text>

              <Text style={styles.outOf}>
                /100
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.riskBadge,
              {
                backgroundColor: riskBg,
              },
            ]}
          >
            <Text
              style={[
                styles.riskSymbol,
                {
                  color: riskColor,
                },
              ]}
            >
              {riskSymbol}
            </Text>

            <Text
              style={[
                styles.riskBadgeText,
                {
                  color: riskColor,
                },
              ]}
            >
              {health.riskLevel}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.riskMessage,
            {
              backgroundColor: riskBg,
            },
          ]}
        >
          <Text
            style={[
              styles.riskMessageTitle,
              {
                color: riskColor,
              },
            ]}
          >
            You are at {health.riskLevel}
          </Text>

          <Text style={styles.riskMessageText}>
            {risk.includes("high") ||
            risk.includes("critical") ||
            risk.includes("abnormal")
              ? "Immediate attention recommended."
              : "Continue monitoring your health."}
          </Text>
        </View>
      </View>

      {/* BOTTOM TAB SPACE */}

      <View style={styles.tabSpace} />
    </ScrollView>
  );
}


// ==================================================
// METRIC CARD
// ==================================================

function MetricCard({
  icon,
  iconColor,
  iconBg,
  title,
  value,
  unit,
  comparison,
  graphType,
}) {
  const graphPoints =
    graphType === "activity"
      ? [20, 35, 25, 55, 40, 70, 50]
      : graphType === "spo2"
      ? [65, 70, 62, 75, 68, 78, 72]
      : graphType === "temperature"
      ? [30, 38, 35, 45, 42, 50, 47]
      : [25, 35, 28, 48, 38, 62, 50];

  return (
    <View style={styles.metricCard}>
      <View style={styles.metricTop}>
        <View
          style={[
            styles.metricIcon,
            {
              backgroundColor: iconBg,
            },
          ]}
        >
          <Text
            style={[
              styles.metricIconText,
              {
                color: iconColor,
              },
            ]}
          >
            {icon}
          </Text>
        </View>

        <Text style={styles.metricTitle}>
          {title}
        </Text>
      </View>

      <View style={styles.metricValueRow}>
        <Text style={styles.metricValue}>
          {value}
        </Text>

        {unit ? (
          <Text style={styles.metricUnit}>
            {unit}
          </Text>
        ) : null}
      </View>

      <Text style={styles.metricComparison}>
        {comparison}
      </Text>

      <View style={styles.miniGraph}>
        {graphPoints.map((height, index) => (
          <View
            key={index}
            style={[
              styles.graphBar,
              {
                height: `${height}%`,
                backgroundColor: iconColor,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}


// ==================================================
// STYLES
// ==================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 55,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  greeting: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 13,
    color: "#8A94A6",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  notification: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "#EEF1F5",
  },

  notificationIcon: {
    fontSize: 24,
    color: "#374151",
  },

  notificationDot: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: "#EF4444",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  deviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#EEF1F5",
  },

  deviceLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  deviceIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  deviceIconText: {
    fontSize: 21,
    color: "#2563EB",
  },

  deviceTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  deviceId: {
    marginTop: 3,
    fontSize: 11,
    color: "#9CA3AF",
  },

  onlineBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },

  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: "#22C55E",
    marginRight: 5,
  },

  onlineText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#15803D",
  },

  // ==================================================
  // DEMO BUTTON
  // ==================================================

  demoButton: {
    height: 56,
    borderRadius: 17,

    backgroundColor: "#050505",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 25,

    position: "relative",

    borderWidth: 1,
    borderColor: "#272727",

    shadowColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 12,

    elevation: 8,
  },

  demoButtonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },

  demoButtonGlow: {
    position: "absolute",

    width: "70%",
    height: 25,

    top: -4,

    borderRadius: 30,

    backgroundColor: "#FFFFFF",

    opacity: 0.06,
  },

  demoButtonSparkle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",

    marginRight: 9,
  },

  demoButtonText: {
    color: "#FFFFFF",

    fontSize: 15,
    fontWeight: "900",

    letterSpacing: 0.4,
  },

  demoButtonArrow: {
    color: "#FFFFFF",

    fontSize: 21,
    fontWeight: "700",

    marginLeft: 10,

    opacity: 0.85,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 13,
  },

  healthGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  metricCard: {
    width: "48.3%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEF1F5",
  },

  metricTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  metricIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  metricIconText: {
    fontSize: 18,
    fontWeight: "800",
  },

  metricTitle: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },

  metricValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 12,
  },

  metricValue: {
    fontSize: 27,
    fontWeight: "800",
    color: "#111827",
  },

  metricUnit: {
    marginLeft: 4,
    fontSize: 11,
    color: "#8A94A6",
    fontWeight: "600",
  },

  metricComparison: {
    marginTop: 4,
    fontSize: 10,
    color: "#9CA3AF",
  },

  miniGraph: {
    height: 38,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 4,
  },

  graphBar: {
    flex: 1,
    minHeight: 4,
    opacity: 0.65,
    borderRadius: 4,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    marginTop: 8,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EEF1F5",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },

  cardSubtitle: {
    marginTop: 4,
    fontSize: 11,
    color: "#9CA3AF",
  },

  sparkleIcon: {
    fontSize: 23,
    color: "#7C3AED",
  },

  riskArea: {
    alignItems: "center",
    marginTop: 20,
  },

  riskCircleOuter: {
    width: 145,
    height: 145,
    borderRadius: 100,
    borderWidth: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  riskCircleInner: {
    width: 108,
    height: 108,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  riskScore: {
    fontSize: 34,
    fontWeight: "900",
  },

  outOf: {
    marginTop: -5,
    fontSize: 11,
    color: "#9CA3AF",
  },

  riskBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: -4,
  },

  riskSymbol: {
    fontSize: 17,
    fontWeight: "900",
  },

  riskBadgeText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "800",
  },

  riskMessage: {
    marginTop: 17,
    borderRadius: 13,
    padding: 12,
  },

  riskMessageTitle: {
    fontSize: 12,
    fontWeight: "800",
  },

  riskMessageText: {
    marginTop: 3,
    fontSize: 11,
    color: "#6B7280",
  },

  tabSpace: {
    height: 90,
  },
});