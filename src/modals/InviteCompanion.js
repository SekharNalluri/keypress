import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet, Text, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign'
import Enty from 'react-native-vector-icons/Entypo'
import Arrow from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class InviteCompanion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            name: '',
            relation: '',
            email: '',
            enteredEmail: false
        };
    }
    validateEmail = (text) => {
        console.log(text)
        var M = false
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === true) {
            M = true
        }
        return M;
    }
    render() {
        const { showandhidemodal, onCancel ,onSubmit} = this.props
        const { name, relation, email, enteredEmail } = this.state
        return (
            <Modal isVisible={showandhidemodal} style={modalStyles.bottomModalMS}>
                
                <View style={modalStyles.contentFilterBottom}>
                <KeyboardAwareScrollView>
                    <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, paddingLeft: 10, borderBottomWidth: 2, paddingBottom: 10, borderBottomColor: '#E7E7E7' }}>
                        <Text style={{ fontFamily: 'LibreFranklin-Medium', fontSize: 22, marginTop: 10, flex: 0.8, textAlign: 'center', alignSelf: 'center' }}>Send Companion Invite</Text>
                        <Icon name="close" size={30} style={modalStyles.IconStyle} onPress={() => { onCancel() }} />
                    </View>
                    <View style={{ flexDirection: 'column',marginTop:20}}>
                        <Text style={{ fontFamily: 'LibreFranklin-Bold', fontSize: 20, color: '#262528' ,marginLeft:20}}>Name</Text>
                        <TextInput style={{ borderColor: '#D9D9D9', borderWidth: 2, height: 50, borderRadius: 5, marginTop: 10, paddingLeft: 10,width:'90%',alignSelf:'center' }}
                            placeholder={''}
                            value={name}
                            onChangeText={(text) => this.setState({ name: text })}
                        >
                        </TextInput>
                        <Text style={{ fontFamily: 'LibreFranklin-Bold', fontSize: 20, color: '#262528', marginTop: 5 ,marginLeft:20}}>Relation</Text>
                        <TextInput style={{ borderColor: '#D9D9D9', borderWidth: 2, height: 50, borderRadius: 5, marginTop: 10, paddingLeft: 10 ,width:'90%' ,alignSelf:'center'}}
                            placeholder={''}
                            value={relation}
                            onChangeText={(text) => this.setState({ relation: text })}
                        >
                        </TextInput>
                        <Text style={{ fontFamily: 'LibreFranklin-Bold', fontSize: 20, color: '#262528', marginTop: 5 ,marginLeft:20}}>Email</Text>
                        <TextInput style={{ borderColor: '#D9D9D9', borderWidth: 2, height: 50, borderRadius: 5, marginTop: 10, paddingLeft: 10 ,width:'90%',alignSelf:'center' }}
                            placeholder={''}
                            value={email}
                            onChangeText={(text) => this.setState({ email: text }, () => {
                                this.setState({ enteredEmail: this.validateEmail(this.state.email) }, () => { })
                            })}>
                        </TextInput>
                    </View>
                    <View style={{ flexDirection: 'row',justifyContent:'flex-end',alignItems:'flex-end',paddingRight:10,marginTop:10}}>
                        <TouchableOpacity onPress={() => { onCancel() }} style={{ padding: 10, backgroundColor: '#77A5DA', borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', margin: 5 }}>
                            <Icon name="close" size={20} style={{ color: 'white' }} />
                            <Text style={{ fontFamily: 'LibreFranklin-Medium', color: 'white', fontSize: 20 }}>Cancel</Text>
                        </TouchableOpacity>
                        {name != '' && relation != '' && email != '' && this.state.enteredEmail == true ? (<TouchableOpacity onPress={() => { onSubmit(name,relation,email)}} style={{ padding: 10, backgroundColor: '#09205E', borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', margin: 5 }}>
                            <Arrow name="send" size={20} style={{ color: 'white' }} />
                            <Text style={{ fontFamily: 'LibreFranklin-Medium', color: 'white', fontSize: 20, marginLeft: 2 }}>Send</Text>
                        </TouchableOpacity>) : (<TouchableOpacity onPress={() => { }} style={{ padding: 10, backgroundColor: '#9494B9', borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', margin: 5 }}>
                            <Arrow name="send" size={20} style={{ color: 'white' }} />
                            <Text style={{ fontFamily: 'LibreFranklin-Medium', color: 'white', fontSize: 20, marginLeft: 2 }}>Send</Text>
                        </TouchableOpacity>)}
                    </View>
                    </View>
                    </KeyboardAwareScrollView>
                </View>
               
            </Modal>
        );
    }

}

InviteCompanion.propTypes = {
    showandhidemodal: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit:PropTypes.func

};

InviteCompanion.defaultProps = {
    showandhidemodal: false,
    onCancel: () => { }
};

const modalStyles = StyleSheet.create({
    bottomModalMS: {
        justifyContent:'center',
        alignItems:'center'
    },
    contentFilterBottom: {
        width:'100%',
        padding:15,
        justifyContent:'center',
        backgroundColor:'#ffffff',
        borderRadius:25
    },
    content: {
        backgroundColor: 'white'
    },
    IconStyle: {
        alignSelf: 'flex-end',
        color: 'grey',
        marginTop: 10,
        flex: 0.1,
        alignSelf: 'center',
        alignItems: 'flex-end'
    }

});
