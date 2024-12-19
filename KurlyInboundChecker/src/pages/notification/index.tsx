import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import TopComponent from '../TopComponent';
import LinearGradient from 'react-native-linear-gradient';

const Notification = () => {
  return (
    <>
      <TopComponent titleComponrnt={<Text style={s.title}>알림 내역</Text>} />
      <View style={s.wrapper}>
        <LinearGradient colors={['#333333', '#000000']}>
          <ScrollView
            style={{height: '100%'}}
            contentContainerStyle={s.scrollWrapper}
            showsVerticalScrollIndicator={false}>
            <Text style={s.subTitle}>발주 기본 정보</Text>
          </ScrollView>
        </LinearGradient>
      </View>
    </>
  );
};

export default Notification;

const s = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollWrapper: {
    padding: 15,
    paddingBottom: 100,
  },
  title: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },

  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
    marginBottom: 8,
  },
});
