import React , { Component }from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { start } from '../signalR';
import axios from 'axios';
import { EndPoints, SESSIONID } from './../config/Connectors.js';
import Cache from './../config/index'
import PdfContent from 'react-native-view-pdf';
var  proxy = ''
// const {agreementData = {}}=props.agreementData;
// const [propsData,setPropsData] = React.useState({});
// const [accepted, setAccept] = React.useState(false);
// // const [FdaContent, setFDA] = React.useState('')
// //const [showFDA, setShowFDA] = React.useState(false)
// const [getpdfUrl,setpdfUrl] = React.useState('')

export default class AgreementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propsData:{},
      accepted:false,
      FdaContent:'',
      showFDA:false,
      getpdfUrl:''
    }
  }
  componentDidMount(){
  
  } 
  componentDidUpdate(prevProps, prevState) {
  }
  componentWillReceiveProps(propsData) {
    if(propsData.showWaiver !== this.props.agreementData.showWaiver){
      if(propsData.agreementData && propsData.agreementData.showWaiver && propsData.agreementData.showWaiver == true){
        if(this.state.showFDA == false){
          this.setState({showFDA:true})
        }
        axios.get(EndPoints.SystemSettings+'?name=FDAWaiver').then(response => {
          if(this.state.FdaContent == ''){
            this.setState({FdaContent:response.data.value})
          } 
          
        })
      }else if(propsData.agreementData.showWaiver == false){
        if(this.state.showFDA == true && this.state.FdaContent != ''){
          this.setState({showFDA:false},()=>{
            this.setState({FdaContent:''})
          })
        }

        
      }
    }
   
   
  }

  onPress = () => {
    axios.post(
      EndPoints.AddAcknowledgement,
      {
        sessionId: JSON.parse(Cache.getData('LOADSESSION')).sessionId/1,
        type: 'FDAAcknowledgement',
        role: 'patient',
        name: JSON.parse(Cache.getData('LOADSESSION')).patientName+''
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      console.log('Request ==>',{
        sessionId: JSON.parse(Cache.getData('LOADSESSION')).sessionId/1,
        type: 'FDAAcknowledgement',
        role: 'patient',
        name: JSON.parse(Cache.getData('LOADSESSION')).patientName+''
      })

      if(res && res.data && res.data.message && res.data.message == 'OK'){
        this.props.updateTermsAccepted(JSON.parse(Cache.getData('LOADSESSION')).sessionId/1)   

        //proxy.invoke('setProviderAgreementsState', JSON.parse(Cache.getData('LOADSESSION')).sessionId/1,{ patientAcceptedWaiver: true});
          this.setState({accepted:true})
        }else{
         alert('Failure From Backend While Accepting Agrements')
       }

    })
  
  };

  render(){
    const{showFDA,FdaContent,accepted,getpdfUrl} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
  
          {showFDA == true ? (<View>
            <Text style={styles.header}>FDA Acknowledgement</Text>
            <View style={styles.fda}>
              <Text style={{ alignSelf: 'center', textAlign: 'left' }}>
                {FdaContent}
              </Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {!accepted && (
                <TouchableOpacity onPress={() =>{this.onPress()}}  style={styles.darkButton}>
                  <Text style={styles.whiteText}>Accept</Text>
                </TouchableOpacity>
              )}
              {accepted && (
                <Text style={styles.accepted}>
                  {<Icon name={'check'} size={18} color="green" />} You accepted FDA Acknowledgement
                </Text>
  
              )}
            </View>
          </View>) : (null)} 
  
            <PdfContent
              style={{width:Dimensions.get('window').width,height:(Dimensions.get('window').height)-50}}
              resource={'http://samples.leanpub.com/thereactnativebook-sample.pdf'}
             
            /> 
  
        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    paddingBottom: 20,
  },
  fda: { marginBottom: 40, fontSize: 12 },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    margin: 10
  },
  darkButton: {
    backgroundColor: '#193371',
    padding: 10,
    margin: 10,
    width: '100%%',
    alignItems: 'center',
    borderRadius: 4,
  },
  whiteText: {
    fontSize: 18,
    color: '#fff',
  },
  accepted: {
    fontSize: 18,
    color: 'green',
    textAlign: 'center',
  },
 });




/*const AgreementScreen =  (props) => {
  const {agreementData = {}}=props.agreementData;
  const [propsData,setPropsData] = React.useState({});
  const [accepted, setAccept] = React.useState(false);
 // const [FdaContent, setFDA] = React.useState('')
  //const [showFDA, setShowFDA] = React.useState(false)
  const [getpdfUrl,setpdfUrl] = React.useState('')
  var showFDA = true
  var FdaContent = ''
    //setShowFDA(state.showWaiver)
    showFDA = agreementData.showWaiver
    if(showFDA){
      axios.get(EndPoints.SystemSettings+'?name=FDAWaiver').then(response => {
        //setFDA(response.data.value)
        FdaContent = response.data.value
     })
    }
   /* axios.get(EndPoints.SystemSettings+'?name=FDAWaiver').then(response => {
          setFDA(response.data.value)
    })

  const onPress = () => {
    axios.post(
      EndPoints.AddAcknowledgement,
      {
        sessionId: JSON.parse(Cache.getData('LOADSESSION')).sessionId/1,
        type: 'FDAAcknowledgement',
        role: 'patient',
        name: JSON.parse(Cache.getData('LOADSESSION')).patientName+''
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {

      if(res && res.data && res.data.message && res.data.message == 'OK'){
         proxy.invoke('setProviderAgreementsState', JSON.parse(Cache.getData('LOADSESSION')).sessionId/1,{ patientAcceptedWaiver: true});
         setAccept(true)
       }else{
         alert('Failure From Backend While Accepting Agrements')
       }

    })
  
  };

  // const connect = async () => {
  //   // proxy = await start();

  //   proxy.on('setPatientAgreementsState', (state) => {
  //     console.log('setPatientAgreementsState===>'+JSON.stringify(state))
  //     setShowFDA(state.showWaiver)
  //     axios.get(EndPoints.SystemSettings+'?name=FDAWaiver').then(response => {
  //        setFDA(response.data.value)
  //     })
  //   });
  // };

  const handlePageChanged = (page, pageCount) => {
    console.log(`page ${page + 1} out of ${pageCount}`);
  }

  const handleOnScrolled = (offset) => {
    console.log(`offset is: ${offset}`);
  }

  const handleLoad = () => {
    console.log('Loaded Done.')
  }

  
  const handleError = (error) => {
   console.log('File Loaded Error.')
  }

  

  React.useEffect(() => {
    console.log('My Agreement State From Wizard ==>'+JSON.stringify(propsData.agreementData))
   // 
    if(propsData.agreementData && propsData.agreementData.showWaiver && propsData.agreementData.showWaiver == true){
      setShowFDA(props.agreementData.showWaiver)
      axios.get(EndPoints.SystemSettings+'?name=FDAWaiver').then(response => {
         setFDA(response.data.value)
       })
  }
    
  }, []);

  Icon.loadFont();
  const CheckIcon = <Icon name={'check'} size={18} color="green" />;

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>

        {showFDA == true ? (<View>
          <Text style={styles.header}>FDA Acknowledgement</Text>
          <View style={styles.fda}>
            <Text style={{ alignSelf: 'center', textAlign: 'left' }}>
              {FdaContent}
            </Text>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {!accepted && (
              <TouchableOpacity onPress={onPress} style={styles.darkButton}>
                <Text style={styles.whiteText}>Accept</Text>
              </TouchableOpacity>
            )}
            {accepted && (
              <Text style={styles.accepted}>
                {CheckIcon} You accepted FDA Acknowledgement
              </Text>

            )}
          </View>
        </View>) : (null)} 

        {/* <PdfContent
            style={{width:Dimensions.get('window').width,height:(Dimensions.get('window').height)-50}}
            resource={getpdfUrl}
            onLoad={handleLoad}
            onError={handleError}
            onPageChanged={handlePageChanged}
            onScrolled={handleOnScrolled}
          /> *

      </View>
    </View>
  );
};*/

// 