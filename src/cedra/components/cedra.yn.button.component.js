import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const CedraYNButton = (props) => {
  const {setPressed, value, primaryColor, secondaryColor} = props;
  const [selected, setSelectedState] = React.useState('');
  const values=[{value:'yes', display:'Yes'}, {value:'no', display:'No'}]
  const setSelected = (selectVal) => {
    setSelectedState(selectVal);
    setPressed(selectVal);
  };

  React.useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <View style={{
      flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor:  secondaryColor,
    borderRadius: 6,
    width: props.width || '100%',
    marginVertical: 8,
    overflow: "hidden"
    }}>
      {values.map((v,i,a)=>
        <TouchableOpacity key={v.value}
        onPress={() => setSelected(v.value)}
        style={
          {padding: 8,
            width: '50%',
            alignItems: 'center',
            borderRightWidth: i==a.length-1? 0: 1.5,
            
            borderRightColor: secondaryColor , 
            backgroundColor: selected === v.value?secondaryColor : '#f0f0f0'}
        }>
        <View>
          <Text
            style={{ fontSize: 18, color: selected === v.value?'white':secondaryColor}}>
            {v.display}
          </Text>
        </View>
      </TouchableOpacity>
      )}
      
       </View>
  );
};

export default CedraYNButton;

const styles = StyleSheet.create({
  audioBottonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#808080',
    borderRadius: 6,
    width: '100%',
    marginVertical: 8,
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
