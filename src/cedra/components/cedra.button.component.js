import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

const CedraButton = (props) => {
  const {setPressed, values, value, primaryColor, secondaryColor} = props;
  
  const [selected, setSelectedState] = React.useState('');
  const setSelected = (selectVal) => {
    setSelectedState(selectVal);
    setPressed(selectVal);
  };

  React.useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <View style={{ 
      marginVertical: 8,
      flexDirection: 'column',
      alignItems: 'center',
      borderWidth: 1.5,
      borderRadius: 6,
      width: '100%',
      borderColor: secondaryColor,
      overflow:'hidden'
      }}>
      { values.map((v,i,a) => 
      <TouchableOpacity key={v}
        onPress={() => setSelected(v)}
        style={ { 
          width: '100%',
          alignItems: 'center',
          borderBottomWidth: i==a.length-1?0: 1.5,
            borderBottomColor:secondaryColor , 
            backgroundColor: selected === v?secondaryColor : '#f0f0f0' }
            
        }>
        <View>
          <Text
            style={ {
              width: '100%',
              padding: 10,
              fontSize: 18,
               color: selected === v? 'white': secondaryColor}
            }>
            {v}
          </Text>
        </View>
      </TouchableOpacity>
      )}

    </View>
  );
};

export default CedraButton;
