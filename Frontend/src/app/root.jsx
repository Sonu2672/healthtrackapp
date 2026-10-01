import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import useResponsive from "../../hooks/useResponsive";

export default function root() {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const goLogin = () => {
    router.push("/login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ================================================= */}
        {/* NAVBAR */}
        {/* ================================================= */}

        <View
          style={[
            styles.navbar,
            isDesktop && styles.navbarDesktop,
          ]}
        >
          {/* LOGO */}

          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons
                name="heart"
                size={isDesktop ? 18 : 15}
                color="#FFFFFF"
              />
            </View>

            <View>
              <Text
                style={[
                  styles.logoTitle,
                  isDesktop && styles.logoTitleDesktop,
                ]}
              >
                PHC
              </Text>

              <Text style={styles.logoSubtitle}>
                Personal Health Companion
              </Text>
            </View>
          </View>

          {/* DESKTOP NAVIGATION */}

          {isDesktop && (
            <View style={styles.navLinks}>
              <Text style={styles.navActive}>Home</Text>

              <Text style={styles.navText}>
                Features
              </Text>

              <Text style={styles.navText}>
                How It Works
              </Text>

              <Text style={styles.navText}>
                About Us
              </Text>

              <Text style={styles.navText}>
                Contact
              </Text>
            </View>
          )}

          {/* RIGHT */}

          <View style={styles.navRight}>
            {isDesktop && (
              <View style={styles.themeButton}>
                <Ionicons
                  name="sunny-outline"
                  size={15}
                  color="#667085"
                />
              </View>
            )}

            <Pressable
              style={[
                styles.loginButton,
                isDesktop && styles.loginButtonDesktop,
              ]}
              onPress={goLogin}
            >
              <Text style={styles.loginText}>
                Login
              </Text>
            </Pressable>

            {!isDesktop && (
              <Pressable style={styles.menuButton}>
                <Ionicons
                  name="menu-outline"
                  size={20}
                  color="#344054"
                />
              </Pressable>
            )}
          </View>
        </View>

        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <View
          style={[
            styles.hero,
            isTablet && styles.heroTablet,
            isDesktop && styles.heroDesktop,
          ]}
        >
          {/* LEFT */}

          <View
            style={[
              styles.heroContent,
              isDesktop && styles.heroContentDesktop,
            ]}
          >
            {/* BADGE */}

            <View
              style={[
                styles.badge,
                isDesktop && styles.badgeDesktop,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  isDesktop && styles.badgeTextDesktop,
                ]}
              >
                ✨ AI-Powered • Smart • Preventive
              </Text>
            </View>

            {/* TITLE */}

            <Text
              style={[
                styles.heroTitle,
                isDesktop && styles.heroTitleDesktop,
              ]}
            >
              Your Health.
              {"\n"}
              Our{" "}
              <Text
                style={[
                  styles.priorityText,
                  isDesktop && styles.priorityTextDesktop,
                ]}
              >
                Priority.
              </Text>
            </Text>

            {/* DESCRIPTION */}

            <Text
              style={[
                styles.heroDescription,
                isDesktop && styles.heroDescriptionDesktop,
              ]}
            >
              PHC is your personal health companion that
              monitors your vital signs, analyzes risks in
              real-time and alerts you to keep yourself
              safe, always.
            </Text>

            {/* TAGS */}

            <View style={styles.tagsContainer}>
              <View
                style={[
                  styles.tag,
                  isDesktop && styles.tagDesktop,
                ]}
              >
                <Ionicons
                  name="pulse-outline"
                  size={isDesktop ? 13 : 10}
                  color="#6842E5"
                />

                <Text
                  style={[
                    styles.tagText,
                    isDesktop && styles.tagTextDesktop,
                  ]}
                >
                  Real-time Monitoring
                </Text>
              </View>

              <View
                style={[
                  styles.tag,
                  isDesktop && styles.tagDesktop,
                ]}
              >
                <Ionicons
                  name="analytics-outline"
                  size={isDesktop ? 13 : 10}
                  color="#6842E5"
                />

                <Text
                  style={[
                    styles.tagText,
                    isDesktop && styles.tagTextDesktop,
                  ]}
                >
                  AI Risk Analysis
                </Text>
              </View>

              <View
                style={[
                  styles.tag,
                  isDesktop && styles.tagDesktop,
                ]}
              >
                <Ionicons
                  name="notifications-outline"
                  size={isDesktop ? 13 : 10}
                  color="#6842E5"
                />

                <Text
                  style={[
                    styles.tagText,
                    isDesktop && styles.tagTextDesktop,
                  ]}
                >
                  Early Warnings
                </Text>
              </View>
            </View>

            {/* BUTTONS */}

            <View style={styles.buttonRow}>
              <Pressable
                style={[
                  styles.primaryButton,
                  isDesktop && styles.primaryButtonDesktop,
                ]}
                onPress={goLogin}
              >
                <Text
                  style={[
                    styles.primaryButtonText,
                    isDesktop &&
                      styles.primaryButtonTextDesktop,
                  ]}
                >
                  Get Started
                </Text>

                <View
                  style={[
                    styles.arrowCircle,
                    isDesktop && styles.arrowCircleDesktop,
                  ]}
                >
                  <Ionicons
                    name="arrow-forward"
                    size={isDesktop ? 13 : 10}
                    color="#FFFFFF"
                  />
                </View>
              </Pressable>

              <Pressable
                style={[
                  styles.secondaryButton,
                  isDesktop &&
                    styles.secondaryButtonDesktop,
                ]}
              >
                <Text
                  style={[
                    styles.secondaryButtonText,
                    isDesktop &&
                      styles.secondaryButtonTextDesktop,
                  ]}
                >
                  Explore Features
                </Text>
              </Pressable>
            </View>

            {/* TRUSTED */}

            <View
              style={[
                styles.trusted,
                isDesktop && styles.trustedDesktop,
              ]}
            >
              <View style={styles.avatars}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    👨
                  </Text>
                </View>

                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    👩
                  </Text>
                </View>

                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    👨
                  </Text>
                </View>

                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    👩
                  </Text>
                </View>
              </View>

              <View>
                <Text
                  style={[
                    styles.trustedTitle,
                    isDesktop && styles.trustedTitleDesktop,
                  ]}
                >
                  Trusted by 10,000+ users
                </Text>

                <Text
                  style={[
                    styles.trustedSubtitle,
                    isDesktop &&
                      styles.trustedSubtitleDesktop,
                  ]}
                >
                  for a healthier tomorrow
                </Text>
              </View>
            </View>
          </View>

          {/* ================================================= */}
          {/* HERO VISUAL */}
          {/* ================================================= */}

          <View
            style={[
              styles.heroVisual,
              isDesktop && styles.heroVisualDesktop,
            ]}
          >
            {/* AI CARD */}

            <View
              style={[
                styles.aiCard,
                isDesktop && styles.aiCardDesktop,
              ]}
            >
              <View style={styles.aiIcon}>
                <Ionicons
                  name="sparkles"
                  size={isDesktop ? 15 : 12}
                  color="#6842E5"
                />
              </View>

              <View>
                <Text
                  style={[
                    styles.aiTitle,
                    isDesktop && styles.aiTitleDesktop,
                  ]}
                >
                  AI Protection
                </Text>

                <Text
                  style={[
                    styles.aiDescription,
                    isDesktop &&
                      styles.aiDescriptionDesktop,
                  ]}
                >
                  Your health is{"\n"}
                  monitored 24/7
                </Text>
              </View>
            </View>

            {/* PHONE */}

            <View
              style={[
                styles.phone,

                isDesktop && styles.phoneDesktop,
              ]}
            >
              {/* NOTCH */}

              <View style={styles.phoneNotch} />

              <View style={styles.phoneScreen}>
                {/* HEADER */}

                <View style={styles.phoneHeader}>
                  <View>
                    <Text style={styles.helloText}>
                      Hello, Anu 👋
                    </Text>

                    <Text style={styles.goodMorning}>
                      Good Morning
                    </Text>
                  </View>

                  <Ionicons
                    name="notifications-outline"
                    size={10}
                    color="#667085"
                  />
                </View>

                <Text style={styles.overviewTitle}>
                  Today's Health Overview
                </Text>

                {/* HEALTH GRID */}

                <View style={styles.healthGrid}>
                  <HealthBox
                    title="Heart Rate"
                    value="118"
                    unit="BPM"
                  />

                  <HealthBox
                    title="SpO₂ Level"
                    value="96"
                    unit="%"
                  />

                  <HealthBox
                    title="Body Temperature"
                    value="36.8°C"
                  />

                  <HealthBox
                    title="Steps"
                    value="8,247"
                    chart
                  />
                </View>

                {/* RISK */}

                <View style={styles.riskCard}>
                  <View style={styles.riskHeader}>
                    <Ionicons
                      name="pulse-outline"
                      size={8}
                      color="#6842E5"
                    />

                    <Text style={styles.riskHeaderText}>
                      Health Risk Score
                    </Text>
                  </View>

                  <View style={styles.riskCircle}>
                    <Text style={styles.riskNumber}>
                      87
                    </Text>

                    <Text style={styles.riskPercent}>
                      %
                    </Text>
                  </View>

                  <Text style={styles.highRisk}>
                    High Risk
                  </Text>

                  <Text style={styles.monitorText}>
                    Monitor your health closely
                  </Text>
                </View>

                {/* PHONE NAV */}

                <View style={styles.phoneNav}>
                  <Ionicons
                    name="home"
                    size={9}
                    color="#6842E5"
                  />

                  <Ionicons
                    name="pulse-outline"
                    size={9}
                    color="#98A2B3"
                  />

                  <Ionicons
                    name="notifications-outline"
                    size={9}
                    color="#98A2B3"
                  />

                  <Ionicons
                    name="person-outline"
                    size={9}
                    color="#98A2B3"
                  />
                </View>
              </View>
            </View>

            {/* WATCH */}

            <View
              style={[
                styles.watch,
                isDesktop && styles.watchDesktop,
              ]}
            >
              <View style={styles.watchTopStrap} />

              <View style={styles.watchBody}>
                <View style={styles.watchScreen}>
                  <Ionicons
                    name="heart"
                    size={9}
                    color="#42E5C2"
                  />

                  <Text style={styles.watchNumber}>
                    118
                  </Text>

                  <Text style={styles.watchBpm}>
                    BPM
                  </Text>
                </View>
              </View>

              <View style={styles.watchBottomStrap} />
            </View>
          </View>
        </View>

        {/* ================================================= */}
        {/* FEATURES */}
        {/* ================================================= */}

        <View
          style={[
            styles.features,
            isDesktop && styles.featuresDesktop,
          ]}
        >
          <FeatureCard
            icon="heart-outline"
            color="#6842E5"
            background="#EEE9FF"
            title="Continuous Monitoring"
            text="Track your vital signs in real-time with our advanced sensors and AI."
            desktop={isDesktop}
          />

          <FeatureCard
            icon="analytics-outline"
            color="#079455"
            background="#D1FADF"
            title="AI Risk Analysis"
            text="Our AI analyzes your data and predicts health risks before they happen."
            desktop={isDesktop}
          />

          <FeatureCard
            icon="notifications-outline"
            color="#D92D20"
            background="#FEE4E2"
            title="Early Alerts"
            text="Get instant alerts and recommendations to prevent potential health hazards."
            desktop={isDesktop}
          />

          <FeatureCard
            icon="pulse-outline"
            color="#175CD3"
            background="#D1E9FF"
            title="Health Insights"
            text="Understand your health trends with detailed reports and analysis."
            desktop={isDesktop}
          />

          <FeatureCard
            icon="medkit-outline"
            color="#DC6803"
            background="#FFEAD5"
            title="Emergency Support"
            text="Quick access to emergency contacts and medical assistance."
            desktop={isDesktop}
          />
        </View>

        {/* ================================================= */}
        {/* HOW IT WORKS */}
        {/* ================================================= */}

        <View style={styles.infoSection}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionSmall}>
              HOW IT WORKS
            </Text>

            <Text
              style={[
                styles.sectionTitle,
                isDesktop && styles.sectionTitleDesktop,
              ]}
            >
              Your health. Simplified.
            </Text>

            <Text
              style={[
                styles.sectionDescription,
                isDesktop &&
                  styles.sectionDescriptionDesktop,
              ]}
            >
              PHC continuously collects, analyzes and
              presents your health information in an
              easy-to-understand way.
            </Text>
          </View>

          <View
            style={[
              styles.steps,
              isDesktop && styles.stepsDesktop,
            ]}
          >
            <StepCard
              number="01"
              title="Monitor"
              text="Sensors continuously collect your health and environmental data."
            />

            <StepCard
              number="02"
              title="Analyze"
              text="AI analyzes your health data and identifies abnormal patterns."
            />

            <StepCard
              number="03"
              title="Alert"
              text="Receive timely warnings and recommendations when something needs attention."
            />
          </View>
        </View>

        {/* ================================================= */}
        {/* ABOUT */}
        {/* ================================================= */}

        <View style={styles.aboutSection}>
          <View
            style={[
              styles.aboutBox,
              isDesktop && styles.aboutBoxDesktop,
            ]}
          >
            <View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  ABOUT PHC
                </Text>
              </View>

              <Text
                style={[
                  styles.aboutTitle,
                  isDesktop && styles.aboutTitleDesktop,
                ]}
              >
                Technology that cares{"\n"}
                about your health.
              </Text>
            </View>

            <Text
              style={[
                styles.aboutText,
                isDesktop && styles.aboutTextDesktop,
              ]}
            >
              Personal Health Companion combines IoT
              sensors, real-time monitoring and AI-based
              risk analysis to give you meaningful health
              insights whenever you need them.
            </Text>
          </View>
        </View>

        {/* ================================================= */}
        {/* CONTACT */}
        {/* ================================================= */}

        <View style={styles.contactSection}>
          <Text
            style={[
              styles.contactTitle,
              isDesktop && styles.contactTitleDesktop,
            ]}
          >
            Stay connected with your health.
          </Text>

          <Text
            style={[
              styles.contactSubtitle,
              isDesktop && styles.contactSubtitleDesktop,
            ]}
          >
            Start your PHC journey today.
          </Text>

          <Pressable
            style={[
              styles.primaryButton,
              isDesktop && styles.primaryButtonDesktop,
            ]}
            onPress={goLogin}
          >
            <Text
              style={[
                styles.primaryButtonText,
                isDesktop &&
                  styles.primaryButtonTextDesktop,
              ]}
            >
              Get Started
            </Text>

            <Ionicons
              name="arrow-forward"
              size={isDesktop ? 13 : 11}
              color="#FFFFFF"
            />
          </Pressable>
        </View>

        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <View
          style={[
            styles.footer,
            isDesktop && styles.footerDesktop,
          ]}
        >
          <View>
            <Text
              style={[
                styles.footerLogo,
                isDesktop && styles.footerLogoDesktop,
              ]}
            >
              PHC
            </Text>

            <Text style={styles.footerSubtitle}>
              Personal Health Companion
            </Text>
          </View>

          <Text
            style={[
              styles.footerCopyright,
              isDesktop && styles.footerCopyrightDesktop,
            ]}
          >
            © 2026 PHC. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* =====================================================
   HEALTH BOX
===================================================== */

function HealthBox({
  title,
  value,
  unit,
  chart = false,
}) {
  return (
    <View style={styles.healthBox}>
      <Text style={styles.healthBoxTitle}>
        {title}
      </Text>

      <View style={styles.healthValueRow}>
        <Text style={styles.healthValue}>
          {value}
        </Text>

        {unit && (
          <Text style={styles.healthUnit}>
            {unit}
          </Text>
        )}
      </View>

      {chart && (
        <View style={styles.chart}>
          <View
            style={[
              styles.bar,
              {
                height: 5,
              },
            ]}
          />

          <View
            style={[
              styles.bar,
              {
                height: 9,
              },
            ]}
          />

          <View
            style={[
              styles.bar,
              {
                height: 7,
              },
            ]}
          />

          <View
            style={[
              styles.bar,
              {
                height: 13,
              },
            ]}
          />

          <View
            style={[
              styles.bar,
              {
                height: 10,
              },
            ]}
          />
        </View>
      )}
    </View>
  );
}

/* =====================================================
   FEATURE CARD
===================================================== */

function FeatureCard({
  icon,
  color,
  background,
  title,
  text,
  desktop,
}) {
  return (
    <View
      style={[
        styles.featureCard,
        desktop && styles.featureCardDesktop,
      ]}
    >
      <View
        style={[
          styles.featureIcon,
          {
            backgroundColor: background,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={desktop ? 17 : 14}
          color={color}
        />
      </View>

      <Text
        style={[
          styles.featureTitle,
          desktop && styles.featureTitleDesktop,
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.featureText,
          desktop && styles.featureTextDesktop,
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

/* =====================================================
   STEP CARD
===================================================== */

function StepCard({
  number,
  title,
  text,
}) {
  return (
    <View style={styles.stepCard}>
      <Text style={styles.stepNumber}>
        {number}
      </Text>

      <Text style={styles.stepTitle}>
        {title}
      </Text>

      <Text style={styles.stepText}>
        {text}
      </Text>
    </View>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    backgroundColor: "#FFFFFF",
  },

  /* =================================================
     NAVBAR
  ================================================= */

navbar: {
  height: 58,

  marginTop: 55,   // 👈 navbar ko neeche karega

  paddingHorizontal: 15,

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  backgroundColor: "#FFFFFF",

  borderBottomWidth: 1,
  borderBottomColor: "#F0F1F5",
},

  navbarDesktop: {
    height: 72,
    paddingHorizontal: 34,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  logoIcon: {
    width: 32,
    height: 32,

    borderRadius: 9,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#6842E5",
  },

  logoTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#101828",
  },

  logoTitleDesktop: {
    fontSize: 16,
  },

  logoSubtitle: {
    fontSize: 6,
    color: "#98A2B3",
    marginTop: 1,
  },

  navLinks: {
    position: "absolute",

    left: "50%",

    transform: [
      {
        translateX: -190,
      },
    ],

    flexDirection: "row",
    alignItems: "center",

    gap: 30,
  },

  navText: {
    fontSize: 10,
    color: "#475467",
  },

  navActive: {
    fontSize: 10,
    color: "#6842E5",
    fontWeight: "600",
  },

  navRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  themeButton: {
    width: 32,
    height: 32,

    borderRadius: 16,

    borderWidth: 1,
    borderColor: "#E4E7EC",

    alignItems: "center",
    justifyContent: "center",
  },

  loginButton: {
    paddingHorizontal: 17,
    paddingVertical: 7,

    borderRadius: 5,

    backgroundColor: "#6842E5",
  },

  loginButtonDesktop: {
    paddingHorizontal: 21,
    paddingVertical: 10,

    borderRadius: 6,
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "600",
  },

  menuButton: {
    width: 30,
    height: 30,

    borderRadius: 6,

    borderWidth: 1,
    borderColor: "#E4E7EC",

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFFFFF",
  },

  /* =================================================
     HERO
  ================================================= */

  hero: {
    paddingHorizontal: 15,
    paddingTop: 65,
    paddingBottom: 10,

    backgroundColor: "#FFFFFF",
  },

  heroTablet: {
    paddingHorizontal: 30,
  },

  heroDesktop: {
    minHeight: 590,

    paddingHorizontal: "7%",
    paddingTop: 55,
    paddingBottom: 45,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FAF9FF",
  },

  heroContent: {
    width: "100%",
  },

  heroContentDesktop: {
    width: "52%",
    maxWidth: 720,
  },

  badge: {
    alignSelf: "flex-start",

    paddingHorizontal: 9,
    paddingVertical: 5,

    borderRadius: 6,

    backgroundColor: "#F1EDFF",

    marginBottom: 13,
  },

  badgeDesktop: {
    paddingHorizontal: 12,
    paddingVertical: 7,

    borderRadius: 7,

    marginBottom: 18,
  },

  badgeText: {
    fontSize: 7,
    color: "#6842E5",
    fontWeight: "500",
  },

  badgeTextDesktop: {
    fontSize: 9,
  },

  heroTitle: {
    fontSize: 39,
    lineHeight: 39,

    letterSpacing: -2,

    fontWeight: "800",

    color: "#101828",
  },

  heroTitleDesktop: {
    fontSize: 72,
    lineHeight: 70,

    letterSpacing: -3,
  },

  priorityText: {
    color: "#6842E5",
    fontSize: 11,
    letterSpacing: 0,
  },

  priorityTextDesktop: {
    fontSize: 17,
  },

  heroDescription: {
    maxWidth: 470,

    marginTop: 15,
    marginBottom: 14,

    fontSize: 9,
    lineHeight: 15,

    color: "#667085",
  },

  heroDescriptionDesktop: {
    maxWidth: 630,

    marginTop: 20,
    marginBottom: 20,

    fontSize: 13,
    lineHeight: 21,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",

    gap: 5,

    marginBottom: 15,
  },

  tag: {
    flexDirection: "row",
    alignItems: "center",

    gap: 4,

    paddingHorizontal: 7,
    paddingVertical: 5,

    borderRadius: 5,

    borderWidth: 1,
    borderColor: "#EAECF0",

    backgroundColor: "#FFFFFF",
  },

  tagDesktop: {
    gap: 6,

    paddingHorizontal: 11,
    paddingVertical: 7,

    borderRadius: 6,
  },

  tagText: {
    fontSize: 6.5,
    color: "#475467",
  },

  tagTextDesktop: {
    fontSize: 9,
  },

  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  primaryButton: {
    minHeight: 34,

    paddingHorizontal: 13,

    borderRadius: 6,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 8,

    backgroundColor: "#6842E5",
  },

  primaryButtonDesktop: {
    minHeight: 45,

    paddingHorizontal: 20,

    borderRadius: 7,

    gap: 10,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "600",
  },

  primaryButtonTextDesktop: {
    fontSize: 10,
  },

  arrowCircle: {
    width: 16,
    height: 16,

    borderRadius: 8,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.2)",
  },

  arrowCircleDesktop: {
    width: 20,
    height: 20,

    borderRadius: 10,
  },

  secondaryButton: {
    minHeight: 34,

    paddingHorizontal: 13,

    borderRadius: 6,

    borderWidth: 1,
    borderColor: "#DDD8F2",

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFFFFF",
  },

  secondaryButtonDesktop: {
    minHeight: 45,

    paddingHorizontal: 20,

    borderRadius: 7,
  },

  secondaryButtonText: {
    fontSize: 8,
    color: "#6842E5",
  },

  secondaryButtonTextDesktop: {
    fontSize: 10,
  },

  trusted: {
    flexDirection: "row",
    alignItems: "center",

    gap: 8,

    marginTop: 14,
  },

  trustedDesktop: {
    marginTop: 20,
  },

  avatars: {
    flexDirection: "row",
  },

  avatar: {
    width: 19,
    height: 19,

    marginLeft: -3,

    borderRadius: 10,

    borderWidth: 2,
    borderColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#F2F4F7",
  },

  avatarText: {
    fontSize: 8,
  },

  trustedTitle: {
    fontSize: 6.5,
    color: "#667085",
    fontWeight: "600",
  },

  trustedTitleDesktop: {
    fontSize: 9,
  },

  trustedSubtitle: {
    fontSize: 6,
    color: "#98A2B3",
  },

  trustedSubtitleDesktop: {
    fontSize: 8,
  },

  /* =================================================
     HERO VISUAL
  ================================================= */

  heroVisual: {
    width: "100%",
    height: 290,

    marginTop: 10,

    position: "relative",

    alignItems: "center",
    justifyContent: "center",
  },

  heroVisualDesktop: {
    width: "48%",
    height: 550,

    marginTop: 0,
  },

  /* =================================================
     PHONE
  ================================================= */

  phone: {
    width: 126,
    height: 255,

    padding: 5,

    borderRadius: 23,

    backgroundColor: "#161616",

    transform: [
      {
        rotate: "6deg",
      },
    ],

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 10,

    zIndex: 3,
  },

  /*
    IMPORTANT:
    Desktop phone is scaled as a whole.
    Isse phone ke andar ka UI bhi bada hoga.
  */

  phoneDesktop: {
    transform: [
      {
        rotate: "6deg",
      },
      {
        scale: 1.58,
      },
    ],

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 25,
    shadowOffset: {
      width: 0,
      height: 15,
    },

    elevation: 15,
  },

  phoneNotch: {
    width: 49,
    height: 11,

    position: "absolute",

    top: 5,
    left: "50%",

    marginLeft: -24,

    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,

    backgroundColor: "#161616",

    zIndex: 5,
  },

  phoneScreen: {
    flex: 1,

    paddingHorizontal: 8,
    paddingTop: 16,

    borderRadius: 18,

    backgroundColor: "#FFFFFF",
  },

  phoneHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",

    marginBottom: 8,
  },

  helloText: {
    fontSize: 5,
    color: "#98A2B3",
  },

  goodMorning: {
    marginTop: 1,

    fontSize: 7,
    fontWeight: "700",

    color: "#101828",
  },

  overviewTitle: {
    marginBottom: 4,

    fontSize: 5,
    color: "#667085",
  },

  healthGrid: {
    flexDirection: "row",
    flexWrap: "wrap",

    gap: 4,
  },

  healthBox: {
    width: "48%",

    minHeight: 43,

    padding: 5,

    borderRadius: 5,

    borderWidth: 1,
    borderColor: "#EAECF0",

    backgroundColor: "#FFFFFF",
  },

  healthBoxTitle: {
    fontSize: 4,
    color: "#98A2B3",
  },

  healthValueRow: {
    flexDirection: "row",
    alignItems: "baseline",

    marginTop: 4,
  },

  healthValue: {
    fontSize: 8,
    fontWeight: "700",
    color: "#101828",
  },

  healthUnit: {
    marginLeft: 2,

    fontSize: 4,
    color: "#98A2B3",
  },

  chart: {
    height: 12,

    marginTop: 2,

    flexDirection: "row",
    alignItems: "flex-end",

    gap: 2,
  },

  bar: {
    width: 3,

    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,

    backgroundColor: "#42C49C",
  },

  riskCard: {
    marginTop: 5,

    padding: 7,

    borderRadius: 6,

    borderWidth: 1,
    borderColor: "#EAECF0",

    alignItems: "center",
  },

  riskHeader: {
    flexDirection: "row",
    alignItems: "center",

    gap: 3,
  },

  riskHeaderText: {
    fontSize: 5,
    color: "#667085",
  },

  riskCircle: {
    width: 42,
    height: 42,

    marginTop: 4,

    borderRadius: 21,

    borderWidth: 3,
    borderColor: "#F04438",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  riskNumber: {
    fontSize: 11,
    fontWeight: "700",
    color: "#F04438",
  },

  riskPercent: {
    fontSize: 5,
    color: "#F04438",
  },

  highRisk: {
    fontSize: 6,
    fontWeight: "700",
    color: "#F04438",
  },

  monitorText: {
    marginTop: 1,

    fontSize: 4,
    color: "#98A2B3",
  },

  phoneNav: {
    marginTop: 7,

    flexDirection: "row",
    justifyContent: "space-around",
  },

  /* =================================================
     WATCH
  ================================================= */

  watch: {
    position: "absolute",

    right: "7%",
    bottom: 15,

    width: 62,

    alignItems: "center",

    zIndex: 2,
  },

  watchDesktop: {
    right: "4%",
    bottom: 50,

    transform: [
      {
        scale: 1.45,
      },
    ],
  },

  watchTopStrap: {
    width: 38,
    height: 60,

    marginBottom: -17,

    borderRadius: 13,

    backgroundColor: "#18181B",
  },

  watchBody: {
    width: 62,
    height: 77,

    padding: 7,

    borderRadius: 17,

    backgroundColor: "#202124",

    zIndex: 2,

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 6,
  },

  watchScreen: {
    flex: 1,

    borderRadius: 11,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#050505",
  },

  watchNumber: {
    marginTop: 2,

    fontSize: 15,
    fontWeight: "700",

    color: "#FFFFFF",
  },

  watchBpm: {
    marginTop: 1,

    fontSize: 5,

    color: "#42E5C2",
  },

  watchBottomStrap: {
    width: 38,
    height: 60,

    marginTop: -17,

    borderRadius: 13,

    backgroundColor: "#18181B",
  },

  /* =================================================
     AI CARD
  ================================================= */

  aiCard: {
    position: "absolute",

    right: 0,
    top: 25,

    width: 115,

    padding: 9,

    borderRadius: 7,

    flexDirection: "row",

    gap: 7,

    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 7,
    },

    elevation: 4,

    zIndex: 5,
  },

  aiCardDesktop: {
    top: 45,
    right: 5,

    width: 165,

    padding: 13,

    borderRadius: 9,

    gap: 9,
  },

  aiIcon: {
    width: 22,
    height: 22,

    borderRadius: 5,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#F1EDFF",
  },

  aiTitle: {
    fontSize: 7,
    fontWeight: "700",
    color: "#101828",
  },

  aiTitleDesktop: {
    fontSize: 10,
  },

  aiDescription: {
    marginTop: 2,

    fontSize: 5,
    lineHeight: 8,

    color: "#98A2B3",
  },

  aiDescriptionDesktop: {
    marginTop: 3,

    fontSize: 7,
    lineHeight: 11,
  },

  /* =================================================
     FEATURES
  ================================================= */

  features: {
    paddingHorizontal: 10,
    paddingVertical: 10,

    flexDirection: "row",
    flexWrap: "wrap",

    gap: 7,

    backgroundColor: "#F8FAFC",
  },

  featuresDesktop: {
    paddingHorizontal: "2%",
    paddingVertical: 18,

    flexDirection: "row",
    flexWrap: "nowrap",

    gap: 10,
  },

  featureCard: {
    width: "48%",

    minHeight: 100,

    padding: 10,

    borderRadius: 7,

    borderWidth: 1,
    borderColor: "#EAECF0",

    backgroundColor: "#FFFFFF",
  },

  featureCardDesktop: {
    flex: 1,

    width: undefined,

    minHeight: 130,

    padding: 18,

    borderRadius: 9,
  },

  featureIcon: {
    width: 25,
    height: 25,

    marginBottom: 7,

    borderRadius: 5,

    alignItems: "center",
    justifyContent: "center",
  },

  featureTitle: {
    marginBottom: 4,

    fontSize: 8,
    fontWeight: "700",

    color: "#101828",
  },

  featureTitleDesktop: {
    fontSize: 11,

    marginBottom: 6,
  },

  featureText: {
    fontSize: 6.5,
    lineHeight: 10,

    color: "#98A2B3",
  },

  featureTextDesktop: {
    fontSize: 8,
    lineHeight: 13,
  },

  /* =================================================
     HOW IT WORKS
  ================================================= */

  infoSection: {
    paddingHorizontal: 15,
    paddingVertical: 55,

    backgroundColor: "#FFFFFF",
  },

  sectionHeading: {
    maxWidth: 650,

    alignSelf: "center",

    alignItems: "center",

    marginBottom: 25,
  },

  sectionSmall: {
    fontSize: 8,
    fontWeight: "700",

    color: "#6842E5",
  },

  sectionTitle: {
    marginTop: 8,
    marginBottom: 8,

    fontSize: 25,
    fontWeight: "800",

    textAlign: "center",

    color: "#101828",
  },

  sectionTitleDesktop: {
    fontSize: 38,
  },

  sectionDescription: {
    fontSize: 10,
    lineHeight: 15,

    textAlign: "center",

    color: "#667085",
  },

  sectionDescriptionDesktop: {
    fontSize: 13,
    lineHeight: 20,
  },

  steps: {
    gap: 10,
  },

  stepsDesktop: {
    maxWidth: 1100,

    alignSelf: "center",

    flexDirection: "row",

    gap: 15,
  },

  stepCard: {
    flex: 1,

    padding: 20,

    borderRadius: 10,

    borderWidth: 1,
    borderColor: "#EAECF0",
  },

  stepNumber: {
    fontSize: 12,
    fontWeight: "700",

    color: "#6842E5",
  },

  stepTitle: {
    marginTop: 9,
    marginBottom: 6,

    fontSize: 15,
    fontWeight: "700",

    color: "#101828",
  },

  stepText: {
    fontSize: 9,
    lineHeight: 14,

    color: "#667085",
  },

  /* =================================================
     ABOUT
  ================================================= */

  aboutSection: {
    paddingHorizontal: 15,
    paddingVertical: 45,

    backgroundColor: "#F8F7FF",
  },

  aboutBox: {
    gap: 15,
  },

  aboutBoxDesktop: {
    maxWidth: 1100,

    alignSelf: "center",

    flexDirection: "row",
    alignItems: "center",

    gap: 80,
  },

  aboutTitle: {
    fontSize: 26,
    lineHeight: 29,

    fontWeight: "800",

    color: "#101828",
  },

  aboutTitleDesktop: {
    fontSize: 38,
    lineHeight: 43,
  },

  aboutText: {
    flex: 1,

    fontSize: 11,
    lineHeight: 18,

    color: "#667085",
  },

  aboutTextDesktop: {
    fontSize: 13,
    lineHeight: 21,
  },

  /* =================================================
     CONTACT
  ================================================= */

  contactSection: {
    paddingHorizontal: 15,
    paddingVertical: 60,

    alignItems: "center",
  },

  contactTitle: {
    fontSize: 24,
    fontWeight: "800",

    textAlign: "center",

    color: "#101828",
  },

  contactTitleDesktop: {
    fontSize: 38,
  },

  contactSubtitle: {
    marginTop: 8,
    marginBottom: 20,

    fontSize: 11,

    color: "#667085",
  },

  contactSubtitleDesktop: {
    fontSize: 13,
  },

  /* =================================================
     FOOTER
  ================================================= */

  footer: {
    paddingHorizontal: 15,
    paddingVertical: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#101828",
  },

  footerDesktop: {
    paddingHorizontal: 40,
    paddingVertical: 28,
  },

  footerLogo: {
    fontSize: 14,
    fontWeight: "800",

    color: "#FFFFFF",
  },

  footerLogoDesktop: {
    fontSize: 18,
  },

  footerSubtitle: {
    marginTop: 2,

    fontSize: 6,

    color: "#98A2B3",
  },

  footerCopyright: {
    fontSize: 7,

    color: "#98A2B3",
  },

  footerCopyrightDesktop: {
    fontSize: 9,
  },
});