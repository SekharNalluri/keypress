import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Cache from './../config/index'

const SessionScreen = ({navigation}) => {
  const [sessionId, setSessionId] = React.useState('');

  const onPressConfirm = () => {
    Cache.setData('SESSIONID',sessionId)
    navigation.navigate('Terms', {sessionId: sessionId});
  };


   




  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Enter Session Id</Text>
        <TextInput
          style={styles.sessionid}
          onChangeText={(text) => {
            setSessionId(text)
            
          }}
          value={sessionId}
        />
        <TouchableOpacity onPress={onPressConfirm} style={styles.darkButton}>
          <Text style={styles.whiteText}>Join Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SessionScreen;

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
    paddingBottom: 40,
  },
  header: {
    fontFamily:'LibreFranklin-SemiBold',
    fontSize: 20,
    padding: 50,
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
    fontFamily:'LibreFranklin-Medium',
  },
  sessionid: {
    padding: 5,
    height: 40,
    width: '95%',
    borderWidth: 1.5,
    borderColor: '#193371',
    borderRadius: 6,
    marginBottom: 10,
  },
});
