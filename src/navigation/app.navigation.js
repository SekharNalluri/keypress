import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Session from '../session/session.component';
import Terms from '../terms';
import QuestionnaireNav from './questionnaire.navigation';
import WizardScreen from '../wizard';
import HomeScreen from './../home_menu/index'
import SelfAssesment from './../selfassessment/assessment'
import TestHeadphones from './../selfassessment/testheadphones'
import DemoVideo from './../selfassessment/demovideo'
import BestEar from './../selfassessment/bestear'
import HearingTest from '../selfassessment/hearingtest'
import SelfResults from '../selfassessment/results'
import Login from '../selfassessment/login'
import UploadHearingTestScreen from './../uploadHearingTest/index'
import uploadAcknowledge from './../uploadAcknowledge/index'


enableScreens();
const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SelfAssesment" component={SelfAssesment} options={{ headerShown: false }} />
      <Stack.Screen name="TestHeadphones" component={TestHeadphones} options={{ headerShown: false }} />
      <Stack.Screen name="DemoVideo" component={DemoVideo} options={{ headerShown: false }} />
      <Stack.Screen name="BestEar" component={BestEar} options={{ headerShown: false }} />
      <Stack.Screen name="HearingTest" component={HearingTest} options={{ headerShown: false }} />
      <Stack.Screen name="SelfResults" component={SelfResults} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Session" component={Session} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="WizardScreen" component={WizardScreen} />
      <Stack.Screen name="Questionnaire" component={QuestionnaireNav} />
      <Stack.Screen name="UploadHearingTestScreen" component={UploadHearingTestScreen} options={{ headerShown: false }} />
      <Stack.Screen name="uploadAcknowledge" component={uploadAcknowledge} options={{ headerShown: false }} />


    </Stack.Navigator>
  );
};
