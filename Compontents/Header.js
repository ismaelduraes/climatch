// import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
            {/* screen title */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* logo only renders on main screen */}
                <Ionicons style={{marginRight: 10}} name={props.iconName} size={24} color={props.textColor}/>

                <Text style={styles.headerTitle}>{props.title}</Text>

            </View>
                
            {(!props.isSearching && !props.isSetting) &&
                <View style={{flexDirection: 'row', width: '35%', justifyContent: 'space-between'}}>
                    <Ionicons onPress={() => props.setLocationData(props.initialLocationData)} name="location-outline" size={26} color={props.textColor}/>
                    <Ionicons onPress={() => props.setIsSearching(true)} name="search" size={26} color={props.textColor}/>
                    <Ionicons onPress={() => props.setIsSetting(true)} name="settings-outline" size={26} color={props.textColor}/>
                </View>
            }
            {props.isSearching && <Ionicons onPress={() => props.setIsSearching(false)} name="close" size={26} color={props.textColor}/>}
            {props.isSetting && <Ionicons onPress={() => props.setIsSetting(false)} name="close" size={26} color={props.textColor}/>}
            {/* <Ionicons name="settings-outline" size={26} color={props.textColor}/> */}
        </View>
    )
}

export default Header
