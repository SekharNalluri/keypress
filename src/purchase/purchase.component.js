import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const PurchaseScreen = (props) => {
  
 const {purchases = [],salesTax}=props.purchases;
 
 var calculatedTotal = 0;
      for (var i=0; i<purchases.length; i++) {
        calculatedTotal += purchases[i].amount;
      }
      calculatedTotal=calculatedTotal+salesTax/1;
  const [currentIndex, setCurrentIndex] = useState('');
 
  const onPress = (index) => {
    if (index === currentIndex) {
      setCurrentIndex('');
    } else {
      setCurrentIndex(index);
    }
  };

  const renderWaitingText = () => {
    if(!(purchases && purchases.length))
      return(<View><Text style={{fontFamily: 'LibreFranklin-Medium',fontSize:17,textAlign:'center'}}>Waiting for the provider to enter the purchase information.</Text></View>)
  }

  const renderTotal = ()=>{
    if(purchases && purchases.length)
return (<View style={styles.purchases}>
  <View style={styles.totalRow}>
    <Text style={{fontFamily:'LibreFranklin-Bold',fontSize:17}}>Sales Tax</Text>
     <Text style={{fontFamily:'LibreFranklin-Bold',fontSize:17}}>${salesTax}</Text>
  </View>
  <View style={styles.totalRow}>
    <Text style={{fontFamily:'LibreFranklin-Bold',fontSize:17}}>Total</Text>
    <Text style={{fontFamily:'LibreFranklin-Bold',fontSize:17}}>${calculatedTotal||0}</Text>
  </View>
</View>)
  }

  const renderRow = () => {
    if(purchases && purchases.length)
    return purchases.map((purchase, index) => (
      <>
        {/* {index !== currentIndex && (
          <TouchableOpacity
            key={`toprow-${index}`}
            style={styles.topRow}
            onPress={() => onPress(index)}>
            <Text>{purchase.modelName}</Text>
            <Text>${purchase.amount}</Text>
          </TouchableOpacity>
        )} */}
        {true && (
          <TouchableOpacity
            key={`row-${index}`}
            style={styles.purchase}
            onPress={() => onPress(index)}>
            <View style={styles.row}>
              <Text style={styles.leftTextStyle}>Ear</Text>
              <Text style={styles.rightTextStyle}>{purchase.ear}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftTextStyle}>Model</Text>
              <Text style={styles.rightTextStyle}>{purchase.manufacturer} - {purchase.modelName}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.leftTextStyle}>Color</Text>
              <Text style={{backgroundColor:'#AFA5A1',borderRadius:10,padding:5,overflow:'hidden',color:'white',fontFamily:'LibreFranklin-Bold'}}>{purchase.color}</Text>
            </View>

            
            {/* <View style={styles.row}>
              <Text>Type</Text>
              <Text>{purchase.type}</Text>
            </View> */}
            {/* <View style={styles.row}>
              <Text>Quantity</Text>
              <Text>{purchase.quantity}</Text>
            </View> */}
            <View style={styles.row}>
              <Text style={styles.leftTextStyle}>List Price</Text>
              <Text style={styles.rightTextStyle}>${purchase.listPrice}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftTextStyle}>Discount</Text>
              <Text 
                style={[styles.rightTextStyle, {color:'#C04B4D'}]}
              >${purchase.discount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftTextStyle}>Amount</Text>
              <Text style={styles.rightTextStyle}>${purchase.amount}</Text>
            </View>
          </TouchableOpacity>
        )}
      </>
    ));
  };


  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Your Purchases</Text>
        <View style={styles.purchases}>{renderRow()}</View>
        {renderTotal()}
        {renderWaitingText()}
      </View>
    </View>
  );
};

export default PurchaseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    paddingBottom: 20,
  },
  header: {
    fontSize: 22,
    fontFamily: 'LibreFranklin-Medium',
    marginBottom: 20,
    color:'black'
  },
  purchases: {
    width: '90%',
  },
  purchase: {
    width: '100%',
    borderColor: '#cccccc',
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignContent: 'space-around',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    borderColor: '#cccccc',
    borderWidth: 2,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignContent: 'space-around',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  rightTextStyle:{
    fontFamily:'LibreFranklin-Medium',
    color:'#343236',
    fontSize:15
  },
  leftTextStyle:{
    fontFamily:'LibreFranklin-Bold',
    color:'black',
    fontSize:17
  },
  totalRow: {
    flexDirection: 'row',
    alignContent: 'space-around',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    borderColor: '#cccccc',
    borderWidth: 2,
    padding: 10,
    backgroundColor: '#cccccc',
    fontSize: 18,
  },
});