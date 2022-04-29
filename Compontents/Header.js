import { useContext } from "react";
import { StyleSheet, Dimensions, Text, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "./Contexts/ThemeContext";
import { WeatherContext } from "./Contexts/WeatherContext";
import { PrefsContext } from "./Contexts/PrefsContext";

import { useNavigation } from "@react-navigation/native";

const height = Dimensions.get("window").height;

function Header({
  iconName,
  title,
  showsSettings = false,
  showsSearch = false,
  showsReset = false,
  showsClose = false,
}) {
  const theme = useContext(ThemeContext);
  const prefsContext = useContext(PrefsContext);

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      width: "100%",
      height: height,
      zIndex: 1,
    },
    header: {
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: "5%",
      paddingTop: getStatusBarHeight(),
      flexDirection: "row",
      zIndex: 1,
      minHeight: 150,
    },
    headerTitle: {
      fontFamily: theme.fontBold,
      fontSize: 30,
      color: theme.text,
    },
    icon: {
      marginLeft: "15%",
    },
  });

  return (
    <View style={styles.container} pointerEvents="box-none">
      <LinearGradient
        colors={
          theme.name === "light"
            ? [theme.background, "#ffffff00"]
            : [theme.background, "#00000000"]
        }
        style={styles.header}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            style={{ marginRight: 10 }}
            name={iconName}
            size={24}
            color={theme.text}
          />
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "40%",
            justifyContent: "flex-end",
          }}
        >
          {showsReset ? (
            <Ionicons
              onPress={() => {
                if (
                  prefsContext.locationData !== prefsContext.initialLocationData
                ) {
                  prefsContext.setLocationData(
                    prefsContext.initialLocationData
                  );
                }
              }}
              name="arrow-down"
              size={26}
              color={theme.text}
              style={styles.icon}
            />
          ) : null}
          {showsSearch ? (
            <Ionicons
              onPress={() => navigation.push("search")}
              name="search"
              size={26}
              color={theme.text}
              style={styles.icon}
            />
          ) : null}
          {showsSettings ? (
            <Ionicons
              onPress={() => navigation.push("settings")}
              name="settings-outline"
              size={26}
              color={theme.text}
              style={styles.icon}
            />
          ) : null}
          {showsClose ? (
            <Ionicons
              onPress={() => navigation.goBack()}
              name="close"
              size={26}
              color={theme.text}
            />
          ) : null}
        </View>
      </LinearGradient>
    </View>
  );
}

export default Header;
