import React, { useState, useEffect } from "react";
import {
    View, Text, ScrollView, TouchableOpacity, Image, Dimensions, FlatList, TextInput
} from "react-native";

import Check from 'react-native-vector-icons/MaterialIcons'
import Cross from 'react-native-vector-icons/Entypo'
import { TextInputMask } from 'react-native-masked-text'


let Checkout = ({ selectedModel, options, sessionInfo, hostname }) => {

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
    const [enableCardButton, setenableCardButton] = useState(false)
    const [showState, setShowState] = useState(false)
    let [fullSpecs, setfullSpecs] = useState(false);

    const [state, setStateValue] = useState('')
    const [Checkcredit, setCheckcredit] = useState(true)
    const [checkBank, setCheckBank] = useState(false)
    const [cardnumber, setcardnumber] = useState('')
    const [expiryDate, setexpiryDate] = useState('')
    const [cvvNumber, setcvvNumber] = useState('')
    const [zipcode, setzipcode] = useState('')
    const [accountHoldername, setAccountHoldername] = useState('')
    const [routingnumber, setrountingnumber] = useState('')
    const [accountnumber, setaccountnumber] = useState('')


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
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 100, marginLeft: 20 }}>
                <View style={{ width: 60, height: 8, backgroundColor: '#105BE3', borderRadius: 10, alignSelf: 'flex-start' }}></View>
                <View style={{ width: 10, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10, alignSelf: 'flex-start' }}></View>
            </View>
            <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 35, marginTop: 40, alignSelf: 'flex-start', textAlign: 'center', marginLeft: 20 }}>Payment</Text>
            <View style={{ flexDirection: 'row', padding: 20 }}>
                <TouchableOpacity
                    onPress={() => {
                        if (!Checkcredit) {
                            setCheckcredit(!Checkcredit)
                            setCheckBank(false)
                        }
                    }}
                    style={{ flex: 1, flexDirection: 'row' }}>
                    {Checkcredit ? (<Check size={30} color={'#105BE3'} name={'radio-button-checked'}></Check>) : (
                        <Check size={30} onPress={() => {
                            setCheckcredit(!Checkcredit)
                            setCheckBank(false)
                        }} color={'#767676'} name={'radio-button-unchecked'}></Check>)}
                    <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 16, alignSelf: 'center', marginLeft: 5 }}>Credit or Debit card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (!checkBank) {
                            setCheckBank(!checkBank)
                            setCheckcredit(false)
                        }

                    }}
                    style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {checkBank ? (<Check size={30} color={'#105BE3'} name={'radio-button-checked'}></Check>) : (
                        <Check size={30} onPress={() => {
                            setCheckBank(!checkBank)
                            setCheckcredit(false)
                        }} color={'#767676'} name={'radio-button-unchecked'}></Check>)}
                    <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 16, alignSelf: 'center', marginLeft: 5 }}>Bank Account</Text>
                </TouchableOpacity>
            </View>

            {Checkcredit ? (<View style={{ padding: 10 }}>
                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Card number</Text>
                    <TextInputMask
                        style={{ width: '100%', height: 50, backgroundColor: '#F5F5F5', alignSelf: 'flex-start', borderRadius: 8, paddingLeft: 10, fontFamily: 'ModernEra-Regular', marginTop: 10, fontSize: 20 }}
                        type={'credit-card'}
                        options={{
                        }}
                        value={cardnumber}
                        onChangeText={text => {
                            setcardnumber(text)
                        }}
                    />
                </View>
                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Expiration date</Text>
                    <TextInputMask
                        style={{ width: '100%', height: 50, backgroundColor: '#F5F5F5', alignSelf: 'flex-start', borderRadius: 8, paddingLeft: 10, fontFamily: 'ModernEra-Regular', marginTop: 10, fontSize: 20 }}
                        type={'datetime'}
                        options={{
                            format: 'MM/DD'
                        }}
                        value={expiryDate}
                        onChangeText={text => {
                            setexpiryDate(text)
                        }}
                    />
                </View>
                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Security code</Text>
                    <TextInput
                        style={{ width: '100%', height: 50, backgroundColor: '#F5F5F5', alignSelf: 'flex-start', borderRadius: 8, paddingLeft: 10, fontFamily: 'ModernEra-Regular', marginTop: 10, fontSize: 20 }}
                        value={cvvNumber}
                        maxLength={3}
                        secureTextEntry={true}
                        onChangeText={text => {
                            setcvvNumber(text)
                        }}
                    />
                </View>
                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Zip</Text>
                    <TextInput
                        style={{ width: '100%', height: 50, backgroundColor: '#F5F5F5', alignSelf: 'flex-start', borderRadius: 8, paddingLeft: 10, fontFamily: 'ModernEra-Regular', marginTop: 10, fontSize: 20 }}
                        value={zipcode}
                        maxLength={5}
                        onChangeText={text => {
                            setzipcode(text)
                        }}
                    />
                </View>
                {cardnumber != '' && expiryDate != '' && cvvNumber != '' && zipcode != '' ? (<TouchableOpacity
                    onPress={() => {
                    }}
                    style={{ width: '90%', height: 60, backgroundColor: '#105BE3', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 10, marginBottom: 20 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, color: 'white' }}>Pay and Finish</Text>
                </TouchableOpacity>) : (<TouchableOpacity
                    onPress={() => {
                    }}
                    style={{ width: '90%', height: 60, backgroundColor: '#6A8DE8', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 10, marginBottom: 60 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, color: 'white' }}>Pay and Finish</Text>
                </TouchableOpacity>)}
            </View>) : (null)}



            {checkBank ? (<View style={{ padding: 10 }}>
                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Account Holder's Name</Text>
                    <TextInput
                        style={{ width: '100%', height: 50, backgroundColor: '#F5F5F5', alignSelf: 'flex-start', borderRadius: 8, paddingLeft: 10, fontFamily: 'ModernEra-Regular', marginTop: 10, fontSize: 20 }}
                        value={accountHoldername}
                        //maxLength={3}
                        // secureTextEntry={true}
                        onChangeText={text => {
                            setAccountHoldername(text)
                        }}
                    />
                </View>
                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Routing Number</Text>
                    <TextInput
                        style={{ width: '100%', height: 50, backgroundColor: '#F5F5F5', alignSelf: 'flex-start', borderRadius: 8, paddingLeft: 10, fontFamily: 'ModernEra-Regular', marginTop: 10, fontSize: 20 }}
                        value={routingnumber}
                        maxLength={5}
                        keyboardType={'number-pad'}
                        onChangeText={text => {
                            setrountingnumber(text)
                        }}
                    />
                </View>
                <View style={{ width: '100%', marginTop: 0, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, color: '#031931', alignSelf: 'flex-start' }}>Account Number</Text>
                    <TextInput
                        style={{ width: '100%', height: 50, backgroundColor: '#F5F5F5', alignSelf: 'flex-start', borderRadius: 8, paddingLeft: 10, fontFamily: 'ModernEra-Regular', marginTop: 10, fontSize: 20 }}
                        value={accountnumber}
                        maxLength={5}
                        keyboardType={'number-pad'}
                        onChangeText={text => {
                            setaccountnumber(text)
                        }}
                    />
                </View>
                {accountnumber != '' && accountHoldername != '' && routingnumber != '' ? (<TouchableOpacity
                    onPress={() => {
                    }}
                    style={{ width: '90%', height: 60, backgroundColor: '#105BE3', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 10, marginBottom: 20 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, color: 'white' }}>Pay and Finish</Text>
                </TouchableOpacity>) : (<TouchableOpacity
                    onPress={() => {
                    }}
                    style={{ width: '90%', height: 60, backgroundColor: '#6A8DE8', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, borderRadius: 10, marginBottom: 60 }}>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, color: 'white' }}>Pay and Finish</Text>
                </TouchableOpacity>)}
            </View>) : (null)}
        </View>
    )

}

export default Checkout;