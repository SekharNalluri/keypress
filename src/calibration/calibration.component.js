import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Entypo';
import Mute from 'react-native-vector-icons/FontAwesome5'

const CalibrationScreen = ({play, channel, onCalibration}) => {
  React.useEffect(() => {
    playSound();
  }, [play, channel]);

  const playSound = () => {
    let audioFile = 'alpaca_sp_calibrated.mp3';
    if (channel === 'left') {
      audioFile = 'alpaca_sp_calibrated_l.mp3';
    }
    if (channel === 'right') {
      audioFile = 'alpaca_sp_calibrated_r.mp3';
    }

    if (play) {
      this.sound = new Sound(audioFile, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        } else {
          onCalibration(play)
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
    } else {
      if (this.sound) {
        this.sound.stop(() => {
          onCalibration(play)
          this.sound.release();
        });
      }
    }
  };

  const onPressConfirm = () => {
    console.log('CONFIRM EVENT');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.instruction}>
          <Text style={{color:'#31555E',fontFamily:'LibreFranklin-Bold',alignSelf:'center',textAlign:'center'}}>
            Follow Instructions given by your provider, and adjust your device
            volume as instructed.
          </Text>
        </View>
        <View style={play ? styles.audioStatusPlay: styles.audioStatusStop}>
           {play?( <Mute size={20}name={'volume-up'} style={{color:'#275B31',marginRight:3}}></Mute>):(<Mute size={20}name={'volume-mute'} style={{color:'#383D3E',marginRight:3}}></Mute>)}
           {play?(<Text style={{color:'#275B31'}} >{'Reference Audio playing'}</Text>):(<Text style={{color:'#404246'}} >{'Reference Audio stopped'}</Text>)}
          
        </View>
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
    width: '95%',
    paddingBottom: 20,
  },
  buttonContainer: {
    padding: 10,
    width: '33.33%',
    alignItems: 'center',
  },
  audioStatusStop: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    borderWidth: 2,
    borderColor: '#dbdbdb',
    paddingVertical: 120,
    borderRadius: 6,
    width: '95%',
    backgroundColor: '#E1E3E5',
  },  
  audioStatusPlay: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#dbdbdb',
    paddingVertical: 120,
    borderRadius: 6,
    width: '95%',
    flexDirection:'row',
    backgroundColor: '#D4EDDB',
  },
  instruction: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 6,
    width: '95%',
    backgroundColor: '#D5EBF0',
    marginBottom: 40,
    padding:10
  },
});
