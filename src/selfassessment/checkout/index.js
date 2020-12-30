import React, { useState, useEffect } from "react";
import {
    View, Text, ScrollView, TouchableOpacity, Image, Dimensions, FlatList, TextInput
} from "react-native";


import Menu from 'react-native-vector-icons/AntDesign'
import WebView from 'react-native-webview'
import Modal from 'react-native-modal'
import Check from 'react-native-vector-icons/Ionicons'
import Cross from 'react-native-vector-icons/Entypo'
import unitedStates from './us-regions'

let Checkout = ({ selectedModel, options, sessionInfo, hostname, navigation }) => {

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


                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 100, marginLeft: 20 }}>
                    <View style={{ width: 60, height: 8, backgroundColor: '#105BE3', borderRadius: 10, alignSelf: 'flex-start' }}></View>
                    <View style={{ width: 10, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10, alignSelf: 'flex-start' }}></View>
                </View>
                <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 35, marginTop: 40, alignSelf: 'flex-start', textAlign: 'center', marginLeft: 20 }}>Shipping</Text>
                <View style={{ width: '100%', borderWidth: 2, borderColor: '#f2f2f2', marginTop: 10 }}>

                </View>
                <View style={{ width: '95%', backgroundColor: '#031931', alignSelf: 'center', borderRadius: 8, marginTop: 10, padding: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: 'white' }}>SBPro /Gray, 1 pair</Text>
                        <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 24, color: 'white' }}>{formatter.format(models[0].price * 2)}</Text>
                    </View>
                    <View style={{ width: '100%', borderColor: '#435362', borderWidth: 1, marginTop: 20, alignSelf: 'center' }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: 'white' }}>Subtotal</Text>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 22, color: 'white' }}>{formatter.format(models[0].price * 2)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: 'white' }}>Shipping & Handling <Menu onPress={() => { setfullSpecs(true) }} name={'questioncircle'} size={20} color={'white'}></Menu></Text>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 22, color: 'white' }}>{'Free'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: 'white' }}>Estimated Tax</Text>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 22, color: 'white' }}>{formatter.format(0)}</Text>
                    </View>
                    <View style={{ width: '100%', borderColor: '#435362', borderWidth: 1, marginTop: 20, alignSelf: 'center' }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: 'white' }}>Total</Text>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 35, color: 'white' }}>{formatter.format(models[0].price * 2)}</Text>
                    </View>
                </View>
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

                <View style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Address</Text>
                    <TextInput style={{ backgroundColor: '#F5F5F5', height: 60, borderRadius: 5, elevation: 5, width: '100%', alignSelf: 'center', marginTop: 10, paddingLeft: 10 }}>
                    </TextInput>
                </View>


                <View style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Address 2</Text>
                    <TextInput style={{ backgroundColor: '#F5F5F5', height: 60, borderRadius: 5, elevation: 5, width: '100%', alignSelf: 'center', marginTop: 10, paddingLeft: 10 }}>
                    </TextInput>
                </View>


                <View style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>City</Text>
                    <TextInput style={{ backgroundColor: '#F5F5F5', height: 60, borderRadius: 5, elevation: 5, width: '100%', alignSelf: 'center', marginTop: 10, paddingLeft: 10 }}>
                    </TextInput>
                </View>


                <TouchableOpacity
                    onPress={() => {
                        setShowState(true)
                    }}
                    style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>State</Text>
                    <View
                        editable={false}
                        style={{ backgroundColor: '#F5F5F5', height: 60, borderRadius: 5, elevation: 5, width: '100%', alignSelf: 'center', marginTop: 10, paddingLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'ModernEra-Regular', alignSelf: 'flex-start', fontSize: 20 }}>{state}</Text>


                    </View>
                </TouchableOpacity>

                <View style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Zip</Text>
                    <TextInput style={{ backgroundColor: '#F5F5F5', height: 60, borderRadius: 5, elevation: 5, width: '100%', alignSelf: 'center', marginTop: 10, paddingLeft: 10 }}>
                    </TextInput>
                </View>

                <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 35, marginTop: 40, alignSelf: 'flex-start', textAlign: 'center', marginLeft: 20 }}>Contact information</Text>

                <View style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Email address</Text>
                    <TextInput style={{ backgroundColor: '#F5F5F5', height: 60, borderRadius: 5, elevation: 5, width: '100%', alignSelf: 'center', marginTop: 10, paddingLeft: 10 }}>
                    </TextInput>
                </View>

                <View style={{ width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Phone number</Text>
                    <TextInput style={{ backgroundColor: '#F5F5F5', height: 60, borderRadius: 5, elevation: 5, width: '100%', alignSelf: 'center', marginTop: 10, paddingLeft: 10 }}>
                    </TextInput>
                </View>

                {toggleCheckBox ? (<TouchableOpacity
                    onPress={() => {
                        navigation.navigate('PaymentMore')
                    }}
                    style={{ width: '90%', height: 60, backgroundColor: '#105BE3', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 10, marginBottom: 20 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, color: 'white' }}>Checkout</Text>
                </TouchableOpacity>) : (<TouchableOpacity style={{ width: '90%', height: 60, backgroundColor: '#6A8DE8', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 10, marginBottom: 60 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, color: 'white' }}>Checkout</Text>
                </TouchableOpacity>)}

            </View>
        </ScrollView>
    )

}

export default Checkout;