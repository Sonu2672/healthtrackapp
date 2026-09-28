import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Environment() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>
        Environment
      </Text>

      <Text style={styles.subtitle}>
        Monitor your surrounding environment
      </Text>

      {/* STATUS */}
      <View style={styles.statusCard}>
        <View style={styles.statusIcon}>
          <Text>✓</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.statusTitle}>
            Environment is Comfortable
          </Text>

          <Text style={styles.statusText}>
            Current conditions are within
            normal range.
          </Text>
        </View>
      </View>

      {/* ENVIRONMENT METRICS */}
      <Text style={styles.sectionTitle}>
        Current Conditions
      </Text>

      <View style={styles.grid}>
        <EnvironmentCard
          icon="♨"
          title="Temperature"
          value="29.4"
          unit="°C"
        />

        <EnvironmentCard
          icon="≈"
          title="Humidity"
          value="64"
          unit="%"
        />

        <EnvironmentCard
          icon="≋"
          title="Dust Level"
          value="Low"
          unit=""
        />

        <EnvironmentCard
          icon="☁"
          title="Air Quality"
          value="Good"
          unit=""
        />
      </View>

      {/* AIR QUALITY */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Air Quality
        </Text>

        <View style={styles.airRow}>
          <View style={styles.airCircle}>
            <Text style={styles.airScore}>
              Good
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.airHeading}>
              Air quality is good
            </Text>

            <Text style={styles.airDescription}>
              Dust level is currently low.
              Your environment looks comfortable.
            </Text>
          </View>
        </View>
      </View>

      {/* ENVIRONMENT DETAILS */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Environment Details
        </Text>

        <Detail
          title="Temperature"
          value="29.4 °C"
        />

        <Detail
          title="Humidity"
          value="64 %"
        />

        <Detail
          title="Dust Density"
          value="Low"
        />

        <Detail
          title="Status"
          value="Comfortable"
        />
      </View>

      <View style={{ height: 90 }} />
    </ScrollView>
  );
}

function EnvironmentCard({
  icon,
  title,
  value,
  unit,
}: {
  icon: string;
  title: string;
  value: string;
  unit: string;
}) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricIcon}>
        {icon}
      </Text>

      <Text style={styles.metricTitle}>
        {title}
      </Text>

      <View style={styles.valueRow}>
        <Text style={styles.metricValue}>
          {value}
        </Text>

        <Text style={styles.unit}>
          {unit}
        </Text>
      </View>
    </View>
  );
}

function Detail({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <View style={styles.detail}>
      <Text style={styles.detailTitle}>
        {title}
      </Text>

      <Text style={styles.detailValue}>
        {value}
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
    marginBottom: 22,
  },

  statusCard: {
    backgroundColor: "#ECFDF5",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  statusIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  statusTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#166534",
  },

  statusText: {
    fontSize: 10,
    color: "#15803D",
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  metricCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 17,
    marginBottom: 12,
  },

  metricIcon: {
    fontSize: 22,
    color: "#2563EB",
    marginBottom: 12,
  },

  metricTitle: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 5,
  },

  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  metricValue: {
    fontSize: 23,
    fontWeight: "800",
    color: "#111827",
  },

  unit: {
    fontSize: 10,
    color: "#6B7280",
    marginLeft: 3,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginTop: 8,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 15,
  },

  airRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  airCircle: {
    width: 85,
    height: 85,
    borderRadius: 43,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  airScore: {
    color: "#15803D",
    fontSize: 16,
    fontWeight: "800",
  },

  airHeading: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  airDescription: {
    fontSize: 11,
    color: "#6B7280",
    lineHeight: 16,
    marginTop: 5,
  },

  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  detailTitle: {
    fontSize: 12,
    color: "#6B7280",
  },

  detailValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
  },
});