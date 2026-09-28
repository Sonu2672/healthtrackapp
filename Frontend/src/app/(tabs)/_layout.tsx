import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#94A3B8",

        tabBarStyle: {
          position: "absolute",

          left: 14,
          right: 14,
          bottom: 40,

          height: 64,

          backgroundColor: "#FFFFFF",

          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#E5E7EB",

          elevation: 10,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.12,
          shadowRadius: 10,

          paddingTop: 6,
          paddingBottom: 6,
        },

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          marginBottom: 2,
        },

        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      {/* HOME */}
     <Tabs.Screen
  name="index"
  options={{
    title: "Home",
    tabBarIcon: ({ size }) => (
      <Ionicons
        name="home-outline"
        size={size}
        color="#2563EB"
      />
    ),
  }}
/>

      {/* HEALTH */}
     <Tabs.Screen
  name="health"
  options={{
    title: "Health",
    tabBarIcon: ({ size }) => (
      <Ionicons
        name="heart-outline"
        size={size}
        color="#EF4444"
      />
    ),
  }}
/>

      {/* AI RISK */}
<Tabs.Screen
  name="risk"
  options={{
    title: "AI Risk",
    tabBarIcon: ({ size }) => (
      <Ionicons
        name="analytics-outline"
        size={size}
        color="#8B5CF6"
      />
    ),
  }}
/>

    <Tabs.Screen
  name="disaster"
  options={{
    title: "Disaster",
    tabBarIcon: ({ color, size }) => (
      <Ionicons
        name="warning-outline"
        size={size}
        color="#F97316"
      />
    ),
  }}
/>


      {/* ENVIRONMENT */}
      <Tabs.Screen
  name="environment"
  options={{
    title: "Environment",
    tabBarIcon: ({ size }) => (
      <Ionicons
        name="leaf-outline"
        size={size}
        color="#16A34A"
      />
    ),
  }}
/>
      {/* PROFILE */}
  <Tabs.Screen
  name="profile"
  options={{
    title: "Profile",
    tabBarIcon: ({ size }) => (
      <Ionicons
        name="person-outline"
        size={size}
        color="#000000"
      />
    ),
  }}
/>
    </Tabs>
  );
}