import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

export default function Disaster() {
  const { width } = useWindowDimensions();

  const isMobile = width < 768;

  const [location, setLocation] = useState("Getting location...");
  const [coordinates, setCoordinates] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [weather, setWeather] = useState(null);
  const [earthquakes, setEarthquakes] = useState([]);

  const [lastUpdated, setLastUpdated] = useState("");

  // =====================================================
  // GET USER LOCATION
  // =====================================================

  const getUserLocation = async () => {
    try {
      setLoading(true);
      setError("");

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        throw new Error(
          "Location permission is required to show area-based disaster data."
        );
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

      const latitude = currentLocation.coords.latitude;
      const longitude = currentLocation.coords.longitude;

      setCoordinates({
        latitude,
        longitude,
      });

      // Reverse geocoding
      const address =
        await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

      if (address && address.length > 0) {
        const place = address[0];

        const city =
          place.city ||
          place.district ||
          place.subregion ||
          "Your Area";

        const state = place.region || "";

        setLocation(
          state ? `${city}, ${state}` : city
        );
      }

      return {
        latitude,
        longitude,
      };
    } catch (err) {
      console.error("LOCATION ERROR:", err);

      setError(
        err.message || "Unable to get your location."
      );

      setLoading(false);

      return null;
    }
  };

  // =====================================================
  // OPEN-METEO WEATHER API
  // =====================================================

  const fetchWeather = async (
    latitude,
    longitude
  ) => {
    try {
      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m` +
        `&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m` +
        `&daily=temperature_2m_max,precipitation_sum,precipitation_probability_max,weather_code,wind_speed_10m_max` +
        `&timezone=auto` +
        `&forecast_days=3`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Weather API failed");
      }

      const data = await response.json();

      console.log("🌦 WEATHER DATA:", data);

      setWeather(data);

      return data;
    } catch (err) {
      console.error("WEATHER ERROR:", err);
      return null;
    }
  };

  // =====================================================
  // USGS EARTHQUAKE API
  // =====================================================

  const fetchEarthquakes = async (
    latitude,
    longitude
  ) => {
    try {
      const url =
        `https://earthquake.usgs.gov/fdsnws/event/1/query` +
        `?format=geojson` +
        `&latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&maxradiuskm=500` +
        `&minmagnitude=2.5` +
        `&orderby=time` +
        `&limit=20`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Earthquake API failed");
      }

      const data = await response.json();

      console.log(
        "🌎 EARTHQUAKE DATA:",
        data
      );

      setEarthquakes(
        data.features || []
      );

      return data.features || [];
    } catch (err) {
      console.error(
        "EARTHQUAKE ERROR:",
        err
      );

      setEarthquakes([]);

      return [];
    }
  };

  // =====================================================
  // LOAD ALL DATA
  // =====================================================

  const loadDisasterData = async () => {
    const coords =
      await getUserLocation();

    if (!coords) return;

    await Promise.all([
      fetchWeather(
        coords.latitude,
        coords.longitude
      ),

      fetchEarthquakes(
        coords.latitude,
        coords.longitude
      ),
    ]);

    const now = new Date();

    setLastUpdated(
      now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    setLoading(false);
  };

  useEffect(() => {
    loadDisasterData();

    // Refresh every 10 minutes
    const interval = setInterval(() => {
      loadDisasterData();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // =====================================================
  // WEATHER VALUES
  // =====================================================

  const current = weather?.current;
  const daily = weather?.daily;

  const currentTemp =
    Number(
      current?.temperature_2m || 0
    );

  const rainfall =
    Number(
      current?.rain || 0
    );

  const precipitation =
    Number(
      current?.precipitation || 0
    );

  const windSpeed =
    Number(
      current?.wind_speed_10m || 0
    );

  const maxTemp =
    Number(
      daily?.temperature_2m_max?.[0] || 0
    );

  const rainProbability =
    Number(
      daily?.precipitation_probability_max?.[0] || 0
    );

  const weatherCode =
    Number(
      current?.weather_code ?? 0
    );

  // =====================================================
  // STATUS HELPERS
  // =====================================================

  const statusRank = {
    LOW: 1,
    MODERATE: 2,
    HIGH: 3,
    CRITICAL: 4,
  };

  const getStatusColor = (status) => {
    if (status === "CRITICAL")
      return "#991B1B";

    if (status === "HIGH")
      return "#DC2626";

    if (status === "MODERATE")
      return "#C2410C";

    return "#15803D";
  };

  const getStatusBg = (status) => {
    if (status === "CRITICAL")
      return "#FEE2E2";

    if (status === "HIGH")
      return "#FEE2E2";

    if (status === "MODERATE")
      return "#FFEDD5";

    return "#DCFCE7";
  };

  // =====================================================
  // EARTHQUAKE STATUS
  // =====================================================

  const getEarthquakeStatus = () => {
    if (!earthquakes.length) {
      return {
        status: "LOW",
        description:
          "No recent earthquake detected nearby.",
      };
    }

    const strongest =
      Math.max(
        ...earthquakes.map(
          (e) =>
            Number(
              e.properties?.mag || 0
            )
        )
      );

    if (strongest >= 6) {
      return {
        status: "CRITICAL",
        description:
          `Recent earthquake detected. Max magnitude ${strongest.toFixed(
            1
          )}.`,
      };
    }

    if (strongest >= 5) {
      return {
        status: "HIGH",
        description:
          `Recent earthquake detected. Max magnitude ${strongest.toFixed(
            1
          )}.`,
      };
    }

    if (strongest >= 4) {
      return {
        status: "MODERATE",
        description:
          `Recent earthquake detected. Max magnitude ${strongest.toFixed(
            1
          )}.`,
      };
    }

    return {
      status: "LOW",
      description:
        "Recent nearby earthquake activity detected.",
    };
  };

  // =====================================================
  // RAINFALL STATUS
  // =====================================================

  const getRainfallStatus = () => {
    if (
      rainfall >= 20 ||
      rainProbability >= 80
    ) {
      return {
        status: "HIGH",
        description:
          `Heavy rainfall possible. Rain probability ${rainProbability}%.`,
      };
    }

    if (
      rainfall >= 5 ||
      rainProbability >= 50
    ) {
      return {
        status: "MODERATE",
        description:
          `Rainfall possible. Probability ${rainProbability}%.`,
      };
    }

    return {
      status: "LOW",
      description:
        `Low rainfall probability (${rainProbability}%).`,
    };
  };

  // =====================================================
  // FLOOD STATUS
  // =====================================================

  const getFloodStatus = () => {
    if (
      precipitation >= 30 ||
      rainfall >= 20
    ) {
      return {
        status: "HIGH",
        description:
          "High rainfall conditions may increase local flood risk.",
      };
    }

    if (
      precipitation >= 10 ||
      rainfall >= 5
    ) {
      return {
        status: "MODERATE",
        description:
          "Moderate rainfall may contribute to local waterlogging.",
      };
    }

    return {
      status: "LOW",
      description:
        "No significant rainfall-based flood indication.",
    };
  };

  // =====================================================
  // HEATWAVE STATUS
  // =====================================================

  const getHeatwaveStatus = () => {
    if (maxTemp >= 45) {
      return {
        status: "CRITICAL",
        description:
          `Very high forecast temperature: ${maxTemp}°C.`,
      };
    }

    if (maxTemp >= 42) {
      return {
        status: "HIGH",
        description:
          `High forecast temperature: ${maxTemp}°C.`,
      };
    }

    if (maxTemp >= 40) {
      return {
        status: "MODERATE",
        description:
          `Elevated forecast temperature: ${maxTemp}°C.`,
      };
    }

    return {
      status: "LOW",
      description:
        `No high-temperature indication. Forecast max ${maxTemp}°C.`,
    };
  };

  // =====================================================
  // LIGHTNING STATUS
  // =====================================================

  const getLightningStatus = () => {
    if (
      weatherCode === 95 ||
      weatherCode === 96 ||
      weatherCode === 99
    ) {
      return {
        status: "HIGH",
        description:
          "Thunderstorm conditions detected.",
      };
    }

    if (
      weatherCode >= 80 &&
      weatherCode <= 82
    ) {
      return {
        status: "MODERATE",
        description:
          "Showers detected in current weather conditions.",
      };
    }

    return {
      status: "LOW",
      description:
        "No thunderstorm indication in current weather.",
    };
  };

  // =====================================================
  // CYCLONE / STORM
  // =====================================================

  const getCycloneStatus = () => {
    if (windSpeed >= 80) {
      return {
        status: "CRITICAL",
        description:
          `Very strong winds detected: ${windSpeed.toFixed(
            0
          )} km/h.`,
      };
    }

    if (windSpeed >= 60) {
      return {
        status: "HIGH",
        description:
          `Strong winds detected: ${windSpeed.toFixed(
            0
          )} km/h.`,
      };
    }

    if (windSpeed >= 40) {
      return {
        status: "MODERATE",
        description:
          `Elevated wind speed: ${windSpeed.toFixed(
            0
          )} km/h.`,
      };
    }

    return {
      status: "LOW",
      description:
        `No strong-wind indication. Wind ${windSpeed.toFixed(
          0
        )} km/h.`,
    };
  };

  // =====================================================
  // CREATE DISASTER DATA
  // =====================================================

  const earthquake =
    getEarthquakeStatus();

  const flood =
    getFloodStatus();

  const rainfallStatus =
    getRainfallStatus();

  const lightning =
    getLightningStatus();

  const cyclone =
    getCycloneStatus();

  const heatwave =
    getHeatwaveStatus();

  const disasters = [
    {
      id: 1,
      title: "Earthquake",
      icon: "pulse-outline",
      iconColor: "#6D28D9",
      iconBg: "#F3E8FF",
      ...earthquake,
    },

    {
      id: 2,
      title: "Flood",
      icon: "water-outline",
      iconColor: "#2563EB",
      iconBg: "#DBEAFE",
      ...flood,
    },

    {
      id: 3,
      title: "Rainfall",
      icon: "rainy-outline",
      iconColor: "#2563EB",
      iconBg: "#DBEAFE",
      ...rainfallStatus,
    },

    {
      id: 4,
      title: "Lightning",
      icon: "flash",
      iconColor: "#F59E0B",
      iconBg: "#FEF3C7",
      ...lightning,
    },

    {
      id: 5,
      title: "Cyclone / Storm",
      icon: "refresh-circle-outline",
      iconColor: "#0F766E",
      iconBg: "#CCFBF1",
      ...cyclone,
    },

    {
      id: 6,
      title: "Heatwave",
      icon: "sunny-outline",
      iconColor: "#F97316",
      iconBg: "#FFEDD5",
      ...heatwave,
    },
  ];

  // =====================================================
  // OVERALL RISK
  // =====================================================

  const calculateOverallRisk = () => {
    const values =
      disasters.map(
        (item) =>
          statusRank[item.status] || 1
      );

    const average =
      values.reduce(
        (sum, value) =>
          sum + value,
        0
      ) / values.length;

    return Math.round(
      ((average - 1) / 3) * 100
    );
  };

  const overallRisk =
    calculateOverallRisk();

  const getOverallStatus = () => {
    if (overallRisk >= 75)
      return "CRITICAL";

    if (overallRisk >= 50)
      return "HIGH";

    if (overallRisk >= 25)
      return "MODERATE";

    return "LOW";
  };

  const overallStatus =
    getOverallStatus();

  const getOverallColor = () => {
    if (
      overallStatus === "CRITICAL"
    )
      return "#991B1B";

    if (
      overallStatus === "HIGH"
    )
      return "#DC2626";

    if (
      overallStatus === "MODERATE"
    )
      return "#C65C00";

    return "#15803D";
  };

  // =====================================================
  // ACTIVE ALERT
  // =====================================================

  const activeAlert =
    [...disasters].sort(
      (a, b) =>
        (statusRank[b.status] || 0) -
        (statusRank[a.status] || 0)
    )[0];

  // =====================================================
  // LOADING
  // =====================================================

  if (loading && !weather) {
    return (
      <SafeAreaView
        style={styles.safeArea}
      >
        <View
          style={styles.loadingContainer}
        >
          <ActivityIndicator
            size="large"
            color="#1683F2"
          />

          <Text
            style={styles.loadingText}
          >
            Fetching real disaster data...
          </Text>

          <Text
            style={styles.loadingSubText}
          >
            Getting your location and
            checking nearby conditions
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          isMobile &&
            styles.mobileContainer,
        ]}
      >

        {/* HEADER */}

        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Ionicons
              name="pulse"
              size={19}
              color="#1683F2"
            />
          </View>

          <Pressable
            style={styles.notificationButton}
          >
            <Ionicons
              name="notifications-outline"
              size={29}
              color="#13294B"
            />

            <View
              style={styles.notificationDot}
            />
          </Pressable>
        </View>

        {/* TITLE */}

        <View style={styles.titleRow}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons
              name="chevron-back"
              size={30}
              color="#14284A"
            />
          </Pressable>

          <Text
            style={styles.pageTitle}
          >
            Disaster Monitoring
          </Text>
        </View>

        {/* LOCATION */}

        <View
          style={[
            styles.locationRow,
            isMobile &&
              styles.locationRowMobile,
          ]}
        >
          <View
            style={styles.locationBox}
          >
            <Ionicons
              name="location"
              size={21}
              color="#19345A"
            />

            <Text
              style={styles.locationText}
              numberOfLines={1}
            >
              {location}
            </Text>
          </View>

          <View
            style={styles.updatedBox}
          >
            <Ionicons
              name="time-outline"
              size={23}
              color="#19345A"
            />

            <View>
              <Text
                style={styles.updatedLabel}
              >
                Last updated
              </Text>

              <Text
                style={styles.updatedTime}
              >
                {lastUpdated || "--"}
              </Text>
            </View>
          </View>
        </View>

        {/* ERROR */}

        {error ? (
          <View
            style={styles.errorCard}
          >
            <Ionicons
              name="warning-outline"
              size={22}
              color="#DC2626"
            />

            <Text
              style={styles.errorText}
            >
              {error}
            </Text>
          </View>
        ) : null}

        {/* OVERALL RISK - COMPACT */}

        <View
          style={[
            styles.overallCard,
            isMobile &&
              styles.overallCardMobile,
          ]}
        >
          <View
            style={styles.overallTop}
          >
            <View
              style={[
                styles.riskIcon,
                {
                  backgroundColor:
                    getOverallColor(),
                },
              ]}
            >
              <Ionicons
                name="alert"
                size={25}
                color="#FFFFFF"
              />
            </View>

            <View
              style={styles.overallMain}
            >
              <Text
                style={styles.overallTitle}
              >
                Overall Disaster Risk
              </Text>

              <View
                style={styles.scoreRow}
              >
                <Text
                  style={[
                    styles.score,
                    {
                      color:
                        getOverallColor(),
                    },
                  ]}
                >
                  {overallRisk}
                </Text>

                <Text
                  style={styles.outOf}
                >
                  / 100
                </Text>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      getStatusBg(
                        overallStatus
                      ),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        getStatusColor(
                          overallStatus
                        ),
                    },
                  ]}
                >
                  {overallStatus}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.overallDivider,
              isMobile &&
                styles.overallDividerMobile,
            ]}
          />

          <View
            style={styles.overallInfo}
          >
            <Text
              style={styles.overallDescription}
              numberOfLines={2}
            >
              Based on current weather
              conditions and recent
              earthquake activity.
            </Text>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#19345A"
            />
          </View>
        </View>

        {/* ACTIVE ALERT */}

        <View
          style={styles.sectionHeader}
        >
          <Text
            style={styles.sectionTitle}
          >
            Active Alerts
          </Text>

          <Text
            style={styles.liveText}
          >
            ● LIVE
          </Text>
        </View>

        <Pressable
          style={[
            styles.activeAlert,
            isMobile &&
              styles.activeAlertMobile,
          ]}
        >
          <View
            style={styles.rainIconBox}
          >
            <Ionicons
              name={
                activeAlert?.title ===
                "Rainfall"
                  ? "rainy"
                  : "warning"
              }
              size={32}
              color="#1683F2"
            />
          </View>

          <View
            style={styles.activeAlertContent}
          >
            <Text
              style={styles.activeAlertTitle}
            >
              {activeAlert?.title}
            </Text>

            <Text
              style={
                styles.activeAlertDescription
              }
              numberOfLines={2}
            >
              {activeAlert?.description}
            </Text>

            <View
              style={styles.alertLocation}
            >
              <Ionicons
                name="location"
                size={15}
                color="#5B7193"
              />

              <Text
                style={
                  styles.alertLocationText
                }
                numberOfLines={1}
              >
                {location}
              </Text>
            </View>
          </View>

          <View
            style={styles.activeRight}
          >
            <View
              style={[
                styles.highBadge,
                {
                  backgroundColor:
                    getStatusColor(
                      activeAlert?.status
                    ),
                },
              ]}
            >
              <Text
                style={styles.highText}
              >
                {activeAlert?.status}
              </Text>
            </View>
          </View>
        </Pressable>

        {/* DISASTER GRID */}

        <View
          style={styles.disasterGrid}
        >
          {disasters.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.disasterCard,
                {
                  width: isMobile
                    ? (width - 48) / 2
                    : (width - 92) / 2,
                },
                pressed &&
                  styles.cardPressed,
              ]}
            >
              <View
                style={styles.cardTop}
              >
                <View
                  style={[
                    styles.disasterIcon,
                    {
                      backgroundColor:
                        item.iconBg,
                    },
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={25}
                    color={item.iconColor}
                  />
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        getStatusBg(
                          item.status
                        ),
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          getStatusColor(
                            item.status
                          ),
                      },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              <View
                style={styles.cardTitleRow}
              >
                <Text
                  style={[
                    styles.disasterTitle,
                    isMobile &&
                      styles.disasterTitleMobile,
                  ]}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={19}
                  color="#6680A6"
                />
              </View>

              <Text
                style={
                  styles.disasterDescription
                }
                numberOfLines={2}
              >
                {item.description}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* SOURCE */}

        <View
          style={styles.sourceCard}
        >
          <View
            style={styles.sourceIcon}
          >
            <Ionicons
              name="cloud-outline"
              size={20}
              color="#6D84A6"
            />
          </View>

          <View
            style={styles.sourceContent}
          >
            <Text
              style={styles.sourceTitle}
            >
              Live data sources
            </Text>

            <Text
              style={styles.sourceNames}
            >
              Open-Meteo Weather | USGS Earthquake
            </Text>
          </View>

          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#7A91B2"
          />
        </View>

        <Text
          style={styles.disclaimer}
        >
          Disaster status is calculated from
          live weather and earthquake data.
          It is not an official emergency warning.
        </Text>

        <View
          style={styles.bottomSpace}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFE",
  },

  container: {
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
    paddingHorizontal: 30,
    paddingTop: 18,
    paddingBottom: 30,
  },

  mobileContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  // ===================================================
  // LOADING
  // ===================================================

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "800",
    color: "#14284A",
  },

  loadingSubText: {
    marginTop: 7,
    fontSize: 13,
    color: "#647A9A",
    textAlign: "center",
  },

  // ===================================================
  // ERROR
  // ===================================================

  errorCard: {
    backgroundColor: "#FEE2E2",
    borderRadius: 14,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  errorText: {
    flex: 1,
    color: "#991B1B",
    marginLeft: 9,
    fontSize: 13,
    fontWeight: "600",
  },

  // ===================================================
  // HEADER
  // ===================================================

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  logoBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#E8F3FF",
    justifyContent: "center",
    alignItems: "center",
  },

  notificationButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },

  notificationDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 9,
    height: 9,
    borderRadius: 10,
    backgroundColor: "#EF3340",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },

  // ===================================================
  // TITLE
  // ===================================================

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  backButton: {
    marginRight: 5,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#14284A",
    letterSpacing: -0.6,
  },

  // ===================================================
  // LOCATION
  // ===================================================

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 17,
  },

  locationRowMobile: {
    flexDirection: "row",
  },

  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF4FC",
    paddingHorizontal: 14,
    height: 46,
    borderRadius: 25,
    flexShrink: 1,
  },

  locationText: {
    color: "#243D61",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },

  updatedBox: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },

  updatedLabel: {
    fontSize: 10,
    color: "#647A9A",
  },

  updatedTime: {
    fontSize: 13,
    color: "#253D60",
    fontWeight: "700",
    marginTop: 1,
  },

  // ===================================================
  // OVERALL RISK - COMPACT
  // ===================================================

  overallCard: {
    minHeight: 125,
    borderRadius: 18,
    backgroundColor: "#FFF0F1",
    borderWidth: 1,
    borderColor: "#FFD0D3",
    paddingHorizontal: 16,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  overallCardMobile: {
    minHeight: 125,
    flexDirection: "column",
    alignItems: "stretch",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  overallTop: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  riskIcon: {
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 5,
    borderColor: "#FFD9DC",
  },

  overallMain: {
    flex: 1,
  },

  overallTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#172D50",
    marginBottom: 0,
  },

  scoreRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  score: {
    fontSize: 40,
    lineHeight: 43,
    fontWeight: "900",
  },

  outOf: {
    fontSize: 14,
    color: "#506889",
    fontWeight: "600",
    marginLeft: 5,
  },

  statusBadge: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },

  statusText: {
    fontSize: 9,
    fontWeight: "900",
  },

  overallDivider: {
    width: 1,
    height: 75,
    backgroundColor: "#F0C9CC",
    marginHorizontal: 18,
  },

  overallDividerMobile: {
    width: "100%",
    height: 1,
    marginHorizontal: 0,
    marginVertical: 9,
  },

  overallInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  overallDescription: {
    color: "#466184",
    fontSize: 11,
    lineHeight: 16,
    flex: 1,
    marginRight: 5,
  },

  // ===================================================
  // ACTIVE ALERT
  // ===================================================

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#14284A",
  },

  liveText: {
    color: "#16A34A",
    fontSize: 11,
    fontWeight: "900",
  },

  activeAlert: {
    minHeight: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DCE5F1",
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  activeAlertMobile: {
    padding: 11,
    minHeight: 92,
  },

  rainIconBox: {
    width: 58,
    height: 58,
    borderRadius: 35,
    backgroundColor: "#E5F2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  activeAlertContent: {
    flex: 1,
    minWidth: 0,
  },

  activeAlertTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#172D50",
    marginBottom: 3,
  },

  activeAlertDescription: {
    fontSize: 11,
    color: "#405D83",
    marginBottom: 5,
  },

  alertLocation: {
    flexDirection: "row",
    alignItems: "center",
  },

  alertLocationText: {
    color: "#5C7395",
    fontSize: 10,
    fontWeight: "600",
    marginLeft: 4,
  },

  activeRight: {
    marginLeft: 5,
  },

  highBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 18,
  },

  highText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },

  // ===================================================
  // DISASTER GRID
  // ===================================================

  disasterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  disasterCard: {
    minHeight: 135,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#DCE5F1",
    padding: 13,
    marginBottom: 13,

    shadowColor: "#8298B5",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,

    elevation: 2,
  },

  cardPressed: {
    transform: [
      {
        scale: 0.97,
      },
    ],
    opacity: 0.9,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 9,
  },

  disasterIcon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  disasterTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#172D50",
    flex: 1,
  },

  disasterTitleMobile: {
    fontSize: 13,
  },

  disasterDescription: {
    color: "#526B8E",
    fontSize: 10,
    lineHeight: 15,
    paddingRight: 2,
  },

  // ===================================================
  // SOURCE
  // ===================================================

  sourceCard: {
    marginTop: 2,
    minHeight: 60,
    backgroundColor: "#EDF3FB",
    borderRadius: 17,
    paddingHorizontal: 13,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  sourceIcon: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: "#DDE7F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 9,
  },

  sourceContent: {
    flex: 1,
  },

  sourceTitle: {
    color: "#607797",
    fontSize: 10,
    marginBottom: 3,
  },

  sourceNames: {
    color: "#56708F",
    fontSize: 10,
    fontWeight: "600",
  },

  disclaimer: {
    fontSize: 9,
    lineHeight: 13,
    color: "#8192A9",
    textAlign: "center",
    marginTop: 9,
    paddingHorizontal: 12,
  },

  bottomSpace: {
    height: 80,
  },
});