// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="index" />
//       <Stack.Screen name="demo" />
//       <Stack.Screen name="(tabs)" />
//     </Stack>
//   );
// }

import { Stack } from "expo-router";
import { HealthProvider } from "../../context/HealthContext";

export default function RootLayout() {
  return (
    <HealthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="demo" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </HealthProvider>
  );
}