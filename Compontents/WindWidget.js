import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


function WindWidget(props) {
    
    const font = props.font

    const styles = StyleSheet.create({
        windContainer: {
            // height: 'fi',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '3%',
            backgroundColor: props.widgetColor,
            borderRadius: 20,
            // margin: '3%',
            marginVertical: 5,
            // borderWidth: 3,
            // borderColor: accent,
            flexDirection: 'row',
            // elevation: 15,
            // borderRadius: 10,
            // opacity: 0.9
            width: '100%',
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
          
        <View style={styles.windContainer}>
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
        </View>
  
      </View>
    )
}

export default WindWidget