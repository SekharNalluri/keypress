import React from "react";
import {
    View, Text, StyleSheet, TouchableOpacity, ScrollView
} from "react-native";
import Line from '../common/line'
import Icon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Input from "../common/input";



export default (props) => {
    const { navigation } = props;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>

                <Line />
                {/* <Text style={styles.text}>Sign in to get started</Text>
                <Text style={styles.clickText}>Before you can purchase, please login or create an account.</Text> */}

                <Text style={styles.text}>Log in to your Account</Text>

                <Input placeholder={'Email address'} name={'Email address'}>
                    <Icon name={'check'} size={18} color={"#1013e3"} />
                </Input>
                <Input placeholder={'Password'} name={'Password'} password={true} error={'en'}>
                    <AntIcon name={'exclamationcircleo'} size={18} color={"red"} />
                </Input>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        startSession()
                    }}
                >
                    <Text style={styles.buttonText}>Sign-in</Text>
                </TouchableOpacity>

                <View style={styles.line} />
                <Line marginTop={40} />
                <Text style={styles.text}>New to SoundBenefits?</Text>
                <Text style={styles.clickText}>Here are a few reasons to create an account.</Text>
                <Text style={styles.clickText}> <Icon name={'check'} size={18} color={"#1013e3"} /> View all your hearing device info in one place.</Text>
                <Text style={styles.clickText}> <Icon name={'check'} size={18} color={"#1013e3"} /> Create and manage hearing appointments.</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        startSession()
                    }}
                >
                    <Text style={styles.buttonText}>Create an account</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    innerContainer: {
        flex: 0.95,
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    },
    text: {
        fontFamily: 'ModernEra-Black',
        fontSize: 25,
        marginTop: 20,
        marginBottom: 20
    },
    svgView: {
        alignContent: 'center'
    },
    svg: {
        left: -150
    },
    clickText: {
        fontFamily: 'ModernEra-Black',
        fontSize: 18,
        fontWeight: "600",
        alignSelf: 'center',
        marginBottom: 10
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#105BE3',
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center', alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        fontFamily: 'LibreFranklin-Black',
        fontSize: 17,
        alignSelf: 'center',
        textAlign: 'center',
        color: '#ffffff'
    },
    line: {
        marginHorizontal: 10,
        marginTop: 40,
        borderBottomColor: '#E3E7EA',
        borderBottomWidth: 1,
    }
});

