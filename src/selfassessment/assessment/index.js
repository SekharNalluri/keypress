import React from "react";
import {
    View, Text, Image, TouchableOpacity, ScrollView, StyleSheet
} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { EndPoints } from '../../config/Connectors.js'
import Loader from '../../Loader/index'
import Line from './../common/line'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (props) => {

    const { navigation } = props;
    const routeData = props.route.params.dataForApiC;
    const [loading, setLoading] = React.useState(false);
    const paragraphA = [
        'A quiet environment. Avoid sitting near an air conditioning vent or open window if outside sounds may distract you. Turn off all programs on your device that may play notifications.',
        'Working headphones; they can be wired or wireless, as long as they work in both ears',
        'At least 10 minutes to take the test.'
    ];

    const startSession = () => {
        setLoading(true);
        axios.post(
            EndPoints.StartSession,
            { entityId: routeData.entityId, clinicId: routeData.clinicId },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            setLoading(false);
            try {
                AsyncStorage.setItem('SESSION_GUID', res.data.sessionGuid);
            } catch (error) {
                throw error;
            }
            navigation.navigate('TestHeadphones');
        }).catch((err) => {
            setLoading(false);
            console.log("Error while starting session: " + JSON.stringify(err));
        })

    }



    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <Loader loading={loading}>
                    </Loader>
                    <View >
                        <View style={styles.innerContainer}>
                            <Image
                                style={styles.image}
                                resizeMode={'cover'}
                                source={{
                                    uri: 'https://onlinehearingtestwepapp.azurewebsites.net//Assets/Images/sb-welcome-image.JPG',
                                }}
                            />
                            <Line />

                            <Text style={styles.headers}>Welcome to the self-{'\n'}guided hearing{'\n'}assessment</Text>
                            <Text style={styles.paragraphHeader}>For this hearing test to be accurate, you’ll need:</Text>

                            {paragraphA.map((item, index) => {
                                return (
                                    <View key={index} style={styles.paragraphView}>
                                        <View >
                                            <Text><Icon name={'dot-single'} size={22} /></Text>
                                        </View>
                                        <View >
                                            <Text style={styles.paragraphText}>
                                                {item}</Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>

                    </View>
                </ScrollView>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        startSession()
                    }}
                >
                    <Text style={styles.buttonText}>Get started</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.95,
        backgroundColor: '#ffffff',
        flexDirection: 'row'
    },

    innerContainer: {
        marginTop: 50,
        padding: 20
    },
    image: {
        width: '95%',
        height: 400,
        borderRadius: 30,
        alignSelf: 'center'
    },
    headers: {
        fontFamily: 'ModernEra-Black',
        fontSize: 30,
        marginTop: 20,
        marginBottom: 20
    },
    paragraphHeader: {
        fontFamily: 'ModernEra-Regular',
        fontSize: 18,
        marginTop: 30,
        alignSelf: 'flex-start',
        marginBottom: 20,
        color: '#001B39',
    },
    paragraphText: {
        fontFamily: 'ModernEra-Regular',
        fontSize: 18,
        color: '#001B39',
        marginBottom: 10,
        margin: 10
    },
    button: {
        width: '90%',
        height: 50,
        backgroundColor: '#105BE3',
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center', alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        fontFamily: 'LibreFranklin-Black',
        fontSize: 17,
        alignSelf: 'center',
        textAlign: 'center',
        color: '#ffffff'
    },
    paragraphView: {
        flexDirection: 'row',
        paddingRight: 20
    }
})