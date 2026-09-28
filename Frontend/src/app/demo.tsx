import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  socket,
  connectSocket,
} from "../services/socket";

import { DEVICE_ID } from "../constants/config";

export default function Demo() {
  const [connected, setConnected] = useState(false);

  // ==============================
  // LIVE DATA
  // ==============================

  const [health, setHealth] = useState({
    heartRate: 82,
    spo2: 98,
    temp: 36.7,
    riskLevel: "Low",
    riskScore: 12,
  });

  // ==============================
  // DEMO MODE
  // DEFAULT ON FOR SIH DEMO
  // ==============================

  const [demoMode, setDemoMode] = useState(true);

  const [demoHR, setDemoHR] = useState("82");
  const [demoSpo2, setDemoSpo2] = useState("98");
  const [demoTemp, setDemoTemp] = useState("36.7");
  const [demoRisk, setDemoRisk] = useState("12");

  // ==============================
  // SOCKET
  // ==============================

  useEffect(() => {
    const handleConnect = () => {
      setConnected(true);

      socket.emit(
        "joinDevice",
        DEVICE_ID
      );
    };

    const handleDisconnect = () => {
      setConnected(false);
    };

    const handleHealthData = (data: any) => {
      // Don't overwrite manual demo values
      if (demoMode) return;

      setHealth({
        heartRate:
          Number(data.heartRate) || 0,

        spo2:
          Number(data.spo2) || 0,

        temp:
          Number(data.temp) || 0,

        riskLevel:
          data.riskLevel ||
          data.status ||
          "Low",

        riskScore:
          Number(data.riskScore) || 0,
      });
    };

    socket.on(
      "connect",
      handleConnect
    );

    socket.on(
      "disconnect",
      handleDisconnect
    );

    socket.on(
      "healthData",
      handleHealthData
    );

    connectSocket();

    return () => {
      socket.off(
        "connect",
        handleConnect
      );

      socket.off(
        "disconnect",
        handleDisconnect
      );

      socket.off(
        "healthData",
        handleHealthData
      );
    };
  }, [demoMode]);

  // ==============================
  // APPLY DEMO DATA
  // ==============================

  const applyDemoData = () => {
    const score =
      Number(demoRisk) || 0;

    setHealth({
      heartRate:
        Number(demoHR) || 0,

      spo2:
        Number(demoSpo2) || 0,

      temp:
        Number(demoTemp) || 0,

      riskLevel:
        score >= 70
          ? "Critical"
          : score >= 40
          ? "Moderate"
          : "Low",

      riskScore: score,
    });
  };

  // ==============================
  // RISK COLOR
  // ==============================

  const risk =
    String(
      health.riskLevel
    ).toLowerCase();

  let riskColor = "#16A34A";
  let riskBg = "#DCFCE7";

  if (
    risk.includes("moderate") ||
    risk.includes("warning")
  ) {
    riskColor = "#D97706";
    riskBg = "#FEF3C7";
  }

  if (
    risk.includes("high") ||
    risk.includes("critical") ||
    risk.includes("abnormal")
  ) {
    riskColor = "#DC2626";
    riskBg = "#FEE2E2";
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <View style={styles.header}>
          <View style={styles.logo}>
            <Ionicons
              name="heart"
              size={25}
              color="#FFFFFF"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.brand}>
              HealthTrack
            </Text>

            <Text style={styles.tagline}>
              Personal Health Companion
            </Text>
          </View>

          <View
            style={[
              styles.status,
              {
                backgroundColor:
                  connected
                    ? "#DCFCE7"
                    : "#F1F5F9",
              },
            ]}
          >
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor:
                    connected
                      ? "#22C55E"
                      : "#94A3B8",
                },
              ]}
            />

            <Text
              style={[
                styles.statusText,
                {
                  color:
                    connected
                      ? "#15803D"
                      : "#64748B",
                },
              ]}
            >
              {connected
                ? "ONLINE"
                : "OFFLINE"}
            </Text>
          </View>
        </View>

        {/* ================================= */}
        {/* SIH DEMO BADGE */}
        {/* ================================= */}

        <View style={styles.sihBanner}>
          <View style={styles.sihIcon}>
            <Ionicons
              name="rocket-outline"
              size={19}
              color="#2563EB"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.sihTitle}>
              SIH DEMONSTRATION
            </Text>

            <Text style={styles.sihText}>
              Real-time ESP32 + AI health monitoring
            </Text>
          </View>
        </View>

        {/* ================================= */}
        {/* DEVICE */}
        {/* ================================= */}

        <View style={styles.deviceCard}>
          <View style={styles.deviceIcon}>
            <Ionicons
              name="hardware-chip-outline"
              size={24}
              color="#2563EB"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.deviceTitle}>
              Health Monitoring Device
            </Text>

            <Text style={styles.deviceId}>
              {DEVICE_ID}
            </Text>
          </View>

          <View style={styles.connectedBadge}>
            <Text style={styles.connectedText}>
              {connected
                ? "Connected"
                : "Waiting"}
            </Text>
          </View>
        </View>

        {/* ================================= */}
        {/* LIVE VITALS */}
        {/* ================================= */}

        <Text style={styles.sectionTitle}>
          Current Health Status
        </Text>

        <View style={styles.vitals}>

          <Vital
            icon="heart"
            iconColor="#EF4444"
            bg="#FEE2E2"
            title="Heart Rate"
            value={health.heartRate}
            unit="BPM"
          />

          <Vital
            icon="water-outline"
            iconColor="#2563EB"
            bg="#DBEAFE"
            title="SpO₂"
            value={health.spo2}
            unit="%"
          />

          <Vital
            icon="thermometer-outline"
            iconColor="#F97316"
            bg="#FFEDD5"
            title="Temperature"
            value={health.temp}
            unit="°C"
          />

        </View>

        {/* ================================= */}
        {/* AI RISK */}
        {/* ================================= */}

        <View style={styles.aiCard}>

          <View style={styles.aiHeader}>

            <View style={styles.aiIcon}>
              <Ionicons
                name="sparkles"
                size={19}
                color="#7C3AED"
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.aiTitle}>
                AI Health Risk
              </Text>

              <Text style={styles.aiSubtitle}>
                Real-time risk analysis
              </Text>
            </View>

            <View
              style={[
                styles.riskBadge,
                {
                  backgroundColor:
                    riskBg,
                },
              ]}
            >
              <Text
                style={[
                  styles.riskText,
                  {
                    color:
                      riskColor,
                  },
                ]}
              >
                {health.riskLevel}
              </Text>
            </View>

          </View>

          <View style={styles.scoreRow}>

            <Text
              style={[
                styles.score,
                {
                  color:
                    riskColor,
                },
              ]}
            >
              {health.riskScore}
            </Text>

            <Text style={styles.scoreUnit}>
              /100
            </Text>

            <Text style={styles.scoreDescription}>
              Health Risk Score
            </Text>

          </View>

        </View>

        {/* ================================= */}
        {/* DEMO CONTROLS */}
        {/* ================================= */}

        <View style={styles.demoCard}>

          <View style={styles.demoHeader}>

            <View>
              <View style={styles.demoTitleRow}>

                <Text style={styles.demoTitle}>
                  Demo Controls
                </Text>

                <View style={styles.demoBadge}>
                  <Text style={styles.demoBadgeText}>
                    SIH
                  </Text>
                </View>

              </View>

              <Text style={styles.demoSubtitle}>
                Manually simulate patient data
              </Text>
            </View>

            <Switch
              value={demoMode}
              onValueChange={setDemoMode}
              trackColor={{
                false: "#CBD5E1",
                true: "#93C5FD",
              }}
              thumbColor={
                demoMode
                  ? "#2563EB"
                  : "#F8FAFC"
              }
            />

          </View>

          {demoMode && (
            <>

              <View style={styles.inputRow}>

                <Input
                  label="Heart Rate"
                  value={demoHR}
                  setValue={setDemoHR}
                  unit="BPM"
                />

                <Input
                  label="SpO₂"
                  value={demoSpo2}
                  setValue={setDemoSpo2}
                  unit="%"
                />

              </View>

              <View style={styles.inputRow}>

                <Input
                  label="Temperature"
                  value={demoTemp}
                  setValue={setDemoTemp}
                  unit="°C"
                />

                <Input
                  label="Risk Score"
                  value={demoRisk}
                  setValue={setDemoRisk}
                  unit="/100"
                />

              </View>

              <Pressable
                style={styles.applyButton}
                onPress={applyDemoData}
              >
                <Ionicons
                  name="play"
                  size={17}
                  color="#FFFFFF"
                />

                <Text style={styles.applyText}>
                  Apply Demo Data
                </Text>
              </Pressable>

            </>
          )}

        </View>

        {/* ================================= */}
        {/* DEMO INFO */}
        {/* ================================= */}

        <View style={styles.infoCard}>

          <Ionicons
            name="information-circle-outline"
            size={17}
            color="#64748B"
          />

          <Text style={styles.infoText}>
            Demo mode is enabled for presentation.
            Change the values above and apply them
            to simulate different health conditions.
          </Text>

        </View>

        {/* ================================= */}
        {/* CONTINUE */}
        {/* ================================= */}

        <Pressable
          style={styles.dashboardButton}
          onPress={() =>
            router.replace("/(tabs)")
          }
        >
          <Text style={styles.dashboardText}>
            Continue to Dashboard
          </Text>

          <Ionicons
            name="arrow-forward"
            size={20}
            color="#FFFFFF"
          />
        </Pressable>

        <Text style={styles.footer}>
          Smart sensing • Edge AI • Real-time monitoring
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

// =================================================
// VITAL COMPONENT
// =================================================

function Vital({
  icon,
  iconColor,
  bg,
  title,
  value,
  unit,
}: any) {
  return (
    <View style={styles.vitalCard}>

      <View
        style={[
          styles.vitalIcon,
          {
            backgroundColor: bg,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={20}
          color={iconColor}
        />
      </View>

      <Text style={styles.vitalTitle}>
        {title}
      </Text>

      <View style={styles.vitalValueRow}>

        <Text style={styles.vitalValue}>
          {value}
        </Text>

        <Text style={styles.vitalUnit}>
          {unit}
        </Text>

      </View>

    </View>
  );
}

// =================================================
// INPUT
// =================================================

function Input({
  label,
  value,
  setValue,
  unit,
}: any) {
  return (
    <View style={styles.inputContainer}>

      <Text style={styles.inputLabel}>
        {label}
      </Text>

      <View style={styles.inputBox}>

        <TextInput
          value={value}
          onChangeText={setValue}
          keyboardType="decimal-pad"
          style={styles.input}
          placeholder="0"
        />

        <Text style={styles.inputUnit}>
          {unit}
        </Text>

      </View>

    </View>
  );
}

// =================================================
// STYLES
// =================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 30,
    justifyContent: "center",
  },

  // HEADER

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  brand: {
    fontSize: 21,
    fontWeight: "900",
    color: "#111827",
  },

  tagline: {
    marginTop: 2,
    fontSize: 10,
    color: "#94A3B8",
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 20,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    marginRight: 5,
  },

  statusText: {
    fontSize: 9,
    fontWeight: "900",
  },

  // SIH

  sihBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderRadius: 17,
    padding: 13,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },

  sihIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  sihTitle: {
    fontSize: 10,
    fontWeight: "900",
    color: "#2563EB",
    letterSpacing: 0.6,
  },

  sihText: {
    marginTop: 3,
    fontSize: 11,
    color: "#64748B",
  },

  // DEVICE

  deviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 13,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E8EDF3",
  },

  deviceIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  deviceTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#111827",
  },

  deviceId: {
    marginTop: 3,
    fontSize: 9,
    color: "#94A3B8",
  },

  connectedBadge: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  connectedText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#64748B",
  },

  // VITALS

  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 10,
  },

  vitals: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  vitalCard: {
    width: "31.8%",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E8EDF3",
  },

  vitalIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },

  vitalTitle: {
    marginTop: 8,
    fontSize: 9,
    color: "#64748B",
    fontWeight: "600",
  },

  vitalValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 3,
  },

  vitalValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
  },

  vitalUnit: {
    marginLeft: 2,
    fontSize: 8,
    color: "#94A3B8",
    fontWeight: "700",
  },

  // AI

  aiCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8EDF3",
    marginBottom: 12,
  },

  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  aiIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  aiTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#111827",
  },

  aiSubtitle: {
    marginTop: 2,
    fontSize: 9,
    color: "#94A3B8",
  },

  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },

  riskText: {
    fontSize: 10,
    fontWeight: "900",
  },

  scoreRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "baseline",
  },

  score: {
    fontSize: 38,
    fontWeight: "900",
  },

  scoreUnit: {
    marginLeft: 3,
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "700",
  },

  scoreDescription: {
    marginLeft: 10,
    fontSize: 10,
    color: "#64748B",
  },

  // DEMO

  demoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8EDF3",
    marginBottom: 13,
  },

  demoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  demoTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  demoTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#111827",
  },

  demoBadge: {
    marginLeft: 7,
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },

  demoBadgeText: {
    fontSize: 7,
    fontWeight: "900",
    color: "#2563EB",
  },

  demoSubtitle: {
    marginTop: 3,
    fontSize: 9,
    color: "#94A3B8",
  },

  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 13,
  },

  inputContainer: {
    width: "48%",
  },

  inputLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 5,
  },

  inputBox: {
    height: 42,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
  },

  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  inputUnit: {
    fontSize: 9,
    color: "#94A3B8",
    fontWeight: "700",
  },

  applyButton: {
    height: 43,
    marginTop: 14,
    borderRadius: 12,
    backgroundColor: "#111827",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  applyText: {
    marginLeft: 7,
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },

  // INFO

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },

  infoText: {
    flex: 1,
    marginLeft: 7,
    fontSize: 9,
    lineHeight: 14,
    color: "#64748B",
  },

  // DASHBOARD

  dashboardButton: {
    height: 53,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#2563EB",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 9,

    elevation: 5,
  },

  dashboardText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    marginRight: 8,
  },

  footer: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 9,
    color: "#94A3B8",
  },
});