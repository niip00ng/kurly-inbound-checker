import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {View} from 'react-native';
import Splash from './src/pages/splash';
import Main from '@pages/main';
import {store} from './src/modules/store';
import InboundReceipt from '@pages/inboundReceipt';
import {Provider} from 'react-redux';
function App(): React.JSX.Element {
  const RootStack = createNativeStackNavigator();

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
