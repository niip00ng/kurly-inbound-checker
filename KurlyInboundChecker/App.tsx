import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import Splash from '@pages/splash';
import Main from '@pages/main';
import {store} from '@modules/store';
import InboundReceiptDetail from '@pages/inboundReceiptDetail';
import {Provider} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';
import GlobalLoading from '@pages/common/GlobalLoading';
import {LoadingProvider} from './src/pages/common/LoadingContext';
import Notification from '@pages/notification';

function App(): React.JSX.Element {
  const RootStack = createNativeStackNavigator();

  return (
    <ToastProvider
      renderToast={toast => (
        <View
          style={{
            backgroundColor: toast.type === 'info' ? '#ffffff' : toast.type,
            padding: 10,
            borderRadius: 8,
          }}>
          <Text style={{color: '#000000'}}>{toast.message}</Text>
        </View>
      )}>
      <LoadingProvider>
        <Provider store={store}>
          <NavigationContainer>
            <RootStack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName="Splash">
              <RootStack.Group>
                <RootStack.Screen name="Splash" component={Splash} />
                <RootStack.Screen name="Main" component={Main} />
                <RootStack.Screen
                  name="InboundReceiptDetail"
                  component={InboundReceiptDetail}
                />
                <RootStack.Screen
                  name="Notification"
                  component={Notification}
                  options={{presentation: 'containedTransparentModal'}}
                />
              </RootStack.Group>
            </RootStack.Navigator>
          </NavigationContainer>
          <GlobalLoading />
        </Provider>
      </LoadingProvider>
    </ToastProvider>
  );
}

export default App;
