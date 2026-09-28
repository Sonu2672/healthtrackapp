// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,

//         tabBarActiveTintColor: "#2563EB",
//         tabBarInactiveTintColor: "#94A3B8",

//         tabBarStyle: {
//           position: "absolute",

//           left: 14,
//           right: 14,
//           bottom: 40,

//           height: 64,

//           backgroundColor: "#FFFFFF",

//           borderRadius: 20,
//           borderWidth: 1,
//           borderColor: "#E5E7EB",

//           elevation: 10,

//           shadowColor: "#000",
//           shadowOffset: {
//             width: 0,
//             height: 4,
//           },
//           shadowOpacity: 0.12,
//           shadowRadius: 10,

//           paddingTop: 6,
//           paddingBottom: 6,
//         },

//         tabBarLabelStyle: {
//           fontSize: 10,
//           fontWeight: "700",
//           marginBottom: 2,
//         },

//         tabBarIconStyle: {
//           marginTop: 2,
//         },
//       }}
//     >
//       {/* HOME */}
//      <Tabs.Screen
//   name="index"
//   options={{
//     title: "Home",
//     tabBarIcon: ({ size }) => (
//       <Ionicons
//         name="home-outline"
//         size={size}
//         color="#2563EB"
//       />
//     ),
//   }}
// />

//       {/* HEALTH */}
//      <Tabs.Screen
//   name="health"
//   options={{
//     title: "Health",
//     tabBarIcon: ({ size }) => (
//       <Ionicons
//         name="heart-outline"
//         size={size}
//         color="#EF4444"
//       />
//     ),
//   }}
// />

//       {/* AI RISK */}
// <Tabs.Screen
//   name="risk"
//   options={{
//     title: "AI Risk",
//     tabBarIcon: ({ size }) => (
//       <Ionicons
//         name="analytics-outline"
//         size={size}
//         color="#8B5CF6"
//       />
//     ),
//   }}
// />

//     <Tabs.Screen
//   name="disaster"
//   options={{
//     title: "Disaster",
//     tabBarIcon: ({ color, size }) => (
//       <Ionicons
//         name="warning-outline"
//         size={size}
//         color="#F97316"
//       />
//     ),
//   }}
// />


//       {/* ENVIRONMENT */}
//       <Tabs.Screen
//   name="environment"
//   options={{
//     title: "Environment",
//     tabBarIcon: ({ size }) => (
//       <Ionicons
//         name="leaf-outline"
//         size={size}
//         color="#16A34A"
//       />
//     ),
//   }}
// />
//       {/* PROFILE */}
//   <Tabs.Screen
//   name="profile"
//   options={{
//     title: "Profile",
//     tabBarIcon: ({ size }) => (
//       <Ionicons
//         name="person-outline"
//         size={size}
//         color="#000000"
//       />
//     ),
//   }}
// />
//     </Tabs>
//   );
// }

import { Tabs, useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

const menuItems = [
  {
    name: "index",
    title: "Home",
    icon: "home-outline" as const,
    activeIcon: "home" as const,
    color: "#2563EB",
  },
  {
    name: "health",
    title: "Health",
    icon: "heart-outline" as const,
    activeIcon: "heart" as const,
    color: "#EF4444",
  },
  {
    name: "risk",
    title: "AI Risk",
    icon: "analytics-outline" as const,
    activeIcon: "analytics" as const,
    color: "#8B5CF6",
  },
  {
    name: "disaster",
    title: "Disaster",
    icon: "warning-outline" as const,
    activeIcon: "warning" as const,
    color: "#F97316",
  },
  {
    name: "environment",
    title: "Environment",
    icon: "leaf-outline" as const,
    activeIcon: "leaf" as const,
    color: "#16A34A",
  },
  {
    name: "profile",
    title: "Profile",
    icon: "person-outline" as const,
    activeIcon: "person" as const,
    color: "#111827",
  },
];

function DesktopSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.sidebar}>
      {/* LOGO */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Ionicons name="heart" size={24} color="#FFFFFF" />
        </View>

        <View>
          <Text style={styles.logoTitle}>HealthTrack</Text>
          <Text style={styles.logoSubtitle}>Health Companion</Text>
        </View>
      </View>

      {/* MENU */}
      <View style={styles.menu}>
        {menuItems.map((item) => {
          const isActive =
            item.name === "index"
              ? pathname === "/"
              : pathname.includes(`/${item.name}`);

          return (
            <Pressable
              key={item.name}
              onPress={() => {
                if (item.name === "index") {
                  router.push("/");
                } else {
                  router.push(`/(tabs)/${item.name}` as any);
                }
              }}
              style={[
                styles.menuItem,
                isActive && styles.menuItemActive,
              ]}
            >
              <Ionicons
                name={isActive ? item.activeIcon : item.icon}
                size={21}
                color={isActive ? item.color : "#64748B"}
              />

              <Text
                style={[
                  styles.menuText,
                  isActive && {
                    color: item.color,
                    fontWeight: "700",
                  },
                ]}
              >
                {item.title}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* BOTTOM */}
      <View style={styles.sidebarBottom}>
        <View style={styles.statusDot} />

        <Text style={styles.statusText}>System Online</Text>
      </View>
    </View>
  );
}

export default function TabsLayout() {
  const { width } = useWindowDimensions();

  const isDesktop = width >= 1024;

  return (
    <View style={styles.container}>
      {/* DESKTOP SIDEBAR */}
      {isDesktop && <DesktopSidebar />}

      <View
        style={[
          styles.content,
          isDesktop && styles.desktopContent,
        ]}
      >
        <Tabs
          screenOptions={{
            headerShown: false,

            tabBarActiveTintColor: "#2563EB",
            tabBarInactiveTintColor: "#94A3B8",

            /*
             * DESKTOP:
             * Hide Expo bottom tabs because
             * custom sidebar is being used.
             */
            tabBarStyle: isDesktop
              ? { display: "none" }
              : {
                  position: "absolute",

                  left: 14,
                  right: 14,
                  bottom: 20,

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

          {/* DISASTER */}
          <Tabs.Screen
            name="disaster"
            options={{
              title: "Disaster",
              tabBarIcon: ({ size }) => (
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
  },

  content: {
    flex: 1,
  },

  desktopContent: {
    marginLeft: 240,
  },

  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,

    width: 240,

    backgroundColor: "#FFFFFF",

    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",

    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 24,

    zIndex: 100,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 8,
    marginBottom: 35,
  },

  logoCircle: {
    width: 42,
    height: 42,

    borderRadius: 12,

    backgroundColor: "#2563EB",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 10,
  },

  logoTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
  },

  logoSubtitle: {
    fontSize: 10,
    color: "#64748B",
    marginTop: 2,
  },

  menu: {
    gap: 8,
  },

  menuItem: {
    height: 50,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 14,

    borderRadius: 12,
  },

  menuItemActive: {
    backgroundColor: "#EFF6FF",
  },

  menuText: {
    marginLeft: 13,

    fontSize: 14,

    color: "#64748B",
    fontWeight: "600",
  },

  sidebarBottom: {
    marginTop: "auto",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 12,
  },

  statusDot: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: "#22C55E",

    marginRight: 8,
  },

  statusText: {
    fontSize: 12,

    color: "#64748B",
    fontWeight: "600",
  },
});
