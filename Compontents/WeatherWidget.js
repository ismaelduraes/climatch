import { useRef, useEffect } from 'react'
import Animations from './Animations/Animations';
import { StyleSheet, Text, View, Animated } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

let font = {}

export default function WeatherWidget(props){

    const anim = useRef(new Animated.Value(100)).current
    useEffect(() => {
        Animations(anim, 0)
    }, [])

    font = props.font

    //this just gets the first letter and replaces it with it's
    //upper case equivalent since openweather sends it
    //all lowercase
    const formattedDescription = props.weatherDescription.replace(
        props.weatherDescription.charAt(0),
        props.weatherDescription.charAt(0).toUpperCase()
    )
    
    const styles = StyleSheet.create({
        weatherContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: props.widgetColor,
            alignItems: 'center',
            padding: '10%',
            borderRadius: 20,
            marginVertical: 5,
            transform: [{translateY: anim}]
        },
        weatherTitle: {
        fontSize: 20,
        fontFamily: font.regular,
        color: props.textColor,
        },
        weatherMeasurement: {
        fontSize: 40,
        fontFamily: font.regular,
        color: props.textColor
        },
    })

    
    return(
        <Animated.View style={styles.weatherContainer}>
            <Text style={styles.weatherTitle}>{props.cityName}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {props.weather == 'Clouds' && <Ionicons name="md-cloud-outline" size={32} color={props.textColor} style={{marginHorizontal:'3%'}}/>}
            {props.weather == 'Mist' && <Ionicons name="water-outline" size={32} color={props.textColor} style={{marginHorizontal:'3%'}}/>}
            {props.weather == 'Clear' && <Ionicons name="sunny" size={32} color={props.textColor} style={{marginHorizontal:'3%'}}/>}
            {props.weather == 'Rain' && <Ionicons name="rainy" size={32} color={props.textColor} style={{marginHorizontal:'3%'}}/>}
            {props.unit === 'Metric' && <Text style={styles.weatherMeasurement}>{Math.round(props.temp)}ºC</Text>}
            {props.unit === 'Imperial' && <Text style={styles.weatherMeasurement}>{Math.round(props.temp)}ºF</Text>}
            {props.unit === 'Kelvin' && <Text style={styles.weatherMeasurement}>{Math.round(props.temp)}ºK</Text>}
            </View>
            <Text style={styles.weatherTitle}>{formattedDescription}</Text>
      </Animated.View>
    )
    
}