/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import inboundReceiptListView from '@pages/inboundReceiptListView';
import Settings from '@pages/settings';
import DeviceInfo from 'react-native-device-info';
import TabIcon from './TabIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const CustomHeader = ({title}: {title: string}) => (
  <LinearGradient colors={['#65039E', '#9032C7']} style={s.header}>
    <View
      style={{
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
        <Ionicons name={'notifications'} size={30} color={'#ffffff'} />
      </TouchableOpacity>
    </View>
  </LinearGradient>
);

const Main = (props: any) => {
  function TabOption({state, navigation}: any) {
    return (
      <GestureHandlerRootView style={s.wrapper}>
        {state.routes.map((route: {key: string; name: string}, index: any) => {
          const icon = (name: string, selectIndex: number) => {
            const active = () => state.index === selectIndex;
            if (name === 'inboundReceiptListView') {
              return (
                <TabIcon
                  icon={
                    <Ionicons
                      name={active() ? 'receipt' : 'receipt-outline'}
                      size={25}
                      color="#ffffff"
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
                      color="#ffffff"
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
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: true, // 헤더 표시
        }}
        tabBar={tabProps => {
          return <TabOption {...{...tabProps, props}} />;
        }}>
        <Tab.Screen
          component={inboundReceiptListView}
          name="inboundReceiptListView"
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
  },
  wrapper: {
    zIndex: 1,

    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    backgroundColor: '#333333',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
