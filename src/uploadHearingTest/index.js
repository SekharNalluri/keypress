import React, { Component } from "react";
import {
    View, Text, ScrollView, TouchableOpacity, Image
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '../config/Images';
import { SvgUri } from 'react-native-svg';
import ImagePicker from 'react-native-image-picker';
import File from 'react-native-vector-icons/AntDesign'

import Modal from 'react-native-modal';

export default class UploadHearingTestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myFilename: '',
            myFileBase64:'',
            showandhidemodal:false
        };
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }

    selectImageFile = () => {
        const options = {
            title: 'Select Avatar',
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        // Open Image Library:
        ImagePicker.launchImageLibrary(options, (response) => {
            this.setState({myFilename:response.origURL,myFileBase64:response.data})

            //console.log('MyImage ==>'+JSON.stringify(response));

            // Same code as in above section!
        });
    }

    gup( name, url ) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    }

    render() {
        const { navigation } = this.props;

        const { myFilename ,showandhidemodal,myFileBase64} = this.state

        return (
            <View style={{ flex: 1 }}>
                 <Modal isVisible={showandhidemodal} style={{}}>
                    <View style={{width:'90%',height:'30%',backgroundColor:'white',alignSelf:'center'}}>
                    
                      <Image style={{width:'100%',height:'100%'}} source={{
                          uri: `data:image/jpeg;base64,${this.state.myFileBase64}`,
                        }}>
                      </Image>
                      <TouchableOpacity 
                       onPress={()=>{
                           this.setState({showandhidemodal:false})
                       }}
                      style={{width:30,height:30,borderRadius:15,backgroundColor:'red',position:'absolute',right:-5,top:-5,justifyContent:'center',alignItems:'center'}}>
                      
                      <File
                                    name={'close'}
                                    color={'#ffffff'}
                                    size={25}
                                >
                                </File>
                      </TouchableOpacity>
                    </View> 
                </Modal>
                <ScrollView contentContainerStyle={{ alignItems: "center", padding: 10, width: "100%", paddingTop: 100 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 80, height: 5, backgroundColor: '#105BE3', borderRadius: 10 }}></View>
                        <View style={{ width: 20, height: 5, backgroundColor: '#105BE3', borderRadius: 10, marginLeft: 10 }}></View>
                    </View>
                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 28, marginTop: 30, alignSelf: 'center', textAlign: 'center' }}>Upload your hearing{'\n'}test</Text>
                    <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 17, margin: 10, textAlign: 'center' }}>If you have not conducted a hearing test with Soundbenefits, but have a recent one conducted from another provider, please use the tool provided on this page to upload the results. Once you do so, you will be able to purchase the same high-quality hearing aids offered{'\n'}in clinical environments - {'\n'}programmed to your unique needs.</Text>
                    <Text style={{ fontFamily: 'ModernEra-Regular', fontSize: 17, margin: 10, textAlign: 'center' }}>We're also happy to schedule an{'\n'}appointment with our hearing care professionals to confirm these results through our virtual ProLed Assessment (at no extra cost to you.) Either way, we're excited to welcome you to a world of better hearing!</Text>


                    <View style={{ width: '90%', marginTop: 30, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <View style={{
                            borderRadius: 20, borderWidth: 2, borderColor: 'red', borderStyle: 'dashed', zIndex: 0, width: '100%', elevation: 3, justifyContent: 'center', alignItems: 'center', borderColor: '#105BE4', backgroundColor: '#F3F6FD', height: 300,
                        }}>
                            <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 23, alignSelf: 'center', textAlign: 'center' }}>Drag and drop your test here.</Text>
                            <Text style={{ fontFamily: 'ModernEra-Light', fontSize: 15, alignSelf: 'center', textAlign: 'center', marginTop: 20 }}>O R</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.selectImageFile()
                                }}
                            >
                                <Text style={{ fontFamily: 'LibreFranklin-Bold', fontSize: 17, alignSelf: 'center', textAlign: 'center', marginTop: 20, color: '#105BE4', borderWidth: 1, borderColor: '#105BE4', padding: 15, borderRadius: 10 }}>Browse files</Text></TouchableOpacity>
                        </View>
                        <SvgUri
                            width={150}
                            height={150}
                            style={{ alignSelf: 'center', position: 'absolute', top: -60 }}
                            uri='https://onlineassessmentwebapp-development1.azurewebsites.net//Assets/Images/illustration-laptop-audiogram-white.svg'
                        />
                    </View>
                    
                    {myFilename != ''?( <View style={{width:'100%'}}>
                        <View style={{ width: '90%', alignSelf: 'center', backgroundColor: '#cdcdcd', marginTop: 20, borderRadius: 10, flexDirection: 'row' ,padding:10}}>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                <File
                                    name={'file1'}
                                    color={'#031933'}
                                    size={30}
                                >
                                </File>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, alignSelf: 'flex-start', textAlign: 'left', }}>{this.gup('id',myFilename)}</Text>
                                <TouchableOpacity 
                                   onPress={()=>{
                                       this.setState({showandhidemodal:true})
                                   }}
                                   style={{ alignItems: 'flex-start', justifyContent: 'flex-start', alignSelf: 'flex-start' }}>
                                    <Text style={{ fontFamily: 'ModernEra-Black', fontSize: 18, alignSelf: 'flex-start', textAlign: 'left', textDecorationLine: 'underline', color: '#105BE3' }}>Review Upload</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                <File
                                    onPress={()=>{
                                        this.setState({myFilename:'',myFileBase64:''})
                                    }}
                                    name={'delete'}
                                    color={'#031933'}
                                    size={30}
                                >
                                </File>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('uploadAcknowledge')
                            }}
                            style={{ width: '80%', height: '15%', backgroundColor: '#105BE4', marginTop: 30, marginBottom: 100, borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <Text style={{ fontFamily: 'ModernEra-Black', color: '#fff', fontSize: 17 }}>Submit files</Text>
                        </TouchableOpacity>
                    </View>):(null)}
                    
                </ScrollView>
            </View>
        );
    }
}


