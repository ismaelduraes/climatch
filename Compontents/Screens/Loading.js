import { Animated, StyleSheet, StatusBar, View } from "react-native";
import { useRef, useEffect } from "react";
import Animations from "../Animations/Animations";
import { Ionicons } from "@expo/vector-icons";

export default function Loading(props){

    const anim = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animations(anim, 0, 1000, 1)
    }, [])

    const theme = props.theme
    const styles = StyleSheet.create({
        loading: {
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: 0,
            backgroundColor: theme.widget
        },
        icon: {
            transform: [{scale: anim}],
        }
    })
    return(
        <Animated.View style = {{...styles.loading, backgroundColor: theme.background}}>
            <StatusBar style = {theme.statusBar}/>
            <Animated.View style={styles.icon}>
                <Ionicons name="sunny" size = {64} color = {theme.text}/>
            </Animated.View>
        </Animated.View>
    )
}