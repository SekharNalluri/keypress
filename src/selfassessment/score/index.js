import React, { useEffect, useState } from "react";
import {
    View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Entypo';
import Line from '../common/line';
import { HearText } from './assets/heartext.data';
import { Images } from '../../config/Images'
import { SvgUri } from 'react-native-svg';


export default (props) => {
    const { navigation } = props;
    const [name, setName] = useState('Phani');
    const [view, setView] = useState(1);
    const [score, setScore] = useState(1);

    const renderHearText = (text) => (
        <View>
            {
                text.map((t, i) => (
                    i == 0 ?
                        (<Text style={styles.clickText} key={i}>{t}</Text>) :
                        (<View style={{ flexDirection: 'row' }} key={i}>
                            <Icon name={'dot-single'} size={22} />
                            <Text style={styles.hearText} >
                                {t}
                            </Text>
                        </View>)
                ))
            }
        </View >
    )

    const renderHearTextMean = (text) => (
        <View>
            {
                text.map((t, i) => {
                    if (i == 0) return <Text style={styles.hearMeaningHeader} key={i}>{t}</Text>
                    if (i == 1) return <Text style={styles.hearMeaningPara} > {t}</Text>

                    return (<View style={{ flexDirection: 'row' }} key={i}>
                        <Icon name={'check'} size={18} color={"#1013e3"} />
                        <Text style={styles.hearMeaningText} > {t}</Text>
                    </View>)
                })
            }
        </View >
    )

    const renderHearingAidsText = (text) => (
        <View>
            <View style={styles.hearingAidsHeaderView}>
                <Text >
                    <Text style={styles.hearingAidsHeader}>{text[0]}</Text>
                    <Text style={styles.hearingAidsHeaderBlue}  >{text[1]}</Text>
                    <Text style={styles.hearingAidsHeader} >{text[2]}</Text>
                </Text>
            </View>

            {
                text.map((t, i) => {
                    // if (i == 0) return <Text style={styles.hearingAidsHeader} key={i}>{t}</Text>
                    // if (i == 1) return <Text style={styles.hearingAidsHeaderBlue} key={i} >{t}</Text>
                    // if (i == 2) return <Text style={styles.hearingAidsHeader} key={i}>{t}</Text>

                    return (<View style={{ flexDirection: 'row' }} key={i}>
                        <Icon name={'dot-single'} size={22} />
                        <Text style={styles.hearText} >{t} </Text>
                    </View>)
                })
            }
        </View >
    )

    const renderYourNotAlone = (text) => (
        <>
            <Text style={styles.hearMeaningHeader}>{text[0]}</Text>
            {text.length < 5 && (<><Image
                style={styles.yourNotAloneImg}
                source={Images.hearingloss}
            />
                <Text>
                    <Text style={styles.yourNotAloneText}>{text[1]}</Text>
                    <Text style={styles.yourNotAloneTextBold}>{text[2]}</Text>
                    <Text style={styles.yourNotAloneText}>{text[3]}</Text></Text></>)}
            {text.length > 5 && (
                <>
                    <Image
                        style={styles.yourNotAloneImg}
                        source={Images.hearingloss}
                    />
                    <Text>
                        <Text style={styles.yourNotAloneText}>{text[1]}</Text>
                        <Text style={styles.yourNotAloneTextBold}>{text[2]}</Text>
                        <Text style={styles.yourNotAloneText}>{text[3]}</Text></Text>
                    <Image
                        style={styles.yourNotAloneImg}
                        source={Images.tinnitus}
                    /><Text>
                        <Text style={styles.yourNotAloneTextBold}>{text[4]}</Text>
                        <Text style={styles.yourNotAloneText}>{text[5]}</Text></Text>

                    <Image
                        style={styles.yourNotAloneImg}
                        source={Images.hearingaid}
                    /><Text>
                        <Text style={styles.yourNotAloneText}>{text[6]}</Text>
                        <Text style={styles.yourNotAloneTextBold}>{text[7]}</Text>
                        <Text style={styles.yourNotAloneText}>{text[8]}</Text></Text>
                </>
            )}



        </>
    )

    const renderImageText = (img, text) => (
        <View>
            <Image style={styles.image} source={{ uri: img }}>
            </Image>
            <Text style={styles.imageHeader} >
                {text[0]}
            </Text>
            <Text style={styles.imagePara} >
                {text[1]}
            </Text>
        </View >
    )

    return (
        <>
            {
                view == 1 && (<View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView} style={{ flex: 1 }}>
                        <View style={styles.header}>
                            <Line />
                            <Text style={styles.text}>{`${name}, ${HearText[score].scoreTitleGreetings}`}</Text>
                            <Text style={styles.headScore}>{HearText[score].scoreTitle}</Text>
                        </View>

                        <View style={styles.scoreView}>
                            <ImageBackground
                                style={styles.scoreCard}
                                source={{ uri: `https://onlineassessmentwebapp-development1.azurewebsites.net//Assets/Images/res-hs-vis-${score}.png` }}>
                                <Text style={styles.score}><Text style={styles.mainScore}>{score}</Text>/10</Text>
                                <Text style={styles.scoreHelp}>10 being the best </Text>
                            </ImageBackground>
                        </View>

                        <View style={styles.hearTextView}>
                            {renderHearText(HearText[score].youHear)}
                        </View >

                        <View style={styles.next}>
                            <TouchableOpacity onPress={() => setView(view + 1)}>
                                <View style={styles.nextView}>
                                    <Text style={styles.nextText}>
                                        {'next '}<Icon name={'chevron-thin-right'} size={20} />
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </ScrollView>

                </View>)
            }

            {
                view == 2 && (<View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView} style={{ flex: 1 }}>
                        <View style={styles.header}>
                            <Line />
                            {renderHearTextMean(HearText[score].scoreMean)}
                        </View >

                        <View style={styles.next}>
                            <TouchableOpacity onPress={() => setView(view + 1)}>
                                <View style={styles.nextView}>
                                    <Text style={styles.nextText}>
                                        {'next '}<Icon name={'chevron-thin-right'} size={20} />
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </ScrollView>

                </View>)
            }

            {
                view == 3 && (<View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView} style={{ flex: 1 }}>

                        {renderImageText("https://onlineassessmentwebapp-development1.azurewebsites.net//Assets/Images/res-img-noisy-env.jpg", HearText[score].inNoisyEnvironment)}
                        {renderImageText("https://onlineassessmentwebapp-development1.azurewebsites.net//Assets/Images/res-img-mask.jpg", HearText[score].mask)}

                        <View style={styles.next}>
                            <TouchableOpacity onPress={() => {
                                HearText[score].hearingAids.length ? setView(view + 1) : setView(view + 2)
                            }}>
                                <View style={styles.nextView}>
                                    <Text style={styles.nextText}>
                                        {'next '}<Icon name={'chevron-thin-right'} size={20} />
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </ScrollView>

                </View>)
            }

            {
                view == 4 && (<View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView} style={{ flex: 1 }}>
                        <Image style={styles.hearingaidManImage} source={{ uri: "https://onlineassessmentwebapp-development1.azurewebsites.net//Assets/Images/res-img-hearingaid-portrait.jpg" }}></Image>

                        <Image style={styles.hearingaidImage} source={{ uri: "https://onlineassessmentwebapp-development1.azurewebsites.net//Assets/Images/sbpro-gray@2x.png" }}></Image>

                        {renderHearingAidsText(HearText[score].hearingAids)}


                        <View style={styles.next}>
                            <TouchableOpacity onPress={() => setView(view + 1)}>
                                <View style={styles.nextView}>
                                    <Text style={styles.nextText}>
                                        {'next '}<Icon name={'chevron-thin-right'} size={20} />
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </ScrollView>

                </View>)
            }
            {
                view == 5 && (<View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView} style={{ flex: 1 }}>
                        {renderYourNotAlone(HearText[score].notAlone)}
                        <View style={styles.next}>
                            <TouchableOpacity onPress={() => setView(view + 1)}>
                                <View style={styles.nextView}>
                                    <Text style={styles.nextText}>
                                        {'next '}<Icon name={'chevron-thin-right'} size={20} />
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </ScrollView>

                </View>)
            }
            {
                view == 6 && (<View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView} style={{ flex: 1 }}>

                        <Text style={styles.discliamer}> {HearText[score].hearingLoss}</Text>

                        <View style={{ width: '100%', marginTop: 50, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <LinearGradient colors={['#ED3D68', '#ED3A4E', '#ED3D39', '#EE5235']} style={{ width: '100%', borderRadius: 20, elevation: 3, justifyContent: 'center', alignItems: 'center', padding: 20 }}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 20, color: '#ffffff', marginTop: 50 }}>{HearText[score].proLed[0]}</Text>
                                <Text style={{ fontFamily: 'LibreFranklin-Regular', fontSize: 15, color: '#ffffff', alignSelf: 'center', textAlign: 'center', marginTop: 10 }}>{HearText[score].proLed[1]}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('Session')
                                    }}
                                    style={{ backgroundColor: '#ffffff', borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                    <Text style={{ fontFamily: 'LibreFranklin-Bold', fontSize: 16, color: '#105BE3' }}>{HearText[score].proLed[2]}</Text>
                                </TouchableOpacity>
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
                                <Text style={{ fontFamily: 'LibreFranklin-Black', fontSize: 20, color: '#ffffff', marginTop: 50 }}>{HearText[score].betterHearing[0]}</Text>
                                <Text style={{ fontFamily: 'LibreFranklin-Regular', fontSize: 15, color: '#ffffff', alignSelf: 'center', textAlign: 'center', marginTop: 10 }}>{HearText[score].betterHearing[1]}</Text>

                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('ModalSelection')
                                    }}
                                    style={{ backgroundColor: '#ffffff', borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center', padding: 10, marginBottom: 40 }}>
                                    <Text style={{ fontFamily: 'LibreFranklin-Bold', fontSize: 16, color: '#105BE3' }}>{HearText[score].betterHearing[2]}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <SvgUri
                                width={150}
                                height={150}
                                style={{ alignSelf: 'center', position: 'absolute', top: -60 }}
                                uri="https://onlineassessmentwebapp-development1.azurewebsites.net//Assets/Images/hearing-aid-illustration.svg"
                            />
                        </View>

                        <Text style={styles.discliamer} > {HearText[score].discliamer} </Text>



                    </ScrollView>

                </View>)
            }



        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollView: {
        padding: 30
    },
    hearMeaningHeader: {
        fontFamily: 'ModernEra-Black',
        fontSize: 30,
        marginTop: 20,
        marginBottom: 20
    },
    header: {
        width: '100%',
    },
    text: {
        fontFamily: 'ModernEra-Black',
        fontSize: 25,
        marginTop: 20,
    },
    headScore: {
        fontFamily: 'ModernEra-Black',
        fontSize: 25,
        color: '#0060FF',
    },
    clickText: {
        fontFamily: 'ModernEra-Black',
        fontSize: 20,
        marginBottom: 10
    },
    scoreView: {
        alignContent: 'center',
        marginVertical: 20
    },
    scoreCard: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    score: {
        fontSize: 22
    },
    scoreHelp: {
        fontSize: 18
    },
    mainScore: {
        fontWeight: 'bold',
        fontSize: 64
    },
    hearText: {
        fontSize: 18,
        marginBottom: 4
    },
    hearMeaningPara: {
        fontSize: 20,
        marginBottom: 16,
    },
    hearMeaningText: {
        fontSize: 20,
        marginBottom: 16,
        fontWeight: 'bold'
    },
    hearTextView: {
        width: '100%',
    },
    next: {
        paddingVertical: 20,
        alignItems: 'flex-end',
    },
    nextView: {
        alignItems: 'center',
    },
    nextText: {
        fontSize: 20,
        fontFamily: 'LibreFranklin-Black',
    },
    image: {
        marginTop: 50,
        width: 200,
        height: 200,
        borderRadius: 30,
        alignSelf: 'center'
    },
    imageHeader: {
        fontFamily: 'ModernEra-Black',
        fontSize: 20,
        marginVertical: 10,
        textAlign: 'center'
    },
    imagePara: {
        fontSize: 18,
        marginVertical: 10,
        textAlign: 'center'
    },
    centerText: {
        fontSize: 18,
        justifyContent: 'center',
        alignContent: 'center'
    },
    hearingAidsHeaderView: {
        marginTop: 60,
        marginBottom: 10
    },
    hearingAidsHeader: {
        fontFamily: 'ModernEra-Black',
        fontSize: 25,

    },
    hearingAidsHeaderBlue: {
        fontFamily: 'ModernEra-Black',
        color: '#0060FF',
        fontSize: 25,
    },
    hearingaidManImage: {
        marginTop: 50,
        width: 300,
        height: 300,
        borderRadius: 30,
        alignSelf: 'center'
    },
    hearingaidImage: {
        position: 'absolute',
        marginTop: 50,
        width: 100,
        height: 100,
        top: 280,
        left: 40
    },
    yourNotAloneImg: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 30
    },
    yourNotAloneText: {
        textAlign: 'center',
        fontSize: 20,
    },
    yourNotAloneTextBold: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    discliamer: {
        marginVertical: 20,
        fontSize: 16,
        textAlign: 'center'
    }
});

