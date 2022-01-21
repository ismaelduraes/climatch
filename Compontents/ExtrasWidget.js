import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import Animations from './Animations/Animations';

import { Ionicons } from '@expo/vector-icons';


function ExtrasWidget(props) {
    
    const anim = useRef(new Animated.Value(100)).current
    useEffect(() => {
        Animations(anim, 300)
    }, [])

    const font = props.font

    const styles = StyleSheet.create({
        container: {
          transform: [{translateY: anim}],
          justifyContent: 'center',
          alignItems: 'center',
          padding: '6%',
          backgroundColor: props.widgetColor,
          borderRadius: 20,
          marginVertical: 5,
          flexDirection: 'row',
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
          
        <Animated.View style={styles.container}>
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
        </Animated.View>

        <Animated.View style={styles.container}>
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
        </Animated.View>
  
      </View>
    )
}

export default ExtrasWidget