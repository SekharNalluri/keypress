import React, { Component } from "react";
import {
    View, Text, Image, TouchableOpacity, ImageBackground, ScrollView
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from "./styles";
import EarView from './earsview'
import NextPreviousButtons from "../nextpreviousbutton/nextpreviousbutton";
import Sound from 'react-native-sound';
import Pause from 'react-native-vector-icons/FontAwesome5'

export default class TestHeadphones extends Component {
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
            paragraphA: [
                'A quiet environment. Avoid sitting near an air conditioning vent or open window if outside sounds may distract you. Turn off all programs on your device that may play notifications.',
                'Working headphones; they can be wired or wireless, as long as they work in both ears',
                'At least 10 minutes to take the test.'
            ],
            channel: 'left',
            leftChannel: null,
            rightChannel: null,
            audioIsPlaying: false,
            audioPlayer: null,
            audioWasPlayed: false,
            showValidationMsg: false,
            readyToReDirect: false,
            soundTestCompleted: false,
            index: 0,
            storeTappedButton: '',

        };
    }

    componentDidMount() {
    }
    componentWillUnmount() {
    }
    getMp3FolderFile(channel) {
        const { index } = this.state;
        var F = ''
        if (channel == 'left') {
            F = 'https://proled.soundbenefits.com/Assets/Audio/' + 'Alpaca_SP_calibrated_L.mp3'
            this.setState({ channel: 'right' })
        } else if (channel == 'right') {
            F = 'https://proled.soundbenefits.com/Assets/Audio/' + 'Alpaca_SP_calibrated_R.mp3'
            this.setState({ channel: 'both' })
        } else if (channel == 'both') {
            F = 'https://proled.soundbenefits.com/Assets/Audio/' + 'Alpaca_SP_calibrated.mp3'
        }
        return F
    }

    playFile() {
        this.setState({ audioIsPlaying: true, soundtestVerified: true, showValidationMsg: false }, () => {
            console.log('My Playing sound file ==>  ' + this.getMp3FolderFile(this.state.channel));

            this.sound = new Sound(this.getMp3FolderFile(this.state.channel), null, (error) => {
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
        const { audioIsPlaying, index } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff', flexDirection: 'row' }}>
                <ScrollView>
                    <View style={{ flex: 1, marginVertical: 150, width: '100%', alignContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', margin: 20 }}>
                            <View style={{ width: 100, height: 8, backgroundColor: '#105BE3', borderRadius: 10 }}></View>
                            <View style={{ width: 30, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10 }}></View>
                        </View>

                        {index == 1 || index == 2 ? (<View style={{ padding: 10 }}>
                            <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 30, marginTop: 10, marginBottom: 20, margin: 20 }}>
                                Great, let’s test those headphones one more time.
                            </Text>
                            <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 18, marginTop: 0, marginBottom: 20, margin: 20 }}>
                                Put your headphones on, and click/tap the “Play sound  <Icon name={'play'} size={18} />
                            ” button when you’re ready. Then select which ear(s) hear the sound. You can play the sound more than once if you need to. Then click the “Next” button.
                            </Text>
                        </View>) : (<View style={{ padding: 10 }}>
                            <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 30, marginTop: 10, marginBottom: 20, margin: 20 }}>
                                First, let’s test your{'\n'}headphones.
                            </Text>
                            <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 18, marginTop: 0, marginBottom: 20, margin: 20 }}>
                                Put your headphones on, and click/tap the “Play sound <Icon name={'play'} size={18} />” button when you’re ready. Then select which ear(s) hear the sound. You can play the sound more than once if you need to. Then click the “Next” button.
                            </Text>
                        </View>)}

                        <LinearGradient colors={['#ED3D68', '#ED3A4E', '#ED3D39', '#EE5235']}
                            style={{ width: '90%', borderRadius: 20, elevation: 3, height: 500, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <SvgUri
                                width={700}
                                height={400}
                                style={{
                                    alignSelf: 'center', position: 'absolute', top: 0,
                                    left: -16,
                                    right: 0,
                                    bottom: 0,
                                }}
                                uri="https://onlinehearingtestwepapp.azurewebsites.net/Assets/Images/soundwave.svg"
                            />

                            {this.state.showValidationMsg ? (<Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 20, marginTop: 10, marginBottom: 20, margin: 10, color: 'black', alignSelf: 'center', textAlign: 'center' }}>
                                * Please play sound before continuing.
                            </Text>) : (null)}

                            <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 20, marginTop: 10, marginBottom: 20, margin: 10, color: 'white', alignSelf: 'center', textAlign: 'center' }}>
                                Select which ear(s) you hear{'\n'}best with
                           </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                <EarView selected={this.state.selected == 'left'} type='left' onPress={() => {

                                    this.setState({ storeTappedButton: 'left' }, () => {
                                        if (this.state.audioIsPlaying) {
                                            this.setState({ audioIsPlaying: false }, () => {
                                                this.pauseorStopPlayer()
                                                if (index == 0) {
                                                    this.setState({ index: 1 }, () => {
                                                    })
                                                } else if (index == 1) {
                                                    this.setState({ index: 2 }, () => {
                                                    })
                                                } else if (index == 2) {
                                                }
                                            })
                                        } else {
                                            this.setState({ showValidationMsg: true })

                                        }
                                    })

                                }} />
                                <EarView selected={this.state.selected == 'both'} type='both' onPress={() => {

                                    this.setState({ storeTappedButton: 'both' }, () => {
                                        if (this.state.audioIsPlaying) {
                                            this.setState({ audioIsPlaying: false }, () => {
                                                this.pauseorStopPlayer()
                                                if (index == 0) {
                                                    this.setState({ index: 1 }, () => {
                                                    })
                                                } else if (index == 1) {
                                                    this.setState({ index: 2 }, () => {
                                                    })
                                                } else if (index == 2) {

                                                }
                                            })
                                        } else {
                                            this.setState({ showValidationMsg: true })

                                        }
                                    })

                                }} />
                                <EarView selected={this.state.selected == 'right'} type='right' onPress={() => {

                                    this.setState({ storeTappedButton: 'right' }, () => {
                                        if (this.state.audioIsPlaying) {
                                            this.setState({ audioIsPlaying: false }, () => {
                                                this.pauseorStopPlayer()

                                                if (index == 0) {
                                                    this.setState({ index: 1 }, () => {
                                                    })
                                                } else if (index == 1) {
                                                    this.setState({ index: 2 }, () => {
                                                    })
                                                } else if (index == 2) {
                                                }
                                            })
                                        } else {
                                            this.setState({ showValidationMsg: true })

                                        }
                                    })

                                }} />
                            </View>



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
                                onPress={() => {
                                    this.pauseorStopPlayer()
                                    if (index == 0) {
                                        this.setState({ index: 1 }, () => {
                                            // this.playSound()
                                        })
                                    } else if (index == 1) {
                                        this.setState({ index: 2 }, () => {
                                            //this.playSound()
                                        })
                                    } else if (index == 2) {
                                    }
                                }}
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
                                onPress={() => {
                                    this.setState({ showValidationMsg: false })
                                    if (this.state.index == 2) {
                                        this.setState({ selected: this.state.storeTappedButton }, () => {
                                            this.playSound()
                                        })
                                    } else {
                                        this.playSound()
                                    }
                                }}
                            ><Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 18, textAlign: 'center', color: '#ffffff' }}>Play Sound <Icon name={'play'} size={18} color="#fff" /></Text>
                            </TouchableOpacity>)}


                        </LinearGradient>
                    </View>
                </ScrollView>

                <NextPreviousButtons
                    enableButton={this.state.index == 2 ? true : false}
                    onPreviousPress={() => {
                        navigation.navigate('SelfAssesment')
                    }}
                    onNextPress={() => {
                        navigation.navigate('DemoVideo')
                    }} />
            </View >
        );
    }
}