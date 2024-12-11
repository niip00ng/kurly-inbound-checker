import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation: any = useNavigation();

  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;

const s = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // 추가로 중앙 정렬
  },
});
