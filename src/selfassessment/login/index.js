import React, { useState, useEffect } from "react";
import {
    View, Text, ScrollView, TouchableOpacity, TextInput
} from "react-native";

import Check from 'react-native-vector-icons/FontAwesome'
import Loader from '../../Loader/index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EndPoints } from '../../config/Connectors.js'

let Login = ({ selectedModel, navigation }) => {
    const [enableLoginButton, setenableLoginButton] = useState(false)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    useEffect(() => {
    }, [selectedModel]);

    let reDirect = (url) => {
    }

    let login = async () => {

        let body = {
            sessionGuid: await AsyncStorage.getItem('SESSION_GUID'),
            email: email ? email : "nagaphani123@gmail.com",
            password: password ? password : "Naga@9847"
        }
        console.log("body : " + JSON.stringify(body));

        setLoading(true);
        axios.post(
            EndPoints.PatientSignIn,
            body,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            setLoading(false);
            console.log(res.data);
            if (res.data.success) {
                navigation.navigate('Score');
            } else {
                setLoginFailed(true);
            }

        }).catch((err) => {
            setLoading(false);
            console.log("Error while logging in : " + JSON.stringify(err));
        })

    }

    let onClick = () => {
        setApprove(!approve);
    }
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <Loader loading={loading} />
            <View style={{ backgroundColor: 'white', flex: 1, paddingTop: 70 }}>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 100, marginLeft: 20 }}>
                <View style={{ width: 60, height: 8, backgroundColor: '#105BE3', borderRadius: 10, alignSelf: 'flex-start' }}></View>
                <View style={{ width: 10, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10, alignSelf: 'flex-start' }}></View>
            </View> */}
                <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 35, marginTop: 40, alignSelf: 'flex-start', textAlign: 'center', marginLeft: 20 }}>Sign in to get started</Text>
                <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 18, color: '#031931', alignSelf: 'center', textAlign: 'center', marginTop: 10 }}>Before you can purchase,{'\n'}please login or create an account.
            </Text>

                <View style={{ width: '100%', height: '100%', paddingTop: 0 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 30, marginLeft: 20 }}>
                        <View style={{ width: 60, height: 8, backgroundColor: '#105BE3', borderRadius: 10, alignSelf: 'flex-start' }}></View>
                        <View style={{ width: 10, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10, alignSelf: 'flex-start' }}></View>
                    </View>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 25, marginTop: 40, alignSelf: 'flex-start', textAlign: 'center', marginLeft: 20 }}>Log in to your Account</Text>
                    {loginFailed && <Text style={{ fontSize: 16, marginTop: 10, alignSelf: 'flex-start', textAlign: 'center', marginLeft: 20, color: '#ff3333' }}>Login failed please correct details</Text>}
                    <View style={{ width: '100%', marginTop: 20, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Email address</Text>
                        <TextInput
                            style={{ width: '100%', height: 50, backgroundColor: '#F5F5F5', alignSelf: 'flex-start', borderRadius: 8, paddingLeft: 10, fontFamily: 'ModernEra-Regular', marginTop: 10, fontSize: 20 }}
                            value={email}
                            onChangeText={text => {
                                setemail(text)
                            }}
                        />
                    </View>
                    <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Password</Text>
                        <TextInput
                            style={{ width: '100%', height: 50, backgroundColor: '#F5F5F5', alignSelf: 'flex-start', borderRadius: 8, paddingLeft: 10, fontFamily: 'ModernEra-Regular', marginTop: 10, fontSize: 20 }}
                            value={password}
                            secureTextEntry
                            onChangeText={text => {
                                setpassword(text)
                            }}
                        />
                    </View>

                    {email != '' && password != '' ? (<TouchableOpacity
                        onPress={() => {
                            login()
                        }}
                        style={{ width: '50%', height: 60, backgroundColor: '#105BE3', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 10, marginBottom: 20 }}>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, color: 'white' }}>Sign-in</Text>
                    </TouchableOpacity>) : (<TouchableOpacity
                        onPress={() => { }}
                        style={{ width: '50%', height: 60, backgroundColor: '#6A8DE8', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 10, marginBottom: 20 }}>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, color: 'white' }}>Sign-in</Text>
                    </TouchableOpacity>)}

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 0, marginLeft: 20 }}>
                        <View style={{ width: 60, height: 8, backgroundColor: '#105BE3', borderRadius: 10, alignSelf: 'flex-start' }}></View>
                        <View style={{ width: 10, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10, alignSelf: 'flex-start' }}></View>
                    </View>

                    <View style={{ paddingLeft: 20, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 25, marginTop: 20, alignSelf: 'flex-start', textAlign: 'center', }}>New to SoundBenefits?</Text>
                        <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 18, color: '#031931', marginTop: 10 }}>Here are a few reasons to create an account.</Text>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 16, color: '#031931', alignSelf: 'flex-start', textAlign: 'left', marginTop: 10, }}><Check name={'check'} color={'#105BE3'} size={20}></Check> View all your hearing device info in one place.</Text>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 16, color: '#031931', alignSelf: 'flex-start', textAlign: 'left', marginTop: 10, }}> <Check name={'check'} color={'#105BE3'} size={20}></Check> Create and manage hearing appointments. </Text>

                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Signup')
                        }}
                        style={{ width: '50%', height: 60, backgroundColor: '#105BE3', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 10, marginBottom: 20 }}>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, color: 'white' }}>Create an account</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </ScrollView>
    )

}

export default Login;