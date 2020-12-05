import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IntakeFormScreen from '../intakeform';
import CEDRAScreen from '../cedra';
import {
  
  Text,
 
} from 'react-native';

const Tab = createBottomTabNavigator();

const activeTintLabelColor = '#193371';
const inactiveTintLabelColor = '#000';
function QuestionnaireNavigation() {
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="IntakeForm" index={1} component={IntakeFormScreen} options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 17, color: focused ? activeTintLabelColor : inactiveTintLabelColor ,marginBottom:10,fontFamily:'LibreFranklin-Medium'}}>
             Intake Form
            </Text>
          ),
          
        }}/>
      <Tab.Screen name="CEDRA" index={2} component={CEDRAScreen} 
      options={{
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontSize: 17, color: focused ? activeTintLabelColor : inactiveTintLabelColor ,marginBottom:10,fontFamily:'LibreFranklin-Medium'}}>
           Hearing Health
          </Text>
        ),
        
      }}
      
    
      
      />
    </Tab.Navigator>
  );
}

export default QuestionnaireNavigation;
