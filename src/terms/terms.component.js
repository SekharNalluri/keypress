import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { EndPoints } from './../config/Connectors.js';
import axios from 'axios';
import { set } from 'react-native-reanimated';
import Cache from './../config/index'
const TermsScreen = ({
  route,
  navigation,
  fetchTermOfService,
  fetchSession,
  terms,
  loading,
  setSessionId,
  session
}) => {
  const [buttonColor, setButtonColor] = React.useState("transparent");
  Icon.loadFont();

  const LoginIcon = <Icon name={'login'} size={18} color="#FFF" />;

  React.useEffect(() => {
    //TODO remove below hard code for dev we are using it
    console.log('MySession ==>'+JSON.stringify(session))
    setSessionId(
      route.params.sessionId
        ? route.params.sessionId
        : '',
    );
    fetchTermOfService();
    fetchSession(route.params.sessionId
      ? route.params.sessionId
      : '');
      axios.get(EndPoints.LoadSession + route.params.sessionId).then(function (res){
        Cache.setData('LOADSESSION',JSON.stringify(res.data))
        setButtonColor(res.data.primaryColor)
      }).catch((error) => {});
    }, []);

  const onPressConfirm = () => {
    setTimeout(() => {
      navigation.navigate('WizardScreen');
    }, 500);

  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#193371" />
        </View>
      )}
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Terms of Service</Text>
        <ScrollView style={styles.audioStatus}>
          <Text style={{fontFamily:'LibreFranklin-Medium'}}>{terms}</Text>
        </ScrollView>
         <TouchableOpacity onPress={onPressConfirm} 
         style={[styles.darkButton, {backgroundColor:buttonColor}]}>
          <Text style={styles.whiteText}>
            {LoginIcon} Accept & Join Session
          </Text>
        </TouchableOpacity> 
      </View>
    </View>
  );
};

export default TermsScreen;

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
    padding: 30,
    fontFamily:'LibreFranklin-SemiBold'
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
    fontFamily:'LibreFranklin-Medium'
  },
  marronText: {
    fontSize: 18,
    color: '#193371',
  },
  audioStatus: {
    height: 200,
    borderWidth: 2,
    borderColor: '#dbdbdb',
    padding: 8,
    borderRadius: 6,
    width: '95%',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
