import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';

import { Ionicons } from '@expo/vector-icons';


function DailyWidget(props) {
    
    const font = props.font

    const styles = StyleSheet.create({
        extrasContainer: {
            // height: 'fi',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '6%',
            backgroundColor: props.widgetColor,
            borderRadius: 20,
            margin: '3%',
            marginVertical: 5,
            // borderWidth: 3,
            // borderColor: accent,
            flexDirection: 'row',
            elevation: 15,
            // borderRadius: 10,
            // opacity: 0.9
          },
          extrasItem: {
            alignItems: 'center',
            marginHorizontal: '2%'
          },
          extrasLabels: {
            color: props.textColor,
            fontSize: 12
          },
    })

    return (
        <View style={styles.extrasContainer}>
          
        <View style={styles.extrasItem}>
          <Ionicons name="ios-water-outline" size={24} color={props.textColor} />
          <Text style={styles.extrasLabels}>{props.humidity}</Text>
          <Text style={styles.extrasLabels}>Humidity</Text>
        </View>

        <View style={styles.extrasItem}>
          <Ionicons name="ios-arrow-up-circle-outline" size={24} color={props.textColor} />
          <Text style={styles.extrasLabels}>{props.min}</Text>
          <Text style={styles.extrasLabels}>Min.</Text>
        </View>

        <View style={styles.extrasItem}>
          <Ionicons name="ios-arrow-down-circle-outline" size={24} color={props.textColor} />
          <Text style={styles.extrasLabels}>{props.max}</Text>
          <Text style={styles.extrasLabels}>Max.</Text>
        </View>

        <View style={styles.extrasItem}>
          <Ionicons name="body-outline" size={24} color={props.textColor} />
          <Text style={styles.extrasLabels}>Feels like</Text>
          <Text style={styles.extrasLabels}>{props.feelsLike}</Text>
        </View>
  
      </View>
    )
}

export default DailyWidget