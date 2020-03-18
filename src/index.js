import React from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {registerLoggerForDebug} from 'remx'
registerLoggerForDebug(console.log);
// console.disableYellowBox = true;

const App = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  )
}


export default App