import { useState, useRef, useEffect, useContext } from "react";

import {
  Animated,
  StyleSheet,
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animations from "../Animations/Animations";

import { getStatusBarHeight } from "react-native-status-bar-height";

import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import Header from "../Header";
import { ThemeContext } from "../Contexts/ThemeContext";
import { PrefsContext } from "../Contexts/PrefsContext";

function Search(props) {
  const [cities, setCities] = useState([]);
  const [input, setInput] = useState("");

  const theme = useContext(ThemeContext);
  const prefsContext = useContext(PrefsContext);

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: theme.background,
      zIndex: 1,
      paddingTop: getStatusBarHeight() + 100,
    },
    searchBar: {
      backgroundColor: theme.widget,
      borderRadius: 20,
      marginHorizontal: "3%",
      height: "7%",
      alignItems: "center",
      paddingHorizontal: "3%",
      flexDirection: "row",
      marginBottom: "5%",
    },
    searchBarInput: {
      marginHorizontal: "3%",
      fontFamily: theme.fontRegular,
      color: theme.text,
    },
    resultItem: {
      borderColor: theme.widget,
      borderRadius: 20,
      padding: "3%",
      marginHorizontal: "3%",
      marginBottom: 5,
      fontFamily: theme.fontRegular,
    },
    noSearch: {
      fontSize: 30,
      color: "gray",
      textAlign: "center",
      fontFamily: theme.fontRegular,
      marginTop: "50%",
    },
  });

  //fetch cities by query
  async function getCities(query) {
    if (!query) return;
    const url = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix=${query}`;

    axios
      .get(url)
      .then((e) => {
        setCities(e.data.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Animated.View style={styles.container}>
      <Header showsClose title="Search" iconName="search" />

      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={theme.text} />

        <TextInput
          style={styles.searchBarInput}
          placeholder="Search for any city"
          placeholderTextColor={theme.text}
          onChangeText={(e) => {
            setInput(e);
          }}
          onSubmitEditing={() => getCities(input)}
        />
      </View>

      <ScrollView>
        {input == "" && (
          <Text style={styles.noSearch}>Look any city up...</Text>
        )}
        {/* map results */}
        {input != "" &&
          cities.map((city) => {
            return (
              <TouchableHighlight
                style={styles.resultItem}
                onPress={() => {
                  prefsContext.setLocationData({
                    latitude: city.latitude,
                    longitude: city.longitude,
                  });
                  navigation.navigate("home");
                }}
                activeOpacity={0.7}
                underlayColor={theme.background}
              >
                <View>
                  <Text
                    style={{ color: theme.text, fontSize: 18 }}
                    key={cities.indexOf(city)}
                  >
                    {city.city}, {city.regionCode}
                  </Text>
                  <Text
                    style={{ color: theme.text, fontSize: 12 }}
                    key={cities.indexOf(city) + city.city}
                  >
                    {city.country}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })}
      </ScrollView>
    </Animated.View>
  );
}

export default Search;
