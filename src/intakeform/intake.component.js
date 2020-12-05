import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {defaultForm, validateForm} from './util';
import Icon from 'react-native-vector-icons/FontAwesome';
import IntakeButton from './components/intake.button.component';
//import IntakeButton from './components/intake.yn.button.component';
import DateTimePicker from '@react-native-community/datetimepicker';
//import { Dropdown } from 'react-native-material-dropdown';
import service from '../../src/store/actioncreators/patient.actioncreator';
import CedraYNButton from '../cedra/components/cedra.yn.button.component';
import DropDownPicker from 'react-native-dropdown-picker';
import WaitingRoom from './../waitingroom/waitingroom.component'

const IntakeScreen = (props) => {
  
  let {
    navigation,
    session,
    sessionId,
  } = props;
  Icon.loadFont();
  const textStyles= {
    fontSize: 18,
    padding: 10,
    height: 40,
    width: '90%',
    borderWidth: 1.5,
   //borderColor:session.sessionData.secondaryColor,
   //color: session.sessionData.secondaryColor,
    borderRadius: 6,
    marginBottom: 15,
  };
  const [intake, setIntake] = React.useState(defaultForm);
  const [date, setDate] = React.useState(new Date());
  const [showDatepicker, setshowDatepicker] = React.useState(false);
  const [dob, setDob] = React.useState(null);
 const primaryColor=  '#808080' ;// 'dodgerblue';
 const secondaryColor = '#96c3ef';

  React.useEffect(() => {
    //fetchTestResults({patientId:session.sessionData.patientId, sessionId, type: 'intake'});
    service.getData({patientId:session.sessionData.patientId, sessionId, type: 'intake'}).then(res=>{
      let data= res.data.data || defaultForm;
      if(res.data.status=="200" && res.data.data==undefined){
        service.getDataByPatientId({patientId:session.sessionData.patientId}).then(res=>{
         data=Object.assign({},defaultForm, res.data.data);
         service.setCache('intake', data);
         setIntake(data );
        });
      } else {
        service.setCache('intake', data);
        console.log('INTAKEDATA', JSON.stringify(data,null,5));
        setIntake(data ); 
      }
      
    if(data){
      setDob(strToDate(data.DOB));
    }
    })
    
    navigation.addListener('blur', e => {
     saveOnClose(); // Chage to Hearing Health
     
    });
    
    
    console.log('SESSIONDATA', JSON.stringify(session,null,5));
    return ()=>{
      
      saveOnClose(); // Back To  Waiting Room 
    }
    
    
  }, []);
  
  const saveOnClose= ()=>{
   
    let intake = service.getCache('intake');
    let newData = {
      sessionId,
      payload: intake,
      type: 'intake',
      formCompleted: false,
    };
    service.runAsync(service.saveData, newData);
    console.log('WHILECLOSE', JSON.stringify(intake,null,5))
  }
  const setIntakeState = (key, value) => {
    
    setIntake(prev => {
      let data= {...prev, [key]: value};
      service.setCache('intake', data);
       return data;
    });
  };

  const onSelectDate = (event, selectedDate) => {
    setDate(selectedDate);
    setIntakeState('DOB', dateToStr(selectedDate, true));
    setDob(dateToStr(selectedDate));

  };

  const dateToStr = (selectedDate, forDb=false)=>{
    let year = selectedDate.getFullYear();
    let month = (1 + selectedDate.getMonth()).toString().padStart(2, '0');
    let day = selectedDate.getDate().toString().padStart(2, '0');
    if(forDb){
      return year+'-'+month+'-'+day;
    }
    return  month + '/' + day + '/' + year;
  }
  const strToDate = (str) => {
    console.log('DATE FROM DB',str)
    if(!str){
      return null;
    }
    let parts = str.split('-');
    if(parts.length==3){
      let result = `${parts[1]}/${parts[2]}/${parts[0]}`;
      console.log('DATE FROM DB CONVERTED ',result);
      return result;
    } 
    return null;
  }

  const onPressSubmit = (redirect=true) => {
    //TODO formCompleted need to formed
  saveData(intake);
   if(redirect){
    navigation.navigate('CEDRA', {sessionId});
   }
  };

  const saveData = (data) => {
    let formCompleted = false;
    let errors = validateForm(intake);

    if (errors && errors.length) {
      // show errors
      console.log(errors);
    } else {
      let newData = {
        sessionId,
        payload: data,
        type: 'intake',
        formCompleted,
      };
      console.clear();
      console.log("SAVE INTAKE", JSON.stringify(newData,null,5));
      //setTestResults(newData);
      service.saveData(newData).then(res=>{
      })
    }
    
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems:'center',
    // justifyContent:'center'
  },
dropdown:{  
    height: 45,
    width: '91%',
    marginBottom:15,
    backgroundColor: 'transparent'
    
  },
  mainContainer: {
    alignItems: 'center',
    width: '95%',
    paddingBottom: 20,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 2,
    marginVertical: 20,
  },
  inputLabel: {
    width: '100%',
    alignItems: 'flex-start',
    marginLeft:35
  },
  textInput: {
    fontSize: 18,
    padding: 10,
    height: 40,
    width: '90%',
    borderWidth: 1.5,
    borderColor: primaryColor,
    borderRadius: 6,
    marginBottom: 15,
  },
  question: {
    fontFamily:'LibreFranklin-Bold',
    paddingVertical: 8,
  },
  darkButton: {
    backgroundColor: '#193371',
    padding: 10,
    margin: 10,
    width: '90%',
    alignItems: 'center',
    borderRadius: 4,
  },
  whiteText: {
    fontSize: 18,
    color: '#fff',
  },
  datepicker: {
    position: 'absolute',

    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: 'white',
  },
});
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.header}>Intake Questionnaire</Text>
        
          <View style={styles.inputLabel}>
            <Text style={styles.question}>First Name</Text>
          </View>
          <TextInput
            style={textStyles}
            placeholder={'First Name'}
            onChangeText={(val) => setIntakeState('firstName', val)}
            value={intake.firstName}
          />
          <View style={styles.inputLabel}>
            <Text style={styles.question}>Last Name</Text>
          </View>
          <TextInput
            style={textStyles}
            placeholder={'Last Name'}
            onChangeText={(val) => setIntakeState('lastName', val)}
            value={intake.lastName}
          />
          <View style={styles.inputLabel}>
            <Text style={styles.question}>Birth Date</Text>
          </View>
          <TextInput
            placeholder={'mm/dd/yyyy'}
            style={textStyles}
            onChangeText={(val) => setIntakeState('DOB', val)}
            onFocus={() => setshowDatepicker(true)}
            onBlur={() => setshowDatepicker(false)}
            value={dob}
          />

          <View style={styles.inputLabel}>
            <Text style={styles.question}>Address</Text>
          </View>
          <TextInput
            style={textStyles}
            placeholder={'Address'}
            onChangeText={(val) => setIntakeState('address', val)}
            value={intake.address}
          />
          <View style={styles.inputLabel}>
            <Text style={styles.question}>City</Text>
          </View>
          <TextInput
            placeholder={'City'}
            style={textStyles}
            onChangeText={(val) => setIntakeState('city', val)}
            value={intake.city}
          />
          <View style={styles.inputLabel}>
            <Text style={styles.question}>State</Text>
          </View>
          <TextInput
            placeholder={'State'}
            style={textStyles}
            onChangeText={(val) => setIntakeState('state', val)}
            value={intake.state}
          />
          <View style={styles.inputLabel}>
            <Text style={styles.question}>Zip</Text>
          </View>
          <TextInput
            placeholder={'ZipCode'}
            style={textStyles}
            onChangeText={(val) => setIntakeState('zipCode', val)}
            value={intake.zipCode}
          />
          <View style={styles.inputLabel}>
            <Text style={styles.question}>Home Phone</Text>
          </View>
          <TextInput
            placeholder={'Home Phone'}
            style={textStyles}
            onChangeText={(val) => setIntakeState('homePhone', val)}
            value={intake.homePhone}
          />
          <View style={styles.inputLabel}>
            <Text style={styles.question}>Mobile Phone</Text>
          </View>
          <TextInput
            placeholder={'Mobile Phone'}
            style={textStyles}
            onChangeText={(val) => setIntakeState('mobilePhone', val)}
            value={intake.mobilePhone}
          />
          <View style={styles.inputLabel}>
            <Text style={styles.question}>Email</Text>
          </View>
          <TextInput
            placeholder={'Email'}
            style={textStyles}
            onChangeText={(val) => setIntakeState('email', val)}
            value={intake.email}
          />
          <View style={styles.inputLabel}>
            <Text style={styles.question}>Sex</Text>
          </View>
          <IntakeButton primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor}
            setPressed={(val) => {
              console.log('GenderValue =>'+val)
              setIntakeState('gender', val)
            }}
            values={[ { value:'male', display:'Male'}, {value:'female',display:'Female'}, {value:'other', display:'Other'}]}
            value={intake.gender}
          />
          <View style={styles.inputLabel}>
            <Text style={styles.question}>Employement Status</Text>
          </View>
          <IntakeButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor}
            setPressed={(val) => setIntakeState('employementStatus', val)}
            values={[{value:'employed', display: 'Employed'}, {value: 'retired', display:  'Retired'}, {value: 'other', display: 'Other'}]}
            value={intake.employementStatus}
          />
          <View style={styles.inputLabel}>
            <Text style={styles.question}>Marital Status</Text>
          </View>
          <IntakeButton  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor}
            setPressed={(val) => setIntakeState('maritalStatus', val)}
            values={[{value: 'married', display: 'Married'}, {value:'single', display: 'Single'}, {value:'other', display: 'Other'}]}
            value={intake.maritalStatus}
          />
          
          <View style={styles.inputLabel}>
            <Text style={styles.question}>How did you hear about us?</Text>
          </View>
        
          <DropDownPicker
    items={[
        {label: 'Doctor', value: 'Doctor' },
        {label: 'Friend', value: 'Friend'},
        {label: 'News Paper', value: 'Newspaper'},
        {label: 'Mailing', value: 'Mailing'},
        {label: 'Other', value: 'Other'},
    ]}
    defaultValue={intake.referredby || ''}
    containerStyle={styles.dropdown}
    style={{backgroundColor: 'transparent', color: session.sessionData.secondaryColor }}    
    itemStyle={{
        justifyContent: 'flex-start',
        color: session.sessionData.secondaryColor
    }}
    selectedLabelStyle={{fontSize:18, color: session.sessionData.secondaryColor}}
    dropDownStyle={{backgroundColor: '#fafafa', fontSize: 30, color: session.sessionData.secondaryColor}}
    onChangeItem={(item)=>{setIntakeState('referredby', item.value)}} 
   
        
    
/>
{/* */}

  
          
          <TextInput
            style={textStyles}
            placeholder={'Referred by'}
            onChangeText={(val) => setIntakeState('referredbytext', val)}
            value={intake.referredbytext}
          />

          <View style={styles.inputLabel}>
            <Text style={styles.question}>Have you had your hearing tested</Text>
          </View>
          
          <CedraYNButton width={'90%'} primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor}
            setPressed={(val) => {
            setIntakeState('hearingtested', val)
             
            }}
            values={[{value: 'yes', display:'Yes'}, {value:'no', display:'No'}]}
            value={intake.hearingtested}
          />
          { intake.hearingtested=='yes' && <View style={{width:'100%',alignItems:'center'}}>
            <View style={styles.inputLabel}>
              <Text style={styles.question}>How long ago?</Text>
            </View>
            <TextInput
              style={textStyles}
              placeholder={'Hearing tested how long ago'}
              onChangeText={(val) =>
                setIntakeState('hearingtestedhowlongago', val)
              }
              value={intake.hearingtestedhowlongago}
            /></View>
          }
         
         
          <View style={styles.inputLabel}>
            <Text style={styles.question}>Do you currently wear hearing aids?</Text>
          </View>
          <CedraYNButton width={'90%'}  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor}
            setPressed={(val) => setIntakeState('wearhearingaids', val)}
            
            value={intake.wearhearingaids}
          />
             {intake.wearhearingaids =='yes' && <View style={{width:'100%',alignItems:'center'}}>
            <View style={styles.inputLabel}>
              <Text style={styles.question}>When did you purchase them?</Text>
            </View>
            <TextInput
              style={textStyles}
              placeholder={'When did you purchase them'}
              onChangeText={(val) =>
                setIntakeState('hearingaidspurchasewhen', val)
              }
              value={intake.hearingaidspurchasewhen}
            /></View>
          }
         
          <View style={styles.inputLabel}>
            <Text style={styles.question}>Have you been having trouble hearing recently?</Text>
          </View>
          <CedraYNButton width={'90%'}  primaryColor={session.sessionData.primaryColor} secondaryColor={session.sessionData.secondaryColor}
            setPressed={(val) => setIntakeState('troublehearingrecently', val)}
            values={[{value: 'yes', display:'Yes'}, {value:'no', display:'No'}]}
            value={intake.troublehearingrecently}
          />
          <View style={styles.inputLabel}>
            <Text style={styles.question}>Who suggested you have a hearing test</Text>
          </View>
          <TextInput
            style={textStyles}
            placeholder={'Who suggested hearing test'}
            onChangeText={(val) =>
              setIntakeState('whosuggestedhearingtest', val)
            }
            value={intake.whosuggestedhearingtest}
          />
          <TouchableOpacity onPress={onPressSubmit} style={ {...styles.darkButton, backgroundColor: session.sessionData.primaryColor}}>
            <Text style={styles.whiteText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.datepicker}>
        {showDatepicker && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display="default"
            onChange={onSelectDate}
          />
        )}
      </View>
    </>
  );
};

export default IntakeScreen;
