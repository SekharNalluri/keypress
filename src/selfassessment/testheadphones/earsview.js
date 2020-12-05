import React, { Component } from "react";
import {
    View, Text, TouchableOpacity, StatusBar, ImageBackground
} from "react-native";
import styles from "./styles";
import { SvgUri } from 'react-native-svg';
import { TouchableHighlight } from "react-native-gesture-handler";


export default class EarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            letfWhiteEar: "https://onlinehearingtestwepapp.azurewebsites.net/Assets/Images/icn-ear-left-white.svg",
            rightWhiteEar: "https://onlinehearingtestwepapp.azurewebsites.net/Assets/Images/icn-ear-right-white.svg",
            letfMagentaEar: "https://onlinehearingtestwepapp.azurewebsites.net/Assets/Images/icn-ear-left-magenta.svg",
            rightMagentaEar: "https://onlinehearingtestwepapp.azurewebsites.net/Assets/Images/icn-ear-right-magenta.svg",
        };


    }
    render() {
        const { letfWhiteEar, letfMagentaEar, rightWhiteEar, rightMagentaEar } = this.state;
        const { type, selected, onPress } = this.props;
        return (
            <TouchableHighlight style={selected ? styles.darkCircle : styles.circle} onPress={onPress} >
                <View>

               
                <View style={{ flexDirection: 'row' }}>
                    < SvgUri
                        width={25}
                        height={25}
                        style={{ alignSelf: 'center', opacity: (type == 'left' || type == 'both') ? 1 : 0.5 }}
                        uri={selected ? letfWhiteEar : letfMagentaEar}
                    />
                    < SvgUri
                        width={25}
                        height={25}
                        style={{ alignSelf: 'center', opacity: (type == 'right' || type == 'both') ? 1 : 0.5 }}
                        uri={selected ? rightWhiteEar : rightMagentaEar}
                    />

                </View >

                <Text style={{ fontFamily: 'LibreFranklin-Black', fontWeight: '400', marginTop: 5, color: selected ? '#fff' : '#EE0B77' }}>
                    {type == 'left' ? 'Left Ear' : (type == 'right' ? 'Right Ear' : 'Both Ears')}
                </Text>
                </View>
            </TouchableHighlight>

        )
    }
}