import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Risk() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>
        AI Risk Analysis
      </Text>

      <Text style={styles.subtitle}>
        AI-powered health risk assessment
      </Text>

      {/* RISK SCORE */}
      <View style={styles.scoreCard}>
        <Text style={styles.label}>
          CURRENT RISK SCORE
        </Text>

        <View style={styles.scoreContent}>
          <View style={styles.scoreCircle}>
            <Text style={styles.score}>
              12
            </Text>

            <Text style={styles.outOf}>
              /100
            </Text>

            <Text style={styles.lowRisk}>
              Low Risk
            </Text>
          </View>

          <View style={styles.riskInfo}>
            <Text style={styles.infoLabel}>
              Risk Level
            </Text>

            <Text style={styles.riskLevel}>
              Low Risk
            </Text>

            <Text style={styles.description}>
              AI analyzes your health and
              environmental parameters to
              estimate your current health risk.
            </Text>

            <Text style={styles.confidenceLabel}>
              AI Confidence
            </Text>

            <View style={styles.progress}>
              <View style={styles.progressFill} />
            </View>

            <Text style={styles.confidence}>
              82%
            </Text>
          </View>
        </View>
      </View>

      {/* RISK FACTORS */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          AI Risk Factors
        </Text>

        <Text style={styles.cardSubtitle}>
          Current parameter monitoring
        </Text>

        <RiskFactor
          icon="♥"
          name="Heart Rate"
          value="82 BPM"
          status="Normal"
        />

        <RiskFactor
          icon="◉"
          name="SpO₂"
          value="98%"
          status="Normal"
        />

        <RiskFactor
          icon="♨"
          name="Body Temperature"
          value="36.7 °C"
          status="Normal"
        />

        <RiskFactor
          icon="♨"
          name="Environment Temperature"
          value="29.4 °C"
          status="Normal"
        />

        <RiskFactor
          icon="≈"
          name="Humidity"
          value="64%"
          status="Normal"
        />

        <RiskFactor
          icon="〰"
          name="ECG Signal"
          value="Normal"
          status="Monitoring"
        />

        <RiskFactor
          icon="≋"
          name="Dust / Air Quality"
          value="Low"
          status="Good"
        />
      </View>

      {/* RECOMMENDATIONS */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          AI Recommendations
        </Text>

        <Recommendation text="Maintain a balanced and healthy lifestyle." />

        <Recommendation text="Stay hydrated and monitor your health regularly." />

        <Recommendation text="Keep your surrounding environment comfortable and clean." />
      </View>

      <View style={{ height: 90 }} />
    </ScrollView>
  );
}

function RiskFactor({
  icon,
  name,
  value,
  status,
}: {
  icon: string;
  name: string;
  value: string;
  status: string;
}) {
  return (
    <View style={styles.factor}>
      <View style={styles.factorIcon}>
        <Text>{icon}</Text>
      </View>

      <View style={styles.factorInfo}>
        <Text style={styles.factorName}>
          {name}
        </Text>

        <Text style={styles.factorStatus}>
          {status}
        </Text>
      </View>

      <Text style={styles.factorValue}>
        {value}
      </Text>
    </View>
  );
}

function Recommendation({
  text,
}: {
  text: string;
}) {
  return (
    <View style={styles.recommendation}>
      <View style={styles.check}>
        <Text>✓</Text>
      </View>

      <Text style={styles.recommendationText}>
        {text}
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

  scoreCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
  },

  label: {
    fontSize: 10,
    fontWeight: "800",
    color: "#6B7280",
    marginBottom: 18,
  },

  scoreContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  scoreCircle: {
    width: 135,
    height: 135,
    borderRadius: 68,
    backgroundColor: "#ECFDF5",
    borderWidth: 10,
    borderColor: "#86EFAC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },

  score: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111827",
  },

  outOf: {
    fontSize: 10,
    color: "#9CA3AF",
  },

  lowRisk: {
    fontSize: 11,
    color: "#16A34A",
    fontWeight: "800",
    marginTop: 2,
  },

  riskInfo: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 10,
    color: "#6B7280",
  },

  riskLevel: {
    fontSize: 21,
    fontWeight: "800",
    color: "#16A34A",
    marginTop: 3,
  },

  description: {
    fontSize: 10,
    color: "#6B7280",
    lineHeight: 15,
    marginTop: 7,
  },

  confidenceLabel: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 12,
    marginBottom: 5,
  },

  progress: {
    height: 7,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    width: "82%",
    height: "100%",
    backgroundColor: "#22C55E",
  },

  confidence: {
    fontSize: 9,
    color: "#16A34A",
    marginTop: 4,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  cardSubtitle: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 4,
    marginBottom: 12,
  },

  factor: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  factorIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  factorInfo: {
    flex: 1,
  },

  factorName: {
    fontSize: 11,
    fontWeight: "700",
    color: "#374151",
  },

  factorStatus: {
    fontSize: 9,
    color: "#16A34A",
    marginTop: 2,
  },

  factorValue: {
    fontSize: 11,
    fontWeight: "700",
    color: "#111827",
  },

  recommendation: {
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  check: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  recommendationText: {
    flex: 1,
    fontSize: 12,
    color: "#374151",
    lineHeight: 17,
  },
});