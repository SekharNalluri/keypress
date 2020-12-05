import React, { Component } from "react";
import {
    View, Text, Image, TouchableOpacity, ImageBackground
} from "react-native";
import styles from './styles';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import NextPreviousButtons from "../nextpreviousbutton/nextpreviousbutton";



export default class SelfResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            welcomeScreen: true,
            testHeadPhones: false,
            calibrationVolume: false,
            dominantAir: false,
            hearingTest: false,
            result: false,
            selected: 'left',
            paragraphA: [
                'A quiet environment. Avoid sitting near an air conditioning vent or open window if outside sounds may distract you. Turn off all programs on your device that may play notifications.',
                'Working headphones; they can be wired or wireless, as long as they work in both ears',
                'At least 10 minutes to take the test.'
            ],
            LeftLables: [{ label: '01 Welcome' }, { label: '02 Test headphones' }, { label: '03 Calibrate volume' }, { label: '04 Dominant ear' }, { label: '05 Hearing test' }, { label: '06 Results' }]

        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff', flexDirection: 'row' }}>

                <View style={{ flex: 1, paddingLeft: 10, marginVertical: 100, width: '100%', alignContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 100, height: 8, backgroundColor: '#105BE3', borderRadius: 10 }}></View>
                        <View style={{ width: 30, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10 }}></View>
                    </View>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 25, marginTop: 20, marginBottom: 20 }}>We’re about to share the{'\n'}summary of your results.</Text>
                    <SvgUri
                        width={400}
                        height={300}
                        style={{
                            alignSelf: 'center',
                            marginLeft: 50
                        }}
                        uri="https://onlinehearingtestwepapp.azurewebsites.net/Assets/Images/illustration-laptop.svg"
                    />


                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, marginTop: 10, marginBottom: 20 }}>
                        Please click next.                    </Text>

                    <NextPreviousButtons
                        onPreviousPress={() => {
                            navigation.navigate('HearingTest')
                        }}
                        onNextPress={() => {
                            navigation.navigate('')
                        }} />
                </View>

            </View >
        );
    }
}