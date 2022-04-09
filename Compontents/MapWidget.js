import { useRef, useEffect, useContext } from "react";
import { StyleSheet, Animated } from "react-native";
import Animations from "./Animations/Animations";
import MapView from "react-native-maps";
import { WeatherContext } from "./Contexts/WeatherContext";

function MapWidget({ delta, animDelay, mapType }) {
  const anim = useRef(new Animated.Value(100)).current;

  const location = useContext(WeatherContext).location;

  useEffect(() => {
    Animations(anim, animDelay);
  }, []);

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      height: 180,
      overflow: "hidden",
      marginVertical: 5,
      width: "100%",
      transform: [{ translateY: anim }],
    },
    map: {
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      flex: 1,
    },
  });

  return (
    <Animated.View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: delta,
          longitudeDelta: delta,
        }}
        mapType={mapType}
        userLocationPriority="passive"
        zoomEnabled={false}
        scrollEnabled={false}
      />
    </Animated.View>
  );
}

export default MapWidget;
