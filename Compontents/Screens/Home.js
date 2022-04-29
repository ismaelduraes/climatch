import {
  Animated,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  View,
} from "react-native";
import { useRef, useEffect, useContext } from "react";

import { getStatusBarHeight } from "react-native-status-bar-height";

import Header from "../Header";
import WeatherWidget from "../WeatherWidget";
import MapWidget from "../MapWidget";
import WindWidget from "../WindWidget";
import ExtrasWidget from "../ExtrasWidget";

import Animations from "../Animations/Animations";
import { ThemeContext } from "../Contexts/ThemeContext";
import { WeatherContext } from "../Contexts/WeatherContext";

export default function Home(props) {
  const anim = useRef(new Animated.Value(100)).current;

  const theme = useContext(ThemeContext);

  useEffect(() => {
    Animations(anim, 0, 1000);
  });

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      minHeight: "100%",
    },
    mainView: {
      paddingHorizontal: "3%",
      transform: [{ translateY: anim }],
    },
    header: {
      transform: [{ translateY: anim }],
      zIndex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Header
        title={"Climatch"}
        iconName="sunny"
        showsSettings
        showsSearch
        showsReset
      />

      <Animated.ScrollView
        style={styles.mainView}
        contentContainerStyle={{
          paddingTop: getStatusBarHeight() + 100,
          paddingBottom: 30,
        }}
      >
        <WeatherWidget unit={props.unit} />
        <MapWidget mapType="terrain" animDelay={100} delta={1} />
        <WindWidget />
        <ExtrasWidget />
        <MapWidget mapType="standard" animDelay={400} delta={0.01} />

        <Text
          style={{
            textAlign: "center",
            color: theme.text,
            marginTop: 10,
            fontFamily: theme.fontRegular,
            opacity: 0.5,
          }}
        >
          {`Designed and developed by Ismael Santos.\nWeather data provided by OpenWeather.`}
        </Text>
      </Animated.ScrollView>
    </View>
  );
}
