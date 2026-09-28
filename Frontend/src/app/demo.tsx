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
  useWindowDimensions,
} from "react-native";

import { socket, connectSocket } from "../services/socket";
import { DEVICE_ID } from "../constants/config";

export default function Demo() {
  const { width } = useWindowDimensions();

  const isDesktop = width >= 1024;

  const [connected, setConnected] = useState(false);

  const [health, setHealth] = useState({
    heartRate: 82,
    spo2: 98,
    temp: 36.7,
    riskLevel: "Low",
    riskScore: 12,
  });

  const [demoMode, setDemoMode] = useState(true);

  const [demoHR, setDemoHR] = useState("82");
  const [demoSpo2, setDemoSpo2] = useState("98");
  const [demoTemp, setDemoTemp] = useState("36.7");
  const [demoRisk, setDemoRisk] = useState("12");

  // =====================================================
  // SOCKET
  // =====================================================

  useEffect(() => {
    const handleConnect = () => {
      setConnected(true);
      socket.emit("joinDevice", DEVICE_ID);
    };

    const handleDisconnect = () => {
      setConnected(false);
    };

    const handleHealthData = (data: any) => {
      if (demoMode) return;

      setHealth({
        heartRate: Number(data.heartRate) || 0,
        spo2: Number(data.spo2) || 0,
        temp: Number(data.temp) || 0,
        riskLevel: data.riskLevel || data.status || "Low",
        riskScore: Number(data.riskScore) || 0,
      });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("healthData", handleHealthData);

    connectSocket();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("healthData", handleHealthData);
    };
  }, [demoMode]);

  // =====================================================
  // DEMO DATA
  // =====================================================

  const applyDemoData = () => {
    const score = Number(demoRisk) || 0;

    let level = "Low";

    if (score >= 70) {
      level = "Critical";
    } else if (score >= 40) {
      level = "Moderate";
    }

    setHealth({
      heartRate: Number(demoHR) || 0,
      spo2: Number(demoSpo2) || 0,
      temp: Number(demoTemp) || 0,
      riskLevel: level,
      riskScore: score,
    });
  };

  // =====================================================
  // RISK COLOR
  // =====================================================

  const risk = String(health.riskLevel).toLowerCase();

  let riskColor = "#16A34A";
  let riskBg = "#DCFCE7";

  if (risk.includes("moderate") || risk.includes("warning")) {
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

  // =====================================================
  // MOBILE
  // =====================================================

  if (!isDesktop) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.mobileContent}
        >
          {/* HEADER */}

          <View style={styles.mobileHeader}>
            <View style={styles.mobileLogo}>
              <Ionicons
                name="heart"
                size={25}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.flex}>
              <Text style={styles.mobileBrand}>
                HealthTrack
              </Text>

              <Text style={styles.mobileTagline}>
                Personal Health Companion
              </Text>
            </View>

            <View
              style={[
                styles.mobileStatus,
                {
                  backgroundColor: connected
                    ? "#DCFCE7"
                    : "#F1F5F9",
                },
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor: connected
                      ? "#22C55E"
                      : "#94A3B8",
                  },
                ]}
              />

              <Text
                style={[
                  styles.statusText,
                  {
                    color: connected
                      ? "#15803D"
                      : "#64748B",
                  },
                ]}
              >
                {connected ? "ONLINE" : "OFFLINE"}
              </Text>
            </View>
          </View>

          {/* SIH BANNER */}

          <View style={styles.sihBanner}>
            <View style={styles.sihIcon}>
              <Ionicons
                name="rocket-outline"
                size={19}
                color="#2563EB"
              />
            </View>

            <View style={styles.flex}>
              <Text style={styles.sihTitle}>
                SIH DEMONSTRATION
              </Text>

              <Text style={styles.sihText}>
                Real-time ESP32 + AI health monitoring
              </Text>
            </View>
          </View>

          {/* DEVICE */}

          <View style={styles.mobileDeviceCard}>
            <View style={styles.mobileDeviceIcon}>
              <Ionicons
                name="hardware-chip-outline"
                size={24}
                color="#2563EB"
              />
            </View>

            <View style={styles.flex}>
              <Text style={styles.deviceTitle}>
                Health Monitoring Device
              </Text>

              <Text style={styles.deviceId}>
                {DEVICE_ID}
              </Text>
            </View>

            <View style={styles.connectedBadge}>
              <Text style={styles.connectedText}>
                {connected ? "Connected" : "Waiting"}
              </Text>
            </View>
          </View>

          {/* VITALS */}

          <Text style={styles.sectionTitle}>
            Current Health Status
          </Text>

          <View style={styles.mobileVitals}>
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

          {/* AI RISK */}

          <View style={styles.mobileRiskCard}>
            <View style={styles.mobileRiskHeader}>
              <View style={styles.mobileAiIcon}>
                <Ionicons
                  name="sparkles"
                  size={19}
                  color="#7C3AED"
                />
              </View>

              <View style={styles.flex}>
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
                    backgroundColor: riskBg,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.riskText,
                    {
                      color: riskColor,
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
                    color: riskColor,
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

          {/* DEMO CONTROLS */}

          <View style={styles.mobileDemoCard}>
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
                  demoMode ? "#2563EB" : "#F8FAFC"
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

          <Pressable
            style={styles.dashboardButton}
            onPress={() => router.replace("/(tabs)")}
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

  // =====================================================
  // DESKTOP WEBSITE
  // =====================================================

  return (
    <SafeAreaView style={styles.desktopContainer}>
      <View style={styles.desktopLayout}>

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <View style={styles.sidebar}>

          {/* BRAND */}

          <View style={styles.sidebarBrand}>
            <View style={styles.sidebarLogo}>
              <Ionicons
                name="heart"
                size={23}
                color="#FFFFFF"
              />
            </View>

            <View>
              <Text style={styles.sidebarTitle}>
                HealthTrack
              </Text>

              <Text style={styles.sidebarSubtitle}>
                Health Companion
              </Text>
            </View>
          </View>

          {/* MENU */}

          <View style={styles.sidebarMenu}>

            {/* NO ACTIVE ITEM ON DEMO PAGE */}

            <SidebarItem
              icon="grid-outline"
              title="Dashboard"
              onPress={() =>
                router.replace("/(tabs)")
              }
            />

            <SidebarItem
              icon="heart-outline"
              title="Health"
              onPress={() =>
                router.replace("/(tabs)/health")
              }
            />

            <SidebarItem
              icon="analytics-outline"
              title="AI Risk"
              onPress={() =>
                router.replace("/(tabs)/risk")
              }
            />

            <SidebarItem
              icon="warning-outline"
              title="Disaster Alert"
              onPress={() =>
                router.replace("/(tabs)/disaster")
              }
            />

            <SidebarItem
              icon="leaf-outline"
              title="Environment"
              onPress={() =>
                router.replace("/(tabs)/environment")
              }
            />

            <SidebarItem
              icon="person-outline"
              title="Profile"
              onPress={() =>
                router.replace("/(tabs)/profile")
              }
            />
          </View>

          {/* BOTTOM DEVICE */}

          <View style={styles.sidebarBottom}>
            <View style={styles.sidebarDevice}>
              <View style={styles.sidebarDeviceIcon}>
                <Ionicons
                  name="hardware-chip-outline"
                  size={18}
                  color="#2563EB"
                />
              </View>

              <View style={styles.flex}>
                <Text style={styles.sidebarDeviceTitle}>
                  ESP32 Device
                </Text>

                <Text style={styles.sidebarDeviceId}>
                  {DEVICE_ID}
                </Text>
              </View>
            </View>

            <Text style={styles.sidebarVersion}>
              HealthTrack v1.0
            </Text>
          </View>
        </View>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <ScrollView
          style={styles.desktopScroll}
          contentContainerStyle={styles.desktopContent}
          showsVerticalScrollIndicator={false}
        >

          {/* HEADER */}

          <View style={styles.webHeader}>
            <View>
              <Text style={styles.webGreeting}>
                Health Dashboard
              </Text>

              <Text style={styles.webSubheading}>
                Monitor your health in real-time
              </Text>
            </View>

            <View style={styles.webHeaderRight}>
              <View
                style={[
                  styles.onlineBadge,
                  {
                    backgroundColor: connected
                      ? "#DCFCE7"
                      : "#F1F5F9",
                  },
                ]}
              >
                <View
                  style={[
                    styles.onlineDot,
                    {
                      backgroundColor: connected
                        ? "#22C55E"
                        : "#94A3B8",
                    },
                  ]}
                />

                <Text
                  style={[
                    styles.onlineText,
                    {
                      color: connected
                        ? "#15803D"
                        : "#64748B",
                    },
                  ]}
                >
                  {connected
                    ? "Device Online"
                    : "Device Offline"}
                </Text>
              </View>

              <View style={styles.avatar}>
                <Ionicons
                  name="person"
                  size={18}
                  color="#64748B"
                />
              </View>
            </View>
          </View>

          {/* SMART HEALTH BANNER */}

          <View style={styles.webBanner}>
            <View style={styles.webBannerIcon}>
              <Ionicons
                name="sparkles"
                size={22}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.flex}>
              <Text style={styles.webBannerTitle}>
                Smart Health Monitoring
              </Text>

              <Text style={styles.webBannerText}>
                ESP32 sensors + Edge AI + Real-time health
                risk analysis
              </Text>
            </View>

            <View style={styles.livePill}>
              <View style={styles.liveDot} />

              <Text style={styles.liveText}>
                LIVE
              </Text>
            </View>
          </View>

          {/* HEALTH OVERVIEW */}

          <View style={styles.webSectionHeader}>
            <View>
              <Text style={styles.webSectionTitle}>
                Health Overview
              </Text>

              <Text style={styles.webSectionSubtitle}>
                Latest readings from your connected device
              </Text>
            </View>

            <Text style={styles.updatedText}>
              Updated just now
            </Text>
          </View>

          <View style={styles.webVitals}>

            <DesktopVital
              icon="heart"
              iconColor="#EF4444"
              bg="#FEE2E2"
              title="Heart Rate"
              value={health.heartRate}
              unit="BPM"
              description="Current heart rate"
            />

            <DesktopVital
              icon="water-outline"
              iconColor="#2563EB"
              bg="#DBEAFE"
              title="Blood Oxygen"
              value={health.spo2}
              unit="%"
              description="Oxygen saturation"
            />

            <DesktopVital
              icon="thermometer-outline"
              iconColor="#F97316"
              bg="#FFEDD5"
              title="Body Temperature"
              value={health.temp}
              unit="°C"
              description="Current body temperature"
            />

          </View>

          {/* AI + DEVICE */}

          <View style={styles.mainGrid}>

            {/* AI RISK */}

            <View style={styles.webCard}>
              <View style={styles.webCardHeader}>
                <View>
                  <Text style={styles.webCardTitle}>
                    AI Health Risk
                  </Text>

                  <Text style={styles.webCardSubtitle}>
                    AI-powered health assessment
                  </Text>
                </View>

                <View style={styles.aiSparkle}>
                  <Ionicons
                    name="sparkles"
                    size={18}
                    color="#7C3AED"
                  />
                </View>
              </View>

              <View style={styles.riskMain}>
                <View>
                  <Text style={styles.riskScoreLabel}>
                    RISK SCORE
                  </Text>

                  <View style={styles.riskNumberRow}>
                    <Text
                      style={[
                        styles.webRiskNumber,
                        {
                          color: riskColor,
                        },
                      ]}
                    >
                      {health.riskScore}
                    </Text>

                    <Text style={styles.webRiskOutOf}>
                      /100
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.largeRiskBadge,
                    {
                      backgroundColor: riskBg,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.riskBadgeDot,
                      {
                        backgroundColor: riskColor,
                      },
                    ]}
                  />

                  <Text
                    style={[
                      styles.largeRiskText,
                      {
                        color: riskColor,
                      },
                    ]}
                  >
                    {health.riskLevel}
                  </Text>
                </View>
              </View>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min(
                        health.riskScore,
                        100
                      )}%`,
                      backgroundColor: riskColor,
                    },
                  ]}
                />
              </View>

              <View style={styles.riskFooter}>
                <Text style={styles.riskFooterText}>
                  AI analysis based on real-time sensor data
                </Text>

                <Ionicons
                  name="shield-checkmark-outline"
                  size={17}
                  color="#16A34A"
                />
              </View>
            </View>

            {/* DEVICE */}

            <View style={styles.webCard}>
              <View style={styles.webCardHeader}>
                <View>
                  <Text style={styles.webCardTitle}>
                    Device Status
                  </Text>

                  <Text style={styles.webCardSubtitle}>
                    Connected monitoring device
                  </Text>
                </View>

                <View
                  style={[
                    styles.deviceStatusIcon,
                    {
                      backgroundColor: connected
                        ? "#DCFCE7"
                        : "#F1F5F9",
                    },
                  ]}
                >
                  <Ionicons
                    name="hardware-chip-outline"
                    size={19}
                    color={
                      connected
                        ? "#16A34A"
                        : "#64748B"
                    }
                  />
                </View>
              </View>

              <View style={styles.desktopDeviceBody}>
                <View
                  style={[
                    styles.bigDeviceIcon,
                    {
                      backgroundColor: connected
                        ? "#EFF6FF"
                        : "#F8FAFC",
                    },
                  ]}
                >
                  <Ionicons
                    name="pulse-outline"
                    size={34}
                    color={
                      connected
                        ? "#2563EB"
                        : "#94A3B8"
                    }
                  />
                </View>

                <View style={styles.flex}>
                  <Text style={styles.bigDeviceTitle}>
                    ESP32 Health Monitor
                  </Text>

                  <Text style={styles.bigDeviceId}>
                    Device ID: {DEVICE_ID}
                  </Text>

                  <View style={styles.deviceOnlineRow}>
                    <View
                      style={[
                        styles.deviceOnlineDot,
                        {
                          backgroundColor: connected
                            ? "#22C55E"
                            : "#94A3B8",
                        },
                      ]}
                    />

                    <Text style={styles.deviceOnlineText}>
                      {connected
                        ? "Connected and receiving data"
                        : "Waiting for connection"}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.deviceStats}>
                <MiniStat
                  label="Connection"
                  value={connected ? "Active" : "Offline"}
                />

                <MiniStat
                  label="Data Stream"
                  value={connected ? "Live" : "Paused"}
                />

                <MiniStat
                  label="Protocol"
                  value="Socket.IO"
                />
              </View>
            </View>
          </View>

          {/* DEMO CONTROLS */}

          <View style={styles.webSectionHeader}>
            <View>
              <Text style={styles.webSectionTitle}>
                Demonstration Controls
              </Text>

              <Text style={styles.webSectionSubtitle}>
                Simulate different patient health conditions
              </Text>
            </View>

            <View style={styles.demoModeIndicator}>
              <View style={styles.demoModeDot} />

              <Text style={styles.demoModeText}>
                Demo Mode
              </Text>

              <Switch
                value={demoMode}
                onValueChange={setDemoMode}
                trackColor={{
                  false: "#CBD5E1",
                  true: "#93C5FD",
                }}
                thumbColor={
                  demoMode ? "#2563EB" : "#F8FAFC"
                }
              />
            </View>
          </View>

          {demoMode && (
            <View style={styles.webDemoCard}>
              <View style={styles.demoInputs}>
                <WebInput
                  label="Heart Rate"
                  value={demoHR}
                  setValue={setDemoHR}
                  unit="BPM"
                />

                <WebInput
                  label="SpO₂"
                  value={demoSpo2}
                  setValue={setDemoSpo2}
                  unit="%"
                />

                <WebInput
                  label="Temperature"
                  value={demoTemp}
                  setValue={setDemoTemp}
                  unit="°C"
                />

                <WebInput
                  label="Risk Score"
                  value={demoRisk}
                  setValue={setDemoRisk}
                  unit="/100"
                />

                <Pressable
                  style={styles.webApplyButton}
                  onPress={applyDemoData}
                >
                  <Ionicons
                    name="play"
                    size={17}
                    color="#FFFFFF"
                  />

                  <Text style={styles.webApplyText}>
                    Apply Simulation
                  </Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* BOTTOM */}

          <View style={styles.bottomGrid}>

            <View style={styles.infoWebCard}>
              <View style={styles.infoWebIcon}>
                <Ionicons
                  name="information-circle-outline"
                  size={21}
                  color="#2563EB"
                />
              </View>

              <View style={styles.flex}>
                <Text style={styles.infoWebTitle}>
                  About this demonstration
                </Text>

                <Text style={styles.infoWebText}>
                  HealthTrack combines ESP32 sensor data,
                  Edge AI and machine learning to monitor
                  health conditions in real-time.
                </Text>
              </View>
            </View>

            <Pressable
              style={styles.dashboardWebButton}
              onPress={() => router.replace("/(tabs)")}
            >
              <Ionicons
                name="grid-outline"
                size={19}
                color="#FFFFFF"
              />

              <Text style={styles.dashboardWebText}>
                Open Full Dashboard
              </Text>

              <Ionicons
                name="arrow-forward"
                size={18}
                color="#FFFFFF"
              />
            </Pressable>
          </View>

          <Text style={styles.webFooter}>
            HealthTrack • Smart sensing • Edge AI •
            Real-time monitoring
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// =====================================================
// SIDEBAR ITEM
// =====================================================

function SidebarItem({
  icon,
  title,
  onPress,
}: {
  icon: any;
  title: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.sidebarItem,
        pressed && styles.sidebarItemPressed,
      ]}
    >
      <Ionicons
        name={icon}
        size={20}
        color="#64748B"
      />

      <Text style={styles.sidebarItemText}>
        {title}
      </Text>
    </Pressable>
  );
}

// =====================================================
// DESKTOP VITAL
// =====================================================

function DesktopVital({
  icon,
  iconColor,
  bg,
  title,
  value,
  unit,
  description,
}: any) {
  return (
    <View style={styles.desktopVitalCard}>
      <View style={styles.desktopVitalTop}>
        <View
          style={[
            styles.desktopVitalIcon,
            {
              backgroundColor: bg,
            },
          ]}
        >
          <Ionicons
            name={icon}
            size={22}
            color={iconColor}
          />
        </View>

        <Ionicons
          name="ellipsis-horizontal"
          size={19}
          color="#CBD5E1"
        />
      </View>

      <Text style={styles.desktopVitalTitle}>
        {title}
      </Text>

      <View style={styles.desktopValueRow}>
        <Text style={styles.desktopVitalValue}>
          {value}
        </Text>

        <Text style={styles.desktopVitalUnit}>
          {unit}
        </Text>
      </View>

      <Text style={styles.desktopVitalDescription}>
        {description}
      </Text>
    </View>
  );
}

// =====================================================
// MINI STAT
// =====================================================

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.miniStat}>
      <Text style={styles.miniStatLabel}>
        {label}
      </Text>

      <Text style={styles.miniStatValue}>
        {value}
      </Text>
    </View>
  );
}

// =====================================================
// WEB INPUT
// =====================================================

function WebInput({
  label,
  value,
  setValue,
  unit,
}: any) {
  return (
    <View style={styles.webInputContainer}>
      <Text style={styles.webInputLabel}>
        {label}
      </Text>

      <View style={styles.webInputBox}>
        <TextInput
          value={value}
          onChangeText={setValue}
          keyboardType="decimal-pad"
          style={styles.webInput}
        />

        <Text style={styles.webInputUnit}>
          {unit}
        </Text>
      </View>
    </View>
  );
}

// =====================================================
// MOBILE VITAL
// =====================================================

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

// =====================================================
// MOBILE INPUT
// =====================================================

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

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  // ===================================================
  // COMMON
  // ===================================================

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  flex: {
    flex: 1,
  },

  // ===================================================
  // MOBILE
  // ===================================================

  mobileContent: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 30,
  },

  mobileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
  },

  mobileLogo: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  mobileBrand: {
    fontSize: 21,
    fontWeight: "900",
    color: "#111827",
  },

  mobileTagline: {
    marginTop: 2,
    fontSize: 10,
    color: "#94A3B8",
  },

  mobileStatus: {
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

  // ===================================================
  // SIH
  // ===================================================

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

  // ===================================================
  // MOBILE DEVICE
  // ===================================================

  mobileDeviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 13,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E8EDF3",
  },

  mobileDeviceIcon: {
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

  // ===================================================
  // MOBILE VITALS
  // ===================================================

  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 10,
  },

  mobileVitals: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
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

  // ===================================================
  // MOBILE RISK
  // ===================================================

  mobileRiskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8EDF3",
    marginBottom: 12,
  },

  mobileRiskHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  mobileAiIcon: {
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

  // ===================================================
  // MOBILE DEMO
  // ===================================================

  mobileDemoCard: {
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
    gap: 12,
    marginTop: 13,
  },

  inputContainer: {
    flex: 1,
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

  // ===================================================
  // MOBILE INFO
  // ===================================================

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

  dashboardButton: {
    height: 53,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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

  // ===================================================
  // DESKTOP
  // ===================================================

  desktopContainer: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  desktopLayout: {
    flex: 1,
    flexDirection: "row",
  },

  // ===================================================
  // SIDEBAR
  // ===================================================

  sidebar: {
    width: 245,
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    paddingHorizontal: 15,
    paddingTop: 28,
    paddingBottom: 20,
  },

  sidebarBrand: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 40,
  },

  sidebarLogo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  sidebarTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#111827",
  },

  sidebarSubtitle: {
    marginTop: 2,
    fontSize: 9,
    color: "#94A3B8",
  },

  sidebarMenu: {
    gap: 7,
  },

  sidebarItem: {
    height: 52,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  /*
    IMPORTANT:
    Demo page par koi item selected nahi hai.
    Sirf press karne par temporary feedback milega.
  */

  sidebarItemPressed: {
    backgroundColor: "#F1F5F9",
  },

  sidebarItemText: {
    marginLeft: 13,
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },

  sidebarBottom: {
    marginTop: "auto",
  },

  sidebarDevice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 13,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  sidebarDeviceIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  sidebarDeviceTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#334155",
  },

  sidebarDeviceId: {
    fontSize: 7,
    color: "#94A3B8",
    marginTop: 2,
  },

  sidebarVersion: {
    textAlign: "center",
    fontSize: 8,
    color: "#CBD5E1",
    marginTop: 14,
  },

  // ===================================================
  // DESKTOP MAIN
  // ===================================================

  desktopScroll: {
    flex: 1,
  },

  desktopContent: {
    paddingHorizontal: 42,
    paddingTop: 30,
    paddingBottom: 45,
    maxWidth: 1450,
    width: "100%",
    alignSelf: "center",
  },

  // ===================================================
  // HEADER
  // ===================================================

  webHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  webGreeting: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
  },

  webSubheading: {
    marginTop: 5,
    fontSize: 12,
    color: "#64748B",
  },

  webHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  onlineBadge: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    marginRight: 7,
  },

  onlineText: {
    fontSize: 10,
    fontWeight: "800",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  // ===================================================
  // BLUE BANNER
  // ===================================================

  webBanner: {
    minHeight: 103,
    borderRadius: 19,
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 20,
    marginBottom: 34,
  },

  webBannerIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.16)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  webBannerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },

  webBannerText: {
    marginTop: 5,
    color: "#DBEAFE",
    fontSize: 11,
  },

  livePill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.14)",
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginRight: 6,
  },

  liveText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },

  // ===================================================
  // SECTION
  // ===================================================

  webSectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  webSectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
  },

  webSectionSubtitle: {
    marginTop: 4,
    fontSize: 10,
    color: "#94A3B8",
  },

  updatedText: {
    fontSize: 9,
    color: "#94A3B8",
  },

  // ===================================================
  // VITALS
  // ===================================================

  webVitals: {
    flexDirection: "row",
    gap: 17,
    marginBottom: 23,
  },

  desktopVitalCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 21,
    minHeight: 180,
    borderWidth: 1,
    borderColor: "#E7EBF0",
  },

  desktopVitalTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  desktopVitalIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  desktopVitalTitle: {
    marginTop: 18,
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
  },

  desktopValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 3,
  },

  desktopVitalValue: {
    fontSize: 32,
    fontWeight: "900",
    color: "#111827",
  },

  desktopVitalUnit: {
    marginLeft: 5,
    fontSize: 11,
    fontWeight: "800",
    color: "#94A3B8",
  },

  desktopVitalDescription: {
    marginTop: 5,
    fontSize: 9,
    color: "#94A3B8",
  },

  // ===================================================
  // MAIN GRID
  // ===================================================

  mainGrid: {
    flexDirection: "row",
    gap: 18,
    marginBottom: 30,
  },

  webCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E7EBF0",
    padding: 21,
    minHeight: 235,
  },

  webCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  webCardTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#111827",
  },

  webCardSubtitle: {
    marginTop: 4,
    fontSize: 9,
    color: "#94A3B8",
  },

  // ===================================================
  // AI RISK
  // ===================================================

  aiSparkle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
  },

  riskMain: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  riskScoreLabel: {
    fontSize: 8,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 0.8,
  },

  riskNumberRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 3,
  },

  webRiskNumber: {
    fontSize: 43,
    fontWeight: "900",
  },

  webRiskOutOf: {
    fontSize: 12,
    fontWeight: "700",
    color: "#94A3B8",
    marginLeft: 4,
  },

  largeRiskBadge: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  riskBadgeDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    marginRight: 6,
  },

  largeRiskText: {
    fontSize: 10,
    fontWeight: "900",
  },

  progressBackground: {
    height: 7,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    marginTop: 19,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 10,
  },

  riskFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },

  riskFooterText: {
    fontSize: 9,
    color: "#94A3B8",
  },

  // ===================================================
  // DEVICE
  // ===================================================

  deviceStatusIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  desktopDeviceBody: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },

  bigDeviceIcon: {
    width: 67,
    height: 67,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  bigDeviceTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#1E293B",
  },

  bigDeviceId: {
    marginTop: 4,
    fontSize: 9,
    color: "#94A3B8",
  },

  deviceOnlineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },

  deviceOnlineDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    marginRight: 6,
  },

  deviceOnlineText: {
    fontSize: 9,
    color: "#64748B",
  },

  deviceStats: {
    flexDirection: "row",
    marginTop: 22,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 15,
    gap: 10,
  },

  miniStat: {
    flex: 1,
  },

  miniStatLabel: {
    fontSize: 8,
    color: "#94A3B8",
  },

  miniStatValue: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: "800",
    color: "#334155",
  },

  // ===================================================
  // DEMO MODE
  // ===================================================

  demoModeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingLeft: 11,
    paddingRight: 4,
    height: 43,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  demoModeDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: "#2563EB",
    marginRight: 7,
  },

  demoModeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#475569",
    marginRight: 5,
  },

  webDemoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E7EBF0",
    padding: 22,
    marginBottom: 24,
  },

  demoInputs: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 13,
  },

  webInputContainer: {
    flex: 1,
  },

  webInputLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "#64748B",
    marginBottom: 7,
  },

  webInputBox: {
    height: 46,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
  },

  webInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  webInputUnit: {
    fontSize: 9,
    fontWeight: "800",
    color: "#94A3B8",
  },

  webApplyButton: {
    height: 46,
    minWidth: 165,
    borderRadius: 11,
    backgroundColor: "#111827",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 17,
  },

  webApplyText: {
    marginLeft: 7,
    fontSize: 10,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  // ===================================================
  // BOTTOM
  // ===================================================

  bottomGrid: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 17,
  },

  infoWebCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E7EBF0",
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
  },

  infoWebIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  infoWebTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: "#334155",
  },

  infoWebText: {
    marginTop: 5,
    fontSize: 9,
    lineHeight: 14,
    color: "#94A3B8",
  },

  dashboardWebButton: {
    minWidth: 235,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  dashboardWebText: {
    marginHorizontal: 9,
    fontSize: 10,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  webFooter: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 8,
    color: "#A8B1BF",
  },
});