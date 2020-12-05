import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Entypo';

const CalibrationScreen = () => {
  const [audioPlaying, setAudioPlaying] = React.useState(false);
  const [selected, setSelected] = React.useState('stereo');

  Icon.loadFont();
  const LeftArrowIcon = (
    <Icon name={'chevron-thin-left'} size={18} color="#900" />
  );
  const RigthArrowIcon = (
    <Icon name={'chevron-thin-right'} size={18} color="#900" />
  );
  const PlayIcon = <Icon name={'controller-play'} size={20} color="#fff" />;

  const playSound = () => {
    let audioFile = 'alpaca_sp_calibrated.mp3';
    if (selected === 'left') {
      audioFile = 'alpaca_sp_calibrated_l.mp3';
    }
    if (selected === 'right') {
      audioFile = 'alpaca_sp_calibrated_r.mp3';
    }

    if (!audioPlaying) {
      var sound = new Sound(audioFile, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        console.log(`duration in seconds: ${sound.getDuration()}`);
        setAudioPlaying(true);
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
            setAudioPlaying(false);
            sound.release();
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      });
    }
  };

  const onPressConfirm = () => {
    console.log('CONFIRM EVENT');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Calibration Reference Audio</Text>
        <View style={styles.audioBottonsContainer}>
          <View
            style={
              selected === 'left'
                ? styles.buttonContainerWithBG
                : styles.buttonContainer
            }>
            <TouchableOpacity onPress={() => setSelected('left')}>
              <Text
                style={
                  selected === 'left' ? styles.whiteText : styles.marronText
                }>
                {LeftArrowIcon} Left Ear
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={
              selected === 'stereo'
                ? styles.buttonContainerWithBG
                : styles.buttonContainer
            }>
            <TouchableOpacity onPress={() => setSelected('stereo')}>
              <Text
                style={
                  selected === 'stereo' ? styles.whiteText : styles.marronText
                }>
                Stereo
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={
              selected === 'right'
                ? styles.buttonContainerWithBG
                : styles.buttonContainer
            }>
            <TouchableOpacity onPress={() => setSelected('right')}>
              <Text
                style={
                  selected === 'right' ? styles.whiteText : styles.marronText
                }>
                Right Ear {RigthArrowIcon}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={playSound} style={styles.darkButton}>
          <Text style={styles.whiteText}>
            {PlayIcon}
            Play
          </Text>
        </TouchableOpacity>
        <View style={styles.audioStatus}>
          <Text>{audioPlaying ? 'Audio playing' : 'Audio is Stopped'}</Text>
        </View>
        <TouchableOpacity onPress={onPressConfirm} style={styles.darkButton}>
          <Text style={styles.whiteText}>Confirm Left/Right is Correct</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CalibrationScreen;

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
    borderWidth: 2,
    borderColor: '#dbdbdb',
    borderRadius: 6,
    width: '95%',
    paddingBottom: 20,
  },
  header: {
    fontSize: 20,
    padding: 50,
  },
  audioBottonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1.5,
    borderColor: '#193371',
    borderRadius: 6,
    width: '95%',
  },
  buttonContainer: {
    padding: 10,
    width: '33.33%',
    alignItems: 'center',
  },
  buttonContainerWithBG: {
    backgroundColor: '#193371',
    padding: 10,
    width: '33.33%',
    alignItems: 'center',
  },
  darkButton: {
    backgroundColor: '#193371',
    padding: 10,
    margin: 10,
    width: '95%',
    alignItems: 'center',
    borderRadius: 4,
  },
  whiteText: {
    fontSize: 18,
    color: '#fff',
  },
  marronText: {
    fontSize: 18,
    color: '#193371',
  },
  audioStatus: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#dbdbdb',
    paddingVertical: 80,
    borderRadius: 6,
    width: '95%',
    backgroundColor: '#cfcfcf',
  },
});
