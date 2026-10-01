import { useState } from "react";
import {
  Ionicons,
} from "@expo/vector-icons";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
} from "react-native";

import useResponsive from "../../hooks/useResponsive";
import { router } from "expo-router";
export default function Login() {
  const { isDesktop } = useResponsive();

  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          isDesktop && styles.desktopContainer,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ============================= */}
        {/* LEFT BRAND - DESKTOP */}
        {/* ============================= */}

        {isDesktop && (
          <View style={styles.leftSection}>
            {/* Logo */}

            <View style={styles.logoRow}>
              <View style={styles.logo}>
                <Ionicons
                  name="heart"
                  size={22}
                  color="#fff"
                />
              </View>

              <View>
                <Text style={styles.logoTitle}>
                  PHC
                </Text>

                <Text style={styles.logoSubtitle}>
                  Personal Health Companion
                </Text>
              </View>
            </View>

            {/* Main text */}

            <View style={styles.leftContent}>
              <View style={styles.badge}>
                <Ionicons
                  name="sparkles"
                  size={12}
                  color="#6842E5"
                />

                <Text style={styles.badgeText}>
                  AI-Powered • Smart • Preventive
                </Text>
              </View>

              <Text style={styles.leftTitle}>
                Your Health.{"\n"}
                Our Priority.
              </Text>

              <Text style={styles.leftDescription}>
                Your personal health companion that
                monitors your vital signs, analyzes
                risks in real-time and keeps you
                informed.
              </Text>

              {/* Features */}

              <View style={styles.featureList}>
                <Feature
                  icon="pulse-outline"
                  text="Real-time Monitoring"
                />

                <Feature
                  icon="analytics-outline"
                  text="AI Risk Analysis"
                />

                <Feature
                  icon="notifications-outline"
                  text="Early Warnings"
                />
              </View>
            </View>

            <Text style={styles.leftBottom}>
              Your health. Simplified.
            </Text>
          </View>
        )}

        {/* ============================= */}
        {/* RIGHT FORM */}
        {/* ============================= */}

        <View
          style={[
            styles.rightSection,
            isDesktop && styles.desktopRight,
          ]}
        >
          {/* Mobile Logo */}

          {!isDesktop && (
            <View style={styles.mobileLogoRow}>
              <View style={styles.logo}>
                <Ionicons
                  name="heart"
                  size={20}
                  color="#fff"
                />
              </View>

              <View>
                <Text style={styles.logoTitle}>
                  PHC
                </Text>

                <Text style={styles.logoSubtitle}>
                  Personal Health Companion
                </Text>
              </View>
            </View>
          )}

          {/* Form Card */}

          <View
            style={[
              styles.card,
              isDesktop && styles.desktopCard,
            ]}
          >
            {/* Icon */}

            <View style={styles.formIcon}>
              <Ionicons
                name={
                  isSignup
                    ? "person-add-outline"
                    : "log-in-outline"
                }
                size={22}
                color="#6842E5"
              />
            </View>

            {/* Heading */}

            <Text style={styles.heading}>
              {isSignup
                ? "Create your account"
                : "Welcome back"}
            </Text>

            <Text style={styles.subHeading}>
              {isSignup
                ? "Create an account to start your health journey."
                : "Sign in to continue to your health dashboard."}
            </Text>

            {/* ============================= */}
            {/* NAME */}
            {/* ============================= */}

            {isSignup && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Full Name
                </Text>

                <View style={styles.inputBox}>
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color="#98A2B3"
                  />

                  <TextInput
                    placeholder="Enter your full name"
                    placeholderTextColor="#98A2B3"
                    style={styles.input}
                  />
                </View>
              </View>
            )}

            {/* ============================= */}
            {/* EMAIL */}
            {/* ============================= */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Email Address
              </Text>

              <View style={styles.inputBox}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color="#98A2B3"
                />

                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor="#98A2B3"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>
            </View>

            {/* ============================= */}
            {/* PASSWORD */}
            {/* ============================= */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Password
              </Text>

              <View style={styles.inputBox}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#98A2B3"
                />

                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#98A2B3"
                  secureTextEntry={!showPassword}
                  style={styles.input}
                />

                <Pressable
                  onPress={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  <Ionicons
                    name={
                      showPassword
                        ? "eye-off-outline"
                        : "eye-outline"
                    }
                    size={18}
                    color="#98A2B3"
                  />
                </Pressable>
              </View>
            </View>

            {/* ============================= */}
            {/* CONFIRM PASSWORD */}
            {/* ============================= */}

            {isSignup && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Confirm Password
                </Text>

                <View style={styles.inputBox}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color="#98A2B3"
                  />

                  <TextInput
                    placeholder="Confirm your password"
                    placeholderTextColor="#98A2B3"
                    secureTextEntry
                    style={styles.input}
                  />
                </View>
              </View>
            )}

            {/* Forgot */}

            {!isSignup && (
              <Pressable style={styles.forgot}>
                <Text style={styles.forgotText}>
                  Forgot password?
                </Text>
              </Pressable>
            )}

            {/* ============================= */}
            {/* BUTTON */}
            {/* ============================= */}

            <Pressable onPress={()=>router.replace("/demo")}style={styles.mainButton}>
              <Text style={styles.mainButtonText}>
                {isSignup
                  ? "Create Account"
                  : "Login"}
              </Text>

              <Ionicons
                name="arrow-forward"
                size={18}
                color="#fff"
              />
            </Pressable>

            {/* ============================= */}
            {/* DIVIDER */}
            {/* ============================= */}

            <View style={styles.dividerRow}>
              <View style={styles.line} />

              <Text style={styles.orText}>
                OR
              </Text>

              <View style={styles.line} />
            </View>

            {/* ============================= */}
            {/* DEMO BUTTON */}
            {/* ============================= */}

            <Pressable onPress={()=>router.replace("/demo")}style={styles.demoButton}>
              <Ionicons
                name="play-circle-outline"
                size={19}
                color="#6842E5"
              />

              <Text style={styles.demoText}>
                Continue with Demo
              </Text>
            </Pressable>

            {/* ============================= */}
            {/* SWITCH */}
            {/* ============================= */}

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Text>

              <Pressable
                onPress={() =>
                  setIsSignup(!isSignup)
                }
              >
                <Text style={styles.switchLink}>
                  {isSignup
                    ? " Login"
                    : " Sign Up"}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Security */}

          <View style={styles.security}>
            <Ionicons
              name="shield-checkmark-outline"
              size={16}
              color="#12B76A"
            />

            <Text style={styles.securityText}>
              Your health information stays private
              and secure.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


/* =========================================
   FEATURE COMPONENT
========================================= */

function Feature({ icon, text }) {
  return (
    <View style={styles.feature}>
      <View style={styles.featureIcon}>
        <Ionicons
          name={icon}
          size={17}
          color="#6842E5"
        />
      </View>

      <Text style={styles.featureText}>
        {text}
      </Text>
    </View>
  );
}


/* =========================================
   STYLES
========================================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F7FF",
  },

  container: {
    flexGrow: 1,
    padding: 20,
  },

  desktopContainer: {
    flexDirection: "row",
    padding: 0,
    minHeight: "100%",
  },

  /* ==============================
     LEFT
  ============================== */

  leftSection: {
    width: "50%",
    minHeight: "100%",

    paddingHorizontal: 70,
    paddingVertical: 55,

    backgroundColor: "#6842E5",

    justifyContent: "space-between",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 42,
    height: 42,

    borderRadius: 11,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#6842E5",
  },

  leftSectionLogo: {
    backgroundColor: "#FFFFFF",
  },

  logoTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#101828",
  },

  logoSubtitle: {
    marginTop: 1,
    fontSize: 7,
    color: "#98A2B3",
  },

  leftContent: {
    maxWidth: 500,
  },

  badge: {
    alignSelf: "flex-start",

    flexDirection: "row",
    alignItems: "center",

    gap: 6,

    paddingHorizontal: 10,
    paddingVertical: 7,

    borderRadius: 8,

    backgroundColor: "#F1EDFF",
  },

  badgeText: {
    fontSize: 8,
    fontWeight: "600",
    color: "#6842E5",
  },

  leftTitle: {
    marginTop: 25,

    fontSize: 54,
    lineHeight: 56,

    fontWeight: "800",
    letterSpacing: -2,

    color: "#FFFFFF",
  },

  leftDescription: {
    marginTop: 20,

    maxWidth: 450,

    fontSize: 12,
    lineHeight: 19,

    color: "#E9E5FF",
  },

  featureList: {
    marginTop: 28,
    gap: 12,
  },

  feature: {
    flexDirection: "row",
    alignItems: "center",

    gap: 10,
  },

  featureIcon: {
    width: 32,
    height: 32,

    borderRadius: 9,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFFFFF",
  },

  featureText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  leftBottom: {
    fontSize: 9,
    color: "#DDD7FF",
  },

  /* ==============================
     RIGHT
  ============================== */

  rightSection: {
    flex: 1,

    justifyContent: "center",
  },

  desktopRight: {
    width: "50%",
    maxWidth: 700,

    paddingHorizontal: 70,
    paddingVertical: 40,

    backgroundColor: "#FFFFFF",
  },

  mobileLogoRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 9,

    marginBottom: 25,
  },

  /* ==============================
     CARD
  ============================== */

  card: {
    width: "100%",

    padding: 25,

    borderRadius: 18,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#EAECF0",

    shadowColor: "#101828",
    shadowOpacity: 0.07,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 3,
  },

  desktopCard: {
    maxWidth: 460,

    alignSelf: "center",

    padding: 35,

    borderWidth: 0,

    shadowOpacity: 0,
    elevation: 0,
  },

  /* ==============================
     HEADER
  ============================== */

  formIcon: {
    width: 48,
    height: 48,

    borderRadius: 13,

    alignSelf: "center",

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#F1EDFF",

    marginBottom: 15,
  },

  heading: {
    fontSize: 27,
    fontWeight: "800",

    textAlign: "center",

    color: "#101828",
  },

  subHeading: {
    marginTop: 8,
    marginBottom: 25,

    fontSize: 10,
    lineHeight: 16,

    textAlign: "center",

    color: "#667085",
  },

  /* ==============================
     INPUT
  ============================== */

  inputGroup: {
    marginBottom: 15,
  },

  label: {
    marginBottom: 7,

    fontSize: 10,
    fontWeight: "600",

    color: "#344054",
  },

  inputBox: {
    height: 48,

    paddingHorizontal: 13,

    borderRadius: 9,

    borderWidth: 1,
    borderColor: "#D0D5DD",

    flexDirection: "row",
    alignItems: "center",

    gap: 9,

    backgroundColor: "#FFFFFF",
  },

  input: {
    flex: 1,

    height: 46,

    fontSize: 11,

    color: "#101828",
  },

  /* ==============================
     FORGOT
  ============================== */

  forgot: {
    alignSelf: "flex-end",

    marginTop: -5,
    marginBottom: 18,
  },

  forgotText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#6842E5",
  },

  /* ==============================
     MAIN BUTTON
  ============================== */

  mainButton: {
    height: 49,

    borderRadius: 9,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 10,

    backgroundColor: "#6842E5",
  },

  mainButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  /* ==============================
     DIVIDER
  ============================== */

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 10,

    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#EAECF0",
  },

  orText: {
    fontSize: 8,
    color: "#98A2B3",
  },

  /* ==============================
     DEMO
  ============================== */

  demoButton: {
    height: 47,

    borderRadius: 9,

    borderWidth: 1,
    borderColor: "#D0D5DD",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 8,

    backgroundColor: "#FFFFFF",
  },

  demoText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#344054",
  },

  /* ==============================
     SWITCH
  ============================== */

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginTop: 20,
  },

  switchText: {
    fontSize: 9,
    color: "#667085",
  },

  switchLink: {
    fontSize: 9,
    fontWeight: "700",
    color: "#6842E5",
  },

  /* ==============================
     SECURITY
  ============================== */

  security: {
    maxWidth: 460,

    alignSelf: "center",

    marginTop: 20,

    paddingHorizontal: 13,
    paddingVertical: 10,

    borderRadius: 8,

    flexDirection: "row",
    alignItems: "center",

    gap: 7,

    backgroundColor: "#ECFDF3",
  },

  securityText: {
    flex: 1,

    fontSize: 8,

    color: "#027A48",
  },
});