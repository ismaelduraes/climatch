import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

function MapWidget(props){

    const styles = StyleSheet.create({
        container: {
            // padding: '3%',
            // flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            height: '25%',
            overflow: 'hidden',
            // margin: '3%',
            marginVertical: 5,
            width: '100%',
            // elevation: 3
            // borderWidth: 1,
            // borderColor: 'lightgray',
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
        <View style={styles.container}>
            <MapView style={styles.map}
            region={
                {
                    latitude: props.latitude,
                    longitude: props.longitude,
                    latitudeDelta: 0.8,
                    longitudeDelta: 0.8
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
