import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Text, View} from 'react-native';
import Splash from './src/pages/splash';
import Main from '@pages/main';
import InboundReceipt from '@pages/inboundReceipt';
function App(): React.JSX.Element {
  const RootStack = createNativeStackNavigator();

  return (
    <View style={{flex: 1, zIndex: 100}}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Splash">
          <RootStack.Group>
            <RootStack.Screen name="Splash" component={Splash} />
            <RootStack.Screen name="Main" component={Main} />
            <RootStack.Screen
              name="InboundReceipt"
              component={InboundReceipt}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
