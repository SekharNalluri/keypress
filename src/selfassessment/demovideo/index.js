import React, { Component } from "react";
import {
    View, Text, TouchableOpacity, ScrollView
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import YouTube from 'react-native-youtube';
import styles from "./styles";
import NextPreviousButtons from "../nextpreviousbutton/nextpreviousbutton";
import Sound from 'react-native-sound';
import Pause from 'react-native-vector-icons/FontAwesome5'


export default class DemoVideo extends Component {
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
            audioIsPlaying: false,
            testedAndVerified: false,
            buttonEnabled: false,
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
    getMp3FolderFile() {
        var F = 'https://proled.soundbenefits.com/Assets/Audio/' + 'Alpaca_SP_calibrated.mp3'
        return F
    }

    playFile() {
        this.setState({ audioIsPlaying: true, buttonEnabled: true }, () => {
            this.sound = new Sound(this.getMp3FolderFile(), null, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                } else {

                }
                this.sound.setNumberOfLoops(-1);
                this.sound.play((success, e) => {
                    if (success) {

                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors', e);
                    }
                });
            });
        })

    }

    pauseorStopPlayer = () => {
        this.setState({ audioIsPlaying: false }, () => {
            if (this.sound) {
                this.sound.stop(() => {
                    this.sound.release();
                });
            }
        })
    }

    playSound = () => {
        if (this.state.audioIsPlaying == false) {
            this.playFile()
        } else if (this.state.audioIsPlaying == true) {
            if (this.sound) {
                this.sound.stop(() => {
                    this.sound.release();
                });

            }
        }
    };



    render() {
        const { navigation } = this.props;
        const { audioIsPlaying, testedAndVerified } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff', flexDirection: 'row' }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 150 }} style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', marginTop: 80 }}>
                        <View style={{ width: 100, height: 8, backgroundColor: '#105BE3', borderRadius: 10 }}></View>
                        <View style={{ width: 30, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10 }}></View>
                    </View>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 25, marginTop: 10, marginBottom: 20 }}>Now, let’s calibrate your volume.</Text>
                    <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 18, marginTop: 10, marginBottom: 20, color: '#001B39' }}>
                        Step 1: Without your headphones on, rub your hands together, quickly and firmly, directly in front of your nose as shown in the video to the right.
                    </Text>
                    <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 18, marginTop: 10, marginBottom: 20, color: '#001B39' }}>
                        Step 2: Then, put your headphones on. Press the “Play sound <Icon name={'play'} size={15} />” button.
                    </Text>
                    <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 18, marginTop: 10, marginBottom: 20, color: '#001B39' }}>
                        Step 3: Adjust your computer’s volume up or down so that the level of the two sounds (the computer sound through your headphones and your hands swishing with no headphones on) is the same.
                    </Text>
                    <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 18, marginTop: 10, marginBottom: 20, color: '#001B39' }}>
                        Repeat steps 1-3 until the sounds levels match. Once matched, do not change your volume for the remainder of the hearing assessment.
                    </Text>
                    <LinearGradient colors={['#ED3D68', '#ED3A4E', '#ED3D39', '#EE5235']}
                        style={{ width: '95%', borderRadius: 30, elevation: 3, paddingVertical: 20, paddingHorizontal: 10 }}>
                        <SvgUri
                            width={700}
                            height={700}
                            style={{
                                alignSelf: 'center', position: 'absolute', top: 0,
                                left: -16,
                                right: 0,
                                bottom: 0,
                            }}
                            uri="https://onlinehearingtestwepapp.azurewebsites.net/Assets/Images/soundwave.svg"
                        />
                        <YouTube
                            videoId="GE-xgojlIN8"
                            style={{ alignSelf: 'stretch', height: 200, marginTop: 100 }}
                        />
                        <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 23, marginTop: 10, marginBottom: 20, color: '#ffffff', alignSelf: 'center', textAlign: 'center' }}>
                            This video demonstrates the {'\n'}proper technique for{'\n'}calibrating your volume
                        </Text>


                        {/* {testedAndVerified == false ? (<TouchableOpacity
                                style={{
                                    width: '50%',
                                    height: 60,
                                    backgroundColor: '#6288EB',
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    marginTop: 10
                                }}
                                onPress={() => {  }}
                            ><Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 18, textAlign: 'center', color: '#ffffff' }}>Next<Pause name={'pause-circle'} size={18} color="#fff" /></Text>
                            </TouchableOpacity>) : (<View> */}





                        {audioIsPlaying ? (<TouchableOpacity
                            style={{
                                width: '50%',
                                height: 60,
                                backgroundColor: '#021931',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginTop: 10
                            }}
                            onPress={() => { this.pauseorStopPlayer() }}
                        ><Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 18, textAlign: 'center', color: '#ffffff' }}>Pause Sound <Pause name={'pause-circle'} size={18} color="#fff" /></Text>
                        </TouchableOpacity>) : (<TouchableOpacity
                            style={{
                                width: '50%',
                                height: 60,
                                backgroundColor: '#021931',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginTop: 10
                            }}
                            onPress={() => { this.playSound() }}
                        ><Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 18, textAlign: 'center', color: '#ffffff' }}>Play Sound <Icon name={'play'} size={18} color="#fff" /></Text>
                        </TouchableOpacity>)}
                    </LinearGradient>
                </ScrollView>
                <NextPreviousButtons
                    enableButton={this.state.buttonEnabled}
                    onPreviousPress={() => {

                        setTimeout(() => {
                            this.pauseorStopPlayer()
                        }, 500);

                        setTimeout(() => {
                            navigation.navigate('TestHeadphones')
                        }, 700);

                    }}
                    onNextPress={() => {

                        setTimeout(() => {
                            this.pauseorStopPlayer()
                        }, 500);

                        setTimeout(() => {
                            navigation.navigate('BestEar')
                        }, 700);


                    }} />

            </View >
        );
    }
}