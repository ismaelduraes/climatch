import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';


function ExtrasWidget(props) {
    
    const font = props.font

    const styles = StyleSheet.create({
        container: {
            // height: 'fi',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '6%',
            backgroundColor: props.widgetColor,
            borderRadius: 20,
            // margin: '3%',
            marginVertical: 5,
            // borderWidth: 3,
            // borderColor: accent,
            flexDirection: 'row',
            // elevation: 3,
            // borderWidth: 1,
            // borderColor: 'lightgray',
            // borderRadius: 10,
            // opacity: 0.9
            width: '49%',
          },
          item: {
            alignItems: 'center',
            marginHorizontal: '10%'
          },
          labels: {
            color: props.textColor,
            fontSize: 12,
            fontFamily: font.regular,
            marginTop: -3
          },
    })

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          
        <View style={styles.container}>
            <View style={styles.item}>
              <Ionicons style={{marginBottom: 5}} name="ios-water-outline" size={24} color={props.textColor} />
              <Text style={styles.labels}>{props.humidity}% </Text>
              <Text style={styles.labels}>Humidity</Text>
            </View>
            <View style={styles.item}>
              <Ionicons style={{marginBottom: 5}} name="body-outline" size={24} color={props.textColor} />
              <Text style={styles.labels}>Feels like</Text>
              <Text style={styles.labels}>{props.feelsLike}</Text>
            </View>
        </View>

        <View style={styles.container}>
            <View style={styles.item}>
              <Ionicons style={{marginBottom: 5}} name="ios-arrow-up-circle-outline" size={24} color={props.textColor} />
              <Text style={styles.labels}>{props.min}</Text>
              <Text style={styles.labels}>Min.</Text>
            </View>
            <View style={styles.item}>
              <Ionicons style={{marginBottom: 5}} name="ios-arrow-down-circle-outline" size={24} color={props.textColor} />
              <Text style={styles.labels}>{props.max}</Text>
              <Text style={styles.labels}>Max.</Text>
            </View>
        </View>
  
      </View>
    )
}

export default ExtrasWidget