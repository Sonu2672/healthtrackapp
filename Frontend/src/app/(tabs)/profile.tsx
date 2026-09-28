import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Profile() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>
        Profile
      </Text>

      <Text style={styles.subtitle}>
        Manage your account and device
      </Text>

      {/* PROFILE */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            S
          </Text>
        </View>

        <View>
          <Text style={styles.name}>
            Sonu Kumar
          </Text>

          <Text style={styles.email}>
            sonu12@gmail.com
          </Text>
        </View>
      </View>

      {/* DEVICE */}
      <Text style={styles.sectionTitle}>
        Connected Device
      </Text>

      <View style={styles.deviceCard}>
        <View style={styles.deviceIcon}>
          <Text>⌁</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.deviceName}>
            ESP32 Health Device
          </Text>

          <Text style={styles.deviceId}>
            ESP32_HEALTH_01
          </Text>

          <View style={styles.connected}>
            <View style={styles.dot} />

            <Text style={styles.connectedText}>
              Connected
            </Text>
          </View>
        </View>

        <Text style={styles.arrow}>
          →
        </Text>
      </View>

      {/* SETTINGS */}
      <Text style={styles.sectionTitle}>
        Settings
      </Text>

      <View style={styles.settingsCard}>
        <Setting
          icon="!"
          title="Notifications"
          subtitle="Health & emergency alerts"
        />

        <Setting
          icon="◉"
          title="Health Preferences"
          subtitle="Manage monitoring preferences"
        />

        <Setting
          icon="⚙"
          title="App Settings"
          subtitle="General application settings"
        />

        <Setting
          icon="?"
          title="About HealthTrack"
          subtitle="Version 1.0.0"
        />
      </View>

      {/* LOGOUT */}
      <View style={styles.logout}>
        <Text style={styles.logoutIcon}>
          ↪
        </Text>

        <Text style={styles.logoutText}>
          Log Out
        </Text>
      </View>

      <Text style={styles.version}>
        HealthTrack • Personal Health Companion
      </Text>

      <View style={{ height: 90 }} />
    </ScrollView>
  );
}

function Setting({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.setting}>
      <View style={styles.settingIcon}>
        <Text>{icon}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.settingTitle}>
          {title}
        </Text>

        <Text style={styles.settingSubtitle}>
          {subtitle}
        </Text>
      </View>

      <Text style={styles.settingArrow}>
        →
      </Text>
    </View>
  );
}

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
    marginBottom: 25,
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  avatarText: {
    fontSize: 25,
    fontWeight: "800",
    color: "#2563EB",
  },

  name: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },

  email: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },

  deviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  deviceIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  deviceName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111827",
  },

  deviceId: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 3,
  },

  connected: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 5,
  },

  connectedText: {
    fontSize: 9,
    color: "#16A34A",
    fontWeight: "700",
  },

  arrow: {
    fontSize: 20,
    color: "#9CA3AF",
  },

  settingsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  setting: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  settingIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  settingTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },

  settingSubtitle: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 3,
  },

  settingArrow: {
    color: "#9CA3AF",
    fontSize: 18,
  },

  logout: {
    backgroundColor: "#FEF2F2",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutIcon: {
    color: "#DC2626",
    fontSize: 18,
    marginRight: 8,
  },

  logoutText: {
    color: "#DC2626",
    fontSize: 13,
    fontWeight: "800",
  },

  version: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 9,
    marginTop: 18,
  },
});