import { StyleSheet, Text, ToastAndroid, View, SafeAreaView, Dimensions, ScrollView, BackHandler } from 'react-native';
import { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font'

import axios from 'axios';

import Header from './Header';
import WeatherWidget from './Compontents/WeatherWidget';
import ExtrasWidget from './Compontents/ExtrasWidget';
import Search from './Compontents/Search';
import MapWidget from './Compontents/MapWidget';
import WindWidget from './Compontents/WindWidget';


//exporting colors so i can import them into other
//files and keep them all in sync at the same time

const colors = {

  accent: 'black',
  text: 'white',
  widget: '#1c1c1c',
  background: 'black'

}

const font = {

  regular: 'Atkinson-Hyperlegible',
  bold: 'Atkinson-Hyperlegible-Bold',

}


export default function App() {
  let [fontsLoaded] = useFonts({
    'Atkinson-Hyperlegible': require('./assets/fonts/AtkinsonHyperlegible.ttf'),
    'Atkinson-Hyperlegible-Bold': require('./assets/fonts/AtkinsonHyperlegible-Bold.ttf')
  });

  const [hasData, setHasData] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const [isSearching, setIsSearching] = useState(false)

  const [weatherData, setWeatherData] = useState({})
  const [locationData, setLocationData] = useState({})
  const [initialLocationData, setInitialLocationData] = useState({})
  const [statusBar, setStatusBar] = useState("dark")

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (isSearching) {
      setIsSearching(false)
    }
  })

  async function getLocation() {
    let location = {}
    if (!hasData) {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('access to location denied')
        ToastAndroid.show('Please allow Climatch to access your location', ToastAndroid.SHORT)
        return
      }

      location = await Location.getCurrentPositionAsync({})
      setInitialLocationData(location.coords)
      setLocationData(location.coords)
      setStates(location.coords)
    }
    setHasData(true)
  }


  function setStates(location) {
    if (hasData) {
      const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${locationData.latitude}&lon=${locationData.longitude}&units=metric&appid=0a21796140651dbcdc8855e2c91ea0ca`
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

        setStatusBar("light")
        setLoaded(true)

      }).catch(err => console.log(err))
    }

  }

  useEffect(() => {
    getLocation()
    return () => { 'cleaning' }
    // console.log('ran')
  }, [])

  //set states if data has been gathered, or if
  //selected location has been changed
  useEffect(() => {
    setStates(locationData)
    // setStatusBar("light")
    return () => { 'cleaning' }
  }, [hasData, locationData])

  if (!fontsLoaded || !loaded) {
    return <Text style={styles.loading}>Carregando</Text>
  }
  else {
    return (
      <SafeAreaView style={styles.container}>

        {/* <Image style={styles.bgImg} source={require('./assets/images/clear_bg.jpg')}/> */}
        <LinearGradient style={styles.bgGradient} colors={['transparent', colors.background]} />

        <Header
          textColor={colors.text}
          background={colors.background}
          font={font}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          setLocationData={setLocationData}
          initialLocationData={initialLocationData}
        />

        {isSearching &&
          <Search
            textColor={colors.text}
            widgetColor={colors.widget}
            font={font}
            background={colors.background}
            setLocationData={setLocationData}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />
        }

        {!isSearching &&
          <ScrollView style={styles.mainView} contentContainerStyle={{ marginBottom: '-50%' }}>

            <WeatherWidget
              cityName={weatherData.cityName}
              temp={weatherData.temp}
              weather={weatherData.weather}
              widgetColor={colors.widget}
              font={font}
              textColor={colors.text}
              weatherDescription={weatherData.description}
            />


            {hasData &&
              <MapWidget
              widgetColor={colors.widget}
              textColor={colors.text}
              latitude={locationData.latitude}
              longitude={locationData.longitude}
              mapType='terrain'
              />
            }
            
            <WindWidget
              font={font}
              widgetColor={colors.widget}
              textColor={colors.text}
              speed = {weatherData.speed}
              deg = {weatherData.deg}
            />

            <ExtrasWidget
              humidity={weatherData.humidity}
              min={weatherData.min}
              max={weatherData.max}
              feelsLike={weatherData.feelsLike}
              font={font}
              widgetColor={colors.widget}
              textColor={colors.text}
            />

            {hasData &&
              <MapWidget
                widgetColor={colors.widget}
                textColor={colors.text}
                latitude={locationData.latitude}
                longitude={locationData.longitude}
                mapType='hybrid'
              />
            }
          </ScrollView>
        }

        <StatusBar style={statusBar} />

      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    height: '100%',
    minHeight: Math.round(Dimensions.get('window').height),
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
    paddingHorizontal: '3%',
  },
  loading: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    lineHeight: Math.round(Dimensions.get('window').height),
    fontSize: 30
  },

});
