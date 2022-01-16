import { useState } from 'react';

import { StyleSheet, View, TextInput, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import axios from 'axios';
import Header from '../Header';

function Search(props){

    const [cities, setCities] = useState([])
    const [input, setInput] = useState('')
    let count = 0;

    function getCities(query){
        count += 1
        console.log('searching for', query, count)
        // new Promise(r => setTimeout(r, 500));
        if (!query) return
        const url = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix=${query}`

        axios.get(url).then(e => {
            console.log(e.data.data[0].city + '\n')
            setCities(e.data.data)
        })
    }

    const font = props.font

    const styles = StyleSheet.create({
        searchModal: {
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: props.background,
            top: '0%',
            left: '0%',
            zIndex: 1,
            // paddingTop: '15%',
            // paddingHorizontal: '3%',
            // borderRadius: 20,
            // elevation: 10,
            // margin: '3%'
        },
        searchBar: {
            backgroundColor: props.widgetColor,
            // borderWidth: 1,
            // borderColor: accent,
            borderRadius: 20,
            marginHorizontal: '3%',
            // marginVertical: 5,
            height: '7%',
            alignItems: 'center',
            paddingHorizontal: '3%',
            flexDirection: 'row',
            // elevation: 15,
            // marginTop: '5%',
            marginBottom: '5%'
        },
        searchBarInput: {
            marginHorizontal: '3%',
            width: '100%',
            fontFamily: font.regular,
            color: props.textColor
        },
        resultItem: {
            borderColor: props.widgetColor,
            // height: '10%',
            // width: '100%',
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

    return (
        <View style={styles.searchModal}>
            <Header
            
            isSearching = {props.isSearching}
            setIsSearching = {props.setIsSearching}
            setLocationData = {props.setLocationData}
            textColor = {props.textColor}
            font = {font}
            background = {props.background}
            
            />
            <View style={styles.searchBar}>
                <Ionicons name="search" size={24} color={props.textColor} />
                <TextInput
                style={styles.searchBarInput}
                placeholder="Search for any city"
                placeholderTextColor= {props.textColor}
                onChangeText={e => {
                    // waitCounter = 0;
                    // updateResults(e)
                    setInput(e)
                    getCities(e)
                }}
                />
            </View>
            <ScrollView>
                {input == '' && <Text style={styles.noSearch}>Look any city up...</Text>}

                
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
                            underlayColor="black"
                            >
                                <View>
                                    <Text style={{color: props.textColor, fontSize: 18}} key={city.wikiDataId}>{city.city}, {city.regionCode}</Text>
                                    <Text style={{color: props.textColor, fontSize: 12}} key={city.wikiDataId + city.city}>{city.country}</Text>
                                </View>
                            </TouchableHighlight>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default Search
