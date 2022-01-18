import { StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';


// import App from '../App';

let colors = {}
let font = {}
export default function WeatherWidget(props){

    font = props.font

    //this just gets the first letter and replaces it with it's
    //upper case equivalent
    const formattedDescription = props.weatherDescription.replace(
        props.weatherDescription.charAt(0),
        props.weatherDescription.charAt(0).toUpperCase()
    )
    
    const styles = StyleSheet.create({
        weatherContainer: {
            // height: 'fi',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: props.widgetColor,
            alignItems: 'center',
            padding: '10%',
            borderRadius: 20,
            // margin: '3%',
            marginVertical: 5,
            // borderWidth: 3,
            // elevation: 3,
            // borderWidth: 1,
            // borderColor: 'lightgray',
            // borderRadius: 10,
            // opacity: 0.9
        },
        weatherTitle: {
        fontSize: 20,
        fontFamily: font.regular,
        color: props.textColor,
        // marginBottom: '15%'
        },
        weatherMeasurement: {
        fontSize: 40,
        fontFamily: font.regular,
        color: props.textColor
        },
    })

    
    return(
        <View style={styles.weatherContainer}>
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
      </View>
    )
    
}