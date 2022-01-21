import { StyleSheet, ToastAndroid,  SafeAreaView, View } from 'react-native';
import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

//load system layout and styling stuff
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font'

//load api stuff
import axios from 'axios';
import { OPEN_WEATHER_API_KEY } from '@env'

//load pages
import Loading from './Compontents/Screens/Loading';
import Home from './Compontents/Screens/Home';
import Search from './Compontents/Screens/Search';
import Settings from './Compontents/Screens/Settings'

const font = {
  regular: 'Atkinson-Hyperlegible',
  bold: 'Atkinson-Hyperlegible-Bold',
}

const darkTheme = {
  name: 'dark',
  accent: 'black',
  text: 'white',
  widget: '#171717',
  background: 'black',
  statusBar: 'light',
}
const lightTheme = {
  name: 'light',
  accent: 'black',
  text: 'black',
  widget: 'white',
  background: '#f5f5f5',
  statusBar: 'dark',
}

export default function App() {

  const [hasLocation, setHasLocation] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const [prefs, setPrefs] = useState({unit: 'Metric', theme: lightTheme})
  
  const [isSearching, setIsSearching] = useState(false)
  const [isSetting, setIsSetting] = useState(false)

  const [weatherData, setWeatherData] = useState({})
  const [locationData, setLocationData] = useState({})
  const [initialLocationData, setInitialLocationData] = useState({})

  //FONT LOADING
  let [fontsLoaded] = useFonts({
    'Atkinson-Hyperlegible': require('./assets/fonts/AtkinsonHyperlegible.ttf'),
    'Atkinson-Hyperlegible-Bold': require('./assets/fonts/AtkinsonHyperlegible-Bold.ttf')
  });

  //STORAGE
  async function getStorage(){
    try{
      const storageData = await AsyncStorage.getItem('storage')
      if (storageData !== null) setPrefs(JSON.parse(storageData))
    }catch{e => {alert(e)}}
  }
  async function setStorage(){
    try{await AsyncStorage.setItem('storage', JSON.stringify(prefs))}
    catch{e => {ToastAndroid.show(`Something went wrong and Climatch couldn't save your preferences: ${e}`, ToastAndroid.SHORT)}}
  }
  //

  //LOCATION
  async function getLocation() {
    if (!hasLocation) {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('access to location denied')
        ToastAndroid.show(`Please allow Climatch to access your exact location; It can't work otherwise.`, ToastAndroid.SHORT)
        return
      } //else:

      let location = await Location.getCurrentPositionAsync({})
      setLocationData(location.coords)
      setInitialLocationData(location.coords)
      setStates(location.coords)
    }
    setHasLocation(true)
  }

  function setStates(location) {
    if (hasLocation) {
      const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${locationData.latitude}&lon=${locationData.longitude}&units=${prefs.unit}&appid=${OPEN_WEATHER_API_KEY}`
      console.log(`sending ${weatherUrl}`)
      axios.get(weatherUrl).then(res => {
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
        })
        setLoaded(true)
      }).catch(err => console.log(err))
    }
  }

  //get data needed on launch
  useEffect(() => {
    getLocation()
    getStorage()
    return () => { 'cleaning' }
  }, [])

  //reset states when new data has been gathered, or if
  //selected location has been changed
  useEffect(() => {
    setStates(locationData)
    return () => { 'cleaning' }
  }, [hasLocation, locationData, prefs])

  //every time preferences are changed, store them
  //permanently
  useEffect(() => {
    setStorage()
  }, [prefs])

  //wait for fonts and data to be fetched
  if (!fontsLoaded || !loaded) return <Loading theme={prefs.theme}/>

  //return main app once all data is loaded and ready
  else {
    return (
      <SafeAreaView style = {{backgroundColor: prefs.theme.background, ...styles.container}}>
        
        <StatusBar style = {prefs.theme.statusBar}/>
        {
          //^ sets status bar to apropriate color depending on theme
        }
        <LinearGradient style = {styles.bgGradient} colors = {['transparent', prefs.theme.background]}/>
        {
          //^ gradient that sits just above nav bar
        }

        {isSearching &&
          <View>
            <Search
            textColor = {prefs.theme.text}
            widgetColor = {prefs.theme.widget}
            font = {font}
            background = {prefs.theme.background}
            setLocationData = {setLocationData}
            isSearching = {isSearching}
            setIsSearching = {setIsSearching}
            />
          </View>
        }

        {isSetting &&
        <View style = {{height: '100%'}}>
            <Settings
            textColor = {prefs.theme.text}
            widgetColor = {prefs.theme.widget}
            font = {font}
            background = {prefs.theme.background}
            setLocationData = {setLocationData}
            isSetting = {isSetting}
            setIsSetting = {setIsSetting}
            darkTheme = {darkTheme}
            lightTheme = {lightTheme}
            prefs = {prefs}
            setPrefs = {setPrefs}/>
        </View>
        }

        {(!isSearching && !isSetting) &&
          //renders if user isn't searching or in settings
          <Home
          // these are the properties
          // the children components will need
          // to have passed down to them
          textColor = {prefs.theme.text}
          widgetColor = {prefs.theme.widget}
          font = {font}
          background = {prefs.theme.background}

          locationData = {locationData}
          setLocationData = {setLocationData}
          initialLocationData = {initialLocationData}
          isSearching = {isSearching}
          setIsSearching = {setIsSearching}
          isSetting = {isSetting}
          setIsSetting = {setIsSetting}

          weatherData = {weatherData}
          unit={prefs.unit}
          />
        }

      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  bgGradient: {
    height: '5%',
    margin: '-5%',
    zIndex: 2,
    top: '98%',
    left: '0%',
},
container: {
  height: '100%'
}
})