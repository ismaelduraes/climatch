import {Animated,  ScrollView, StyleSheet, Dimensions, Text, SafeAreaView } from 'react-native';
import { useRef, useEffect } from 'react';

import Header from '../Header';
import WeatherWidget from '../WeatherWidget'
import MapWidget from '../MapWidget'
import WindWidget from '../WindWidget'
import ExtrasWidget from '../ExtrasWidget'

import Animations from '../Animations/Animations';

export default function Home(props){
    const anim = useRef(new Animated.Value(100)).current

    useEffect(() => {
        Animations(anim, 0, 1000)
    })

    const styles = StyleSheet.create({
        container: {
            backgroundColor: props.background,
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
            transform: [{translateY: anim}]
        },
        header: {
            transform: [{translateY: anim}],
            zIndex: 1
        }
    });

    return(
        <SafeAreaView style = {{height: '100%'}}>
            <Animated.View style = {styles.header}>
            <Header
                textColor = {props.textColor}
                background = {props.background}
                font = {props.font}
                title = {'Climatch'}
                
                isSearching = {props.isSearching}
                setIsSearching = {props.setIsSearching}
                isSetting = {props.isSetting}
                setIsSetting = {props.setIsSetting}

                setLocationData = {props.setLocationData}
                locationData = {props.locationData}
                initialLocationData = {props.initialLocationData}
                
                iconName='sunny'
            />
            </Animated.View>

            <Animated.ScrollView overScrollMode='never' style = {styles.mainView} contentContainerStyle={{marginBottom: -Math.round(Dimensions.get('window').height)*0.7}}>

                <WeatherWidget
                    cityName = {props.weatherData.cityName}
                    temp = {props.weatherData.temp}
                    weather = {props.weatherData.weather}
                    widgetColor = {props.widgetColor}
                    font = {props.font}
                    textColor = {props.textColor}
                    weatherDescription = {props.weatherData.description}
                    unit = {props.unit}
                />

                <MapWidget
                    widgetColor = {props.widgetColor}
                    textColor = {props.textColor}
                    latitude = {props.locationData.latitude}
                    longitude = {props.locationData.longitude}
                    mapType='terrain'
                    animDelay={100}
                    delta={1}
                />

                <WindWidget
                    font = {props.font}
                    widgetColor = {props.widgetColor}
                    textColor = {props.textColor}
                    speed = {props.weatherData.speed}
                    deg = {props.weatherData.deg}
                />

                <ExtrasWidget
                    humidity = {props.weatherData.humidity}
                    min = {props.weatherData.min}
                    max = {props.weatherData.max}
                    feelsLike = {props.weatherData.feelsLike}
                    font = {props.font}
                    widgetColor = {props.widgetColor}
                    textColor = {props.textColor}
                />

                <MapWidget
                    widgetColor = {props.widgetColor}
                    textColor = {props.textColor}
                    latitude = {props.locationData.latitude}
                    longitude = {props.locationData.longitude}
                    mapType='standard'
                    animDelay={400}
                    delta={0.01}
                />
                <Text style={{textAlign: 'center', color: props.textColor, marginTop: 10, fontFamily: props.font.regular, opacity: 0.5}}>
                {`Designed and developed by Ismael Santos.\nWeather data provided by OpenWeather.`}
                </Text>
            </Animated.ScrollView>
        </SafeAreaView>
    )
}