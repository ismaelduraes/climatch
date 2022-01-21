import { useState, useRef, useEffect } from 'react';

import { Animated, StyleSheet, View, TextInput, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animations from '../Animations/Animations';

import axios from 'axios';
import Header from '../Header';

function Search(props){
    const [cities, setCities] = useState([])
    const [input, setInput] = useState('')

    const anim = useRef(new Animated.Value(100)).current

    useEffect(() => {
        Animations(anim, 0, 500)
        return null
    }, [])
    
    const font = props.font
    const styles = StyleSheet.create({
        container: {
            transform: [{translateY: anim}],
            height: '100%',
            backgroundColor: props.background,
            zIndex: 1,
        },
        searchBar: {
            backgroundColor: props.widgetColor,
            borderRadius: 20,
            marginHorizontal: '3%',
            height: '7%',
            alignItems: 'center',
            paddingHorizontal: '3%',
            flexDirection: 'row',
            marginBottom: '5%'
        },
        searchBarInput: {
            marginHorizontal: '3%',
            fontFamily: font.regular,
            color: props.textColor
        },
        resultItem: {
            borderColor: props.widgetColor,
            borderRadius: 20,
            padding: '3%',
            marginHorizontal: '3%',
            marginBottom: 5,
            fontFamily: font.regular,
        },
        noSearch: {
            fontSize: 30,
            color: 'gray',
            textAlign: 'center',
            fontFamily: font.regular,
            marginTop: '50%',
        }
    })


    //fetch cities by query
    async function getCities(query){
        if (!query) return
        const url = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix=${query}`
        console.log(`looking for ${query}`)

        axios.get(url).then(e => {
            setCities(e.data.data)
        }).catch(err => console.log(err))
    }



    return (
        <Animated.View style={styles.container}>

            <Header
            isSearching = {props.isSearching}
            setIsSearching = {props.setIsSearching}
            setLocationData = {props.setLocationData}
            isSetting={props.isSetting}
            setIsSetting={props.setIsSetting}

            textColor = {props.textColor}
            font = {font}
            background = {props.background}

            title='Search'
            iconName='search'
            />

            <View style={styles.searchBar}>
                <Ionicons name="search" size={24} color={props.textColor} />
                
                <TextInput
                style={styles.searchBarInput}
                placeholder="Search for any city"
                placeholderTextColor= {props.textColor}
                onChangeText={e => {
                    setInput(e)
                    getCities(e)
                }}
                />
            </View>

            <ScrollView>

                {input == '' && <Text style={styles.noSearch}>Look any city up...</Text>}
                {/* map results */}
                { input != '' && cities.map(city => {
                        return(
                            <TouchableHighlight
                                style={styles.resultItem}
                                onPress={() => {
                                    props.setLocationData({
                                        latitude: city.latitude,
                                        longitude: city.longitude
                                    })
                                    props.setIsSearching(false)
                                }}
                                activeOpacity={0.7}
                                underlayColor={props.background}>
                                <View>
                                    <Text style={{color: props.textColor, fontSize: 18}} key={cities.indexOf(city)}>{city.city}, {city.regionCode}</Text>
                                    <Text style={{color: props.textColor, fontSize: 12}} key={cities.indexOf(city) + city.city}>{city.country}</Text>
                                </View>
                            </TouchableHighlight>
                        )
                    })
                }
            </ScrollView>
        </Animated.View>
    )

}

export default Search
