import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

function MapWidget(props){

    const latitude = props.latitude
    const longitude = props.longitude

    const styles = StyleSheet.create({
        container: {
            // padding: '3%',
            // flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            height: '30%',
            overflow: 'hidden',
            margin: '3%',
            marginVertical: 5,
            elevation: 15
        },
        map: {
            width: '100%',
            height: '100%',
        }

    })

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
            initialRegion={
                {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }
            }
            mapType={props.mapType}
            userLocationPriority="passive"
            zoomEnabled={false}
            scrollEnabled={false}
            />
        </View>
    )
}

export default MapWidget
