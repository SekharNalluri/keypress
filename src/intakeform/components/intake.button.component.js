import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';


const IntakeButton = (props) => {
  const {setPressed, values, value, primaryColor, secondaryColor}= props; 
  const [selected, setSelectedState] = React.useState('');
  const setSelected = (selectVal) => {
    setSelectedState(selectVal);
    setPressed(selectVal);
  };
  
  
  React.useEffect(()=>{
    setSelectedState(value);
  },[value])

  return (
    <View style={
      { 
        marginVertical: 8,
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 6,
        width: '90%',
        borderColor: secondaryColor,
        overflow:'hidden'
        }
    }>
      { values.map((v,i,a) => 
        <TouchableOpacity
        onPress={() => setSelected(v.value)}
        style={
          { 
            width: '100%',
            alignItems: 'center',
            borderBottomWidth: i==a.length-1?0: 1.5,
              borderBottomColor:secondaryColor , 
              backgroundColor: selected === v.value?secondaryColor : '#f0f0f0' }
        }>
        <View>
          <Text
            style={ {
              width: '100%',
              padding: 10,
              fontSize: 18,
               color: selected === v.value? 'white': secondaryColor}
            }>
            {v.display}
          </Text>
        </View>
      </TouchableOpacity>
      )}
    </View>
  );
};

export default IntakeButton;

