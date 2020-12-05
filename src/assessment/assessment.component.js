import React from 'react';
import Sound from 'react-native-sound';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const AssessmentScreen = (props) => {
  //{"toneIsPlaying":false,"channel":"left","frequency":500,"volume":65,"raisedHand":false}
  let {
    toneIsPlaying,
    channel,
    frequency,
    volume,
    raisedHand,
  } = props.assessmentData;
  const {session} = props;
  const [isDisabled, setIsDisabled] = React.useState(false);
  const getAudiofileName = () => {
    //try to get constants from config
    let audioFile = 'Alpaca_SP_';
    audioFile = audioFile + frequency + '_' + volume + '_';
    if (channel === 'left') {
      audioFile = audioFile + 'L';
    }
    if (channel === 'right') {
      audioFile = audioFile + 'R';
    }
    audioFile = audioFile + '.mp3';
    return audioFile;
  };

  React.useEffect(() => {
    playSound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.assessmentData]);

  const playSound = () => {
    let audioFile = getAudiofileName(); //'alpaca_sp_calibrated.mp3';
    if (toneIsPlaying) {
      this.sound = new Sound(audioFile, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        this.sound.setNumberOfLoops(1);
        this.sound.play((success, e) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors', e);
          }
        });
      });
    } else {
      if (this.sound) {
        this.sound.stop(() => {
          this.sound.release();
        });
      }
    }
  };
  const onHear = () => {
    setIsDisabled(true);
    props.onPressHear(frequency, volume);
    setTimeout(() => {
      setIsDisabled(false); 
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.instruction}>
            Click the button below when you hear a tone 
          </Text>
        </View>
        <TouchableOpacity
          disabled={isDisabled}
          onPress={onHear}
          style={{
            ...styles.darkButton,
            backgroundColor: session.primaryColor,
            opacity: isDisabled ? 0.5 : 1,
          }}>
          <Text style={styles.whiteText}>
            {isDisabled ? 'You clicked the button' : 'I Hear Tone'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AssessmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    paddingBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    paddingVertical: 120,
  },
  darkButton: {
    backgroundColor: '#193371',
    padding: 60,
    marginTop:-70,

    width: '95%',
    alignItems: 'center',
    borderRadius: 4,
    justifyContent:'center'
  },
  instruction: {
    fontSize: 20,
    fontFamily: 'LibreFranklin-Medium',
    textAlign: 'center',
  },
  whiteText: {
    fontSize: 18,
    fontFamily: 'LibreFranklin-Medium',
    color: '#fff',
  },
});
