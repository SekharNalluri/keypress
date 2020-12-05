import React from "react";
import {
    View, StyleSheet, TextInput, Text
} from "react-native";

export default (props) => (
    <View >
        <Text style={styles.name} > {props.name}</Text>
        <View style={props.error ? styles.wrongInputView : styles.inputView}>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                underlineColorAndroid="transparent"
                secureTextEntry={props.password}
            />
            <Text style={styles.icon} >
                {props.children}
            </Text>
        </View>
    </View>

);


const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        width: '100%',
        height: 50,
    },
    icon: {
        padding: 10,
    },
    name: {
        paddingBottom: 6,
        paddingTop: 16,
    },
    input: {
        flex: 1,
        padding: 10,
        color: '#424242',
    },
    wrongInputView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        width: '100%',
        height: 50,
        borderColor: 'red',
        borderWidth: 1
    },
})