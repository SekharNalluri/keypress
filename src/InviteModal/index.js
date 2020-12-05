import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import Modal from "react-native-modal";

export default class QuantityPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            option: props.option,
            value: props.value
        };
    }

    componentDidMount() {
        const { option, value } = this.state;
    }

    openModal() {
        const { option, value } = this.state;
    }



    render() {
        const { onCancel ,modalVisible} = this.props;
        return (
            <Modal
                isVisible={modalVisible}
                style={styles.bottomModal}>
                <View style={styles.contentFilterBottom}>
                    <View style={styles.contentSwipeDown}>
                        <View style={styles.lineSwipeDown} />
                    </View>

                </View>
            </Modal>
        );
    }
}

QuantityPicker.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    value: PropTypes.string,
    option: PropTypes.array,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    modalVisible:PropTypes.bool
};

QuantityPicker.defaultProps = {
    style: {},
    label: "",
    value: "",
    onCancel: () => { },
    onChange: () => { }
};
