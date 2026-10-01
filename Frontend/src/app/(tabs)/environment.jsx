import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useHealth } from "../../../context/HealthContext";

export default function Environment() {
  const { health, connected } = useHealth();

  // ==========================================
  // AIR QUALITY STATUS BASED ON SCORE
  // ==========================================

  const getAirQualityStatus = (score) => {
    if (score >= 80) {
      return "Good";
    }

    if (score >= 60) {
      return "Moderate";
    }

    if (score >= 30) {
      return "Poor";
    }

    return "Unhealthy";
  };


  // ==========================================
  // AIR QUALITY COLOR
  // ==========================================

  const getAirQualityColor = (score) => {
    if (score >= 80) {
      return "#15803D";
    }

    if (score >= 60) {
      return "#A16207";
    }

    if (score >= 30) {
      return "#C2410C";
    }

    return "#DC2626";
  };


  // ==========================================
  // AIR QUALITY BACKGROUND
  // ==========================================

  const getAirQualityBackground = (score) => {
    if (score >= 80) {
      return "#DCFCE7";
    }

    if (score >= 60) {
      return "#FEF9C3";
    }

    if (score >= 30) {
      return "#FFEDD5";
    }

    return "#FEE2E2";
  };


  // ==========================================
  // AIR QUALITY DESCRIPTION
  // ==========================================

  const getAirQualityDescription = (score) => {
    if (score >= 80) {
      return "Dust level is low. Your environment looks comfortable.";
    }

    if (score >= 60) {
      return "Air quality is acceptable, but some caution is recommended.";
    }

    if (score >= 30) {
      return "Dust level is elevated. Consider improving ventilation.";
    }

    return "Air quality is poor. Reduce exposure to dusty air.";
  };


  // ==========================================
  // ENVIRONMENT STATUS
  // ==========================================

  const getEnvironmentStatus = (score) => {
    if (score >= 80) {
      return {
        title: "Environment is Comfortable",
        text: "Current conditions are within a comfortable range.",
        color: "#166534",
        background: "#ECFDF5",
        iconBackground: "#DCFCE7",
      };
    }

    if (score >= 60) {
      return {
        title: "Environment is Moderate",
        text: "Current conditions are slightly above the ideal range.",
        color: "#A16207",
        background: "#FEFCE8",
        iconBackground: "#FEF9C3",
      };
    }

    if (score >= 30) {
      return {
        title: "Environment Needs Attention",
        text: "Air quality is below the comfortable range.",
        color: "#C2410C",
        background: "#FFF7ED",
        iconBackground: "#FFEDD5",
      };
    }

    return {
      title: "Poor Environment Quality",
      text: "Air quality is currently unhealthy.",
      color: "#B91C1C",
      background: "#FEF2F2",
      iconBackground: "#FEE2E2",
    };
  };


  // ==========================================
  // LIVE VALUES
  // ==========================================

  const airQualityScore =
    Number(health.airQualityScore) || 0;

  const airQualityStatus =
    getAirQualityStatus(airQualityScore);

  const airQualityColor =
    getAirQualityColor(airQualityScore);

  const airQualityBackground =
    getAirQualityBackground(airQualityScore);

  const airQualityDescription =
    getAirQualityDescription(airQualityScore);

  const environmentStatus =
    getEnvironmentStatus(airQualityScore);


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      {/* ==========================================
          HEADER
      ========================================== */}

      <Text style={styles.heading}>
        Environment
      </Text>

      <Text style={styles.subtitle}>
        Monitor your surrounding environment
      </Text>


      {/* ==========================================
          STATUS
      ========================================== */}

      <View
        style={[
          styles.statusCard,
          {
            backgroundColor:
              environmentStatus.background,
          },
        ]}
      >

        <View
          style={[
            styles.statusIcon,
            {
              backgroundColor:
                environmentStatus.iconBackground,
            },
          ]}
        >
          <Text
            style={{
              color: environmentStatus.color,
              fontWeight: "800",
            }}
          >
            ✓
          </Text>
        </View>


        <View style={{ flex: 1 }}>

          <Text
            style={[
              styles.statusTitle,
              {
                color: environmentStatus.color,
              },
            ]}
          >
            {environmentStatus.title}
          </Text>

          <Text
            style={[
              styles.statusText,
              {
                color: environmentStatus.color,
              },
            ]}
          >
            {environmentStatus.text}
          </Text>

        </View>

      </View>


      {/* ==========================================
          CURRENT CONDITIONS
      ========================================== */}

      <Text style={styles.sectionTitle}>
        Current Conditions
      </Text>


      <View style={styles.grid}>

        <EnvironmentCard
          icon="♨"
          title="Temperature"
          value={Number(health.envtemp).toFixed(1)}
          unit="°C"
        />


        <EnvironmentCard
          icon="≈"
          title="Humidity"
          value={Number(health.humidity).toFixed(0)}
          unit="%"
        />


        <EnvironmentCard
          icon="≋"
          title="Dust Level"
          value={health.airQualityLevel || "unhealthy"}
          unit=""
        />


        <EnvironmentCard
          icon="☁"
          title="Air Quality"
          value={airQualityScore || 15}
          unit="/100"
        />

      </View>


      {/* ==========================================
          AIR QUALITY
      ========================================== */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Air Quality
        </Text>


        <View style={styles.airRow}>

          <View
            style={[
              styles.airCircle,
              {
                backgroundColor:
                  airQualityBackground,
              },
            ]}
          >

            <Text
              style={[
                styles.airScore,
                {
                  color: airQualityColor,
                },
              ]}
            >
              {airQualityStatus}
            </Text>

          </View>


          <View style={{ flex: 1 }}>

            <Text style={styles.airHeading}>
              Air quality is {airQualityStatus.toLowerCase()}
            </Text>


            <Text style={styles.airDescription}>
              {airQualityDescription}
            </Text>

          </View>

        </View>

      </View>


      {/* ==========================================
          ENVIRONMENT DETAILS
      ========================================== */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Environment Details
        </Text>


        <Detail
          title="Temperature"
          value={`${Number(health.envtemp).toFixed(1)} °C`}
        />


        <Detail
          title="Humidity"
          value={`${Number(health.humidity).toFixed(0)} %`}
        />


        <Detail
          title="Dust Density"
          value={
            health.airQualityLevel || "Unknown"
          }
        />


        <Detail
          title="Air Quality Score"
          value={`${airQualityScore} / 100`}
        />


        <Detail
          title="Status"
          value={airQualityStatus}
        />


        <Detail
          title="Connection"
          value={connected ? "Live" : "Offline"}
        />

      </View>


      <View style={{ height: 90 }} />

    </ScrollView>
  );
}


// ==========================================
// ENVIRONMENT CARD
// ==========================================

function EnvironmentCard({
  icon,
  title,
  value,
  unit,
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

        <Text
          style={[
            styles.metricValue,
            title === "Dust Level" && {
              fontSize: 17,
            },
          ]}
        >
          {value}
        </Text>


        <Text style={styles.unit}>
          {unit}
        </Text>

      </View>

    </View>
  );
}


// ==========================================
// DETAIL
// ==========================================

function Detail({
  title,
  value,
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


// ==========================================
// STYLES
// ==========================================

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
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },


  statusTitle: {
    fontSize: 14,
    fontWeight: "800",
  },


  statusText: {
    fontSize: 10,
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
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },


  airScore: {
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