import {
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function RiskCard({
  level,
  score,
}) {
  const normalized =
    String(level || "Unknown").toLowerCase();

  let background = "#F3F4F6";
  let textColor = "#374151";

  if (
    normalized.includes("low") ||
    normalized.includes("normal")
  ) {
    background = "#DCFCE7";
    textColor = "#15803D";
  }

  if (
    normalized.includes("moderate") ||
    normalized.includes("warning")
  ) {
    background = "#FEF3C7";
    textColor = "#B45309";
  }

  if (
    normalized.includes("high") ||
    normalized.includes("critical") ||
    normalized.includes("abnormal")
  ) {
    background = "#FEE2E2";
    textColor = "#DC2626";
  }

  return (
    <View style={styles.card}>
      <Text style={styles.label}>
        HEALTH RISK
      </Text>

      <View
        style={[
          styles.badge,
          {
            backgroundColor: background,
          },
        ]}
      >
        <Text
          style={[
            styles.level,
            {
              color: textColor,
            },
          ]}
        >
          {level || "Unknown"}
        </Text>
      </View>

      <Text style={styles.score}>
        Risk Score: {score || 0}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 6,
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#F5F7FA",
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "700",
    marginBottom: 10,
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  level: {
    fontSize: 20,
    fontWeight: "800",
  },

  score: {
    marginTop: 12,
    color: "#6B7280",
    fontSize: 13,
  },
});