import { Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { HealthProvider, useHealth } from "../../context/HealthContext";

function AppContent() {
  const { connected } = useHealth();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />

      {!connected && (
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <ActivityIndicator size="large" color="#000000" />

            <Text style={styles.title}>
              Please Wait
            </Text>

            <Text style={styles.message}>
              Your device is being connected through HealthTrack...
            </Text>

            <Text style={styles.subtext}>
              Establishing secure connection
            </Text>
          </View>
        </View>
      )}
    </>
  );
}

export default function RootLayout() {
  return (
    <HealthProvider>
      <AppContent />
    </HealthProvider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.96)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  popup: {
    width: "82%",
    maxWidth: 380,
    padding: 30,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "800",
    color: "#111111",
  },

  message: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    color: "#444444",
  },

  subtext: {
    marginTop: 12,
    fontSize: 12,
    color: "#888888",
  },
});

// import { Stack } from "expo-router";
// import { HealthProvider } from "../../context/HealthContext";

// export default function RootLayout() {
//   return (
//     <HealthProvider>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="index" />
//         <Stack.Screen name="demo" />
//         <Stack.Screen name="(tabs)" />
//       </Stack>
//     </HealthProvider>
//   );
// }