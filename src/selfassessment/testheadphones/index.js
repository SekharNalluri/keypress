import React from "react";
import {
    View, Text, TouchableOpacity, ScrollView, StyleSheet
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import EarView from './earsview'
import NextPreviousButtons from "../nextpreviousbutton/nextpreviousbutton";
import Sound from 'react-native-sound';
import Pause from 'react-native-vector-icons/FontAwesome5'
import Line from './../common/line'


export default (props) => {
    const { navigation } = props;
    const [channel, setChannel] = React.useState('left');
    const [channelPlayed, setChannelPlayed] = React.useState([]);
    const [audioIsPlaying, setAudioIsPlaying] = React.useState(false);
    const [showValidationMsg, setShowValidationMsg] = React.useState(false);

    const getAudiofileName = (channel) => {
        let F = ''
        if (channel == 'left') {
            F = 'Alpaca_SP_calibrated_L.mp3'
        } else if (channel == 'right') {
            F = 'Alpaca_SP_calibrated_R.mp3'
        } else if (channel == 'both') {
            F = 'Alpaca_SP_calibrated.mp3'
        }
        return F
    }

    const canSelectChannel = (clickedChannel) => {

        if (clickedChannel == 'both' && channelPlayed.includes('left')) {
            return true
        }
        if (clickedChannel == 'left') {
            return true
        }
        if (clickedChannel == 'right' && channelPlayed.includes('left') && channelPlayed.includes('both')) {
            return true
        }
        return false

    }

    const earViewOnPress = (clickedChannel) => {

        console.log("clickedChannel: " + clickedChannel);

        if (audioIsPlaying || canSelectChannel(clickedChannel)) {
            pauseorStopPlayer();
            setChannel(clickedChannel);
            if (showValidationMsg) { setShowValidationMsg(false) }

        } else {
            setShowValidationMsg(true);
        }
    }

    const playFile = () => {
        let audioFile = getAudiofileName(channel)
        console.log('My Playing sound file ==>  ' + audioFile);

        this.sound = new Sound(audioFile, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }

            setAudioIsPlaying(true)
            this.sound.setNumberOfLoops(-1);
            this.sound.play((success, e) => {
                if (success) {
                    setAudioIsPlaying(false)
                    console.log('successfully finished playing');
                } else {
                    setAudioIsPlaying(false)
                    console.log('playback failed due to audio decoding errors', e);
                }
            });
        });
    }

    const pauseorStopPlayer = () => {
        if (this.sound) {
            this.sound.stop(() => {
                setAudioIsPlaying(false)
                this.sound.release();
            });
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    <View style={styles.padding}>
                        <Line />
                        <Text style={styles.header}>
                            First, let’s test your{'\n'}headphones.
                            </Text>
                        <Text style={styles.paragraphText}>
                            Put your headphones on, and click/tap the “Play sound <Icon name={'play'} size={18} />” button when you’re ready. Then select which ear(s) hear the sound. You can play the sound more than once if you need to. Then click the “Next” button.
                            </Text>
                    </View>

                    <LinearGradient colors={['#ED3D68', '#ED3A4E', '#ED3D39', '#EE5235']}
                        style={styles.gradient}>
                        <SvgUri
                            width={700}
                            height={400}
                            style={styles.svg}
                            uri="https://onlinehearingtestwepapp.azurewebsites.net/Assets/Images/soundwave.svg"
                        />

                        {showValidationMsg ? (<Text style={styles.validation}>
                            * Please play sound before continuing.
                        </Text>) : (null)}

                        <Text style={styles.gradientText}>
                            Select which ear(s) you hear{'\n'}best with
                           </Text>
                        <View style={styles.earView}>
                            <EarView selected={channel == 'left'} type='left' onPress={() => earViewOnPress('left')} />
                            <EarView selected={channel == 'both'} type='both' onPress={() => earViewOnPress('both')} />
                            <EarView selected={channel == 'right'} type='right' onPress={() => earViewOnPress('right')} />
                        </View>



                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                if (!audioIsPlaying) {
                                    console.log("channelPlayed: " + channelPlayed);
                                    let played = channelPlayed.slice();
                                    played.push(channel);

                                    setChannelPlayed(played);
                                    playFile()
                                }
                                else
                                    pauseorStopPlayer()
                            }}
                        >
                            {audioIsPlaying ? (<Text style={styles.buttonText}>Pause Sound <Pause name={'pause-circle'} size={18} color="#fff" /></Text>) :
                                (<Text style={styles.buttonText}>Play Sound <Icon name={'play'} size={18} color="#fff" /></Text>)}
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </ScrollView>

            <NextPreviousButtons
                enableButton={channelPlayed.includes('left') &&
                    channelPlayed.includes('both') &&
                    channelPlayed.includes('right')}
                onPreviousPress={() => {
                    pauseorStopPlayer();
                    navigation.navigate('SelfAssesment')
                }}
                onNextPress={() => {
                    pauseorStopPlayer();
                    navigation.navigate('DemoVideo')
                }} />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row'
    },
    innerContainer: {
        marginVertical: 40,
        width: '100%',
        alignContent: 'space-between'
    },
    padding: {
        padding: 10,
        margin: 20
    },
    paragraphText: {
        fontFamily: 'ModernEra-Regular',
        fontSize: 18,
        marginTop: 0,
        marginBottom: 20,
    },
    gradient: {
        width: '90%',
        borderRadius: 20,
        elevation: 3,
        paddingVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    svg: {
        alignSelf: 'center',
        position: 'absolute',
        top: 0,
        left: -16,
        right: 0,
        bottom: 0,
    },
    button: {
        width: '50%',
        height: 60,
        backgroundColor: '#021931',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10
    },
    buttonText: {
        fontFamily: 'LibreFranklin-Black',
        fontSize: 18,
        textAlign: 'center',
        color: '#ffffff'
    },
    header: {
        fontFamily: 'ModernEra-Black',
        fontSize: 30,
        marginTop: 20,
        marginBottom: 20,

    },
    validation: {
        fontFamily: 'ModernEra-Regular',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
        margin: 10, color: 'black',
        alignSelf: 'center',
        textAlign: 'center'
    },
    gradientText: {
        fontFamily: 'ModernEra-Regular',
        fontSize: 20, marginTop: 10,
        marginBottom: 20,
        margin: 10, color: 'white',
        alignSelf: 'center',
        textAlign: 'center'
    },
    earView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    }
});
