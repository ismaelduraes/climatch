import { useRef, useEffect, useContext } from "react";
import Animations from "./Animations/Animations";
import { StyleSheet, Text, View, Animated } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "./Contexts/ThemeContext";
import { WeatherContext } from "./Contexts/WeatherContext";
import { PrefsContext } from "./Contexts/PrefsContext";

export default function WeatherWidget(props) {
  const anim = useRef(new Animated.Value(100)).current;
  useEffect(() => {
    Animations(anim, 0);
  }, []);

  const theme = useContext(ThemeContext);
  const weatherData = useContext(WeatherContext);
  const prefsContext = useContext(PrefsContext);

  //this just gets the first letter and replaces it with it's
  //upper case equivalent since openweather sends it
  //all lowercase
  const formattedDescription = weatherData.description.replace(
    weatherData.description.charAt(0),
    weatherData.description.charAt(0).toUpperCase()
  );

  const styles = StyleSheet.create({
    weatherContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.widget,
      alignItems: "center",
      padding: "10%",
      borderRadius: 20,
      marginVertical: 5,
      transform: [{ translateY: anim }],
    },
    weatherTitle: {
      fontSize: 20,
      fontFamily: theme.fontRegular,
      color: theme.text,
    },
    weatherMeasurement: {
      fontSize: 40,
      fontFamily: theme.fontRegular,
      color: theme.text,
    },
  });

  return (
    <Animated.View style={styles.weatherContainer}>
      <Text style={styles.weatherTitle}>{weatherData.cityName}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {weatherData.weather == "Clouds" && (
          <Ionicons
            name="md-cloud-outline"
            size={32}
            color={theme.text}
            style={{ marginHorizontal: "3%" }}
          />
        )}
        {weatherData.weather == "Mist" && (
          <Ionicons
            name="water-outline"
            size={32}
            color={theme.text}
            style={{ marginHorizontal: "3%" }}
          />
        )}
        {weatherData.weather == "Clear" && (
          <Ionicons
            name="sunny"
            size={32}
            color={theme.text}
            style={{ marginHorizontal: "3%" }}
          />
        )}
        {weatherData.weather == "Rain" && (
          <Ionicons
            name="rainy"
            size={32}
            color={theme.text}
            style={{ marginHorizontal: "3%" }}
          />
        )}
        {prefsContext.prefs.unit === "Metric" ? (
          <Text style={styles.weatherMeasurement}>
            {Math.round(weatherData.temp)}ºC
          </Text>
        ) : null}
        {prefsContext.prefs.unit === "Imperial" ? (
          <Text style={styles.weatherMeasurement}>
            {Math.round(weatherData.temp)}ºF
          </Text>
        ) : null}
        {prefsContext.prefs.unit === "Kelvin" ? (
          <Text style={styles.weatherMeasurement}>
            {Math.round(weatherData.temp)}ºK
          </Text>
        ) : null}
      </View>
      <Text style={styles.weatherTitle}>{formattedDescription}</Text>
    </Animated.View>
  );
}
