import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, KeyboardAvoidingView, Dimensions, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import * as Location from 'expo-location';

import { useFonts } from 'expo-font'

import axios from 'axios';

import WeatherWidget from './Compontents/WeatherWidget';
import ExtrasWidget from './Compontents/ExtrasWidget';
import SearchBar from './Compontents/SearchBar';
import MapWidget from './Compontents/MapWidget';

//exporting colors so i can put them into other
//files and keep them in sync at the same time


const colors = {

  accent: 'black',
  text: 'black',
  widget: 'white',
  lightgray: '#ededed'

}

const font = {

  regular: 'Atkinson-Hyperlegible',
  bold: 'Atkinson-Hyperlegible-Bold'

}


export default function App() {

  const [hasData, setHasData] = useState(false)
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [cityName, setCityName] = useState('Gathering Location Data...')
  const [weather, setWeather] = useState('')
  const [temp, setTemp] = useState('')
  const [humidity, setHumidity] = useState('')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [feelsLike, setFeelsLike] = useState('')

  async function getLocation(){
    // console.log('test')
    let { status } = await Location.requestForegroundPermissionsAsync();

    if(status !== 'granted'){
      console.log('access to location denied')
      return
    }


    let locationData = await Location.getCurrentPositionAsync({})
    setLatitude(locationData.coords.latitude)
    console.log('set latitude to',latitude)
    setLongitude(locationData.coords.longitude)
    console.log('set longitude to',longitude)

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=0a21796140651dbcdc8855e2c91ea0ca`
    console.log(`sending ${url}`)

    axios.get(url).then(res => {
      console.log('\n\n\n')
      console.log(res.data)

      setCityName(res.data.name)
      setTemp(res.data.main.temp)
      setMin(res.data.main.temp_min)
      setMax(res.data.main.temp_max)
      setFeelsLike(res.data.main.feels_like)
      setHumidity(res.data.main.humidity)
      setWeather(res.data.weather[0].main)
      setHasData(true)
      
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    getLocation()
  }, [])

  let [fontsLoaded] = useFonts({
    'Atkinson-Hyperlegible': require('./assets/fonts/AtkinsonHyperlegible.ttf'),
    'Atkinson-Hyperlegible-Bold': require('./assets/fonts/AtkinsonHyperlegible-Bold.ttf')
  });

  if (!fontsLoaded){
    return <AppLoading/>
  }
  else
  {
    return (

      <SafeAreaView style={styles.container}>
        

        {/* <Image style={styles.bgImg} source={require('./assets/images/clear_bg.jpg')}/> */}
        <LinearGradient style={styles.bgGradient} colors={['transparent', 'transparent', colors.widget]}/>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>climatch</Text>
          <Ionicons name="settings-outline" size={24} color={colors.accent}/>
        </View>
        
        <ScrollView style={styles.mainView}>
          <SearchBar
          textColor = {colors.text}
          widgetColor = {colors.widget}
          font = {font}
          />

          <WeatherWidget
          cityName = {cityName}
          temp = {temp}
          weather = {weather}
          widgetColor = {colors.widget}
          font = {font}
          textColor = {colors.text}
          />
          
          {hasData &&
          <MapWidget
          widgetColor = {colors.widget}
          textColor = {colors.text}
          latitude = {latitude}
          longitude = {longitude}
          mapType = 'terrain'
          />
          }

          <ExtrasWidget
          humidity = {humidity}
          min = {min}
          max = {max}
          feelsLike = {feelsLike}
          font = {font}
          widgetColor = {colors.widget}
          textColor = {colors.text}
          />

        </ScrollView>

        <StatusBar style="auto" />

      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.lightgray,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal: '3%',
    // paddingVertical: '15%',
    height: '100%',
    minHeight: Math.round(Dimensions.get('window').height)
  },
  bgImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -2,
    opacity: 0.2,
  },
  bgGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1
  },
  header: {
    // backgroundColor: accent,
    paddingBottom: '5%',
    // flex: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    // borderRadius: 15,
    // elevation: 10,
    // marginBottom: 0,
    marginTop: '10%',
    flexDirection: 'row',
  },
  headerTitle: {
    fontFamily: font.bold,
    fontSize: 30,
    color: colors.accent
    // fontWeight: 'bold',
  },
  mainView: {
    overflow: 'hidden',
  },

});
