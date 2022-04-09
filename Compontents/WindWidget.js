import { useRef, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import Animations from "./Animations/Animations";

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "./Contexts/ThemeContext";
import { WeatherContext } from "./Contexts/WeatherContext";

function WindWidget() {
  const anim = useRef(new Animated.Value(100)).current;
  useEffect(() => {
    Animations(anim, 200);
  }, []);

  const theme = useContext(ThemeContext);
  const weatherData = useContext(WeatherContext);

  const styles = StyleSheet.create({
    windContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: "3%",
      backgroundColor: theme.widget,
      borderRadius: 20,
      marginVertical: 5,
      flexDirection: "row",
      width: "100%",
      minHeight: 120,
      transform: [{ translateY: anim }],
    },
    item: {
      alignItems: "center",
      marginHorizontal: "10%",
    },
    labels: {
      color: theme.text,
      fontSize: 12,
      fontFamily: theme.fontRegular,
      marginTop: 3,
    },
    icon: {
      marginBottom: 5,
    },
  });

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Animated.View style={styles.windContainer}>
        <View style={styles.item}>
          <Feather
            style={styles.icon}
            name="wind"
            size={24}
            color={theme.text}
          />
          <Text style={styles.labels}>{weatherData.speed} </Text>
          <Text style={styles.labels}>Wind Speed</Text>
        </View>
        <View style={styles.item}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="angle-acute"
            size={24}
            color={theme.text}
          />
          <Text style={styles.labels}>{weatherData.deg}</Text>
          <Text style={styles.labels}>Degrees</Text>
        </View>
      </Animated.View>
    </View>
  );
}

export default WindWidget;
