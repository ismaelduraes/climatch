import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';

import Header from '../Header';

export default function Settings(props){

    const font = props.font
    let selectedUnit;
    let selectedTheme;

    if(props.unit == 'Metric'){
        selectedUnit = 1;
    }
    else if(props.unit == 'Imperial'){
        selectedUnit = 2;
    }
    else if(props.unit == 'Kelvin'){
        selectedUnit = 3;
    }

    if(props.theme.name == 'dark'){
        selectedTheme = 1;
    }
    else{
        selectedTheme = 2;
    }

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
            label: 'Dark (default)',
            themeName: 'dark'
        },
        {
            label: 'Light',
            themeName: 'light'
        }
    ]

    const styles = StyleSheet.create({
        container: {
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
        listItem: {
            backgroundColor: props.widgetColor,
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
            marginTop: 20
        },
        radio: {
            backgroundColor: props.widgetColor,
            borderWidth: 0,
            borderRadius: 20,
            margin: 0
        },
        radioText: {
            fontFamily: font.regular,
            color: props.textColor
        }
    })

    return(
        <View style={styles.container}>
            <Header
            
            isSearching = {props.isSearching}
            setIsSearching = {props.setIsSearching}
            isSetting={props.isSetting}
            setIsSetting={props.setIsSetting}

            setLocationData = {props.setLocationData}
            textColor = {props.textColor}
            font = {font}
            background = {props.background}
            title='Settings'
            iconName={'settings-outline'}
            
            />
            <ScrollView style={{paddingHorizontal: '3%', height: '100%'}}>
                <View>
                    <Text style={styles.optionText}>Preferred unit:</Text>
                    <RadioButtonRN
                    data={metricOptions}
                    duration={0}
                    boxStyle={styles.radio}
                    textStyle={styles.radioText}
                    circleSize={12}
                    activeColor={props.textColor}
                    selectedBtn={e => {
                        //OpenWeather needs 'Default' as it's set unit to diplay Kelvin
                        props.setUnit(e.label)
                    }}
                    initial={selectedUnit}
                    />
                </View>
                <View>
                    <Text style={styles.optionText}>Theme</Text>
                    <RadioButtonRN
                    data={themeOptions}
                    duration={100}
                    boxStyle={styles.radio}
                    textStyle={styles.radioText}
                    circleSize={12}
                    activeColor={props.textColor}
                    initial={selectedTheme}
                    selectedBtn={e => {
                        if(e.themeName === 'dark'){
                            props.setTheme(props.darkTheme)
                        }else{
                            props.setTheme(props.lightTheme)
                        }
                    }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}