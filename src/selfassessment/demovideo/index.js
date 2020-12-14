import React from "react";
import {
    View, Text, TouchableOpacity, ScrollView, StyleSheet
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import YouTube from 'react-native-youtube';
import NextPreviousButtons from "../nextpreviousbutton/nextpreviousbutton";
import Sound from 'react-native-sound';
import Pause from 'react-native-vector-icons/FontAwesome5'
import Line from './../common/line'


export default (props) => {

    const { navigation } = props;
    const [audioIsPlaying, setAudioIsPlaying] = React.useState(false);
    const [canEnableNext, setCanEnableNext] = React.useState(false);

    const playFile = () => {
        this.sound = new Sound('Alpaca_SP_calibrated.mp3', Sound.MAIN_BUNDLE, (error) => {
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
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Line />
                <Text style={styles.header}>Now, let’s calibrate your volume.</Text>
                <LinearGradient colors={['#ED3D68', '#ED3A4E', '#ED3D39', '#EE5235']}
                    style={styles.gradient}>
                    <SvgUri
                        width={700}
                        height={700}
                        style={styles.svg}
                        uri="https://onlinehearingtestwepapp.azurewebsites.net/Assets/Images/soundwave.svg"
                    />
                    <YouTube
                        videoId="GE-xgojlIN8"
                        style={styles.youtube}
                    />
                    <Text style={styles.videoText}>
                        This video demonstrates the {'\n'}proper technique for{'\n'}calibrating your volume
                        </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            if (!audioIsPlaying) {
                                setCanEnableNext(true);
                                playFile()
                            }
                            else {
                                pauseorStopPlayer()
                            }
                        }}
                    >
                        {audioIsPlaying ? (<Text style={styles.buttonText}> Pause Sound < Pause name={'pause-circle'} size={18} color="#fff" /></Text>) :
                            (<Text style={styles.buttonText}>Play Sound <Icon name={'play'} size={18} color="#fff" /></Text>)}
                    </TouchableOpacity>
                </LinearGradient>

                <Text style={styles.paragraphText}>
                    Step 1: Without your headphones on, rub your hands together, quickly and firmly, directly in front of your nose as shown in the video to the right.
                    </Text>
                <Text style={styles.paragraphText}>
                    Step 2: Then, put your headphones on. Press the “Play sound <Icon name={'play'} size={15} />” button.
                    </Text>
                <Text style={styles.paragraphText}>
                    Step 3: Adjust your computer’s volume up or down so that the level of the two sounds (the computer sound through your headphones and your hands swishing with no headphones on) is the same.
                    </Text>
                <Text style={styles.paragraphText}>
                    Repeat steps 1-3 until the sounds levels match. Once matched, do not change your volume for the remainder of the hearing assessment.
                    </Text>
            </ScrollView>
            <NextPreviousButtons
                enableButton={canEnableNext}
                onPreviousPress={() => {
                    pauseorStopPlayer();
                    navigation.navigate('TestHeadphones')
                }}
                onNextPress={() => {
                    pauseorStopPlayer();
                    navigation.navigate('BestEar')
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
    scrollContainer: {
        padding: 10,
        paddingBottom: 150
    },
    paragraphText: {
        fontFamily: 'ModernEra-Regular',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 20,
        color: '#001B39'
    },
    gradient: {
        width: '95%',
        borderRadius: 30,
        elevation: 3,
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    svg: {
        alignSelf: 'center', position: 'absolute', top: 0,
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
    videoText: {
        fontFamily: 'ModernEra-Regular',
        fontSize: 23,
        marginTop: 10,
        marginBottom: 20,
        color: '#ffffff',
        alignSelf: 'center',
        textAlign: 'center'
    },
    buttonText: {
        fontFamily: 'LibreFranklin-Black',
        fontSize: 18, textAlign: 'center',
        color: '#ffffff'
    },
    header: {
        fontFamily: 'ModernEra-Black',
        fontSize: 25,
        marginTop: 20,
        marginBottom: 20
    },
    youtube: {
        alignSelf: 'stretch',
        height: 200,
        marginTop: 60
    }
})