import React, { useState, useEffect } from "react";
import {
    View, Text, ScrollView, TouchableOpacity, Image, Dimensions, FlatList, TextInput
} from "react-native";

import Modal from 'react-native-modal'
import Arrow from 'react-native-vector-icons/MaterialIcons'
import Cross from 'react-native-vector-icons/Entypo'
import unitedStates from './us-regions'

let SignUp = ({ selectedModel, options, sessionInfo, hostname, navigation }) => {

    const answerA = [{ answer: 'I’m new to hearing aids' },
    { answer: 'I’ve tried hearing aids but do not currently wear them' },
    { answer: 'I wear hearing aids' }]

    let [total, setTotal] = useState(0);
    let [approve, setApprove] = useState(false);
    let [models, setModels] = useState([{
        "itemId": 3001,
        "modelName": "SB1",
        "manufacturer": "SoundBenefits",
        "technology": null,
        "type": "hearing aid",
        "img": "",
        "description": "With crisp sound and an almost invisible design, the SB1 offers premium features and performance for an excellent price.",
        "price": 997.5,
        "colorList": ["Gray", "Beige", "Dark Champagne", "Deep Brown"]
    }]);
    const [toggleCheckBox, setToggleCheckBox] = useState(true)
    const [showState, setShowState] = useState(false)
    let [fullSpecs, setfullSpecs] = useState(false);
    let [questionModal, setquestionModal] = useState(false);

    let [answer, setanswer] = useState('Select answer from list');

    const [state, setStateValue] = useState('')

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
    useEffect(() => {
    }, [selectedModel]);
    let reDirect = (url) => {
    }
    let save = () => {
    }
    let onClick = () => {
        setApprove(!approve);
    }
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 40, backgroundColor: 'white' }}>
            <View style={{ backgroundColor: 'white', width: '100%' }}>
                <Arrow name={'keyboard-arrow-left'} color={'#105BE3'} size={50} style={{ alignSelf: 'flex-start', marginTop: 50 }} onPress={() => { navigation.goBack() }} ></Arrow>
                <Modal isVisible={fullSpecs}>
                    <View style={{ width: '100%', backgroundColor: 'white', alignSelf: 'center', borderRadius: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 0.8 }}>
                                <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 20, marginTop: 10, alignSelf: 'flex-start', textAlign: 'left', marginBottom: 10 }}>Orders require up to 5 business days for processing once the order has been reviewed and are shipped via USPS either overnight or 2 days based on availability in your area.</Text>
                            </View>
                            <View style={{ flex: 0.2 }}>
                                <Cross size={20} name={'circle-with-cross'} color={'#105BE3'} style={{ alignSelf: 'flex-end', margin: 10 }}
                                    onPress={() => {
                                        setfullSpecs(false)
                                    }}
                                ></Cross>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={showState} style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <View style={{ width: '100%', backgroundColor: 'white', alignSelf: 'center', borderTopLeftRadius: 10, height: '50%', borderTopRightRadius: 10 }}>
                        <Cross size={30} name={'circle-with-cross'} color={'#105BE3'} style={{ alignSelf: 'flex-end', margin: 10 }}
                            onPress={() => {
                                setShowState(false)
                            }}
                        ></Cross>

                        <FlatList
                            data={unitedStates}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity
                                    onPress={() => {
                                        setStateValue(item.shortCode)
                                        setShowState(false)
                                    }}
                                    style={{ width: '100%', justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: index % 2 == 0 ? '#F5F5F5' : 'white' }}>
                                    <Text style={{ fontFamily: 'ModernEra-Regular', alignSelf: 'flex-start', fontSize: 20 }}>{item.shortCode} ({item.name})</Text>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                </Modal>

                <Modal isVisible={questionModal} style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <View style={{ width: '100%', backgroundColor: 'white', alignSelf: 'center', borderTopLeftRadius: 10, height: '30%', borderTopRightRadius: 10 }}>
                        <Cross size={30} name={'circle-with-cross'} color={'#105BE3'} style={{ alignSelf: 'flex-end', margin: 10 }}
                            onPress={() => {
                                setquestionModal(false)
                                //setanswer(item.answer)
                            }}
                        ></Cross>

                        <FlatList
                            data={answerA}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity
                                    onPress={() => {
                                        setquestionModal(false)
                                        setanswer(item.answer)
                                    }}
                                    style={{ width: '100%', justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: index % 2 == 0 ? '#F5F5F5' : 'white' }}>
                                    <Text style={{ fontFamily: 'ModernEra-Black', alignSelf: 'center', fontSize: 20, color: '#105BE3' }}>{item.answer}</Text>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                </Modal>


                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 30, marginLeft: 20 }}>
                    <View style={{ width: 60, height: 8, backgroundColor: '#105BE3', borderRadius: 10, alignSelf: 'flex-start' }}></View>
                    <View style={{ width: 10, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10, alignSelf: 'flex-start' }}></View>
                </View>
                <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 35, marginTop: 40, alignSelf: 'flex-start', textAlign: 'center', marginLeft: 20 }}>Create an account</Text>
                <View style={{ width: '100%', borderWidth: 2, borderColor: '#f2f2f2', marginTop: 10 }}>

                </View>


                <View style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>First name</Text>
                    <TextInput style={{ backgroundColor: '#F5F5F5', height: 60, borderRadius: 5, elevation: 5, width: '100%', alignSelf: 'center', marginTop: 10, paddingLeft: 10 }}>
                    </TextInput>
                </View>

                <View style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Last name</Text>
                    <TextInput style={{ backgroundColor: '#F5F5F5', height: 60, borderRadius: 5, elevation: 5, width: '100%', alignSelf: 'center', marginTop: 10, paddingLeft: 10 }}>
                    </TextInput>
                </View>



                <TouchableOpacity onPress={() => { setShowState(true) }} style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>State</Text>
                    <View style={{ backgroundColor: '#F5F5F5', height: 60, borderRadius: 5, elevation: 5, width: '100%', alignSelf: 'center', marginTop: 10, paddingLeft: 10, flexDirection: 'row' }}>
                        <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'ModernEra-Regular', alignSelf: 'flex-start', fontSize: 20, textAlign: 'left' }}>{state}</Text>
                        </View>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <Arrow name={'keyboard-arrow-down'} color={'#105BE3'} size={40} style={{ alignSelf: 'flex-end' }} ></Arrow>
                        </View>
                    </View>
                </TouchableOpacity>



                <View style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Phone number</Text>
                    <TextInput style={{ backgroundColor: '#F5F5F5', height: 60, borderRadius: 5, elevation: 5, width: '100%', alignSelf: 'center', marginTop: 10, paddingLeft: 10 }}>
                    </TextInput>
                </View>

                <View style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Email address</Text>
                    <TextInput style={{ backgroundColor: '#F5F5F5', height: 60, borderRadius: 5, elevation: 5, width: '100%', alignSelf: 'center', marginTop: 10, paddingLeft: 10 }}>
                    </TextInput>
                </View>

                <View style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Password<Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 15, color: '#031931', alignSelf: 'flex-start' }}> (Must be at least 8 characters)</Text></Text>
                    <TextInput
                        secureTextEntry
                        style={{ backgroundColor: '#F5F5F5', height: 60, borderRadius: 5, elevation: 5, width: '100%', alignSelf: 'center', marginTop: 10, paddingLeft: 10 }}>
                    </TextInput>
                </View>

                <View style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Confirm password</Text>
                    <TextInput
                        secureTextEntry
                        style={{ backgroundColor: '#F5F5F5', height: 60, borderRadius: 5, elevation: 5, width: '100%', alignSelf: 'center', marginTop: 10, paddingLeft: 10 }}>
                    </TextInput>
                </View>

                <TouchableOpacity onPress={() => { setquestionModal(true) }} style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>The following describes me:</Text>
                    <View style={{ backgroundColor: '#F5F5F5', height: 60, borderRadius: 5, elevation: 5, width: '100%', alignSelf: 'center', marginTop: 10, paddingLeft: 10, flexDirection: 'row' }}>
                        <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'ModernEra-Regular', alignSelf: 'flex-start', fontSize: 20, textAlign: 'left' }}>{answer}</Text>
                        </View>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <Arrow name={'keyboard-arrow-down'} color={'#105BE3'} size={40} style={{ alignSelf: 'flex-end' }} ></Arrow>
                        </View>
                    </View>
                    <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 15, color: '#031931', alignSelf: 'flex-start', marginTop: 10 }}>By creating an account, you agree to receive emails from SoundBenefits.</Text>
                </TouchableOpacity>




                {toggleCheckBox ? (<TouchableOpacity
                    onPress={() => {
                    }}
                    style={{ width: '90%', height: 60, backgroundColor: '#105BE3', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 10, marginBottom: 20 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, color: 'white' }}>Create</Text>
                </TouchableOpacity>) : (<TouchableOpacity style={{ width: '90%', height: 60, backgroundColor: '#6A8DE8', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 10, marginBottom: 60 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, color: 'white' }}>Create</Text>
                </TouchableOpacity>)}

            </View>
        </ScrollView>
    )

}

export default SignUp;