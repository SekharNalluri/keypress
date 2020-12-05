import React, { Component } from "react";
import {
    View, Text, TouchableOpacity
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import EarView from './earsview'
import styles from "./styles";
import NextPreviousButtons from "../nextpreviousbutton/nextpreviousbutton";
import { ScrollView } from "react-native-gesture-handler";
import Cache from '../../config/index';


export default class BestEar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            welcomeScreen: true,
            testHeadPhones: false,
            calibrationVolume: false,
            dominantAir: false,
            hearingTest: false,
            result: false,
            selected: '',
            buttonEnable: false,
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

    setPrimaryEar = (ear) => {
        Cache.setData('MyPrimaryEar', ear)
    }

    componentWillUnmount() {
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff', flexDirection: 'row' }}>
                <ScrollView contentContainerStyle={{ padding: 10 }}>
                    <View style={{ flex: 1, paddingLeft: 10, marginVertical: 150, width: '100%', alignContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 100, height: 8, backgroundColor: '#105BE3', borderRadius: 10 }}></View>
                            <View style={{ width: 30, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10 }}></View>
                        </View>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 25, marginTop: 10, marginBottom: 20 }}>Which ear do you hear{'\n'}best with?</Text>

                        <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 20, marginTop: 10, marginBottom: 20, color: '#001B39' }}>
                            Hint: It’s typically the one you answer the phone with.
                    </Text>
                        <LinearGradient colors={['#ED3D68', '#ED3A4E', '#ED3D39', '#EE5235']}
                            style={{ width: '95%', borderRadius: 20, elevation: 3, paddingVertical: 20, paddingHorizontal: 10, overflow: 'hidden', height: 500, justifyContent: 'center', alignItems: 'center' }}>
                            <SvgUri
                                width={700}
                                height={600}
                                style={{
                                    alignSelf: 'center', position: 'absolute', top: 0,
                                    left: -16,
                                    right: 0,
                                    bottom: 0,
                                }}
                                uri="https://onlinehearingtestwepapp.azurewebsites.net/Assets/Images/soundwave.svg"
                            />
                            <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 23, marginTop: 30, marginBottom: 20, color: '#fff', textAlign: 'center' }}>
                                Select which ear you hear{'\n'}best with.
                        </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <EarView selected={this.state.selected == 'left'} type='left' onPress={() => this.setState({ selected: 'left', buttonEnable: true }, () => { this.setPrimaryEar('left') })} />
                                <EarView selected={this.state.selected == 'right'} type='right' onPress={() => this.setState({ selected: 'right', buttonEnable: true }, () => { this.setPrimaryEar('right') })} />
                            </View>



                        </LinearGradient>



                    </View>
                </ScrollView>

                <NextPreviousButtons
                    enableButton={this.state.buttonEnable}
                    onPreviousPress={() => {
                        navigation.navigate('DemoVideo')
                    }}
                    onNextPress={() => {

                        navigation.navigate('HearingTest')
                    }} />

            </View >
        );
    }
}