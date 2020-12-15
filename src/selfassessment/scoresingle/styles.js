import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
        fontSize: 20,
        textAlign: 'center'
    },
    divider: {

        borderBottomWidth: 1,
        opacity: 0.1,
        marginVertical: 20,
        shadowColor: 'black',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1.0,
    }
});
