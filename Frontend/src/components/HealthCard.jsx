import {
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HealthCard({
  icon,
  title,
  value,
  unit,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>
        {icon}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

      <View style={styles.valueRow}>
        <Text style={styles.value}>
          {value}
        </Text>

        <Text style={styles.unit}>
          {unit}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#F5F7FA",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
  },

  icon: {
    fontSize: 26,
    marginBottom: 10,
  },

  title: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 5,
  },

  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  value: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
  },

  unit: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
});