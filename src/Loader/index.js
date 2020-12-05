import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,Text
} from 'react-native';
import {  Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = { spinAnim:''}
  }
  componentDidMount(){
  }
  componentDidUpdate(){
  }
  render(){
    const{loading} = this.props;
    return( <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator 
            style={{}}
            color={'#09205E'}
            size="large"
            /> 
            <Text  style={{marginBottom:10,fontFamily: 'ModernEra-Regular',}}>Loading...</Text>
        </View>
      </View>
    </Modal>)
  }
  
}

Loader.propTypes = {
  loading: PropTypes.bool,
};


const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',paddingBottom:10
  },
  activityIndicatorWrapper: {
    backgroundColor: '#ffffff',
    height: 100,
    width: 100,
    borderRadius: 10,
    paddingTop:10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;