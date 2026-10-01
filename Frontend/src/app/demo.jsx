import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

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

import { DEVICE_ID, BACKEND_URL } from "../constants/config";
import { useHealth } from "../../context/HealthContext";

const styles = StyleSheet.create({
  aiSparkle: { width: 34, height: 34, borderRadius: 10, backgroundColor: '#F3E8FF', alignItems: 'center', justifyContent: 'center' },
  aiSubtitle: { fontSize: 10, color: '#64748B', marginTop: 2 },
  aiTitle: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  applyButton: { height: 43, borderRadius: 9, backgroundColor: '#060709', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 2 },
  applyText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  bigDeviceIcon: { width: 62, height: 62, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  bigDeviceId: { fontSize: 11, color: '#64748B', marginTop: 4 },
  bigDeviceTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  bottomGrid: { flexDirection: 'row', gap: 16, alignItems: 'stretch' },
  connectedBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 12 },
  connectedText: { fontSize: 9, fontWeight: '700', color: '#15803D' },
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  dashboardButton: { height: 48, borderRadius: 11, backgroundColor: '#2563EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  dashboardText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  dashboardWebButton: { flex: 0.45, minHeight: 78, backgroundColor: '#2563EB', borderRadius: 16, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  dashboardWebText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  demoBadge: { backgroundColor: '#DBEAFE', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 7 },
  demoBadgeText: { fontSize: 8, fontWeight: '800', color: '#2563EB' },
  demoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  demoInputs: { flexDirection: 'row', alignItems: 'flex-end', gap: 14 },
  demoModeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#2563EB' },
  demoModeIndicator: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  demoModeText: { fontSize: 12, fontWeight: '600', color: '#475569' },
  demoSubtitle: { fontSize: 10, color: '#64748B', marginTop: 3 },
  demoTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  demoTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  desktopContainer: { flex: 1, backgroundColor: '#F8FAFC' },
  desktopContent: { padding: 30, maxWidth: 1400, width: '100%', alignSelf: 'center' },
  desktopDeviceBody: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  desktopLayout: { flex: 1, flexDirection: 'row' },
  desktopScroll: { flex: 1 },
  desktopValueRow: { flexDirection: 'row', alignItems: 'baseline' },
  desktopVitalCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, borderWidth: 1, borderColor: '#E2E8F0' },
  desktopVitalDescription: { fontSize: 11, color: '#94A3B8', marginTop: 7 },
  desktopVitalIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  desktopVitalTitle: { fontSize: 13, color: '#64748B', marginBottom: 5 },
  desktopVitalTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  desktopVitalUnit: { fontSize: 12, color: '#64748B', marginLeft: 5 },
  desktopVitalValue: { fontSize: 28, fontWeight: '700', color: '#0F172A' },
  deviceId: { fontSize: 10, color: '#64748B', marginTop: 3 },
  deviceOnlineDot: { width: 7, height: 7, borderRadius: 4, marginRight: 6 },
  deviceOnlineRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  deviceOnlineText: { fontSize: 11, color: '#64748B' },
  deviceStats: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 14 },
  deviceStatusIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  deviceTitle: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  flex: { flex: 1 },
  footer: { textAlign: 'center', color: '#94A3B8', fontSize: 9, marginTop: 15 },
  infoCard: { flexDirection: 'row', gap: 8, backgroundColor: '#F8FAFC', padding: 12, borderRadius: 10, marginBottom: 14 },
  infoText: { flex: 1, fontSize: 10, lineHeight: 15, color: '#64748B' },
  infoWebCard: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 16, padding: 18 },
  infoWebIcon: { width: 38, height: 38, borderRadius: 10, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  infoWebText: { fontSize: 11, color: '#64748B', marginTop: 4, lineHeight: 17 },
  infoWebTitle: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  input: { flex: 1, fontSize: 13, color: '#0F172A' },
  inputBox: { height: 42, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 9, paddingHorizontal: 9 },
  inputContainer: { flex: 1 },
  inputLabel: { fontSize: 10, color: '#64748B', marginBottom: 5 },
  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  inputUnit: { fontSize: 9, color: '#94A3B8' },
  largeRiskBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  largeRiskText: { fontSize: 12, fontWeight: '700' },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#FFFFFF', marginRight: 6 },
  livePill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.16)', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20 },
  liveText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  mainGrid: { flexDirection: 'row', gap: 16, marginBottom: 28 },
  miniStat: { flex: 1 },
  miniStatLabel: { fontSize: 10, color: '#94A3B8' },
  miniStatValue: { fontSize: 12, fontWeight: '600', color: '#334155', marginTop: 4 },
  mobileAiIcon: { width: 34, height: 34, borderRadius: 9, backgroundColor: '#F3E8FF', alignItems: 'center', justifyContent: 'center', marginRight: 9 },
  mobileBrand: { fontSize: 19, fontWeight: '700', color: '#0F172A' },
  mobileContent: { padding: 45, paddingBottom: 30, paddingHorizontal: 18 },
  mobileDemoCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 14, padding: 15, marginBottom: 14 },
  mobileDeviceCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 14, padding: 14, marginBottom: 20 },
  mobileDeviceIcon: { width: 40, height: 40, borderRadius: 11, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  mobileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 45 },
  mobileLogo: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  mobileRiskCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 14, padding: 15, marginBottom: 15 },
  mobileRiskHeader: { flexDirection: 'row', alignItems: 'center' },
  mobileStatus: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 9, paddingVertical: 7, borderRadius: 16 },
  mobileTagline: { fontSize: 11, color: '#64748B', marginTop: 2 },
  mobileVitals: { flexDirection: 'row', gap: 9, marginBottom: 15 },
  onlineBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, marginRight: 7 },
  onlineText: { fontSize: 12, fontWeight: '600' },
  progressBackground: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  riskBadge: { paddingHorizontal: 9, paddingVertical: 5, borderRadius: 12 },
  riskBadgeDot: { width: 7, height: 7, borderRadius: 4, marginRight: 7 },
  riskFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  riskFooterText: { fontSize: 10, color: '#94A3B8' },
  riskMain: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 22 },
  riskNumberRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 4 },
  riskScoreLabel: { fontSize: 10, fontWeight: '700', color: '#94A3B8', letterSpacing: 1 },
  riskText: { fontSize: 9, fontWeight: '700' },
  score: { fontSize: 35, fontWeight: '800' },
  scoreDescription: { fontSize: 10, color: '#64748B', marginLeft: 8 },
  scoreRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 18 },
  scoreUnit: { fontSize: 12, color: '#94A3B8', marginLeft: 3 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 10 },
  sidebar: { width: 250, backgroundColor: '#FFFFFF', borderRightWidth: 1, borderRightColor: '#E2E8F0', padding: 20 },
  sidebarBottom: { marginTop: 'auto' },
  sidebarBrand: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  sidebarDevice: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#F8FAFC', borderRadius: 12 },
  sidebarDeviceIcon: { width: 34, height: 34, borderRadius: 9, backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  sidebarDeviceId: { fontSize: 10, color: '#64748B', marginTop: 2 },
  sidebarDeviceTitle: { fontSize: 13, fontWeight: '600', color: '#0F172A' },
  sidebarItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 10 },
  sidebarItemPressed: { backgroundColor: '#EFF6FF' },
  sidebarItemText: { marginLeft: 12, fontSize: 14, color: '#475569', fontWeight: '500' },
  sidebarLogo: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  sidebarMenu: { gap: 6 },
  sidebarSubtitle: { fontSize: 12, color: '#64748B', marginTop: 2 },
  sidebarTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  sidebarVersion: { textAlign: 'center', color: '#94A3B8', fontSize: 11, marginTop: 14 },
  sihBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFF6FF', borderWidth: 1, borderColor: '#DBEAFE', padding: 13, borderRadius: 13, marginBottom: 15 },
  sihIcon: { width: 34, height: 34, borderRadius: 9, backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  sihText: { fontSize: 10, color: '#64748B', marginTop: 2 },
  sihTitle: { fontSize: 11, fontWeight: '800', color: '#2563EB' },
  statusDot: { width: 7, height: 7, borderRadius: 4, marginRight: 5 },
  statusText: { fontSize: 9, fontWeight: '700' },
  updatedText: { fontSize: 11, color: '#94A3B8' },
  vitalCard: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 13, padding: 12 },
  vitalIcon: { width: 34, height: 34, borderRadius: 9, alignItems: 'center', justifyContent: 'center', marginBottom: 9 },
  vitalTitle: { fontSize: 10, color: '#64748B' },
  vitalUnit: { fontSize: 8, color: '#94A3B8', marginLeft: 3 },
  vitalValue: { fontSize: 21, fontWeight: '700', color: '#0F172A' },
  vitalValueRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 3 },
  webApplyButton: { height: 44, paddingHorizontal: 18, borderRadius: 10, backgroundColor: '#2563EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  webApplyText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  webBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2563EB', padding: 20, borderRadius: 16, marginBottom: 28 },
  webBannerIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  webBannerText: { color: '#DBEAFE', fontSize: 13, marginTop: 4 },
  webBannerTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  webCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  webCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  webCardSubtitle: { fontSize: 11, color: '#64748B', marginTop: 3 },
  webCardTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  webDemoCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 16, padding: 18, marginBottom: 24 },
  webFooter: { textAlign: 'center', color: '#94A3B8', fontSize: 11, marginTop: 22, marginBottom: 10 },
  webGreeting: { fontSize: 28, fontWeight: '700', color: '#0F172A' },
  webHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  webHeaderRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  webInput: { flex: 1, fontSize: 14, color: '#0F172A' },
  webInputBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, paddingHorizontal: 10, height: 44 },
  webInputContainer: { flex: 1 },
  webInputLabel: { fontSize: 11, color: '#64748B', marginBottom: 6 },
  webInputUnit: { fontSize: 10, color: '#94A3B8' },
  webRiskNumber: { fontSize: 42, fontWeight: '800' },
  webRiskOutOf: { fontSize: 14, color: '#94A3B8', marginLeft: 4 },
  webSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 },
  webSectionSubtitle: { fontSize: 12, color: '#64748B', marginTop: 4 },
  webSectionTitle: { fontSize: 19, fontWeight: '700', color: '#0F172A' },
  webSubheading: { fontSize: 14, color: '#64748B', marginTop: 4 },
  webVitals: { flexDirection: 'row', gap: 16, marginBottom: 24 },
});

export default function Demo() {
  const { width } = useWindowDimensions();

  const isDesktop = width >= 1024;

  // ==========================================
  // CONTEXT
  // ==========================================

  const { health, setHealth, connected } = useHealth();

  // ==========================================
  // DEMO STATE
  // ==========================================

  const [demoMode, setDemoMode] = useState(true);

  const [demoHR, setDemoHR] = useState("82");
  const [demoSpo2, setDemoSpo2] = useState("98");
  const [demoTemp, setDemoTemp] = useState("36.7");
  const [demoRisk, setDemoRisk] = useState("12");

  // ==========================================
  // DEMO DATA
  // ==========================================



  // ==========================================
  // SEND DEMO DATA TO BACKEND
  // ==========================================

  const demoDataHandler = async () => {
    try {
      const data = {
        deviceId: DEVICE_ID,

        heartRate: demoHR,
        spo2: demoSpo2,
        temp: demoTemp,

        envtemp: health.envtemp || 43,
        humidity: health.humidity || 97,
        ecg: health.ecg || 0.32,
        dust: health.dust || 307,
      };

//       Heart Rate: 157
// SpO2: 87
// Body Temp: 41.5
// Env Temp: 43
// Humidity: 97
// ECG: 0.32
// Dust: 307
      
      const response = await fetch(
        `${BACKEND_URL}/api/health/healthdata`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to send demo data");
      }

      console.log("Demo data sent:", result);

      router.push("/(tabs)");
    } catch (error) {
      console.log("Demo data error:", error);
    }
  };

  // ==========================================
  // RISK COLOR
  // ==========================================
const risk = String(health.riskLevel);
console.log("risk sonu= ",risk);
let riskColor = "#16A34A";
let riskBg = "#DCFCE7";

if (risk === "Moderate Risk") {
  riskColor = "#D97706";
  riskBg = "#FEF3C7";
}

if (risk === "High Risk" || risk === "Critical Risk") {
  riskColor = "#DC2626";
  riskBg = "#FEE2E2";
}

  // ==========================================
  // MOBILE
  // ==========================================

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
                  onPress={demoDataHandler}
                  
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

          {/* INFO */}

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

          {/* DASHBOARD */}

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

  // ==========================================
  // DESKTOP
  // ==========================================

  return (
    <SafeAreaView style={styles.desktopContainer}>

      <View style={styles.desktopLayout}>

        {/* SIDEBAR */}

        <View style={styles.sidebar}>

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

          <View style={styles.sidebarMenu}>

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

        {/* MAIN CONTENT */}

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

          {/* BANNER */}

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
              value={demoHR}
              unit="BPM"
              description="Current heart rate"
            />

            <DesktopVital
              icon="water-outline"
              iconColor="#2563EB"
              bg="#DBEAFE"
              title="Blood Oxygen"
              value={demoSpo2}
              unit="%"
              description="Oxygen saturation"
            />

            <DesktopVital
              icon="thermometer-outline"
              iconColor="#F97316"
              bg="#FFEDD5"
              title="Body Temperature"
              value={demoTemp}
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
                  value={
                    connected
                      ? "Active"
                      : "Offline"
                  }
                />

                <MiniStat
                  label="Data Stream"
                  value={
                    connected
                      ? "Live"
                      : "Paused"
                  }
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
                  demoMode
                    ? "#2563EB"
                    : "#F8FAFC"
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

                <Pressable
                  style={styles.webApplyButton}
                  onPress={
                    demoDataHandler
                }
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

            {/* <Pressable
              style={styles.dashboardWebButton}
              onPress={() =>
                router.replace("/(tabs)")
              }
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

            </Pressable> */}

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

// ==========================================
// SIDEBAR ITEM
// ==========================================

function SidebarItem({
  icon,
  title,
  onPress,
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

// ==========================================
// DESKTOP VITAL
// ==========================================

function DesktopVital({
  icon,
  iconColor,
  bg,
  title,
  value,
  unit,
  description,
}) {
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

// ==========================================
// MINI STAT
// ==========================================

function MiniStat({
  label,
  value,
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

// ==========================================
// WEB INPUT
// ==========================================

function WebInput({
  label,
  value,
  setValue,
  unit,
}) {
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

// ==========================================
// MOBILE VITAL
// ==========================================

function Vital({
  icon,
  iconColor,
  bg,
  title,
  value,
  unit,
}) {
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

// ==========================================
// MOBILE INPUT
// ==========================================

function Input({
  label,
  value,
  setValue,
  unit,
}) {
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