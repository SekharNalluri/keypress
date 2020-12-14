import React, { useState, useEffect } from "react";
import {
    View, Text, ScrollView, TouchableOpacity, Image, Dimensions, FlatList
} from "react-native";
import Loader from '../../Loader/index'

import { EndPoints } from '../../config/Connectors.js';
import axios from 'axios';
import { Images } from "../../config/Images";
import Menu from 'react-native-vector-icons/Ionicons'
import WebView from 'react-native-webview'
import Modal from 'react-native-modal'
import Check from 'react-native-vector-icons/FontAwesome5'
import Content from './Modal.json'
import Cross from 'react-native-vector-icons/Entypo'
let ModelSelection = ({ hostname, setSelectedModel, sessionInfo, selectedColor, selectedProduct, navigation }) => {
    let [models, setModels] = useState([]);
    let [preparingCart, setPreparingCart] = useState(false);
    let [preparingModels, setPreparingModels] = useState(true);
    let [loading, setloading] = useState(false);
    let [fullSpecs, setfullSpecs] = useState(false);


    const ImageA = {
        sbprogray: require('@assets/images/sbpro-gray.jpg'),
        sbprodeepbrown: require('@assets/images/sbpro-deep-brown.jpg'),
        sbprodarkchampagne: require('@assets/images/sbpro-dark-champagne.jpg'),
        sbprobeige: require('@assets/images/sbpro-beige.jpg'),
        sb1beige: require('@assets/images/sb1-beige.jpg'),
        sb1darkchampagne: require('@assets/images/sb1-dark-champagne.jpg'),
        sb1deepbrown: require('@assets/images/sb1-deep-brown.jpg'),
        sb1gray: require('@assets/images/sb1-gray.jpg'),
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    const colorObject = {
        'Gray': '#C1C0B8',
        'Beige': '#EED0B8',
        'Dark Champagne': '#D0C5B6',
        'Deep Brown': '#1B1813',
    }

    const colorArray = [{ name: 'Gray', color: '#C1C0B8', }, { name: 'Beige', color: '#EED0B8', }, { name: 'Dark\nChampagne', color: '#D0C5B6', }, { name: 'Deep\nBrown', color: '#1B1813', },]


    useEffect(() => {
        setloading(true)
        axios.get(EndPoints.GetItemsList).then(response => {
            console.log('My Respnce =>' + JSON.stringify(response))
            setloading(false)
            let _models = response.data.map((model, i) => {
                model.qty = 1;
                let color = 'Gray';
                // if (selectedColor !== null) {
                //     let selectColor = model.colorList.filter(color => color.replace(' ', '').toLowerCase().toLowerCase() === selectedColor.replace('-', '').toLowerCase());
                //     if (selectColor.length == 1)
                //         color = selectColor[0];
                // }
                model.selectedColor = color;
                return model;
            });
            setPreparingModels(false);

            // let selectedModel = [];
            // if (selectedProduct !== null)
            //     selectedModel = _models.filter(m => m.modelName.toLowerCase() === selectedProduct.toLowerCase());

            // if (selectedModel.length === 1)
            //     selectModel(selectedModel[0]);
            // else
            setModels(_models);
        })
        /*axios.get(`${hostname}/SelfGuided/GetItemsList`).then(response => {
            let _models = response.data.map((model, i) => {
                model.qty = 1;
                let color = 'Gray';
                if (selectedColor !== null) {
                    let selectColor = model.colorList.filter(color => color.replace(' ', '').toLowerCase().toLowerCase() === selectedColor.replace('-', '').toLowerCase());
                    if (selectColor.length == 1)
                        color = selectColor[0];
                }
                model.selectedColor = color;
                return model;
            });
            setPreparingModels(false);

            let selectedModel = [];
            if (selectedProduct !== null)
                selectedModel = _models.filter(m => m.modelName.toLowerCase() === selectedProduct.toLowerCase());

            if (selectedModel.length === 1)
                selectModel(selectedModel[0]);
            else
                setModels(_models);
        });*/

    }, []);

    let selectModel = (state) => {

        setPreparingCart(true);

        let selectedModel = state;
        let products = [];

        products.push({
            itemId: selectedModel.itemId,
            quantity: selectedModel.qty,
            listPrice: selectedModel.price,
            amount: selectedModel.price,
            discount: 0,
            color: selectedModel.selectedColor,
            ear: 'Left',
            sessionId: sessionInfo.sessionId,
        });

        products.push({
            itemId: selectedModel.itemId,
            quantity: selectedModel.qty,
            listPrice: selectedModel.price,
            amount: selectedModel.price,
            discount: 0,
            color: selectedModel.selectedColor,
            ear: 'Right',
            sessionId: sessionInfo.sessionId,
        });

        navigation.navigate('CartScreen')



        /* axios.post(`${hostname}/SelfGuided/AddPurchases`, {
             sessionId: sessionInfo.sessionId,
             products
         }).then(res => {
             if (res.data.status === 200) {
                 setSelectedModel(state);
                 axios(`${hostname}/Sessions/BillOfSale/${sessionInfo.sessionId}`).then(res => {
                     setPreparingCart(false);
                     navigate("/YourCart");
                 })
             }
             else
                 console.log(res.data);
         }).catch(err => {
         });*/
    }

    const currencyFormat = (num) => {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    let selectColor = (itemId, color) => {
        let newModels = models.map(m => {
            if (m.itemId === itemId) {
                m.selectedColor = color;
            }
            return m;
        })
        setModels(newModels);
    }
    if (preparingCart || preparingModels)
        return (
            <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {preparingCart ? <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 20, alignSelf: 'center', textAlign: 'center' }}>Preparing your cart may take a few moments. Please be patient.</Text> : <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 20, alignSelf: 'center', textAlign: 'center' }}>Preparing your models may take a few moments. Please be patient.</Text>}
            </View>
        );
    else
        return (
            <View style={{ backgroundColor: 'white', paddingTop: 70 }}>
                <Modal isVisible={fullSpecs}>

                    <View style={{ width: '100%', height: '80%', backgroundColor: 'white', alignSelf: 'center', borderRadius: 10 }}>
                        <Cross size={40} name={'circle-with-cross'} color={'#105BE3'} style={{ alignSelf: 'flex-end', margin: 10 }}
                            onPress={() => {
                                setfullSpecs(false)
                            }}

                        ></Cross>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <View style={{ width: 60, height: 8, backgroundColor: '#105BE3', borderRadius: 10 }}></View>
                            <View style={{ width: 10, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10 }}></View>
                        </View>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 25, marginTop: 10, alignSelf: 'center', textAlign: 'center', marginBottom: 10 }}>See how they stack up</Text>

                        <View style={{ flexDirection: 'row', padding: 20, }}>
                            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>


                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, alignSelf: 'flex-start' }}>{'SB1'}</Text>

                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, alignSelf: 'flex-start' }}>{'SBPro'}</Text>
                            </View>
                        </View>
                        <ScrollView style={{ padding: 10 }}>
                            {Content.map((itemx, c) => {
                                return (
                                    <View style={{ flexDirection: 'row', padding: 20, backgroundColor: c % 2 == 0 ? '#F2F2F2' : '#ffffff' }}>
                                        <View style={{ flex: 1.1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 16, alignSelf: 'flex-start', color: 'black' }}>{itemx.title}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 5 }}>
                                            {itemx.SB1 == 'Tick' ? (
                                                <Check size={30} color={'#105BE3'} name={'check'}></Check>

                                            ) : (null)}

                                            {itemx.SB1 == 'hifen' ? (<View style={{ width: 20, borderWidth: 1 }}></View>) : (null)}


                                            {itemx.SB1 != 'hifen' && itemx.SB1 != 'Tick' && itemx.SB1 != 'colorLayout' ? (<Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 16, alignSelf: 'flex-start' }}>{itemx.SB1}</Text>) : (null)}

                                            {/* {itemx.SB1 != 'hifen' && itemx.SB1 != 'Tick' && itemx.SB1 != 'colorLayout'?(<Text style={{ fontFamily: 'ModernEra-Regular', fontSize:16, alignSelf: 'flex-start' }}>{itemx.SB1}</Text>):(null)} */}

                                            {itemx.SB1 == 'colorLayout' ? (<View style={{}}>
                                                {colorArray.map((color, c) => {
                                                    return (
                                                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <View style={{ width: 20, height: 20, backgroundColor: color.color, margin: 7, borderRadius: 5, alignSelf: 'flex-start' }}></View>
                                                            <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 12, alignSelf: 'flex-start', alignSelf: 'center', textAlign: 'left' }}>{color.name}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                                }
                                            </View>) : (null)}

                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            {itemx.SBPro == 'Tick' ? (
                                                <Check size={30} color={'#105BE3'} name={'check'} style={{ alignSelf: 'flex-start' }}></Check>
                                            ) : (null)}
                                            {itemx.SBPro == 'hifen' ? (<View style={{ width: 20, borderWidth: 1 }}></View>) : (null)}
                                            {itemx.SBPro != 'hifen' && itemx.SBPro != 'Tick' && itemx.SBPro != 'colorLayout' ? (<Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 16, alignSelf: 'flex-start' }}>{itemx.SB1}</Text>) : (null)}

                                            {itemx.SBPro == 'colorLayout' ? (<View style={{}}>
                                                {colorArray.map((color, c) => {
                                                    return (
                                                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                            <View style={{ width: 20, height: 20, backgroundColor: color.color, margin: 7, borderRadius: 5, alignSelf: 'flex-start' }}></View>
                                                            <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 12, alignSelf: 'flex-start', alignSelf: 'center', textAlign: 'left' }}>{color.name}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                                }
                                            </View>) : (null)}
                                        </View>
                                    </View>
                                )
                            })
                            }
                        </ScrollView>
                    </View>

                </Modal>

                <Loader loading={loading}></Loader>
                <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 35, marginTop: 0, alignSelf: 'center', textAlign: 'center' }}>Select your model</Text>

                <FlatList
                    contentContainerStyle={{ paddingBottom: 200 }}
                    ListFooterComponent={() => <TouchableOpacity
                        onPress={() => {
                            setfullSpecs(true)
                        }}
                        style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 25, alignSelf: 'center', textAlign: 'center', color: '#105BE3' }}>{'Compare full specs'} </Text>
                        <Menu name={'menu'} color={'#105BE3'} size={40} style={{}}  ></Menu>
                    </TouchableOpacity>}
                    data={models}
                    keyExtractor={(item, index) => item.itemId}
                    renderItem={({ item, index }) => (
                        <View
                            onPress={() => {
                                // console.log('My Image Path ==>'+'@assets/images/'+item.modelName.toLowerCase() + '-' + item.selectedColor.replace(' ', '-').toLowerCase() + '.jpg')
                            }}
                            style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, margin: 15, elevation: 5, borderBottomWidth: 2, borderColor: '#D0C5B6', paddingBottom: 50 }}>


                            {item && item.selectedColor && item.modelName ? (<Image style={{ width: 200, height: 200 }}
                                source={ImageA[item.modelName.toLowerCase() + item.selectedColor.replace(' ', '').toLowerCase()]}
                                resizeMethod={'contain'}>
                            </Image>) : (<Image style={{ width: 200, height: 200 }}
                                source={require('@assets/images/sb1-gray.jpg')}
                                resizeMethod={'contain'}>
                            </Image>)}

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                <View style={{ width: 60, height: 8, backgroundColor: '#105BE3', borderRadius: 10 }}></View>
                                <View style={{ width: 10, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10 }}></View>
                            </View>
                            <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 30, alignSelf: 'center', textAlign: 'center', marginTop: 20 }}>{item.modelName}</Text>
                            <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 20, alignSelf: 'center', textAlign: 'center', marginTop: 20, margin: 10 }}>{item.description}</Text>

                            <View style={{ flexDirection: 'row' }}>
                                {item.colorList.map((color, c) => {
                                    return (
                                        <TouchableOpacity onPress={() => selectColor(item.itemId, color)} style={{ flexDirection: 'row' }}>
                                            <View style={{ width: 50, height: 50, backgroundColor: colorObject[color], margin: 7, borderRadius: 10, borderWidth: color === item.selectedColor ? 4 : 0, borderColor: '#031931' }}></View>
                                        </TouchableOpacity>
                                    )
                                })
                                }
                            </View>
                            {index === 0 ?
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 17 }}>Excellent sound quality</Text>
                                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 17, marginTop: 5 }}>Manual control of advanced features</Text>
                                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 17, marginTop: 5 }}>Excellent value</Text>
                                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 17, marginTop: 5 }}>Discreet, barely visible</Text>
                                </View>
                                :
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 17 }}>Our highest fidelity hearing aids</Text>
                                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 17, marginTop: 5 }}>Fully automatic feature activation</Text>
                                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 17, marginTop: 5 }}>Designed for an active lifestyle</Text>
                                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 17, marginTop: 5 }}>Discreet, barely visible </Text>
                                </View>
                            }
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 20 }}>
                                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 30, alignSelf: 'center', textAlign: 'center', color: 'black', alignSelf: 'flex-start' }}>{formatter.format(item.price * 2)}</Text>
                                    <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 16, alignSelf: 'center', textAlign: 'center', color: 'black', alignSelf: 'flex-start', marginTop: 20 }}>PER PAIR</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('CartScreen', {
                                                selectedModel: item
                                            })
                                        }}
                                        style={{ width: 150, height: 70, backgroundColor: '#105BE3', borderRadius: 10, elevation: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 20, alignSelf: 'center', textAlign: 'center', color: 'white' }}>Select {item.modelName}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        );
}

export default ModelSelection;


