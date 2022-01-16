import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';


function Header(props){

    const font = props.font

    const styles = StyleSheet.create({
        header: {
            backgroundColor: props.background,
            // paddingBottom: '2%',
            // flex: 0,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: '5%',
            paddingTop: '10%',
            paddingBottom: '5%',
            // borderRadius: 15,
            // elevation: 10,
            // marginBottom: 0,
            // marginTop: '15%',
            flexDirection: 'row',
            zIndex: 1
          },
          headerTitle: {
            fontFamily: font.bold,
            fontSize: 30,
            color: props.textColor
            // fontWeight: 'bold',
          },

    })

    return (
        <View style={styles.header}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons style={{marginRight: 10}} name="sunny" size={24} color={props.textColor}/>
            <Text style={styles.headerTitle}>climatch</Text>
            </View>
  
            <View style={{flexDirection: 'row', width: '35%', justifyContent: 'space-between'}}>
            <Ionicons onPress={() => props.setLocationData(props.initialLocationData)} name="location-outline" size={26} color={props.textColor}/>
                
            {!props.isSearching &&
                <Ionicons onPress={() => props.setIsSearching(true)} name="search" size={26} color={props.textColor}/>
            }
            {props.isSearching &&
            <Ionicons onPress={() => props.setIsSearching(false)} name="close" size={26} color={props.textColor}/>
            }
    
            <Ionicons name="settings-outline" size={26} color={props.textColor}/>
            </View>
        </View>
    )
}

export default Header
