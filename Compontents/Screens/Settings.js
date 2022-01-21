import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import { useRef, useEffect } from 'react';

import Animations from '../Animations/Animations';

import Header from '../Header';

export default function Settings(props){

    const anim = useRef(new Animated.Value(100)).current
    useEffect(() => {
        Animations(anim, 0, 500)
    })

    const font = props.font
    const theme = props.prefs.theme
    const unit = props.prefs.unit

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: props.background,
            top: '0%',
            left: '0%',
            zIndex: 1,
            transform: [{translateY: anim}]
        },
        listItem: {
            // backgroundColor: props.widgetColor,
            justifyContent: 'space-between',
            alignContent: 'center',
            flexDirection: 'row',
            borderRadius: 20,
            padding: '3%',
            marginHorizontal: '3%',
            marginBottom: 5,
        },
        optionText: {
            color: props.textColor,
            textAlignVertical: 'center',
            fontSize: 18,
            fontFamily: font.regular,
            marginTop: 10
        },
        radio: {
            backgroundColor: props.widgetColor,
            borderWidth: 0,
            borderRadius: 20,
            margin: 0,
        },
        radioText: {
            fontFamily: font.regular,
            color: props.textColor
        }
    })

    let selectedUnit;
    let selectedTheme;

    //set initial selected radio for unit
    if(unit == 'Metric'){
        selectedUnit = 1;
    }
    else if(unit == 'Imperial'){
        selectedUnit = 2;
    }
    else if(unit == 'Kelvin'){
        selectedUnit = 3;
    }

    //set initial selected radio for theme
    if(theme.name == 'light'){
        selectedTheme = 1;
    }
    else{
        selectedTheme = 2;
    }

    //set radio options
    const metricOptions = [
        {
            label: 'Metric'
        },
        {
            label: 'Imperial'
        },
        {
            label: 'Kelvin'
        }
    ]
    const themeOptions = [
        {
            label: 'Light (default)',
            themeName: 'light'
        },
        {
            label: 'Dark',
            themeName: 'dark'
        }
    ]

    return(
        <Animated.View style = {styles.container}>
            <Header   
                isSearching = {props.isSearching}
                setIsSearching = {props.setIsSearching}
                isSetting = {props.isSetting}
                setIsSetting = {props.setIsSetting}

                setLocationData = {props.setLocationData}
                textColor = {props.textColor}
                font = {font}
                background = {props.background}
                title='Settings'
                iconName = {'settings-outline'}
            />
            <ScrollView style = {{paddingHorizontal: '3%'}} contentContainerStyle={{paddingBottom: '20%'}}>

                <View>
                    <Text style = {styles.optionText}>
                        Preferred unit:
                    </Text>
                    <RadioButtonRN
                        data = {metricOptions}
                        duration = {0}
                        boxStyle = {styles.radio}
                        textStyle = {styles.radioText}
                        circleSize = {12}
                        activeColor = {props.textColor}
                        selectedBtn = {e => {
                            props.setPrefs({
                                unit: e.label,
                                theme: theme
                            })
                        }}
                        initial = {selectedUnit}
                    />
                </View>

                <View>
                    <Text style = {styles.optionText}>
                        Theme
                    </Text>
                    <RadioButtonRN
                        data = {themeOptions}
                        duration = {100}
                        boxStyle = {styles.radio}
                        textStyle = {styles.radioText}
                        circleSize = {12}
                        activeColor = {props.textColor}
                        initial = {selectedTheme}
                        selectedBtn = {e => 
                        {
                            if(e.themeName === 'dark'){
                                props.setPrefs({
                                    unit: unit,
                                    theme: props.darkTheme
                                })
                            }else{
                                props.setPrefs({
                                    unit: unit,
                                    theme: props.lightTheme
                                })
                            }
                        }}
                    />
                </View>
                <Text style={{color: props.textColor, opacity: 0.5, textAlign: 'left', fontFamily: font.regular, marginTop: 50, paddingHorizontal: '3%'}}>
{`Hey! this app is only meant to showcase what i can do in React Native.
This means I won't support it over the long term and i do not plan on expanding it much.

If you want, you can always fork it and make it your own. It's open-source on github!\n
\nOlá! O único propósito deste app é demonstrar o que eu posso fazer no React Native.
Isso significa que eu não pretendo mantê-lo atualizado no longo prazo, e também não planejo expandi-lo muito.
\nSe você quiser, sinta-se livre para criar um fork dele e transformar em algo seu. O código é aberto no GitHub!`}
                </Text>
            </ScrollView>
        </Animated.View>
    )
}