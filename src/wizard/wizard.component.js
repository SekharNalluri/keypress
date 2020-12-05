import React from 'react';
import { StyleSheet, View, Text, ImageBackground, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StepIndicator from 'react-native-step-indicator';
import WaitingRoom from '../waitingroom/waitingroom.component';
import Calibration from '../calibration/calibration.component';
import Assessment from '../assessment/assessment.component';
import Agreement from '../agreement/agreement.component';
import Purchase from '../purchase/purchase.component';
import Result from '../result/result.component';
import Payment from '../payment/payment.component';
import { Images } from './../config/Images';
import Video from '../videochat/videochat.component';
import Cache from './../config/index'
import signalr from 'react-native-signalr';
import CaptureScreen from './../captureImage/index'
import { Main, SESSIONID } from './../config/Connectors.js';
import { EndPoints } from './../config/Connectors.js';
import axios from 'axios';
import Loader from './../Loader/index'
import Documents from './../documents/index'


const WizardScreen = (props) => {
  const { route, navigation, sessionId, session } = props;
  Icon.loadFont();
  //var proxy = undefined
  const [stepNumP, setStepNumP] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [stepNum, setStepNum] = React.useState(0);
  const [providerPhone, setProviderPhone] = React.useState("");
  const [videoChatEnabled, setVideoChatEnabled] = React.useState(false);
  const [stepCount, setStepCount] = React.useState(4);
  const [stepLabel, setStepLabel] = React.useState([
    'Waiting Room',
    'Calibration',
    'Assessment',
    'Result',
  ]);
  const [purchaseData, setPurchaseData] = React.useState([]);
  const [paymentData, setPaymentData] = React.useState([]);
  const [resultData, setResultData] = React.useState([]);
  const [waitingRoomData, setWaitingRoomData] = React.useState([]);
  const [assessmentData, setAssessmentData] = React.useState({});
  const [calibration, setCalibration] = React.useState({
    play: false,
    channel: 'stereo',
  });
  const [showSnackBar, setShowSnackBar] = React.useState(false)
  const [waitingRoomcontent,setWaitingRoomContent] = React.useState("")
  const [DocumentsData, setDocumentsData] = React.useState("");

  const [agreement, setAgreement] = React.useState({});
  const [styleObject, setStyleObject] = React.useState([{
    labelFontFamily: 'LibreFranklin-Medium',
    stepIndicatorSize: 35,
    currentStepIndicatorSize: 50,
    separatorStrokeWidth: 5,
    stepStrokeCurrentColor: '#193371',
    currentStepStrokeWidth: 5,
    separatorFinishedColor: '#193371',
    separatorUnFinishedColor: '#cdcdcd',
    stepIndicatorFinishedColor: '#1B3572',
    stepIndicatorUnFinishedColor: '#A9B4CA',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 12,
    currentStepLabelColor: 'black',
  }])


  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('purchase_data', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const fetchWaitingRoomContent = async() => {
    axios.get(EndPoints.GetWaitingRoomContent,{params: { id: session.sessionId}})
    .then(function (res) {
      if (res && res.data && res.data.data) {
        setWaitingRoomContent(res.data.data)
      }
    })
    .catch((error) => {
    });
  }


  async function indexFunc(index) {
    var M = 0;

    return M
  }

  const connect = async () => {
    const connection = signalr.hubConnection(Main, { qs: { access_token: '' } });
    connection.logging = true;
    proxy = connection.createHubProxy('sessionHub');
    proxy.on('setState', (state) => {
      console.log(`Patient State  ${JSON.stringify(state)}`);
      if ('videoChatEnabled' in state)
        setVideoChatEnabled(state.videoChatEnabled)
      if ('screen' in state)
        setStepNum(state.screen)
        if(state.screen/1 != 7 && state.screen/1 != 10){
          if(state.screen /1 >= 4){
            setStepNumP(state.screen/1+1) 
          }else if(state.screen /1 < 4){
            setStepNumP(state.screen)  
          }
        }else if(state.screen/1 == 10){
          setStepNumP(4)
        }


      if (state.screen > 3) {
        setStepCount(8);
        setStepLabel([
          'Waiting Room',
          'Calibration',
          'Assessment',
          'Result',
          'Documents',
          'Purchase',
          'Agreement',
          'Payment',

        ]);
      } else {
      }
    });

    proxy.on('setPatientCalibrationState', (state) => {
      console.log(`Patient CalibrationState ${JSON.stringify(state)}`);
      setCalibration({
        play: state.referenceAudioIsPlaying,
        channel: state.channel,
      });
    });

    

    proxy.on('setPatientPuretoneTestState', (state) => {
      console.log(`Patient Puretone Test State ${JSON.stringify(state)}`);
      setAssessmentData(state);
    });

    proxy.on('setResultsState', (state) => {
      console.log('setResultsState ==>' + JSON.stringify(state));

      setResultData(state);
    });

     proxy.on('setDocumentsState', (state) => {
       console.log('setDocumentsStateURL',JSON.stringify(state))
       if(state && state.display && state.display == 'documents'){
         setDocumentsData(Main+state.document.url)
       }
     });

     proxy.on('setPurchasesState', (state) => {
      console.log('SetPurchaseState ==>' + JSON.stringify(state));
     
      setPurchaseData(state)
      storeData(state)
    });
    proxy.on('setPatientPaymentsState', (state) => {
      setPaymentData(state)
    });

    proxy.on('setPatientAgreementsState', (state) => {
      console.log('Agreement State =>' + JSON.stringify(state));
      setAgreement(state)
    });


    proxy.on('setProviderWaitingRoomState', (state) => {
      //setProviderPhone(state.providerPhone)
      state.message = state.message || '-';
      setWaitingRoomData(state);
    });

    connection
      .start()
      .done(() => {
        console.log('Connection Established between the host' + SESSIONID);

        console.log('proxy.invoke(joinGroup, sessionId);');
        proxy.invoke('joinGroup', sessionId);

        proxy.invoke('setProviderState', sessionId, {
          locked: true,
          patientIsConnected: true,
        });
      })
      .fail(() => {
        console.log('Failed');
      });

    connection.error((error) => {
      const errorMessage = error.message;
      let detailedError = '';
      if (error.source && error.source._response) {
        detailedError = error.source._response;
      }
      if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
        console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
      }
      //alert('SignalR error: ' + errorMessage, detailedError)
    });

  };

  // React.useEffect(() => {
  //   connect();
  // }, []);

  React.useEffect(() => {
    setStyleObject({
      labelFontFamily: 'LibreFranklin-Medium',
      stepIndicatorSize: 35,
      currentStepIndicatorSize: 50,
      separatorStrokeWidth: 5,
      stepStrokeCurrentColor: session.primaryColor,
      currentStepStrokeWidth: 5,
      separatorFinishedColor: '#193371',
      separatorUnFinishedColor: '#cdcdcd',
      stepIndicatorFinishedColor: '#1B3572',
      stepIndicatorUnFinishedColor: '#A9B4CA',
      stepIndicatorCurrentColor: '#ffffff',
      stepIndicatorLabelFontSize: 15,
      currentStepIndicatorLabelFontSize: 15,
      stepIndicatorLabelCurrentColor: '#000000',
      stepIndicatorLabelFinishedColor: '#ffffff',
      stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
      labelColor: '#666666',
      labelSize: 12,
      currentStepLabelColor: 'black',
    })
    console.log('Session Data ==>' + JSON.stringify(session))
    connect();
    fetchWaitingRoomContent()
    if (session) {
      setProviderPhone(session.providerPhone);
      setVideoChatEnabled(session.videoChatEnabled);
    }else{
      console.log('Reachedf hereregr nwm;feqew--------')
    }
  }, [session]);

  const renderLabel = ({ position, label, currentPosition }) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }>
        {label}
      </Text>
    );
  };

  const onPressHear = (frequency, volume) => {
    proxy.invoke('setProviderPuretoneTestState', sessionId, {
      patientRaisedHand: true,
      frequency: frequency,
      volume: volume
    });
  };

  const onCalibration = (playing) => {
    proxy.invoke('setProviderCalibrationState', sessionId, {
      referenceAudioIsPlayingViaPatient: playing
    });
  };


  const onPressAccept = () => {
    console.log('... accept ...');
  };

  const updateProviderPayments = (paymentResp) => {
    proxy.invoke('setProviderPaymentsState', sessionId, paymentResp);
  };

  const updateTermsAccepted = (request) => {
    proxy.invoke('setProviderAgreementsState', sessionId, { patientAcceptedWaiver: true });
  }



 const handleIntakeModal = (state) => {
     proxy.invoke('setProviderWaitingRoomState', sessionId, { intakeModal: state });
     proxy.invoke('setProviderState', sessionId, { intakeModal: state });
     proxy.invoke('setPatientState', sessionId, { intakeModal: state });
}


  const handleSendInvite = (name,relation,email) => {
    console.log('Request ==>',{
        sessionId: session.sessionId,
        companionName: name,
        companionRelation: relation,
        companionEmail: email,
        sendEmail: true
    });
    setLoading(true)
    axios({ method: 'post',url:EndPoints.SetCompanion,data: {sessionId:session.sessionId,companionName: name,companionRelation: relation,companionEmail: email,sendEmail: true},
    
    })
    .then(function (res) {
      console.log('handleResponceFormat',JSON.stringify(res));
      if(res.data && res.data.message && res.data.message == 'OK'){
        setShowSnackBar(true)
      }
    })
    .catch((error) => { setLoading(false)});
  }

const handleCompanionInviteModal = (state) => {
  proxy.invoke('setProviderWaitingRoomState', sessionId,{companionInviteModal: state});
  proxy.invoke('setProviderState', sessionId,{companionInviteModal: state});
  proxy.invoke('setPatientState', sessionId,{companionInviteModal: state});
}

const renderScreen = () => {
  switch (stepNum) {
    case 0:
      navigation.setOptions({ title: 'Waiting Room' });
      return (
        <WaitingRoom
          waitingRoomData={waitingRoomData}
          navigation={navigation}
          session={session}
          handleSendInvite={handleSendInvite}
          handleCompanionInviteModal={handleCompanionInviteModal}
          handleIntakeModal = {handleIntakeModal}
          waitingRoomcontent = {waitingRoomcontent}
        />
      );
    case 1:
      navigation.setOptions({ title: 'Calibrations' });
      return (
        <Calibration play={calibration.play} session={session} channel={calibration.channel} onCalibration={onCalibration} />
      );
    case 2:
      navigation.setOptions({ title: 'Assessments' });
      return <Assessment assessmentData={assessmentData} session={session} onPressHear={onPressHear} />;
    case 3:
      navigation.setOptions({ title: 'Results' });
      return <Result resultData={resultData} session={session} />;
   
    case 10 :
    navigation.setOptions({ title: 'Documents' });
    return <Documents resultData={resultData} session={session} documentsData = {DocumentsData} />;
   
    case 4:
      navigation.setOptions({ title: 'Purchases' });
      return <Purchase purchases={purchaseData} session={session} />;

    case 5:
      navigation.setOptions({ title: 'Agreements' });
      return (
        <Agreement
          onPressAccept={onPressAccept}
          session={session}
          agreementData={agreement}
          updateTermsAccepted={updateTermsAccepted}

        />
      );
    case 6:
      navigation.setOptions({ title: 'Payment' });
      return <Payment session={session} paymentData={paymentData} updateProviderPayments={updateProviderPayments} />;
   
   case 7:
      navigation.setOptions({ title: 'Capture Screen' });
      return <CaptureScreen session={session} />;

    default:
      navigation.setOptions({ title: 'Waiting Room' });
      return (
        <WaitingRoom
          waitingRoomData={waitingRoomData}
          navigation={navigation}
          session={session}
          handleSendInvite={handleSendInvite}
          handleCompanionInviteModal={handleCompanionInviteModal}
          handleIntakeModal = {handleIntakeModal}
          waitingRoomcontent = {waitingRoomcontent}
        />
      );
  }
};
  return (
    <ImageBackground
      style={{ width: '100%', height: '100%' }}
      source={Images.bgWizard}>
      
      <View style={styles.container}>
        {videoChatEnabled == true ? (<View style={styles.videoContainer}>
          <Video roomName={sessionId} identity={'Patient'}   />
        </View>) : (null)}
      
        <ScrollView>
          <View>
            <View style={styles.stepIndicator}>
              <StepIndicator
                stepCount={stepCount}
                customStyles={styleObject}
                currentPosition={stepNumP}
                labels={stepLabel}
                renderLabel={renderLabel}
              />
            </View>
            <View style={styles.screenContainer}>{renderScreen()}</View>
          </View>
        </ScrollView>
        {showSnackBar == true?( <View style={{width:'100%',height:'6%',backgroundColor:'#D7EDDA',marginTop:0,justifyContent:'space-between',flexDirection:'row',paddingLeft:20,paddingRight:20}}>
           <Text style={{fontFamily:'LibreFranklin-Bold',color:'#2E532E',fontSize:17,alignSelf:'center',justifyContent:'flex-end',marginLeft:50}}>Companion Invitation Sent !</Text>
           <Icon name="close" onPress={() => { setShowSnackBar(false) }}  size={20} style={{ color: '#6A776A',alignSelf:'center' }} />
        </View>):(null)}
        <Text style={styles.bottomText}>
           You can contact your provider by phone at <Text style={styles.bottomTextBold}>{providerPhone}</Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default WizardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepIndicator: {
    padding: 15,
    // marginTop:40
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: 'transparent',
    alignSelf: 'center',
  },
  stepLabelSelected: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '500',
    color: 'black',
    fontFamily: 'LibreFranklin-Medium',
    alignSelf: 'center',
  },
  screenContainer: {
    flex: 0.99,
  },
  videoContainer: {
  },
  bottomText: {
    fontSize: 15,
    margin: 10,
    width: '90%',
    textAlign: 'center',
    fontFamily: 'LibreFranklin-Medium',
    marginBottom: 20
  },
  bottomTextBold: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 20,
    width: '90%',
    textAlign: 'center',
    fontFamily: 'LibreFranklin-Medium',
    marginBottom: 50
  },
});