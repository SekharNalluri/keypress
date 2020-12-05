import React from "react";
import {
    View, Text, StyleSheet
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { SvgUri } from 'react-native-svg';
import EarView from './earsview'
import NextPreviousButtons from "../nextpreviousbutton/nextpreviousbutton";
import { ScrollView } from "react-native-gesture-handler";
import Cache from '../../config/index';
import Line from './../common/line'


export default (props) => {

    const { navigation } = props;
    const [selected, setSelected] = React.useState('');

    const setPrimaryEar = (ear) => {
        setSelected(ear);
        Cache.setData('MyPrimaryEar', ear)
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.innerContainer}>
                    <Line />
                    <Text style={styles.header}>Which ear do you hear{'\n'}best with?</Text>

                    <Text style={styles.hintText}>
                        Hint: It’s typically the one you answer the phone with.
                    </Text>
                    <LinearGradient colors={['#ED3D68', '#ED3A4E', '#ED3D39', '#EE5235']}
                        style={styles.gradient}>
                        <SvgUri
                            width={700}
                            height={600}
                            style={styles.svg}
                            uri="https://onlinehearingtestwepapp.azurewebsites.net/Assets/Images/soundwave.svg"
                        />
                        <Text style={styles.gradientText}>
                            Select which ear you hear{'\n'}best with.
                        </Text>

                        <View style={styles.earView}>
                            <EarView selected={selected == 'left'} type='left' onPress={() => { setPrimaryEar('left') }} />
                            <EarView selected={selected == 'right'} type='right' onPress={() => { setPrimaryEar('right') }} />
                        </View>
                    </LinearGradient>
                </View>
            </ScrollView>

            <NextPreviousButtons
                enableButton={selected != ''}
                onPreviousPress={() => {
                    navigation.navigate('DemoVideo')
                }}
                onNextPress={() => {
                    navigation.navigate('HearingTest')
                }} />

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row'
    },
    scrollContainer: {
        padding: 10
    },
    innerContainer: {
        flex: 1,
        paddingLeft: 10,
        marginVertical: 80,
        width: '100%',
        alignContent: 'space-between'
    },
    header: {
        fontFamily: 'ModernEra-Black',
        fontSize: 25,
        marginTop: 10,
        marginBottom: 20
    },
    hintText: {
        fontFamily: 'ModernEra-Regular',
        fontSize: 20, marginTop: 10,
        marginBottom: 20,
        color: '#001B39'
    },
    gradient: {
        width: '95%',
        borderRadius: 20,
        elevation: 3,
        paddingVertical: 40,
        paddingHorizontal: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    svg: {
        alignSelf: 'center',
        position: 'absolute',
        top: 0,
        left: -16,
        right: 0,
        bottom: 0,
    },
    earView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    gradientText: {
        fontFamily: 'ModernEra-Regular',
        fontSize: 23, marginTop: 30,
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center'
    },
});
