import React, { Component } from "react";
import {
    View, Text, Image, TouchableOpacity, ScrollView
} from "react-native";
import styles from "./styles";
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { EndPoints } from '../../config/Connectors.js'
import Loader from '../../Loader/index'

export default class SelfAssesment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            welcomeScreen: true,
            testHeadPhones: false,
            calibrationVolume: false,
            dominantAir: false,
            hearingTest: false,
            result: false,
            dataSource: {},
            loading: false,
            paragraphA: [
                'A quiet environment. Avoid sitting near an air conditioning vent or open window if outside sounds may distract you. Turn off all programs on your device that may play notifications.',
                'Working headphones; they can be wired or wireless, as long as they work in both ears',
                'At least 10 minutes to take the test.'
            ],
            LeftLables: [{ label: '01 Welcome' }, { label: '02 Test headphones' }, { label: '03 Calibrate volume' }, { label: '04 Dominant ear' }, { label: '05 Hearing test' }, { label: '06 Results' }]

        };
    }

    componentDidMount() {
        const { params } = this.props.route;
        const D = params.dataForApiC;
        this.setState({ dataSource: D }, () => {
            console.log(this.state.dataSource)
        })
    }

    startSession = () => {
        const { dataSource } = this.state;
        const { navigation } = this.props
        this.setState({ loading: true }, () => {
            axios.post(
                EndPoints.StartSession,
                { entityId: dataSource.data.entityId, clinicId: dataSource.data.clinicId },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            ).then(res => {
                this.setState({ loading: false }, () => {
                    console.log('My Session started' + JSON.stringify(res));
                    navigation.navigate('TestHeadphones')
                })
            })

        })

    }



    componentWillUnmount() {
    }

    render() {
        const { navigation } = this.props;
        const { welcomeScreen, testHeadPhones, calibrationVolume, dominantAir, hearingTest, result, paragraphA, loading } = this.state;
        return (
            <>
                <View style={{ flex: 0.95, backgroundColor: '#ffffff', flexDirection: 'row' }}>
                    <ScrollView>
                        <Loader loading={loading}>
                        </Loader>

                        <View style={{ flex: 1, }}>
                            {welcomeScreen == true ? (
                                <View style={{ marginTop: 50, padding: 20 }}>


                                    <Image
                                        style={{ width: '95%', height: 400, borderRadius: 30, alignSelf: 'center' }}
                                        resizeMode={'cover'}
                                        source={{
                                            uri: 'https://onlinehearingtestwepapp.azurewebsites.net//Assets/Images/sb-welcome-image.JPG',
                                        }}
                                    />
                                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                        <View style={{ width: 40, height: 5, backgroundColor: '#105BE3', borderRadius: 10 }}></View>
                                        <View style={{ width: 10, height: 5, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10 }}></View>
                                    </View>

                                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 30, marginTop: 20, marginBottom: 20 }}>Welcome to the self-{'\n'}guided hearing{'\n'}assessment</Text>
                                    <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 18, marginTop: 30, alignSelf: 'flex-start', marginBottom: 20, color: '#001B39', }}>For this hearing test to be accurate, you’ll need:</Text>

                                    {paragraphA.map((item, index) => {
                                        return (
                                            <View key={index} style={{ flexDirection: 'row', paddingRight: 20 }}>
                                                <View >
                                                    <Text><Icon name={'dot-single'} size={22} /></Text>
                                                </View>
                                                <View >
                                                    <Text style={{
                                                        fontFamily: 'ModernEra-Regular',
                                                        fontSize: 18,
                                                        color: '#001B39',
                                                        marginBottom: 10,
                                                        margin: 10
                                                    }}>
                                                        {item}</Text>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            ) : (null)}
                        </View>
                    </ScrollView>
                </View>
                <View>
                    <TouchableOpacity
                        style={{
                            width: '90%',
                            height: 50,
                            backgroundColor: '#105BE3',
                            //  marginLeft: 10, 
                            borderRadius: 10,
                            alignSelf: 'center',
                            justifyContent: 'center', alignItems: 'center',
                            marginTop: 10
                        }}
                        onPress={() => {
                            this.startSession()
                        }}
                    >
                        <Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 17, alignSelf: 'center', textAlign: 'center', color: '#ffffff' }}>Get started</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}