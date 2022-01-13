import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


function SearchBar(props){

    const font = props.font

    const styles = StyleSheet.create({

        searchBar: {
            backgroundColor: props.widgetColor,
            // borderWidth: 1,
            // borderColor: accent,
            borderRadius: 20,
            marginHorizontal: '3%',
            marginVertical: 5,
            height: '8%',
            alignItems: 'center',
            paddingHorizontal: '3%',
            flexDirection: 'row',
            elevation: 15,
            marginTop: '5%',

          },
          searchBarInput: {
            marginHorizontal: '3%',
            width: '100%',
            fontFamily: font.regular,
          },


    })

    return (
        <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={props.textColor} />
        <TextInput
        style={styles.searchBarInput}
        placeholder="Search for any city"
        placeholderTextColor= {props.textColor}
        />
      </View>
    )
}

export default SearchBar
