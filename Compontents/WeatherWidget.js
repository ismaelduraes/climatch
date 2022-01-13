import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';

import { Ionicons } from '@expo/vector-icons';


// import App from '../App';

let colors = {}
let font = {}
export default function WeatherWidget(props){

    font = props.font
    
    const styles = StyleSheet.create({
        weatherContainer: {
            // height: 'fi',
            justifyContent: 'center',
            backgroundColor: props.widgetColor,
            alignItems: 'center',
            padding: '10%',
            borderRadius: 20,
            margin: '3%',
            marginVertical: 5,
            // borderWidth: 3,
            borderColor: 'yellow',
            elevation: 15,
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
            <Text style={styles.weatherMeasurement}>{props.temp}ºC</Text>
            </View>
      </View>
    )
    
}