/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,Dimensions
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { RNCamera } from 'react-native-camera';

export default class CaptureWindowScreen extends Component {
//nnlm;l
  constructor(props) {
    super(props);
    this.state = {
      isAudioEnabled: true,
      isVideoEnabled: true,
      status: 'disconnected',
      participants: new Map(),
      videoTracks: new Map(),
      roomName: '',
      identity: '',
    };
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Online Hearing App Camera Permission',
          message:
            'Online Hearing App needs access to your camera ' +
            'so Doctor can see you.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  requestAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Online Hearing App Microphone Permission',
          message:
            'Online Hearing App needs access to your Microphone ' +
            'so Doctor can hear you.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Microphone');
      } else {
        console.log('Microphone permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  /*getRoomToken = async (room, identity) => {
    if (!this.props.twilioToken) {
      let response = await fetch(
        'https://onlinehearingtestwepapp.azurewebsites.net/Sessions/GenerateTwilioAccessToken',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ identity: identity, room: room }),
        },
      );
      let result = await response.text();

      this.setState({ token: JSON.parse(result).token });
      this.props.setTwilioToken(JSON.parse(result).token);
    }
  };*/

  async componentDidMount() {
    try {
      if (Platform.OS !== 'ios') {
        await this.requestCameraPermission();
        await this.requestAudioPermission();
      }
    //   await this.getRoomToken(this.props.roomName, this.props.identity);
    //   console.log(`Token ${this.props.twilioToken}`);
    //   this.twilioRef.connect({
    //     roomName: this.state.roomName,
    //     accessToken: this.props.twilioToken,
    //   });
    
    
    } catch (error) {
      console.log(error);
    }

    this.setState({ status: 'connecting' });
  }

  _onEndButtonPress = () => {
    //this.twilioRef.disconnect();
  };

  _onMuteButtonPress = () => {
    this.twilioRef
      .setLocalAudioEnabled(!this.state.isAudioEnabled)
      .then((isEnabled) => this.setState({ isAudioEnabled: isEnabled }));
  };

  _onFlipButtonPress = () => {
    this.twilioRef.flipCamera();
  };

  _onRoomDidConnect = () => {
    console.log('Connected to Room');
    this.setState({ status: 'connected' });
  };

  _onRoomDidDisconnect = ({ error }) => {
    console.log(' Room Disconnect ERROR: ' + error);

    this.setState({ status: 'disconnected' });
  };

  _onRoomDidFailToConnect = (error) => {
    this.setState({
      logs: 'Room FailToConnect ERROR: ' + error,
    });

    this.setState({ status: 'disconnected' });
  };

  _onParticipantAddedVideoTrack = ({ participant, track }) => {
    this.setState({
      logs: 'onParticipantAddedVideoTrack: ' + participant + track,
    });

    this.setState({
      videoTracks: new Map([
        ...this.state.videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ]),
    });
  };

  _onParticipantRemovedVideoTrack = ({ participant, track }) => {
    this.setState({
      logs: 'onParticipantRemovedVideoTrack: ' + participant + track,
    });

    const videoTracks = this.state.videoTracks;
    videoTracks.delete(track.trackSid);

    this.setState({ videoTracks: new Map([...videoTracks]) });
  };

  setTwilioRef = (ref) => {
    this.twilioRef = ref;
  };

  render() {
    return (
      <View style={styles.container}>
      <RNCamera
         type ={'front'}
          mirrorImage={true}
          fixOrientation={true}
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            alignSelf:'center',
            justifyContent: 'space-between',
            width:wp('94%'),
            height:hp('30%'),
            borderRadius:20,
            borderColor:'#FAD428',
            borderWidth:3,
            overflow:'hidden'
          }}>
          </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  participantVideo: {
    width: '100%',
    height: '100%',
  },
  
});

// function mapStateToProps(state) {
//   return {
//     loading: state.patient.loading,
//     twilioToken: state.patient.twilioToken,
//   };
// }

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ setTwilioToken }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(Video);
