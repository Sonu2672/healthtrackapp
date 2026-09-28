import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type AlertLevel = "Critical" | "High" | "Medium" | "Low";

type DisasterAlert = {
  id: number;
  title: string;
  location: string;
  time: string;
  level: AlertLevel;
  status: "Active" | "Monitoring";
  icon: keyof typeof Ionicons.glyphMap;
};

const alerts: DisasterAlert[] = [
  {
    id: 1,
    title: "Ganga River Level Alert",
    location: "Patna, Bihar",
    time: "10 mins ago",
    level: "High",
    status: "Active",
    icon: "water-outline",
  },
  {
    id: 2,
    title: "Kosi Water Discharge Watch",
    location: "Supaul, Bihar",
    time: "25 mins ago",
    level: "Critical",
    status: "Active",
    icon: "water-outline",
  },
  {
    id: 3,
    title: "Heavy Rainfall & Thunderstorm Warning",
    location: "Darbhanga, Bihar",
    time: "40 mins ago",
    level: "High",
    status: "Active",
    icon: "rainy-outline",
  },
  {
    id: 4,
    title: "Gandak Embankment Advisory",
    location: "Gopalganj, Bihar",
    time: "1 hour ago",
    level: "Medium",
    status: "Monitoring",
    icon: "water-outline",
  },
  {
    id: 5,
    title: "Lightning Hazard Warning",
    location: "Muzaffarpur, Bihar",
    time: "2 hours ago",
    level: "Critical",
    status: "Active",
    icon: "thunderstorm-outline",
  },
  {
    id: 6,
    title: "Weather Monitoring Advisory",
    location: "Bhagalpur, Bihar",
    time: "3 hours ago",
    level: "Low",
    status: "Monitoring",
    icon: "cloud-outline",
  },
];

const filters = ["All", "Critical", "High", "Medium", "Low"];

export default function Disaster() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredAlerts = useMemo(() => {
    if (selectedFilter === "All") {
      return alerts;
    }

    return alerts.filter(
      (alert) => alert.level === selectedFilter
    );
  }, [selectedFilter]);

  const getLevelColor = (level: AlertLevel) => {
    switch (level) {
      case "Critical":
        return {
          color: "#EF4444",
          bg: "#FEE2E2",
        };

      case "High":
        return {
          color: "#F97316",
          bg: "#FFEDD5",
        };

      case "Medium":
        return {
          color: "#EAB308",
          bg: "#FEF9C3",
        };

      default:
        return {
          color: "#22C55E",
          bg: "#DCFCE7",
        };
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons
              name="warning-outline"
              size={27}
              color="#EF4444"
            />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>
              BIHAR EMERGENCY PORTAL
            </Text>

            <Text style={styles.title}>
              Disaster Alert
            </Text>

            <Text style={styles.subtitle}>
              Real-time disaster & weather monitoring
            </Text>
          </View>
        </View>

        {/* LIVE STATUS */}
        <View style={styles.liveRow}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live Monitoring</Text>
          </View>

          <Pressable style={styles.refreshButton}>
            <Ionicons
              name="refresh-outline"
              size={18}
              color="#CBD5E1"
            />
            <Text style={styles.refreshText}>
              Refresh
            </Text>
          </Pressable>
        </View>

        {/* EMERGENCY HELPLINE */}
        <View style={styles.emergencyCard}>
          <View style={styles.emergencyIcon}>
            <Ionicons
              name="call-outline"
              size={20}
              color="#F87171"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.emergencyTitle}>
              Bihar Emergency Helpline
            </Text>

            <Text style={styles.emergencyNumber}>
              1070
            </Text>

            <Text style={styles.emergencySub}>
              SDMA Control Room
            </Text>
          </View>
        </View>

        {/* FILTER */}
        <View style={styles.filterCard}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {filters.map((filter) => {
              const active =
                selectedFilter === filter;

              return (
                <Pressable
                  key={filter}
                  onPress={() =>
                    setSelectedFilter(filter)
                  }
                  style={[
                    styles.filterButton,
                    active && styles.filterButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      active && styles.filterTextActive,
                    ]}
                  >
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* LOCATION */}
        <View style={styles.locationCard}>
          <Ionicons
            name="location-outline"
            size={19}
            color="#94A3B8"
          />

          <Text style={styles.locationText}>
            All Bihar
          </Text>

          <Ionicons
            name="chevron-down"
            size={18}
            color="#CBD5E1"
          />
        </View>

        {/* SECTION HEADER */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Active Alerts
            </Text>

            <Text style={styles.sectionSubtitle}>
              {filteredAlerts.length} alerts detected
            </Text>
          </View>

          <View style={styles.alertCount}>
            <Text style={styles.alertCountText}>
              LIVE
            </Text>
          </View>
        </View>

        {/* ALERT LIST */}
        {filteredAlerts.map((alert) => {
          const levelStyle =
            getLevelColor(alert.level);

          return (
            <Pressable
              key={alert.id}
              style={styles.alertCard}
            >
              {/* ICON */}
              <View style={styles.alertIcon}>
                <Ionicons
                  name={alert.icon}
                  size={25}
                  color="#38BDF8"
                />
              </View>

              {/* CONTENT */}
              <View style={styles.alertContent}>
                <View style={styles.alertTopRow}>
                  <Text
                    style={styles.alertTitle}
                    numberOfLines={2}
                  >
                    {alert.title}
                  </Text>

                  <View
                    style={[
                      styles.levelBadge,
                      {
                        backgroundColor:
                          levelStyle.bg,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.levelText,
                        {
                          color:
                            levelStyle.color,
                        },
                      ]}
                    >
                      {alert.level.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons
                    name="location-outline"
                    size={15}
                    color="#94A3B8"
                  />

                  <Text style={styles.infoText}>
                    {alert.location}
                  </Text>

                  <Ionicons
                    name="time-outline"
                    size={15}
                    color="#94A3B8"
                    style={{ marginLeft: 10 }}
                  />

                  <Text style={styles.infoText}>
                    {alert.time}
                  </Text>
                </View>

                <View style={styles.alertBottom}>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          levelStyle.bg,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        {
                          backgroundColor:
                            levelStyle.color,
                        },
                      ]}
                    />

                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            levelStyle.color,
                        },
                      ]}
                    >
                      {alert.status}
                    </Text>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#64748B"
                  />
                </View>
              </View>
            </Pressable>
          );
        })}

        {/* FOOTER */}
        <View style={styles.footer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={18}
            color="#64748B"
          />

          <Text style={styles.footerText}>
            Disaster alerts are monitored in real-time
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 55,
    paddingBottom: 110,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  headerIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#3B1D2A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  headerText: {
    flex: 1,
  },

  eyebrow: {
    color: "#38BDF8",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.7,
    marginBottom: 3,
  },

  title: {
    color: "#F8FAFC",
    fontSize: 25,
    fontWeight: "800",
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 3,
  },

  /* LIVE */

  liveRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#12382F",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 7,
  },

  liveText: {
    color: "#4ADE80",
    fontSize: 12,
    fontWeight: "700",
  },

  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 10,
  },

  refreshText: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 6,
  },

  /* EMERGENCY */

  emergencyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#291A28",
    borderWidth: 1,
    borderColor: "#7F3040",
    borderRadius: 14,
    padding: 14,
    marginBottom: 15,
  },

  emergencyIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#421E2C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  emergencyTitle: {
    color: "#FDA4AF",
    fontSize: 13,
    fontWeight: "700",
  },

  emergencyNumber: {
    color: "#F8FAFC",
    fontSize: 19,
    fontWeight: "800",
    marginTop: 2,
  },

  emergencySub: {
    color: "#94A3B8",
    fontSize: 10,
    marginTop: 1,
  },

  /* FILTER */

  filterCard: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    padding: 5,
    marginBottom: 10,
  },

  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 8,
    marginRight: 2,
  },

  filterButtonActive: {
    backgroundColor: "#334155",
  },

  filterText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
  },

  filterTextActive: {
    color: "#F8FAFC",
    fontWeight: "800",
  },

  /* LOCATION */

  locationCard: {
    height: 46,
    backgroundColor: "#1E293B",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 20,
  },

  locationText: {
    color: "#E2E8F0",
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "600",
  },

  /* SECTION */

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#F8FAFC",
    fontSize: 19,
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 3,
  },

  alertCount: {
    backgroundColor: "#172554",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },

  alertCountText: {
    color: "#60A5FA",
    fontSize: 9,
    fontWeight: "800",
  },

  /* ALERT */

  alertCard: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#334155",
    padding: 13,
    marginBottom: 12,
  },

  alertIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#173B54",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  alertContent: {
    flex: 1,
  },

  alertTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  alertTitle: {
    flex: 1,
    color: "#E2E8F0",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
    marginRight: 7,
  },

  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },

  levelText: {
    fontSize: 9,
    fontWeight: "900",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },

  infoText: {
    color: "#94A3B8",
    fontSize: 10,
    marginLeft: 3,
  },

  alertBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 11,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 12,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "800",
  },

  /* FOOTER */

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },

  footerText: {
    color: "#64748B",
    fontSize: 10,
    marginLeft: 6,
  },
});