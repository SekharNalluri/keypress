import React, { useState, useEffect } from "react";
import {
    View, Text, Image, TouchableOpacity, ImageBackground
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NextPreviousButtons from "../nextpreviousbutton/nextpreviousbutton";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import Sound from 'react-native-sound';
import Cache from '../../config/index';
import Loader from '../../Loader/index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EndPoints } from '../../config/Connectors.js'


const HearingTest = ({ navigation, primaryEar, swapLeftRight, binaural, setPrimaryEar }) => {

    const config = {
        frequencies: [500, 1000, 2000, 4000, 8000],
        decibels: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
        toneDurations: [1, 1.5, 2],
        pauseDurations: [1, 2],
        startingFrequency: 500,
        startingVolume: 55,
        confirmationGoal: 2,
        volumeIncrement: 5,
        volumeDecrement: 10,
    };

    let timeout = setTimeout(() => { }, 100);
    const [state, setState] = useState('stopped');
    const [channel, setChannel] = useState(setPrimaryEar);
    const [volume, setVolume] = useState(null);
    const [frequency, setFrequency] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const [hearIt, setHearIt] = useState(false);
    const [confirmedCount, setConfirmedCount] = useState(0);
    const [confirmedVolume, setConfirmedVolume] = useState(null);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState([]);
    const [audioPlayer, setAudioPlayer] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setChannel(Cache.getData('MyPrimaryEar'))
    }, [channel]);

    useEffect(() => {
        step();
    }, [state]);

    useEffect(() => {
    }, [results]);

    useEffect(() => {
        if (confirmed) {
            setHearIt(true);
            setTimeout(() => {
                setHearIt(false);
            }, 500);
        }
    }, [confirmed]);

    useEffect(() => {
        const frequencyIndex = config.frequencies.indexOf(frequency);
        const frequencyCount = config.frequencies.length;

        if (binaural) {
            setProgress(frequencyIndex / frequencyCount);
        } else {
            if (channel === primaryEar) {
                setProgress(frequencyIndex / (frequencyCount * 2));
            } else {
                setProgress((frequencyIndex + frequencyCount) / (frequencyCount * 2));
            }
        }
    }, [frequency, binaural]);

    const handlePressPlay = (fromScratch) => {

        if (fromScratch) {
            setChannel(primaryEar);
            setVolume(config.startingVolume);
            setFrequency(config.startingFrequency);
            setResults([]);
            setProgress(0);
        }

        setConfirmed(false);
        setConfirmedVolume(null);
        setConfirmedCount(0);
        setState('playing');
    }

    const step = () => {

        var player = null

        if (state === 'playing') {
            let fileName = 'https://proled.soundbenefits.com/Assets/Audio/' + 'Alpaca_SP_' + frequency + '_' + volume + '_' + (channel === 'left' ? 'L' : 'R') + '.mp3';
            if (swapLeftRight) {
                fileName = 'https://proled.soundbenefits.com/Assets/Audio/' + 'Alpaca_SP_' + frequency + '_' + volume + '_' + channel === 'left' ? 'L' : 'R' + '.mp3';
            }
            if (binaural) {
                fileName = 'https://proled.soundbenefits.com/Assets/Audio/' + 'Alpaca_SP_' + frequency + '_' + volume + '.mp3';
            }

            console.log('fileName ==>' + fileName + '===' + channel + '===>' + progress);

            const audioPlayer = new Sound(fileName, null, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                } else {
                }
                audioPlayer.setNumberOfLoops(-1);
                setAudioPlayer(audioPlayer);
                audioPlayer.play((success, e) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors', e);
                    }
                });
            });
            const randomToneDurationIndex = Math.floor(Math.random() * config.toneDurations.length);
            const randomToneDuration = config.toneDurations[randomToneDurationIndex];
            setTimeout(() => {
                setState(prevState => (prevState === 'playing' ? 'waiting' : prevState));
            }, randomToneDuration * 1000);
        } else {
            if (audioPlayer) {
                audioPlayer.pause();
            }
        }

        if (state === 'waiting') {
            const randomPauseDurationIndex = Math.floor(Math.random() * config.pauseDurations.length);
            const randomPauseDuration = config.pauseDurations[randomPauseDurationIndex];
            setTimeout(() => {
                setState(prevState => (prevState === 'waiting' ? 'processing' : prevState));
            }, randomPauseDuration * 1000);
        }
        if (state === 'processing') {
            let progress = 0;
            if (confirmed) {
                const newConfirmedCount = confirmedVolume === volume ? confirmedCount + 1 : 1;
                setConfirmedCount(newConfirmedCount);
                setConfirmedVolume(volume);
                if (newConfirmedCount >= config.confirmationGoal || volume <= config.decibels[0]) {
                    // save the results
                    setResults([...results.filter((item, index) => !(item.channel === channel && item.x === frequency)), {
                        x: frequency,
                        y: volume,
                        channel: channel
                    }]);
                    if (config.frequencies.indexOf(frequency) === config.frequencies.length - 1) {

                        if (binaural || channel !== primaryEar) {
                            // if only assessing one channel, or if this is the second channel, stop the assessment
                            setState('completed');
                            setProgress(1);
                        } else {
                            // switch to the other channel
                            setChannel(channel === 'left' ? 'right' : 'left');
                            setFrequency(config.startingFrequency);
                            setVolume(config.startingVolume);
                            setConfirmedCount(0);
                            setConfirmedVolume(null);
                            setState('playing');
                        }
                    } else {
                        // increase the frequency and reset the confirmation counter
                        setFrequency(config.frequencies[config.frequencies.indexOf(frequency) + 1]);
                        setVolume(config.startingVolume);
                        setConfirmedCount(0);
                        setConfirmedVolume(null);
                        setState('playing');
                    }

                } else {
                    // patient has not confirmed enough times yet
                    // decrease the volume
                    setVolume(volume - config.volumeDecrement);
                    setState('playing');
                }
                setConfirmed(false);
            } else {
                // patient did not respond
                if (config.decibels.indexOf(volume) === config.decibels.length - 1) {
                    // if the volume is maxed out, stop the assessment
                    setState('cancelled');
                } else {
                    // increase the volume
                    setVolume(volume + config.volumeIncrement);
                    setState('playing');
                }
            }
        }
    }

    let next = () => {
        if (audioPlayer) {
            audioPlayer.pause();
        }

        setPrimaryEar(null);
        // navigate("/ChoosePrimaryEar");
    }
    const postResults = async () => {
        setState('completed');
        let body = {
            sessionGuid: await AsyncStorage.getItem('SESSION_GUID'),
            type: "puretone",
            data: results,
            binaural: false
        };

        console.log("body : " + JSON.stringify(body));

        setLoading(true);
        axios.post(
            EndPoints.SetResults,
            body,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            setLoading(false);
            console.log(res.data);
            let hearScore = res.data.hearScore ? res.data.hearScore : ""
            try {
                AsyncStorage.setItem('HEAD_SCORE', hearScore);
            } catch (error) {
                throw error;
            }
            navigation.navigate('SelfResults');
        }).catch((err) => {
            setLoading(false);
            console.log("Error posting results : " + JSON.stringify(err));
        })
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', flexDirection: 'row' }}>
            <Loader loading={loading} />
            <ScrollView style={{ padding: 10 }}>
                <View>
                    {(state == 'completed' || state == 'cancelled') ? (<View style={{ flex: 1, paddingLeft: 10, marginVertical: 100, width: '100%', alignContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 100, height: 8, backgroundColor: '#105BE3', borderRadius: 10 }}></View>
                            <View style={{ width: 30, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10 }}></View>
                        </View>
                        <Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 20, marginTop: 10, marginBottom: 20 }}>Test complete!</Text>

                        {state === 'completed' &&
                            <LinearGradient colors={['#ED3D68', '#ED3A4E', '#ED3D39', '#EE5235']}
                                style={{ width: '95%', borderRadius: 20, elevation: 3, alignSelf: 'center' }}>
                                <SvgUri
                                    width={800}
                                    height={800}
                                    style={{
                                        alignSelf: 'center', position: 'absolute',
                                        top: -200,
                                        left: -16,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                    uri="https://onlinehearingtestwepapp.azurewebsites.net/Assets/Images/soundwave.svg"
                                />
                                <SvgUri
                                    width={400}
                                    height={300}
                                    style={{
                                        alignSelf: 'center',
                                    }}
                                    uri="https://onlinehearingtestwepapp.azurewebsites.net//Assets/Images/illustration-success.svg"
                                />
                            </LinearGradient>
                        }
                        {state === 'cancelled' &&
                            <Text>
                                Hearing Test Cancelled
                            </Text>
                        }


                        {state === 'completed' ?
                            <Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 20, marginTop: 10, marginBottom: 20 }}>
                                Great job! Click next for results now.
                                     </Text>
                            : state === 'cancelled' ?
                                <Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 20, marginTop: 10, marginBottom: 20 }}>
                                    Please repeat the assessment again.
                                     </Text>
                                : <Text> The test will play a series of tones at different volumes and frequencies. Click/tap the “Play <i className="fas fa-play-circle"></i>” button to get started. When you hear a tone, click/tap the “I hear it” button or press the Spacebar on your keyboard.</Text>
                        }


                        {(state === 'completed' || state === 'cancelled') &&
                            <TouchableOpacity
                                onPress={() => {
                                    setState('stopped')
                                }}>
                                <Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 20, marginTop: 10, marginBottom: 20 }}>
                                    <Icon name={'replay'} size={18} /> Retake test
                          </Text>
                            </TouchableOpacity>
                        }

                    </View>) : (<View style={{ flex: 1, paddingLeft: 10, marginVertical: 100, width: '100%', alignContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 100, height: 8, backgroundColor: '#105BE3', borderRadius: 10 }}></View>
                            <View style={{ width: 30, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10 }}></View>
                        </View>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 28, marginTop: 10, marginBottom: 20 }}>Now, let’s begin the{'\n'}test.</Text>
                        <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 20, marginTop: 10, marginBottom: 20, color: '#001B34' }}>
                            The test will play a series of tones at different volumes and frequencies. Click/tap the “Play <Icon name={'play-circle'} size={18} />” button to get started. When you hear a tone, click/tap the “I hear it” button or press the Spacebar on your keyboard.
                    </Text>
                        <LinearGradient colors={['#ED3D68', '#ED3A4E', '#ED3D39', '#EE5235']}
                            style={{ width: '95%', borderRadius: 20, elevation: 3, alignSelf: 'center', height: 500, justifyContent: 'center', alignItems: 'center' }}>
                            <SvgUri
                                width={700}
                                height={500}
                                style={{
                                    alignSelf: 'center', position: 'absolute', top: 0,
                                    left: -16,
                                    right: 0,
                                    bottom: 0,
                                }}
                                uri="https://onlinehearingtestwepapp.azurewebsites.net/Assets/Images/soundwave.svg"
                            />
                            <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 18, marginTop: -30, marginBottom: 20, color: '#fff', textAlign: 'center' }}>
                                Click/tap the “I hear it” button or press the Spacebar on your keyboard when you hear a tone.
                        </Text>
                            <TouchableHighlight
                                style={{
                                    elevation: 10,
                                    width: 270,
                                    height: 90,
                                    backgroundColor: '#fff',
                                    borderRadius: 60,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    marginBottom: 30
                                }}
                                onPress={() => {
                                    setConfirmed(true)
                                }}
                            >
                                <Text style={{
                                    fontFamily: 'ModernEra-Black',
                                    fontSize: 24,
                                    textAlign: 'center',
                                    color: '#EE0B77'
                                }}>I hear it</Text>
                            </TouchableHighlight>
                            {state == 'paused' ? (
                                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                    <TouchableOpacity
                                        style={{
                                            width: '40%',
                                            height: 60,
                                            backgroundColor: '#021931',
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            margin: 10
                                        }}
                                        onPress={() => {
                                            handlePressPlay(false)
                                        }}
                                    >
                                        <Text style={{
                                            fontFamily: 'LibreFranklin-Black',
                                            fontSize: 18,
                                            textAlign: 'center',
                                            color: '#ffffff'
                                        }}>Resume <Icon name={'play-circle'} size={18} color="#fff" /></Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{
                                            width: '40%',
                                            height: 60,
                                            backgroundColor: '#021931',
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            margin: 10
                                        }}
                                        onPress={() => { handlePressPlay(true) }}>
                                        <Text style={{
                                            fontFamily: 'LibreFranklin-Black',
                                            fontSize: 18,
                                            textAlign: 'center',
                                            color: '#ffffff'
                                        }}>Restart <Icon name={'pause-circle'} size={18} color="#fff" /></Text>
                                    </TouchableOpacity>
                                </View>) : (<View style={{ flexDirection: 'row', marginBottom: 20 }}>


                                    {state == 'playing' || state == 'waiting' ? (<TouchableOpacity
                                        style={{
                                            width: '40%',
                                            height: 60,
                                            backgroundColor: '#542126',
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            margin: 10
                                        }}
                                        onPress={() => {
                                            // handlePressPlay(true)
                                        }}
                                    >
                                        <Text style={{
                                            fontFamily: 'LibreFranklin-Black',
                                            fontSize: 18,
                                            textAlign: 'center',
                                            color: '#ffffff'
                                        }}>Play <Icon name={'play-circle'} size={18} color="#fff" /></Text>
                                    </TouchableOpacity>
                                    ) : (<TouchableOpacity
                                        style={{
                                            width: '40%',
                                            height: 60,
                                            backgroundColor: '#021931',
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            margin: 10
                                        }}
                                        onPress={() => {
                                            handlePressPlay(true)
                                        }}
                                    >
                                        <Text style={{
                                            fontFamily: 'LibreFranklin-Black',
                                            fontSize: 18,
                                            textAlign: 'center',
                                            color: '#ffffff'
                                        }}>Play <Icon name={'play-circle'} size={18} color="#fff" /></Text>
                                    </TouchableOpacity>
                                        )}

                                    {['playing', 'waiting', 'processing'].indexOf(state) === -1 ? (<TouchableOpacity
                                        style={{
                                            width: '40%',
                                            height: 60,
                                            backgroundColor: '#542126',
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            margin: 10
                                        }}
                                        onPress={() => {
                                            //setState('paused')
                                        }}>
                                        <Text style={{
                                            fontFamily: 'LibreFranklin-Black',
                                            fontSize: 18,
                                            textAlign: 'center',
                                            color: '#ffffff'
                                        }}>Pause
                                    <Icon name={'pause-circle'} size={18} color="#fff" /></Text>
                                    </TouchableOpacity>) : (
                                            <TouchableOpacity
                                                style={{
                                                    width: '40%',
                                                    height: 60,
                                                    backgroundColor: '#021931',
                                                    borderRadius: 10,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignSelf: 'center',
                                                    margin: 10
                                                }}
                                                onPress={() => {
                                                    setState('paused')
                                                }}>
                                                <Text style={{
                                                    fontFamily: 'LibreFranklin-Black',
                                                    fontSize: 18,
                                                    textAlign: 'center',
                                                    color: '#ffffff'
                                                }}>Pause
                                    <Icon name={'pause-circle'} size={18} color="#fff" /></Text>
                                            </TouchableOpacity>
                                        )}

                                </View>)}

                            <View style={{ width: '93%', backgroundColor: '#ffffff', borderRadius: 40, marginTop: 30 }}>
                                <View style={{ width: progress * 100 + '%', height: 30, backgroundColor: '#000', borderRadius: 40 }}>
                                </View>
                            </View>
                            <View>
                                <View style={{
                                    width: '90%',
                                    height: 10,
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                    margin: 10
                                }}>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>)}
                </View>
            </ScrollView>
            <NextPreviousButtons
                //enableButton={state == 'completed' ? true : false}
                enableButton={true}
                onPreviousPress={() => {
                    navigation.navigate('BestEar')
                }}
                onNextPress={() => {
                    //if (state == 'completed') 
                    postResults();

                }} />
        </View >
    );
}

export default HearingTest;
