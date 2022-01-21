import { useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native';
import Animations from './Animations/Animations';

import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


function WindWidget(props) {

  const anim = useRef(new Animated.Value(100)).current
  useEffect(() => {
      Animations(anim, 200)
  }, [])



  const font = props.font

  const styles = StyleSheet.create({
      windContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          padding: '3%',
          backgroundColor: props.widgetColor,
          borderRadius: 20,
          marginVertical: 5,
          flexDirection: 'row',
          width: '100%',
          transform: [{translateY: anim}]
        },
        item: {
          alignItems: 'center',
          marginHorizontal: '10%'
        },
        labels: {
          color: props.textColor,
          fontSize: 12,
          fontFamily: font.regular,
          marginTop: 3
        },
        icon: {
          marginBottom: 5
        }
  })

  return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        
      <Animated.View style={styles.windContainer}>
          <View style={styles.item}>
            <Feather style={styles.icon} name="wind" size={24} color={props.textColor} />
            <Text style={styles.labels}>{props.speed} </Text>
            <Text style={styles.labels}>Wind Speed</Text>
          </View>
          <View style={styles.item}>
          <MaterialCommunityIcons style={styles.icon} name="angle-acute" size={24} color={props.textColor} />
            <Text style={styles.labels}>{props.deg}</Text>
            <Text style={styles.labels}>Degrees</Text>
          </View>
      </Animated.View>

    </View>
  )
}

export default WindWidget