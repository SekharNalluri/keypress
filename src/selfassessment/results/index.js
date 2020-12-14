import React from "react";
import {
    View, Text, StyleSheet
} from "react-native";
import { SvgUri } from 'react-native-svg';
import NextPreviousButtons from "../nextpreviousbutton/nextpreviousbutton";
import Line from '../common/line'


export default (props) => {
    const { navigation } = props;

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <Line />
                    <Text style={styles.text}>We’re about to share the{'\n'}summary of your results.</Text>
                </View>
                <View style={styles.svgView}>
                    <SvgUri
                        width={800}
                        height={400}
                        style={styles.svg}
                        uri="https://onlinehearingtestwepapp.azurewebsites.net/Assets/Images/illustration-laptop.svg"
                    />
                </View>

                <Text style={styles.clickText}>
                    Please click next.
                </Text>

                <NextPreviousButtons
                    enableButton={true}
                    onPreviousPress={() => {
                        navigation.navigate('HearingTest')
                    }}
                    onNextPress={() => {
                        navigation.navigate('Login')
                    }} />
            </View >
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        width: '100%',
        paddingHorizontal: 20
    },
    innerContainer: {
        flex: 0.95,
        width: '100%',
        marginTop: 80,
        paddingHorizontal: 20
    },
    text: {
        fontFamily: 'ModernEra-Black',
        fontSize: 25, marginTop: 20,
        marginBottom: 20
    },
    svgView: {
        alignContent: 'center'
    },
    svg: {
        left: -150
    },
    clickText: {
        fontFamily: 'ModernEra-Black',
        fontSize: 20,
        alignSelf: 'center'
    }
});

