import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import InviteCompanion from './../modals/InviteCompanion.js'
import HTML from 'react-native-render-html';
import Cache from './../config/index'

const WaitingRoomScreen = ({ session, navigation, waitingRoomData,handleCompanionInviteModal,handleSendInvite,handleIntakeModal,waitingRoomcontent}) => {
  const [providerName, setProviderName] = React.useState("");
  const [openCompanion, setopenCompanion] = React.useState(openCompanion)

  Icon.loadFont();
   function getMatchedCSSRules(){

  }
 
  
 const onQuestionnaire = () => {
    handleIntakeModal(true)
    Cache.setData('Questionnaire','QuestionnaireOpened')
    navigation.navigate('Questionnaire',{
    });
  };

 
  React.useEffect(() => {
    setProviderName(session.providerName)
    const unsubscribe = navigation.addListener('focus', () => {
      var M  = Cache.getData('Questionnaire')
      if(M != undefined && M != ''){
         handleIntakeModal(false)
         console.log('handleIntakeModal ==> False')
         Cache.setData('Questionnaire','')

      }else{
        ///-----Nothing to do here--------
      }
    });
    
  }, [session]);

  const OpenTestModal = () => {
    setopenCompanion(true)
    setTimeout(() => {
      handleCompanionInviteModal(true)   
    }, 1000);
  }
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>You appointment With <Text style={styles.headername}>{providerName}</Text></Text>
        <Text style={styles.header}>will begin shortly.</Text>
         <View style={styles.audioStatus}>
           {waitingRoomcontent != ''?(<HTML html={waitingRoomcontent}></HTML>):(null)}
        </View> 
        {waitingRoomData && waitingRoomData.message && waitingRoomData.message != '-' &&
          (<View style={styles.audioStatus}>
            <Text>Message from Provider</Text>
            <Text>{waitingRoomData.message}</Text>
          </View>)}
            <InviteCompanion
              showandhidemodal={openCompanion}
              onSubmit={(name,relation,email) => {
                setopenCompanion(false)
                handleSendInvite(name,relation,email)
                setTimeout(() => {
                  handleCompanionInviteModal(false)
                }, 100);
               
              }}
              onCancel={() => { setopenCompanion(false)
                setTimeout(() => {
                  handleCompanionInviteModal(false)
                }, 100);
              }}
            />
        <TouchableOpacity onPress={onQuestionnaire} style={{ ...styles.darkButton, borderColor: session.secondaryColor, color: session.secondaryColor }}>
          <Text style={{ fontFamily: 'LibreFranklin-Bold', color: session.secondaryColor }}><Icon name={'question'} size={14} /> Patient Questionnaire</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={{ ...styles.darkButton, borderColor: session.secondaryColor, color: session.secondaryColor, marginTop: 1 }}>
          <Text style={{ fontFamily: 'LibreFranklin-Bold', color: session.secondaryColor }}><Icon name={'video-camera'} size={14} /> Test Your Equipment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={OpenTestModal} style={{ ...styles.darkButton, borderColor: session.secondaryColor, color: session.secondaryColor, marginTop: 1 }}>
          <Text style={{ fontFamily: 'LibreFranklin-Bold', color: session.secondaryColor }}><Icon name={'send'} size={14} /> Invite Companion </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WaitingRoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  mainContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    paddingBottom: 20,
    paddingTop: 30
  },
  header: {
    fontSize: 20,
    padding: 0,
    textAlign:'center',
    fontFamily: 'LibreFranklin-Medium',
    // margin:1
  }, headername: {
    fontSize: 20,
    padding: 0,
    fontFamily: 'LibreFranklin-Bold'
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
    margin: 10,
    width: '70%',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#dbdbdb',
    padding: 8,
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
    marginTop: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#dbdbdb',
    padding: 8,
    borderRadius: 6,
    width: '95%',
  },
  bottomText: {
    fontSize: 18,
    marginTop: 20,
    width: '90%',
  },
});
