/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
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

const Tab = createBottomTabNavigator();

const CustomHeader = ({title}: {title: string}) => (
  <View style={s.header}>
    <StatusBar backgroundColor={'#141615'} />
    <View
      style={{
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        zIndex: 3,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 10,
        paddingBottom: 10,
      }}>
      <Text style={s.headerTitle}>{title}</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
        <Ionicons name={'notifications'} size={30} color={'#999999'} />
      </TouchableOpacity>
    </View>
  </View>
);

const Main = (props: any) => {
  function TabOption({state, navigation}: any) {
    return (
      <GestureHandlerRootView style={s.wrapper}>
        {state.routes.map((route: {key: string; name: string}, index: any) => {
          const icon = (name: string, selectIndex: number) => {
            const active = () => state.index === selectIndex;
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
        })}
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={s.container}>
      <StatusBar backgroundColor={'#141615'} />
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: true, // 헤더 표시
        }}
        tabBar={tabProps => {
          return <TabOption {...{...tabProps, props}} />;
        }}>
        <Tab.Screen
          component={Home}
          name="Home"
          options={{
            header: () => <CustomHeader title="입고 발주서 목록" />, // 커스텀 헤더
          }}
        />
        <Tab.Screen
          component={Settings}
          name="Settings"
          options={{
            header: () => <CustomHeader title="더보기" />, // 커스텀 헤더
          }}
        />
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
  header: {
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
