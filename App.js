import { StyleSheet, ToastAndroid, SafeAreaView, View } from "react-native";
import { useState, useEffect, createContext } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

//load system layout and styling stuff
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { useFonts } from "expo-font";

//load api stuff
import axios from "axios";
import Constants from "expo-constants";
const apiKey = Constants.manifest.extra.OPEN_WEATHER_API_KEY;

//load pages
import Loading from "./Compontents/Screens/Loading";
import Home from "./Compontents/Screens/Home";
import Search from "./Compontents/Screens/Search";
import Settings from "./Compontents/Screens/Settings";

import { ThemeContext, themes } from "./Compontents/Contexts/ThemeContext";
import { WeatherContext } from "./Compontents/Contexts/WeatherContext";
import { PrefsContext } from "./Compontents/Contexts/PrefsContext";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  const [hasLocation, setHasLocation] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [prefs, setPrefs] = useState({ unit: "Metric", theme: themes.dark });

  const [isSearching, setIsSearching] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  const [weatherData, setWeatherData] = useState({});
  const [locationData, setLocationData] = useState({});
  const [initialLocationData, setInitialLocationData] = useState({});

  const [theme, setTheme] = useState(themes.dark);

  //FONT LOADING
  let [fontsLoaded] = useFonts({
    "Atkinson-Hyperlegible": require("./assets/fonts/AtkinsonHyperlegible.ttf"),
    "Atkinson-Hyperlegible-Bold": require("./assets/fonts/AtkinsonHyperlegible-Bold.ttf"),
  });

  //STORAGE
  async function getStorage() {
    try {
      const storageData = await AsyncStorage.getItem("storage");
      if (storageData !== null) {
        setPrefs(JSON.parse(storageData));
        setTheme(JSON.parse(storageData).theme);
      }
    } catch {
      (e) => {
        alert(e);
      };
    }
  }
  async function setStorage() {
    try {
      await AsyncStorage.setItem("storage", JSON.stringify(prefs));
    } catch {
      (e) => {
        alert(
          `Something went wrong and Climatch couldn't save your preferences: ${e}`
        );
      };
    }
  }
  //

  //LOCATION
  async function getLocation() {
    if (!hasLocation) {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("access to location denied");
        alert(
          `Please allow Climatch to access your exact location; It can't work otherwise.`
        );
        return false;
      } //else:

      let location = await Location.getCurrentPositionAsync({});
      setLocationData(location.coords);
      setInitialLocationData(location.coords);
    }
    return true;
  }

  function getWeatherData(location) {
    if (
      hasLocation &&
      location.hasOwnProperty("latitude") &&
      location.hasOwnProperty("longitude")
    ) {
      const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${locationData.latitude}&lon=${locationData.longitude}&units=${prefs.unit}&appid=${apiKey}`;
      axios
        .get(weatherUrl)
        .then((res) => {
          setWeatherData({
            cityName: res.data.name,
            temp: res.data.main.temp,
            min: res.data.main.temp_min,
            max: res.data.main.temp_max,
            feelsLike: res.data.main.feels_like,
            humidity: res.data.main.humidity,
            weather: res.data.weather[0].main,
            description: res.data.weather[0].description,
            speed: res.data.wind.speed,
            deg: res.data.wind.deg,
            latitude: location.latitude,
            longitude: location.longitude,
            location,
          });
          setLoaded(true);
        })
        .catch((e) =>
          alert(
            `Something went wrong while fetching the weather. Try restarting your app, or check your internet connection. ${JSON.stringify(
              e.response.data
            )}`
          )
        );
    }
  }

  //get data needed on launch
  useEffect(() => {
    setHasLocation(getLocation());
    getStorage();
  }, []);

  //reset states when new data has been gathered, or if
  //selected location has been changed
  useEffect(() => {
    getWeatherData(locationData, initialLocationData);
  }, [hasLocation, locationData, prefs]);

  //every time preferences are changed, store them
  //permanently
  useEffect(() => {
    setStorage();
  }, [prefs]);

  //wait for fonts and data to be fetched
  if (!fontsLoaded || !loaded) return <Loading theme={prefs.theme} />;
  //return main app once all data is loaded and ready
  else {
    return (
      <PrefsContext.Provider
        value={{
          prefs,
          setPrefs,
          setTheme,
          initialLocationData,
          locationData,
          setLocationData,
        }}
      >
        <WeatherContext.Provider value={weatherData}>
          <ThemeContext.Provider value={theme}>
            <NavigationContainer>
              <StatusBar style={theme.statusBar} />
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="search" component={Search} />
                <Stack.Screen name="settings" component={Settings} />
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeContext.Provider>
        </WeatherContext.Provider>
      </PrefsContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: "100%",
  },
});
