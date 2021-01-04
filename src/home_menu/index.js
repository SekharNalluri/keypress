import React, { Component } from "react";
import {
    View, Text, Image, StyleSheet
} from "react-native";
import styles from "./styles";
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Images } from '../config/Images';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Entypo';
import { EndPoints } from './../config/Connectors.js';
import axios from 'axios';
import Loader from './../Loader/index'
import { SESSIONID_SELF } from './../config/Connectors.js'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    getConfigAData = () => {
        const { navigation } = this.props
        this.setState({ loading: true }, () => {
            axios.get(EndPoints.GetConfig + '?id=' + SESSIONID_SELF).then(response => {
                this.setState({ loading: false }, () => {
                    navigation.navigate('SelfAssesment', {
                        dataForApiC: response.data
                    })
                })
            })
        })
    }
    render() {
        const { navigation } = this.props;
        const { loading } = this.state;
        return (
            <View
                style={{ flex: 1 }}>
                <Loader loading={loading}>
                </Loader>
                <ScrollView contentContainerStyle={{
                    alignItems: "center",
                    padding: 10,
                    width: "100%",
                    paddingTop: 100
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 100, height: 8, backgroundColor: '#105BE3', borderRadius: 10 }}></View>
                        <View style={{ width: 30, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10 }}></View>
                    </View>
                    <Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 28, marginTop: 30 }}>Get Started</Text>
                    <View style={{ width: '100%', marginTop: 50, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <LinearGradient colors={['#ED3D68', '#ED3A4E', '#ED3D39', '#EE5235']} style={{ width: '100%', borderRadius: 20, elevation: 3, justifyContent: 'center', alignItems: 'center', padding: 20 }}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                            <Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 23, color: '#ffffff', marginTop: 50 }}>Get a free expert assessment</Text>
                            <Text style={{ fontFamily: 'LibreFranklin-Regular', fontSize: 15, color: '#ffffff', alignSelf: 'center', textAlign: 'center', marginTop: 10 }}>Have your hearing tested by one of our licensed professionals using the most advanced virtual hearing test available online.</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Session')
                                }}
                                style={{ backgroundColor: '#ffffff', borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                <Text style={{ fontFamily: 'LibreFranklin-Bold', fontSize: 16, color: '#105BE3' }}>Schedule a Pro-Led Assesment</Text>
                            </TouchableOpacity>
                            <Text style={{ fontFamily: 'LibreFranklin-Bold', fontSize: 16, color: '#ffffff', marginTop: 20 }}>- RECOMMENDED -</Text>
                        </LinearGradient>
                        <SvgUri
                            width={150}
                            height={150}
                            style={{ alignSelf: 'center', position: 'absolute', top: -60 }}
                            uri="https://onlineassessmentwebapp-development1.azurewebsites.net//Assets/Images/illustration-laptop-proled.svg"
                        />
                    </View>
                    <View style={{ width: '100%', marginTop: 50, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <LinearGradient colors={['#ED3D68', '#ED3A4E', '#ED3D39', '#EE5235']} style={{ width: '100%', borderRadius: 20, elevation: 3, justifyContent: 'center', alignItems: 'center', padding: 20, }}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                            <Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 23, color: '#ffffff', marginTop: 50 }}>Take a free self-guided test</Text>
                            <Text style={{ fontFamily: 'LibreFranklin-Regular', fontSize: 15, color: '#ffffff', alignSelf: 'center', textAlign: 'center', marginTop: 10 }}>Not ready to talk to a person? Start with this self-guided test to see if you might be a candidate for hearing correction.</Text>

                            <TouchableOpacity
                                onPress={() => {
                                    this.getConfigAData()
                                }}
                                style={{ backgroundColor: '#ffffff', borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center', padding: 10, marginBottom: 40 }}>
                                <Text style={{ fontFamily: 'LibreFranklin-Bold', fontSize: 16, color: '#105BE3' }}>Take the Self-Assessment</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <SvgUri
                            width={150}
                            height={150}
                            style={{ alignSelf: 'center', position: 'absolute', top: -60 }}
                            uri="https://onlineassessmentwebapp-development1.azurewebsites.net//Assets/Images/illustration-laptop-selfguided.svg"
                        />
                    </View>


                    <View style={pageStyles.hearingTest}>
                        <SvgUri
                            width={150}
                            height={150}
                            style={{ alignSelf: 'center', marginTop: 50 }}
                            uri="https://onlinehearingtestwepapp.azurewebsites.net//Assets/Images/illustration-laptop-audiogram-white.svg"
                        />
                        <Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 20, marginTop: 10, marginHorizontal: 15, textAlign: 'center' }}>Already have a hearing test and ready to purchase?</Text>
                        <Text style={{ fontFamily: 'LibreFranklin-Black', fontWeight: '200', fontSize: 18, marginTop: 10, marginHorizontal: 15, textAlign: 'center' }}>You can upload it now and purchase the same high-quality devices offered in clinical environments. We’d be happy to schedule an appointment to confirm your results through a Pro-Led assessment at no additional cost.</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('UploadHearingTestScreen')
                            }}>
                            <Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 18, color: '#105BE3', margin: 15, marginBottom: 30, textAlign: 'center' }}> Upload my hearing test <Icon name={'chevron-thin-right'} size={18} color="#105BE3" /></Text>
                        </TouchableOpacity>


                    </View>
                </ScrollView>
            </View>
        );
    }
}


const pageStyles = StyleSheet.create({
    hearingTest: {

    },
});