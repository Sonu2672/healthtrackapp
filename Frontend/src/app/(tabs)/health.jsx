import { useState } from "react";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Svg, {
  Circle,
  Path,
  Line,
} from "react-native-svg";

import { useHealth } from "../../../context/HealthContext";

// ==================================================
// DEMO TREND DATA
// Later backend history se replace kar sakte ho
// ==================================================

const trendData = {
  heartRate: [
    76, 78, 77, 80, 82, 81, 79, 83, 85, 82,
    80, 84, 86, 84, 81, 79, 82, 85, 87, 84,
    82, 80, 83, 81, 84, 86, 82, 80, 82, 84,
  ],

  spo2: [
    97.2, 97.5, 98, 97.8, 98.1, 98, 97.7, 98.2,
    98.3, 98, 97.9, 98.1, 98.4, 98.2, 98,
    97.8, 98.1, 98.3, 98.2, 98.5, 98.1, 98,
    98.2, 98.4, 98.1, 98.3, 98.2, 98.5, 98.3,
  ],

  temperature: [
    36.5, 36.6, 36.6, 36.7, 36.7, 36.8, 36.7,
    36.6, 36.7, 36.8, 36.7, 36.6, 36.7, 36.8,
    36.9, 36.8, 36.7, 36.7, 36.8, 36.7, 36.6,
    36.7, 36.8, 36.7, 36.7, 36.8, 36.7, 36.6,
  ],

  ecg: [
    48, 52, 49, 54, 50, 56, 51, 58, 52, 55,
    49, 53, 57, 51, 54, 50, 56, 52, 58, 53,
    55, 50, 54, 57, 51, 55, 52, 56, 53, 57,
  ],
};

// ==================================================
// HEALTH SCREEN
// ==================================================

export default function Health() {

  // IMPORTANT:
  // useHealth() component ke ANDAR hona chahiye
  const { health, connected } = useHealth();

  const [selectedMetric, setSelectedMetric] =
    useState("heartRate");

  // ==================================================
  // METRIC CONFIG
  // ==================================================

  const metrics = {
    heartRate: {
      title: "Heart Rate",
      shortTitle: "Heart Rate",
      icon: "♥",
      value: health?.heartRate ?? 0,
      unit: "BPM",
      status: "Normal",
      color: "#EF4444",
      bg: "#FEE2E2",
      data: trendData.heartRate,
      min: 60,
      max: 100,
    },

    spo2: {
      title: "SpO₂",
      shortTitle: "SpO₂",
      icon: "◉",
      value: health?.spo2 ?? 0,
      unit: "%",
      status: "Normal",
      color: "#2563EB",
      bg: "#DBEAFE",
      data: trendData.spo2,
      min: 95,
      max: 100,
    },

    temperature: {
      title: "Body Temperature",
      shortTitle: "Temperature",
      icon: "♨",
      value: health?.temp ?? 0,
      unit: "°C",
      status: "Normal",
      color: "#F97316",
      bg: "#FFEDD5",
      data: trendData.temperature,
      min: 36,
      max: 38,
    },

    ecg: {
      title: "ECG Signal",
      shortTitle: "ECG",
      icon: "〰",
      value: "Normal",
      unit: "",
      status: "Monitoring",
      color: "#7C3AED",
      bg: "#EDE9FE",
      data: trendData.ecg,
      min: 40,
      max: 60,
    },
  };

  const selected = metrics[selectedMetric];

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
        Health
      </Text>

      <Text style={styles.subtitle}>
        Monitor your health vitals
      </Text>

      {/* ==========================================
          CURRENT VITALS
      ========================================== */}

      <Text style={styles.sectionTitle}>
        Current Vitals
      </Text>

      <View style={styles.grid}>

        <VitalCard
          metric="heartRate"
          item={metrics.heartRate}
          selected={selectedMetric === "heartRate"}
          onPress={() =>
            setSelectedMetric("heartRate")
          }
        />

        <VitalCard
          metric="spo2"
          item={metrics.spo2}
          selected={selectedMetric === "spo2"}
          onPress={() =>
            setSelectedMetric("spo2")
          }
        />

        <VitalCard
          metric="temperature"
          item={metrics.temperature}
          selected={
            selectedMetric === "temperature"
          }
          onPress={() =>
            setSelectedMetric("temperature")
          }
        />

        <VitalCard
          metric="ecg"
          item={metrics.ecg}
          selected={selectedMetric === "ecg"}
          onPress={() =>
            setSelectedMetric("ecg")
          }
        />

      </View>

      {/* ==========================================
          TREND CARD
      ========================================== */}

      <View style={styles.card}>

        <View style={styles.cardHeader}>

          <View>

            <View style={styles.trendTitleRow}>

              <View
                style={[
                  styles.trendIcon,
                  {
                    backgroundColor:
                      selected.bg,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.trendIconText,
                    {
                      color:
                        selected.color,
                    },
                  ]}
                >
                  {selected.icon}
                </Text>
              </View>

              <View>

                <Text
                  style={styles.cardTitle}
                >
                  {selected.title} Trend
                </Text>

                <Text
                  style={styles.cardSubtitle}
                >
                  Live health monitoring
                </Text>

              </View>

            </View>

          </View>

          <View
            style={[
              styles.liveBadge,
              {
                backgroundColor:
                  selected.bg,
              },
            ]}
          >

            <View
              style={[
                styles.liveDot,
                {
                  backgroundColor:
                    selected.color,
                },
              ]}
            />

            <Text
              style={[
                styles.liveText,
                {
                  color:
                    selected.color,
                },
              ]}
            >
              LIVE
            </Text>

          </View>

        </View>

        {/* CHART */}

        <View style={styles.chartContainer}>

          <SmoothChart
            data={selected.data}
            color={selected.color}
            min={selected.min}
            max={selected.max}
          />

        </View>

        {/* CHART BOTTOM */}

        <View style={styles.chartFooter}>

          <Text style={styles.timeLabel}>
            8:00 AM
          </Text>

          <Text style={styles.timeLabel}>
            12:00 PM
          </Text>

          <Text style={styles.timeLabel}>
            4:00 PM
          </Text>

          <Text style={styles.timeLabel}>
            Now
          </Text>

        </View>

        {/* CURRENT VALUE */}

        <View
          style={[
            styles.currentReading,
            {
              backgroundColor:
                selected.bg,
            },
          ]}
        >

          <View>

            <Text
              style={styles.readingLabel}
            >
              Current reading
            </Text>

            <Text
              style={[
                styles.readingValue,
                {
                  color:
                    selected.color,
                },
              ]}
            >
              {selected.value}{" "}

              <Text
                style={styles.readingUnit}
              >
                {selected.unit}
              </Text>

            </Text>

          </View>

          <View>

            <Text style={styles.readingLabel}>
              Status
            </Text>

            <Text
              style={[
                styles.readingStatus,
                {
                  color:
                    selected.color,
                },
              ]}
            >
              ● {selected.status}
            </Text>

          </View>

        </View>

      </View>

      {/* ==========================================
          TREND SELECTOR
      ========================================== */}

      <Text style={styles.sectionTitle}>
        View Vital Trends
      </Text>

      <View style={styles.selectorCard}>

        <TrendSelector
          metric="heartRate"
          item={metrics.heartRate}
          selected={selectedMetric}
          onPress={() =>
            setSelectedMetric("heartRate")
          }
        />

        <TrendSelector
          metric="spo2"
          item={metrics.spo2}
          selected={selectedMetric}
          onPress={() =>
            setSelectedMetric("spo2")
          }
        />

        <TrendSelector
          metric="temperature"
          item={metrics.temperature}
          selected={selectedMetric}
          onPress={() =>
            setSelectedMetric("temperature")
          }
        />

        <TrendSelector
          metric="ecg"
          item={metrics.ecg}
          selected={selectedMetric}
          onPress={() =>
            setSelectedMetric("ecg")
          }
        />

      </View>

      {/* ==========================================
          TODAY SUMMARY
      ========================================== */}

      <Text style={styles.sectionTitle}>
        Today's Summary
      </Text>

      <View style={styles.summaryCard}>

        <SummaryItem
          title="Lowest"
          value={
            selectedMetric === "heartRate"
              ? "72 BPM"
              : selectedMetric === "spo2"
              ? "97%"
              : selectedMetric === "temperature"
              ? "36.5°C"
              : "48"
          }
        />

        <SummaryItem
          title="Average"
          value={
            selectedMetric === "heartRate"
              ? "80 BPM"
              : selectedMetric === "spo2"
              ? "98%"
              : selectedMetric === "temperature"
              ? "36.7°C"
              : "53"
          }
        />

        <SummaryItem
          title="Highest"
          value={
            selectedMetric === "heartRate"
              ? "91 BPM"
              : selectedMetric === "spo2"
              ? "99%"
              : selectedMetric === "temperature"
              ? "36.9°C"
              : "58"
          }
        />

      </View>

      {/* ==========================================
          RECENT RECORDS
      ========================================== */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Recent Records
        </Text>

        <Record
          time="08:42 PM"
          hr="82"
          spo2="98"
          temp="36.7"
        />

        <Record
          time="08:37 PM"
          hr="80"
          spo2="98"
          temp="36.6"
        />

        <Record
          time="08:32 PM"
          hr="79"
          spo2="97"
          temp="36.7"
        />

        <Record
          time="08:27 PM"
          hr="81"
          spo2="98"
          temp="36.7"
        />

      </View>

      <View style={{ height: 90 }} />

    </ScrollView>
  );
}

// ==================================================
// VITAL CARD
// ==================================================

function VitalCard({
  item,
  selected,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.vitalCard,
        selected && {
          borderWidth: 1.5,
          borderColor: item.color,
          backgroundColor: "#FFFFFF",
        },
      ]}
    >

      <View
        style={[
          styles.vitalIconBox,
          {
            backgroundColor:
              item.bg,
          },
        ]}
      >

        <Text
          style={[
            styles.vitalIcon,
            {
              color: item.color,
            },
          ]}
        >
          {item.icon}
        </Text>

      </View>

      <Text style={styles.vitalTitle}>
        {item.title}
      </Text>

      <View style={styles.valueRow}>

        <Text style={styles.vitalValue}>
          {item.value}
        </Text>

        <Text style={styles.unit}>
          {item.unit}
        </Text>

      </View>

      <Text
        style={[
          styles.status,
          {
            color: item.color,
          },
        ]}
      >
        ● {item.status}
      </Text>

    </Pressable>
  );
}

// ==================================================
// TREND SELECTOR
// ==================================================

function TrendSelector({
  metric,
  item,
  selected,
  onPress,
}) {
  const isSelected = selected === metric;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.selector,
        isSelected && {
          backgroundColor: item.bg,
          borderColor: item.color,
        },
      ]}
    >

      <View
        style={[
          styles.selectorIcon,
          {
            backgroundColor:
              isSelected
                ? "#FFFFFF"
                : "#F8FAFC",
          },
        ]}
      >

        <Text
          style={[
            styles.selectorIconText,
            {
              color: item.color,
            },
          ]}
        >
          {item.icon}
        </Text>

      </View>

      <View style={styles.selectorText}>

        <Text
          style={[
            styles.selectorTitle,
            isSelected && {
              color: item.color,
            },
          ]}
        >
          {item.shortTitle}
        </Text>

        <Text style={styles.selectorValue}>
          {item.value} {item.unit}
        </Text>

      </View>

      {isSelected && (
        <Text
          style={[
            styles.check,
            {
              color: item.color,
            },
          ]}
        >
          ✓
        </Text>
      )}

    </Pressable>
  );
}

// ==================================================
// SMOOTH CURVE CHART
// ==================================================

function SmoothChart({
  data,
  color,
  min,
  max,
}) {
  const width = 320;
  const height = 160;

  const paddingX = 8;
  const paddingY = 18;

  const usableWidth =
    width - paddingX * 2;

  const usableHeight =
    height - paddingY * 2;

  const points = data.map(
    (value, index) => {

      const x =
        paddingX +
        (index /
          (data.length - 1)) *
          usableWidth;

      const normalized =
        (value - min) /
        (max - min);

      const y =
        height -
        paddingY -
        normalized *
          usableHeight;

      return { x, y };
    }
  );

  let path = "";

  points.forEach(
    (point, index) => {

      if (index === 0) {
        path =
          `M ${point.x} ${point.y}`;
        return;
      }

      const previous =
        points[index - 1];

      const controlX =
        (previous.x + point.x) / 2;

      path +=
        ` C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
    }
  );

  const lastPoint =
    points[points.length - 1];

  return (
    <Svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >

      <Line
        x1="8"
        y1="30"
        x2="312"
        y2="30"
        stroke="#E5E7EB"
        strokeWidth="1"
        strokeDasharray="4 5"
      />

      <Line
        x1="8"
        y1="80"
        x2="312"
        y2="80"
        stroke="#E5E7EB"
        strokeWidth="1"
        strokeDasharray="4 5"
      />

      <Line
        x1="8"
        y1="130"
        x2="312"
        y2="130"
        stroke="#E5E7EB"
        strokeWidth="1"
        strokeDasharray="4 5"
      />

      <Path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Circle
        cx={lastPoint.x}
        cy={lastPoint.y}
        r="6"
        fill="#FFFFFF"
        stroke={color}
        strokeWidth="3"
      />

      <Circle
        cx={lastPoint.x}
        cy={lastPoint.y}
        r="2.5"
        fill={color}
      />

    </Svg>
  );
}

// ==================================================
// SUMMARY
// ==================================================

function SummaryItem({
  title,
  value,
}) {
  return (
    <View style={styles.summaryItem}>

      <Text style={styles.summaryTitle}>
        {title}
      </Text>

      <Text style={styles.summaryValue}>
        {value}
      </Text>

    </View>
  );
}

// ==================================================
// RECORD
// ==================================================

function Record({
  time,
  hr,
  spo2,
  temp,
}) {
  return (
    <View style={styles.record}>

      <Text style={styles.recordTime}>
        {time}
      </Text>

      <View style={styles.recordValue}>

        <Text style={styles.recordNumber}>
          {hr}
        </Text>

        <Text style={styles.recordUnit}>
          BPM
        </Text>

      </View>

      <View style={styles.recordValue}>

        <Text style={styles.recordNumber}>
          {spo2}
        </Text>

        <Text style={styles.recordUnit}>
          %
        </Text>

      </View>

      <View style={styles.recordValue}>

        <Text style={styles.recordNumber}>
          {temp}
        </Text>

        <Text style={styles.recordUnit}>
          °C
        </Text>

      </View>

    </View>
  );
}

// ==================================================
// STYLES
// ==================================================

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
    marginBottom: 15,
  },

  vitalCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },

  vitalIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  vitalIcon: {
    fontSize: 21,
    fontWeight: "800",
  },

  vitalTitle: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 5,
  },

  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  vitalValue: {
    fontSize: 23,
    fontWeight: "800",
    color: "#111827",
  },

  unit: {
    fontSize: 10,
    color: "#6B7280",
    marginLeft: 3,
  },

  status: {
    fontSize: 9,
    marginTop: 8,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  trendTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  trendIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  trendIconText: {
    fontSize: 19,
    fontWeight: "800",
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
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 15,
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    marginRight: 5,
  },

  liveText: {
    fontSize: 9,
    fontWeight: "900",
  },

  chartContainer: {
    height: 160,
    marginTop: 20,
    backgroundColor: "#F8FAFC",
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
  },

  chartFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 4,
  },

  timeLabel: {
    fontSize: 9,
    color: "#9CA3AF",
  },

  currentReading: {
    marginTop: 15,
    padding: 12,
    borderRadius: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  readingLabel: {
    fontSize: 9,
    color: "#9CA3AF",
    marginBottom: 3,
  },

  readingValue: {
    fontSize: 19,
    fontWeight: "900",
  },

  readingUnit: {
    fontSize: 10,
    fontWeight: "700",
  },

  readingStatus: {
    fontSize: 11,
    fontWeight: "800",
  },

  selectorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 10,
    marginBottom: 20,
  },

  selector: {
    minHeight: 64,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 7,
  },

  selectorIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  selectorIconText: {
    fontSize: 18,
    fontWeight: "800",
  },

  selectorText: {
    marginLeft: 10,
    flex: 1,
  },

  selectorTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
  },

  selectorValue: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 3,
  },

  check: {
    fontSize: 20,
    fontWeight: "900",
    marginRight: 5,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  summaryItem: {
    flex: 1,
    alignItems: "center",
  },

  summaryTitle: {
    fontSize: 10,
    color: "#9CA3AF",
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
    marginTop: 5,
  },

  record: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  recordTime: {
    width: "30%",
    fontSize: 11,
    color: "#6B7280",
  },

  recordValue: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "center",
  },

  recordNumber: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "600",
  },

  recordUnit: {
    fontSize: 8,
    color: "#9CA3AF",
    marginLeft: 2,
    marginTop: 3,
  },

});