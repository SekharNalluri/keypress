/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import {
  setTwilioToken
} from '../store/actioncreators/patient.actioncreator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MuteUnMute from 'react-native-vector-icons/FontAwesome'
import VideoMuteUnMute from 'react-native-vector-icons/FontAwesome5'
class Video extends Component {

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
      muteIcon:'microphone',
      videoIcon:'video'
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

  getRoomToken = async (room, identity) => {
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
  };

  async componentDidMount() {
    try {
      if (Platform.OS !== 'ios') {
        await this.requestCameraPermission();
        await this.requestAudioPermission();
      }
      await this.getRoomToken(this.props.roomName, this.props.identity);
      console.log(`Token ${this.props.twilioToken}`);
      this.twilioRef.connect({
        roomName: this.state.roomName,
        accessToken: this.props.twilioToken,
      });
    } catch (error) {
      console.log(error);
    }

    this.setState({ status: 'connecting' });
  }

  _onEndButtonPress = () => {
    this.twilioRef.disconnect();
  };

  _onMuteButtonPress = () => {
    this.twilioRef
      
      .setLocalAudioEnabled(!this.state.isAudioEnabled)
      .then((isEnabled) => this.setState({ isAudioEnabled: isEnabled }));
  };


  _onStopVideoPress = () =>{
    this.twilioRef
    .setLocalVideoEnabled(!this.state.isVideoEnabled)
    .then((isEnabled) => this.setState({ isVideoEnabled: isEnabled }));
  }

  _onFlipButtonPress = () => {
    this.twilioRef.flipCamera();
  };

  _onRoomDidConnect = () => {
    console.log('Connected to Room');
    this.setState({ status: 'connected' });
  };

  //  _onMuteButtonPress = () => {
  //   twilioRef.current
  //     .setLocalAudioEnabled(!isAudioEnabled)
  //     .then(isEnabled => setIsAudioEnabled(isEnabled));
  // };

  _onRoomDidDisconnect = ({ roomName, error }) => {
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

  getIconsNames(name){
    var IconName = ''
    if(name == 'video'){
       IconName = 'video-slash'
    }else if(name == 'video-slash'){
      IconName = 'video'
    }else if(name == 'microphone'){
      IconName = 'microphone-slash'
    }else if(name == 'microphone-slash'){
      IconName = 'microphone'
    }
    return IconName
  }

  render() {
    const{videoIcon,muteIcon} = this.state;
    return (
      <View style={styles.container}>
        
        {this.state.status === 'connected' ||
          this.state.status === 'connecting' ? (
            <View>
              <View style={styles.remoteVideo}>
                
                {this.state.videoTracks.size > 0 ? (
                  Array.from(
                    this.state.videoTracks,
                    ([trackSid, trackIdentifier]) => {
                      return (
                        <TwilioVideoParticipantView
                          style={styles.participantVideo}
                          key={trackSid}
                          trackIdentifier={trackIdentifier}
                        />
                      );
                    },
                  )
                ) : (
                    <View style={styles.blankRemoteVideo}>
                      <Text>Waiting for participant</Text>
                    </View>
                  )}
              </View>
              <View style={{flexDirection:'row',position:'absolute',bottom:15,alignSelf:'flex-end',paddingRight:35}}>
                
                <TouchableOpacity onPress={()=>{
                    this.setState({
                      videoIcon: this.getIconsNames(videoIcon)
                    },()=>{
                      this._onStopVideoPress()
                    })
                }} style={{width:30,height:30,backgroundColor:'#112160', zIndex: 1,justifyContent:'center',alignItems:'center',borderRadius:5}}>
                    <VideoMuteUnMute name ={videoIcon} size={15} color={'#ffffff'}>
                   </VideoMuteUnMute>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                  this.setState({
                    muteIcon:this.getIconsNames(muteIcon)
                  },()=>{
                    this._onMuteButtonPress()
                  })
                }} style={{width:30,height:30,backgroundColor:'#112160' ,zIndex: 1,justifyContent:'center',alignItems:'center',borderRadius:5,marginLeft:10}}>
                   <MuteUnMute name ={muteIcon} size={15} color={'#ffffff'}>
                   </MuteUnMute>
                </TouchableOpacity>

              </View>
            </View>
          ) : null}

        <TwilioVideo
          ref={this.setTwilioRef}
          onRoomDidConnect={this._onRoomDidConnect}
          onRoomDidDisconnect={this._onRoomDidDisconnect}
          onRoomDidFailToConnect={this._onRoomDidFailToConnect}
          onParticipantAddedVideoTrack={this._onParticipantAddedVideoTrack}
          onParticipantRemovedVideoTrack={this._onParticipantRemovedVideoTrack}
        />
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
  blankRemoteVideo: {
    width: wp('90%'),
    height: wp('50%'),
    //borderRadius: 2,
    borderColor: '#4e4e4e',
    justifyContent: 'center',
    alignItems: 'center',
    overflow:'hidden',
    backgroundColor: '#707070',
    borderRadius:20,
    borderColor:'#FAD428',
    borderWidth:3,
    opacity: 0.5,
    marginTop:0,
    alignSelf:'center',
  },
  remoteVideo: {
    width: wp('90%'),
    height: wp('50%'),
    marginTop:10,
    overflow:'hidden',
    //borderRadius: 2,
    borderColor: '#4e4e4e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:20,
    borderColor:'#FAD428',
    borderWidth:3,
    alignSelf:'center',
  },
});

function mapStateToProps(state) {
  return {
    loading: state.patient.loading,
    twilioToken: state.patient.twilioToken,
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setTwilioToken }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Video);
