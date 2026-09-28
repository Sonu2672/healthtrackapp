import {
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ModeBadge({ mode }) {
  const isOnline = mode === "ONLINE";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isOnline
            ? "#DCFCE7"
            : "#DBEAFE",
        },
      ]}
    >
      <View
        style={[
          styles.dot,
          {
            backgroundColor: isOnline
              ? "#22C55E"
              : "#3B82F6",
          },
        ]}
      />

      <Text
        style={[
          styles.text,
          {
            color: isOnline
              ? "#15803D"
              : "#2563EB",
          },
        ]}
      >
        {isOnline
          ? "ONLINE MODE"
          : "OFFLINE MODE"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 18,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 8,
  },

  text: {
    fontSize: 12,
    fontWeight: "700",
  },
});