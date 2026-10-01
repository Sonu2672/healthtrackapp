import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

export default function Disaster() {
  const disasters = [
    {
      title: "Flood",
      icon: "water",
      status: "Low Risk",
      value: "12%",
    },
    {
      title: "Heatwave",
      icon: "sunny",
      status: "Moderate",
      value: "42°C",
    },
    {
      title: "Earthquake",
      icon: "pulse",
      status: "Low Risk",
      value: "2.4 M",
    },
    {
      title: "Lightning",
      icon: "flash",
      status: "High Risk",
      value: "78%",
    },
    {
      title: "Storm",
      icon: "thunderstorm",
      status: "Moderate",
      value: "65 km/h",
    },
    {
      title: "Heavy Rain",
      icon: "rainy",
      status: "Low Risk",
      value: "20%",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color="#111" />
          </Pressable>

          <View>
            <Text style={styles.headerTitle}>Disaster Alert</Text>
            <Text style={styles.headerSub}>Real-time safety monitoring</Text>
          </View>
        </View>

        {/* LOCATION */}
        <View style={styles.locationCard}>
          <View style={styles.locationIcon}>
            <Ionicons name="location" size={22} color="#111" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.smallText}>YOUR LOCATION</Text>
            <Text style={styles.locationText}>Patna, Bihar</Text>
          </View>

          <View style={styles.onlineDot} />
        </View>

        {/* OVERALL RISK */}
        <View style={styles.riskCard}>
          <View style={styles.riskTop}>
            <View>
              <Text style={styles.smallText}>OVERALL DISASTER RISK</Text>
              <Text style={styles.riskNumber}>32</Text>
              <Text style={styles.outOf}>out of 100</Text>
            </View>

            <View style={styles.riskCircle}>
              <Ionicons name="shield-checkmark" size={38} color="#111" />
            </View>
          </View>

          <View style={styles.progressBackground}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.riskBottom}>
            <Text style={styles.riskStatus}>MODERATE RISK</Text>
            <Text style={styles.updated}>Updated 2 min ago</Text>
          </View>
        </View>

        {/* ACTIVE ALERT */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Alert</Text>
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>1 ACTIVE</Text>
          </View>
        </View>

        <View style={styles.activeAlert}>
          <View style={styles.alertIcon}>
            <Ionicons name="flash" size={26} color="#111" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>Lightning Alert</Text>
            <Text style={styles.alertDescription}>
              Lightning activity detected in your area. Stay indoors and avoid
              open spaces.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#777" />
        </View>

        {/* DISASTER GRID */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Disaster Monitoring</Text>
          <Text style={styles.viewText}>Live</Text>
        </View>

        <View style={styles.grid}>
          {disasters.map((item, index) => (
            <View style={styles.disasterCard} key={index}>
              <View style={styles.disasterTop}>
                <View style={styles.disasterIcon}>
                  <Ionicons name={item.icon} size={22} color="#111" />
                </View>

                <View
                  style={[
                    styles.statusDot,
                    item.status === "High Risk"
                      ? styles.highDot
                      : item.status === "Moderate"
                      ? styles.mediumDot
                      : styles.lowDot,
                  ]}
                />
              </View>

              <Text style={styles.disasterTitle}>{item.title}</Text>

              <Text style={styles.disasterValue}>{item.value}</Text>

              <Text
                style={[
                  styles.disasterStatus,
                  item.status === "High Risk"
                    ? styles.highText
                    : item.status === "Moderate"
                    ? styles.mediumText
                    : styles.lowText,
                ]}
              >
                {item.status}
              </Text>
            </View>
          ))}
        </View>

        {/* WEATHER */}
        <Text style={styles.sectionTitle}>Current Conditions</Text>

        <View style={styles.weatherCard}>
          <View style={styles.weatherItem}>
            <Ionicons name="thermometer" size={24} color="#111" />
            <Text style={styles.weatherValue}>31°C</Text>
            <Text style={styles.weatherLabel}>Temperature</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.weatherItem}>
            <Ionicons name="rainy" size={24} color="#111" />
            <Text style={styles.weatherValue}>24%</Text>
            <Text style={styles.weatherLabel}>Rain Chance</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.weatherItem}>
            <Ionicons name="speedometer" size={24} color="#111" />
            <Text style={styles.weatherValue}>18 km/h</Text>
            <Text style={styles.weatherLabel}>Wind</Text>
          </View>
        </View>

        {/* SAFETY TIP */}
        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <Ionicons name="information-circle" size={25} color="#111" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>Safety Tip</Text>
            <Text style={styles.tipText}>
              Keep emergency contacts ready and follow official disaster
              warnings in your area.
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Data shown for demonstration purposes
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },

  scroll: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    elevation: 2,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111",
  },

  headerSub: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },

  locationCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
  },

  locationIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  smallText: {
    fontSize: 10,
    color: "#888",
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  locationText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginTop: 3,
  },

  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#111",
  },

  riskCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    marginBottom: 25,
    elevation: 2,
  },

  riskTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  riskNumber: {
    fontSize: 48,
    fontWeight: "900",
    color: "#111",
    marginTop: 5,
  },

  outOf: {
    fontSize: 12,
    color: "#888",
    marginTop: -5,
  },

  riskCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
  },

  progressBackground: {
    height: 9,
    backgroundColor: "#e7e7e7",
    borderRadius: 10,
    marginTop: 18,
    overflow: "hidden",
  },

  progressFill: {
    width: "32%",
    height: "100%",
    backgroundColor: "#111",
    borderRadius: 10,
  },

  riskBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  riskStatus: {
    fontSize: 11,
    fontWeight: "800",
    color: "#555",
  },

  updated: {
    fontSize: 11,
    color: "#999",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
    marginBottom: 12,
  },

  alertBadge: {
    backgroundColor: "#111",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  alertBadgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "800",
  },

  activeAlert: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    elevation: 2,
  },

  alertIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  alertTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111",
    marginBottom: 4,
  },

  alertDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#777",
  },

  viewText: {
    fontSize: 12,
    color: "#777",
    fontWeight: "600",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  disasterCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  disasterTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  disasterIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },

  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },

  lowDot: {
    backgroundColor: "#777",
  },

  mediumDot: {
    backgroundColor: "#444",
  },

  highDot: {
    backgroundColor: "#111",
  },

  disasterTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginTop: 13,
  },

  disasterValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111",
    marginTop: 7,
  },

  disasterStatus: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },

  lowText: {
    color: "#777",
  },

  mediumText: {
    color: "#555",
  },

  highText: {
    color: "#111",
  },

  weatherCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
  },

  weatherItem: {
    alignItems: "center",
    flex: 1,
  },

  weatherValue: {
    fontSize: 15,
    fontWeight: "800",
    marginTop: 7,
    color: "#111",
  },

  weatherLabel: {
    fontSize: 9,
    color: "#888",
    marginTop: 3,
    textAlign: "center",
  },

  divider: {
    width: 1,
    height: 50,
    backgroundColor: "#e5e5e5",
  },

  tipCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    elevation: 2,
  },

  tipIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  tipTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111",
    marginBottom: 4,
  },

  tipText: {
    fontSize: 12,
    color: "#777",
    lineHeight: 18,
  },

  footer: {
    textAlign: "center",
    fontSize: 10,
    color: "#aaa",
    marginTop: 22,
  },
});
