/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Home from '@pages/home';
import Settings from '@pages/settings';
import DeviceInfo from 'react-native-device-info';
import TabIcon from './TabIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainTopComponent from '@pages/MainTopComponent';

const Tab = createBottomTabNavigator();

const Main = (props: any) => {
  function TabOption({state, navigation}: any) {
    return (
      <>
        <GestureHandlerRootView style={s.wrapper}>
          {state.routes.map(
            (route: {key: string; name: string}, index: any) => {
              const icon = (name: string, selectIndex: number) => {
                const active = () => {
                  return state.index === selectIndex;
                };
                if (name === 'Home') {
                  return (
                    <TabIcon
                      icon={
                        <Ionicons
                          name={active() ? 'receipt' : 'receipt-outline'}
                          size={25}
                          color="#222222"
                        />
                      }
                    />
                  );
                } else if (name === 'Settings') {
                  return (
                    <TabIcon
                      icon={
                        <Ionicons
                          name={active() ? 'grid' : 'grid-outline'}
                          size={25}
                          color="#222222"
                        />
                      }
                    />
                  );
                }
              };
              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={() => {
                    navigation.navigate(route.name);
                  }}
                  style={s.tabOptionWrapper}>
                  {icon(route.name, index)}
                </TouchableOpacity>
              );
            },
          )}
        </GestureHandlerRootView>
      </>
    );
  }

  return (
    <GestureHandlerRootView style={s.container}>
      <MainTopComponent
        left={<></>}
        center={<View />}
        right={
          <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
            <Ionicons name={'notifications'} size={30} color={'#999999'} />
          </TouchableOpacity>
        }
      />

      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
        }}
        tabBar={tabProps => {
          return <TabOption {...{...tabProps, props}} />;
        }}>
        <Tab.Screen component={Home} name="Home" />
        <Tab.Screen component={Settings} name="Settings" />
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

export default Main;

const s = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  wrapper: {
    zIndex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' && DeviceInfo.hasNotch() ? 25 : 15,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.08,
        shadowRadius: 13,
        shadowOffset: {
          height: 2,
          width: 2,
        },
      },
    }),
  },
  tabOptionWrapper: {
    width: '100%',
  },
});
