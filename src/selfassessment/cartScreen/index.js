import React, { useState, useEffect } from "react";
import {
    View, Text, ScrollView, TouchableOpacity, Image, Dimensions, FlatList
} from "react-native";
// import Loader from './../Loader/index'

import { EndPoints } from '../../config/Connectors';
import axios from 'axios';
import { Images } from "../../config/Images";
import Menu from 'react-native-vector-icons/Ionicons'
import WebView from 'react-native-webview'
import Modal from 'react-native-modal'
import Check from 'react-native-vector-icons/Ionicons'
import Cross from 'react-native-vector-icons/Entypo'



let YourCart = ({ selectedModel, options, sessionInfo, hostname }) => {

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
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    let [fullSpecs, setfullSpecs] = useState(true);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    useEffect(() => {
        //   setTotal(selectedModel.price * 2);
    }, [selectedModel]);

    let reDirect = (url) => {
        // navigate(url);
    }

    let save = () => {
        //reDirect("/Shipping");
    }

    let onClick = () => {
        setApprove(!approve);
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <Modal isVisible={fullSpecs}>

                <View style={{ width: '100%', height: '80%', backgroundColor: 'white', alignSelf: 'center', borderRadius: 10, padding: 20 }}>
                    <Cross size={40} name={'circle-with-cross'} color={'#105BE3'} style={{ alignSelf: 'flex-end', margin: 10 }}
                        onPress={() => {
                            setfullSpecs(false)
                        }}

                    ></Cross>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 20 }}>
                        <View style={{ width: 60, height: 8, backgroundColor: '#105BE3', borderRadius: 10 }}></View>
                        <View style={{ width: 10, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10 }}></View>
                    </View>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 25, marginTop: 10, alignSelf: 'flex-start', textAlign: 'center', marginBottom: 10 }}>Bill of Sale</Text>

                    <WebView source={{ uri: 'https://onlinehearingtestwepapp-development.azurewebsites.net/Account/Error?message=A+public+action+method+%27GetBillOfSale%27+was+not+found+on+controller+%27VAT.WebApp.Controllers.SessionsController%27.' }} style={{ width: '100%', height: '100%' }} />


                </View>

            </Modal>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 100, marginLeft: 20 }}>
                <View style={{ width: 60, height: 8, backgroundColor: '#105BE3', borderRadius: 10, alignSelf: 'flex-start' }}></View>
                <View style={{ width: 10, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10, alignSelf: 'flex-start' }}></View>
            </View>
            <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 35, marginTop: 40, alignSelf: 'flex-start', textAlign: 'center', marginLeft: 20 }}>Your cart</Text>
            <View style={{ width: '100%', borderWidth: 2, borderColor: '#f2f2f2', marginTop: 10 }}></View>

            <View style={{ flexDirection: 'row', padding: 20, }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 5 }}>
                    <Text style={{ fontFamily: 'ModernEra-Regular', alignSelf: 'flex-start', textAlign: 'center', fontSize: 15 }}>MODEL</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'ModernEra-Regular', alignSelf: 'flex-start', textAlign: 'center', fontSize: 15 }}>{'COLOR'}</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'ModernEra-Regular', alignSelf: 'flex-start', textAlign: 'center', fontSize: 15 }}>{'QUANTITY'}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'ModernEra-Regular', alignSelf: 'flex-start', textAlign: 'center', fontSize: 15 }}>{' AMOUNT'}</Text>
                </View>
            </View>
            {models.map((itemx, c) => {
                return (
                    <View style={{ flexDirection: 'row', padding: 20, backgroundColor: c % 2 == 0 ? '#F2F2F2' : '#ffffff' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ width: 80, height: 80, borderRadius: 10 }}
                                source={Images.sb1gray}
                            >

                            </Image>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 5 }}>
                            <Text style={{ fontFamily: 'ModernEra-Black', alignSelf: 'flex-start', textAlign: 'center', fontSize: 30 }}>{itemx.modelName}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'ModernEra-Regular', alignSelf: 'flex-start', textAlign: 'center', fontSize: 15 }}>{'Gray'}</Text>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'ModernEra-Regular', alignSelf: 'flex-start', textAlign: 'center', fontSize: 15 }}>{'1 Pair'}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'ModernEra-Black', alignSelf: 'flex-start', textAlign: 'center', fontSize: 15 }}>{formatter.format(itemx.price * 2)}</Text>
                        </View>
                    </View>
                )
            })
            }

            <View style={{ width: '90%', backgroundColor: '#E4E7EA', marginTop: 20, alignSelf: 'center', borderRadius: 10, padding: 20, paddingTop: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 20, }}>Subtotal</Text>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, }}>{formatter.format(models[0].price * 2)}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 20, }}>Shipping & Handling </Text>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, }}>{'Free'}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 20, }}>Sales Tax</Text>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, }}>{formatter.format(0)}</Text>
                </View>

                <View style={{ width: '100%', borderColor: '#CFCFCF', borderWidth: 1, marginTop: 20, alignSelf: 'center' }}></View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 20, }}>Total</Text>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 35, }}>{formatter.format(models[0].price * 2)}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>



                    {toggleCheckBox ? (<Check name={'ios-checkbox'} color={'#105BE3'} size={30}
                        onPress={() => {
                            setToggleCheckBox(false)
                        }}
                    >
                    </Check>) : (<Check name={'ios-checkbox-outline'} color={'grey'} size={30}
                        onPress={() => {
                            setToggleCheckBox(true)
                        }}
                    >

                    </Check>)}
                    <TouchableOpacity
                        onPress={() => {
                            setfullSpecs(true)
                        }}
                    >
                        <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 20, }}>I have read and accepted the
                     <Text style={{ textDecorationStyle: 'solid', textDecorationLine: 'underline' }}> {'\n'}Bill of sale</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                {toggleCheckBox ? (<TouchableOpacity style={{ width: '100%', height: '15%', backgroundColor: '#105BE3', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 10 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, color: 'white' }}>Checkout</Text>
                </TouchableOpacity>) : (<TouchableOpacity style={{ width: '100%', height: '15%', backgroundColor: '#6A8DE8', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 10 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, color: 'white' }}>Checkout</Text>
                </TouchableOpacity>)}


            </View>

        </View>
    )

}

export default YourCart;