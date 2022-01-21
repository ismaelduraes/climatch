import { useRef, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import Animations from './Animations/Animations';
import MapView, { Marker } from 'react-native-maps';

function MapWidget(props){

    const anim = useRef(new Animated.Value(100)).current
    useEffect(() => {
        Animations(anim, props.animDelay)
    }, [])

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            height: '23%',
            overflow: 'hidden',
            marginVertical: 5,
            width: '100%',
            transform: [{translateY: anim}]
        },
        map: {
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flex: 1
        }

    })

    return (
        <Animated.View style={styles.container}>
            <MapView style={styles.map}
            region={
                {
                    latitude: props.latitude,
                    longitude: props.longitude,
                    latitudeDelta: props.delta,
                    longitudeDelta: props.delta
                }
            }
            mapType={props.mapType}
            userLocationPriority="passive"
            zoomEnabled={false}
            scrollEnabled={false}
            />
        </Animated.View>
    )
}

export default MapWidget
