import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform,Dimensions,PermissionsAndroid } from 'react-native';
import HTML from 'react-native-render-html';
import { Main } from './../config/Connectors.js';
import Download from 'react-native-vector-icons/FontAwesome'
import RNFetchBlob from 'rn-fetch-blob';
import PDFView from 'react-native-view-pdf';


const DocumentsScreen = ({ session, documentsData}) => {


  const checkPermission = async (documentsData) => {
    if (Platform.OS === 'ios') {
      downloadImage(documentsData);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadImage(documentsData);
        } else {
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const downloadImage = (image_URL) => {
    console.log('Image ==>'+image_URL)
    let date = new Date(); 
    let ext = getExtention(image_URL);
    ext = '.' + 'pdf';
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/KeypressApp' + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
        description: 'PDF Document',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));
        alert('PDF Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    //To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
 
  React.useEffect(() => {
  }, []);
  return (
    <View style={styles.container}>
        
        {documentsData != ''?<TouchableOpacity onPress={()=>{checkPermission(documentsData)}}
          style={{backgroundColor:'#08225D',alignSelf:'flex-end',borderRadius:10,marginRight:20,paddingLeft:10,paddingRight:10,flexDirection:'row',padding:10,justifyContent:'center',alignItems:'center'}}>
            <Download name ={'download'} size={20} style={{color:'#ffffff',marginRight:4}}></Download>
            <Text style={{fontFamily:'LibreFranklin-Medium',color:'#ffffff',fontSize:15}}>Download PDF</Text>
        </TouchableOpacity>:null}
         {Platform.OS == 'ios'?( <HTML
            containerStyle={{width:Dimensions.get('window').width,height:Dimensions.get('window').height-400,margin:10}}
            html={ '<iframe src= '+documentsData+' frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'}
         />):(null)}  
         {Platform.OS == 'android' && documentsData != '' && documentsData != undefined?(<PDFView
            fadeInDuration={250.0}
            style={{ width:Dimensions.get('window').width-50,height:Dimensions.get('window').height-200}}
            resource={documentsData}
        /> ):(null)}
    </View>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  
});
