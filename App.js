import { StyleSheet, Text, ToastAndroid, SafeAreaView, Dimensions, ScrollView, BackHandler, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font'

import axios from 'axios';
import { OPEN_WEATHER_API_KEY as apiKey } from './env'

import Header from './Compontents/Header';
import WeatherWidget from './Compontents/WeatherWidget';
import ExtrasWidget from './Compontents/ExtrasWidget';
import MapWidget from './Compontents/MapWidget';
import WindWidget from './Compontents/WindWidget';

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
  widget: '#1c1c1c',
  background: 'black',
  statusBar: 'light',

}

const lightTheme = {

  name: 'light',
  accent: 'black',
  text: 'black',
  widget: 'white',
  background: '#fafafa',
  statusBar: 'dark',

}

export default function App() {

  //get unit setting
  async function getUnitStorage(){
    try{
      let value = await AsyncStorage.getItem('unit')
      setUnit(value)
    }catch{ err => {
      alert(err)
    }}
  }

  //set unit setting
  async function setUnitStorage(){
    await AsyncStorage.setItem('unit', unit)
  }

  //get theme setting
  async function getThemeStorage(){
    try{

      let tempColor = await AsyncStorage.getItem('theme')
      if(tempColor !== null){
        setTheme(JSON.parse(tempColor))
      }
      else{
        setTheme(darkTheme)
      }

    }catch{e => alert(e)}
  }

  async function setThemeStorage(){
    try{
      await AsyncStorage.setItem('theme', JSON.stringify(theme))
    }catch{ e=>
      alert(e)
    }
  }



  let [fontsLoaded] = useFonts({
    'Atkinson-Hyperlegible': require('./assets/fonts/AtkinsonHyperlegible.ttf'),
    'Atkinson-Hyperlegible-Bold': require('./assets/fonts/AtkinsonHyperlegible-Bold.ttf')
  });

  const [hasData, setHasData] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const [unit, setUnit] = useState('Metric')
  const [theme, setTheme] = useState(darkTheme)

  const [isSearching, setIsSearching] = useState(false)
  const [isSetting, setIsSetting] = useState(false)

  const [weatherData, setWeatherData] = useState({})
  const [locationData, setLocationData] = useState({})
  const [initialLocationData, setInitialLocationData] = useState({})

  async function getLocation() {
    if (!hasData) {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('access to location denied')
        ToastAndroid.show('Please allow Climatch to access your location', ToastAndroid.SHORT)
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setInitialLocationData(location.coords)
      setLocationData(location.coords)
      setStates(location.coords)
    }
    setHasData(true)
    // console.log(unit)
  }


  function setStates(location) {
    // ToastAndroid.show('Updating', ToastAndroid.SHORT)
    if (hasData) {
      const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${locationData.latitude}&lon=${locationData.longitude}&units=${unit}&appid=${apiKey}`
      // ToastAndroid.show(weatherUrl, ToastAndroid.SHORT)

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

  useEffect(() => {
    getLocation()
    getUnitStorage()
    getThemeStorage()
    return () => { 'cleaning' }
    // console.log('ran')
  }, [])

  //set states if data has been gathered, or if
  //selected location has been changed
  useEffect(() => {
    setStates(locationData)
    // setStatusBar("light")
    return () => { 'cleaning' }
  }, [hasData, locationData, unit])

  useEffect(() => {
    setUnitStorage()
    // console.log(unit)
  }, [unit])

  useEffect(() => {
    setThemeStorage()
    // console.log(unit)
  }, [theme])


  //wait for fonts and data to be fetched
  if (!fontsLoaded || !loaded) {
    return (
    <View style={styles.loading}>
      <Ionicons name="sunny" size={64} color={theme.text}/>
    </View>
    )
  }

  //return main app
  else {
    return (
      <SafeAreaView style={{...styles.container, backgroundColor: theme.background}}>
        <StatusBar style={theme.statusBar}/>

        {/* gradient that sits near bottom of screen */}
        <LinearGradient style={styles.bgGradient} colors={['transparent', theme.background]}/>


        {/* if user is currently searching for a city, this will be rendered */}
        {isSearching &&
          <View style={{height: '100%'}}>
            <Search
              textColor={theme.text}
              widgetColor={theme.widget}
              font={font}
              background={theme.background}
              setLocationData={setLocationData}

              isSearching={isSearching}
              setIsSearching={setIsSearching}

            />
          </View>
        }

        {isSetting &&
        <View style={{height: '100%'}}>

          <Settings
          textColor={theme.text}
          widgetColor={theme.widget}
          font={font}
          background={theme.background}
          setLocationData={setLocationData}

          isSetting={isSetting}
          setIsSetting={setIsSetting}

          unit={unit}
          setUnit={setUnit}

          darkTheme={darkTheme}
          lightTheme={lightTheme}
          theme={theme}
          setTheme={setTheme}
          />

        </View>
        }


        {/* if user is currently neither searching not in settings
        return main screen*/}
        {(!isSearching && !isSetting) &&
        <View style={{height: '100%'}}>
          <Header
          textColor={theme.text}
          background={theme.background}
          font={font}
          title={'Climatch'}
          
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          isSetting={isSetting}
          setIsSetting={setIsSetting}

          setLocationData={setLocationData}
          initialLocationData={initialLocationData}

          iconName='sunny'
          />
          
          <ScrollView style={styles.mainView} contentContainerStyle={{ marginBottom: -(Math.round(Dimensions.get('window').height)*0.5) }}>

            <WeatherWidget
              cityName={weatherData.cityName}
              temp={weatherData.temp}
              weather={weatherData.weather}
              widgetColor={theme.widget}
              font={font}
              textColor={theme.text}
              weatherDescription={weatherData.description}
              unit={unit}
            />


            {hasData &&
              <MapWidget
              widgetColor={theme.widget}
              textColor={theme.text}
              latitude={locationData.latitude}
              longitude={locationData.longitude}
              mapType='terrain'
              />
            }
            
            <WindWidget
              font={font}
              widgetColor={theme.widget}
              textColor={theme.text}
              speed = {weatherData.speed}
              deg = {weatherData.deg}
            />

            <ExtrasWidget
              humidity={weatherData.humidity}
              min={weatherData.min}
              max={weatherData.max}
              feelsLike={weatherData.feelsLike}
              font={font}
              widgetColor={theme.widget}
              textColor={theme.text}
            />

            {hasData &&
              <MapWidget
                widgetColor={theme.widget}
                textColor={theme.text}
                latitude={locationData.latitude}
                longitude={locationData.longitude}
                mapType='hybrid'
              />
            }
          </ScrollView>
          </View>
        }

      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    height: Math.round(Dimensions.get('window').height)+3,
    minHeight: Math.round(Dimensions.get('window').height),
    top: -1,
  },
  bgGradient: {
    height: '5%',
    margin: '-5%',
    zIndex: 2,
    top: '98%',
    left: '0%',
  },
  mainView: {
    overflow: 'visible',
    height: '100%',
    paddingHorizontal: '3%',
    // marginBottom: '10%',
  },
  loading: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },

});
