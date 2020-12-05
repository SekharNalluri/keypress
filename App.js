import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './src/store';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation/app.navigation';
import { LogBox } from 'react-native';


const linking = {
  prefixes: ['keypress://'],
  config: {
    Terms: 'session/:sessionId',
  },
};

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
