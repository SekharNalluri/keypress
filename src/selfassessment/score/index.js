import React, { useEffect, useState } from "react";
import {
    View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image
} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import Line from '../common/line'
import { HearText } from './assets/heartext'


export default (props) => {
    const { navigation } = props;
    const [name, setName] = useState('Siva');
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
                    if (i == 0)
                        return (<Text style={styles.hearMeaningHeader} key={i}>{t}</Text>)
                    if (i == 1)
                        return (
                            <Text style={styles.hearMeaningPara} >
                                {t}
                            </Text>
                        )

                    return (<View style={{ flexDirection: 'row' }} key={i}>
                        <Icon name={'check'} size={18} color={"#1013e3"} />
                        <Text style={styles.hearMeaningText} >
                            {t}
                        </Text>
                    </View>)
                })
            }
        </View >
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
                view == 4 && (<View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView} style={{ flex: 1 }}>
                        <Text style="centerText">Fortunately, with hearing aids, you could improve your HearScore to 9 which means: WIP</Text>

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
                        <Text style="centerText">You’re not alone! WIP</Text>

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

                        <TouchableOpacity onPress={() => navigation.navigate('ModalSelection')}>
                            <View style={styles.nextView}>
                                <Text style={styles.nextText}>
                                    {'Select devices '}<Icon name={'chevron-thin-right'} size={20} />
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('ModalSelection')}>
                            <View style={styles.nextView}>
                                <Text style={styles.nextText}>
                                    {'Schedule a Pro-Led Assessment '}<Icon name={'chevron-thin-right'} size={20} />
                                </Text>
                            </View>
                        </TouchableOpacity>


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
    }
});

