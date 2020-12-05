import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const IntakeYNButton = ({setPressed, values}) => {
  const [selected, setSelectedState] = React.useState('');
  const setSelected = (selectVal) => {
    setSelectedState(selectVal);
    setPressed(selectVal);
  };

  return (
    <View style={styles.audioBottonsContainer}>
      <TouchableOpacity
        onPress={() => setSelected(values[0])}
        style={
          selected === values[0]
            ? styles.buttonContainerWithBG
            : styles.buttonContainerR
        }>
        <View>
          <Text
            style={
              selected === values[0] ? styles.whiteText : styles.marronText
            }>
            {values[0]}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSelected(values[1])}
        style={
          selected === values[1]
            ? styles.buttonContainerWithBG
            : styles.buttonContainer
        }>
        <View>
          <Text
            style={
              selected === values[1] ? styles.whiteText : styles.marronText
            }>
            {values[1]}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default IntakeYNButton;

const styles = StyleSheet.create({
  audioBottonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#808080',
    borderRadius: 6,
    width: '90%',
    marginVertical: 8,
    alignSelf:'center'
  },
  buttonContainer: {
    padding: 10,
    width: '50%',
    alignItems: 'center',
    
  },
  buttonContainerR: {
    padding: 10,
    width: '50%',
    alignItems: 'center',
    borderRightWidth: 1.5,
    borderRightColor: '#808080',
  },
  buttonContainerWithBG: {
    backgroundColor: '#808080',
    padding: 10,
    width: '50%',
    alignItems: 'center',
  },
  whiteText: {
    fontSize: 18,
    color: '#fff',
  },
  marronText: {
    fontSize: 18,
    color: '#808080',
  },
});
