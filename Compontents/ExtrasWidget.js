import { useEffect, useRef, useContext } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import Animations from "./Animations/Animations";

import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "./Contexts/ThemeContext";
import { WeatherContext } from "./Contexts/WeatherContext";

function ExtrasWidget() {
  const anim = useRef(new Animated.Value(100)).current;
  useEffect(() => {
    Animations(anim, 300);
  }, []);

  const theme = useContext(ThemeContext);
  const weatherData = useContext(WeatherContext);

  const styles = StyleSheet.create({
    container: {
      transform: [{ translateY: anim }],
      justifyContent: "center",
      alignItems: "center",
      padding: "6%",
      backgroundColor: theme.widget,
      borderRadius: 20,
      marginVertical: 5,
      flexDirection: "row",
      width: "49%",
    },
    item: {
      alignItems: "center",
      marginHorizontal: "10%",
    },
    labels: {
      color: theme.text,
      fontSize: 12,
      fontFamily: theme.fontRegular,
      marginTop: -3,
    },
  });

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Animated.View style={styles.container}>
        <View style={styles.item}>
          <Ionicons
            style={{ marginBottom: 5 }}
            name="ios-water-outline"
            size={24}
            color={theme.text}
          />
          <Text style={styles.labels}>{weatherData.humidity}% </Text>
          <Text style={styles.labels}>Humidity</Text>
        </View>
        <View style={styles.item}>
          <Ionicons
            style={{ marginBottom: 5 }}
            name="body-outline"
            size={24}
            color={theme.text}
          />
          <Text style={styles.labels}>Feels like</Text>
          <Text style={styles.labels}>{weatherData.feelsLike}</Text>
        </View>
      </Animated.View>

      <Animated.View style={styles.container}>
        <View style={styles.item}>
          <Ionicons
            style={{ marginBottom: 5 }}
            name="ios-arrow-up-circle-outline"
            size={24}
            color={theme.text}
          />
          <Text style={styles.labels}>{weatherData.min}</Text>
          <Text style={styles.labels}>Min.</Text>
        </View>
        <View style={styles.item}>
          <Ionicons
            style={{ marginBottom: 5 }}
            name="ios-arrow-down-circle-outline"
            size={24}
            color={theme.text}
          />
          <Text style={styles.labels}>{weatherData.max}</Text>
          <Text style={styles.labels}>Max.</Text>
        </View>
      </Animated.View>
    </View>
  );
}

export default ExtrasWidget;
