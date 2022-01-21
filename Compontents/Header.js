// import { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';


function Header(props){
    // console.log(props.setIsSearching)
    const font = props.font
    const styles = StyleSheet.create({
        header: {
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: '5%',
            paddingTop: '10%',
            paddingBottom: '5%',
            flexDirection: 'row',
            zIndex: 1,
            top: -1,
            height: Math.round(Dimensions.get('window').height)*0.15,
        },
        headerTitle: {
            fontFamily: font.bold,
            fontSize: 30,
            color: props.textColor
        },
        icon: {
            marginLeft: '15%'
        }
    })

    return (
        <LinearGradient colors = {[props.background, props.background, 'transparent']} style = {styles.header}>

            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons
                    style = {{marginRight: 10}}
                    name = {props.iconName}
                    size = {24}
                    color = {props.textColor}
                />

                <Text style = {styles.headerTitle}>
                    {props.title}
                </Text>
            </View>

            {(!props.isSearching && !props.isSetting) &&

                <View style = {{flexDirection: 'row', width: '35%', justifyContent: 'flex-end'}}>
                    {props.locationData !== props.initialLocationData && <Ionicons onPress = {() => props.setLocationData(props.initialLocationData)}
                        name="arrow-down" size = {26} color = {props.textColor}
                        style={styles.icon}/>}
                    <Ionicons onPress = {() => props.setIsSearching(true)}
                        name="search" size = {26} color = {props.textColor}
                        style={styles.icon}/>
                    <Ionicons onPress = {() => props.setIsSetting(true)}
                        name="settings-outline" size = {26} color = {props.textColor}
                        style={styles.icon}/>
                </View>

            }
            {props.isSearching && <Ionicons onPress = {() => props.setIsSearching(false)} name="close" size = {26} color = {props.textColor}/>}
            {props.isSetting && <Ionicons onPress = {() => props.setIsSetting(false)} name="close" size = {26} color = {props.textColor}/>}
            {/* <Ionicons name="settings-outline" size = {26} color = {props.textColor}/> */}
        </LinearGradient>
    )
}

export default Header
