import React, { Component } from "react";
import {
    View, Text, ScrollView, TouchableOpacity, Image, Dimensions
} from "react-native";
// import { Images } from '../config/Images';
import Keyboard from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';
import { SvgUri } from 'react-native-svg';
export default class UploadAcknowledgeTestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    render() {
        const { navigation } = this.props
        return (
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ alignItems: "center", padding: 10, width: "100%", paddingTop: 100, backgroundColor: '#ffffff', flexGrow: 1 }}>
                    <View style={{ width: '100%' }}>

                        {/* <Image style={{width:Math.round(Dimensions.get('window').width-10),height:Math.round(Dimensions.get('window').height)/3,overflow:'hidden'}}
                      source={Images.successbg}>
                    </Image> */}

                        <LinearGradient colors={['#ED3D68', '#ED3A4E', '#ED3D39', '#EE5235']}
                            style={{ width: '90%', borderRadius: 20, elevation: 3, alignSelf: 'center' }}>
                            <SvgUri
                                width={800}
                                height={800}
                                style={{
                                    alignSelf: 'center', position: 'absolute',
                                    top: -200,
                                    left: -16,
                                    right: 0,
                                    bottom: 0,
                                }}
                                uri="https://onlinehearingtestwepapp.azurewebsites.net/Assets/Images/soundwave.svg"
                            />
                            <SvgUri
                                width={400}
                                height={300}
                                style={{
                                    alignSelf: 'center',
                                }}
                                uri="https://onlinehearingtestwepapp.azurewebsites.net//Assets/Images/illustration-success.svg"
                            />
                        </LinearGradient>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <View style={{ width: 80, height: 5, backgroundColor: '#105BE3', borderRadius: 10 }}></View>
                            <View style={{ width: 20, height: 5, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10 }}></View>
                        </View>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 28, marginTop: 30, alignSelf: 'center', textAlign: 'center' }}>Thank you!</Text>
                        <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 17, margin: 10, textAlign: 'center' }}>Your hearing test results have been uploaded and submitted successfully.</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.replace('ModalSelection')
                            }}
                            style={{ width: '80%', backgroundColor: '#105BE4', marginTop: 50, marginBottom: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <Text style={{ fontFamily: 'ModernEra-Black', color: '#fff', fontSize: 17, margin: 20 }}>Start shopping for device</Text>
                        </TouchableOpacity>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 17, alignSelf: 'center', textAlign: 'center', color: '#105BE4', marginTop: 20, fontWeight: 'bold', margin: 10 }}>Need help selecting a device? Schedule an appointment with one of our providers</Text>
                        <Keyboard name={'keyboard-arrow-right'} color={'#105BE4'} style={{ alignSelf: 'center', marginTop: 40 }} size={40}></Keyboard>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


