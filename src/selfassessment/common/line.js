import React from "react";
import {
    View
} from "react-native";

export default (props) => (
    <View style={{ flexDirection: 'row', marginTop: props.marginTop ? props.marginTop : 80 }}>
        <View style={{ width: 100, height: 8, backgroundColor: '#105BE3', borderRadius: 10 }}></View>
        <View style={{ width: 30, height: 8, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10 }}></View>
    </View>)

