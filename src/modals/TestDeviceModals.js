import SegmentTab from './../payment/index';
import React, {Component} from 'react';
import { View,TouchableOpacity,Dimensions,StyleSheet,Text} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign'
import Enty from 'react-native-vector-icons/Entypo'
export default class TestDeviceModals extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedIndex:0,
        renderLayout:''
      };
    }
    render() {
        const{showandhidemodal,onCancel} = this.props
        const{selectedIndex} = this.state
      return(
        <Modal isVisible={showandhidemodal} style={modalStyles.bottomModalMS}>
             
            <View style={modalStyles.contentFilterBottom}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10,paddingLeft:10}}>
                    <Text style={{fontFamily:'LibreFranklin-Medium',fontSize:20,marginTop:10,flex:0.9,textAlign:'center',alignSelf:'center'}}>Test your Microphone and Camera</Text>
                    <Icon name="close" size={15} style={modalStyles.IconStyle}onPress={()=>{onCancel()}}/>
                </View>
                <SegmentTab
                    data={['Speaker', 'Microphone','Camera']}
                    style={{alignSelf: 'center',marginTop: 30,fontSize: 15,fontFamily:'LibreFranklin-Medium'}}
                    borderRadius={2}
                    selected={selectedIndex}
                    verticalWidth={70}
                    textActiveColor={'#ffffff'}
                    textInActiveColor={'#74A6D9'}
                    horizontalWidth={'90%'}
                    horizontalHeight={45}
                    activeColor={'#74A6D9'}
                    inActiveColor={'#FFFFFF'}
                    onPress={index => { this.setState({selectedIndex:index})}}
                    titleSize={18}
                />
                 {selectedIndex == 0?(
                    <View style={{padding:20,alignItems:'center',justifyContent:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:17,fontFamily:'LibreFranklin-Medium',alignSelf:'center'}}>Press the  </Text>
                        <TouchableOpacity onPress={()=>{onCancel()}}  style={{backgroundColor:'#ffffff',borderRadius:5,justifyContent:'center',alignItems:'center',flexDirection:'row',justifyContent:'center',padding:2,borderWidth:1,borderColor:'#77A6D8',paddingLeft:4,paddingRight:4}}>
                            <Enty name="controller-play" size={25} style={{color:'#77A6D8'}}/>
                            <Text style={{fontFamily:'LibreFranklin-Medium',color:'#77A6D8',fontSize:20}}>Play</Text>
                        </TouchableOpacity>
                      <Text style={{fontSize:17,fontFamily:'LibreFranklin-Medium',alignSelf:'center'}}> Button below you</Text>
                    </View>
                    <Text style={{fontSize:17,fontFamily:'LibreFranklin-Medium',alignSelf:'center'}}>you should hear sound from the speaker and see the volume indicators below move</Text>
                    <TouchableOpacity onPress={()=>{onCancel()}}  style={{padding:12,backgroundColor:'#0B1F64',borderRadius:5,justifyContent:'center',alignItems:'center',flexDirection:'row',justifyContent:'center',marginTop:20}}>
                        <Enty name="controller-play" size={25} style={{color:'#ffffff'}}/>
                        <Text style={{fontFamily:'LibreFranklin-Medium',color:'white',fontSize:20}}>Play</Text>
                   </TouchableOpacity> </View>):(null)}
                 {selectedIndex == 1?(null):(null)}
                 {selectedIndex == 2?(null):(null)}
                <TouchableOpacity onPress={()=>{onCancel()}}  style={{padding:10,backgroundColor:'#0B1F64',position:'absolute',bottom:10,right:10,borderRadius:5,justifyContent:'center',alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                  <Icon name="close" size={25} style={{color:'white'}}/>
                  <Text style={{fontFamily:'LibreFranklin-Medium',color:'white',fontSize:20}}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
     );
}

}

TestDeviceModals.propTypes = {
    showandhidemodal: PropTypes.bool,
    onCancel: PropTypes.func,

  };
  
  TestDeviceModals.defaultProps = {
    showandhidemodal:false,
    onCancel: () => {}
};

const modalStyles = StyleSheet.create({
 bottomModalMS: {
 },
 contentFilterBottom: {
    width: '100%',
    height:'70%',
    paddingHorizontal: 0,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    position: 'absolute',
    borderRadius:20,
    padding:20
 },
content:{
    backgroundColor:'white'
},
parent:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'red'
},
IconStyle:{
    alignSelf:'flex-end',
    color:'grey',
    marginTop:10,
    flex:0.1,
    alignSelf:'center'
}

});
  