/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Animated, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
const logo = require('../../../assets/image/logo-dark.png');
const logo1 = require('@assets/image/logo-dark1.png');

const LogoComponent: React.FC<
  React.PropsWithChildren<{animation: boolean}>
> = ({animation}) => {
  const heightAnim = useRef(new Animated.Value(1)).current;

  return (
    <>
      <Animated.View
        style={[
          s.body,
          {
            height: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}>
        <FastImage
          resizeMode="contain"
          style={{
            width: 200,
            height: 80,
            borderRadius: 10,
          }}
          source={logo}
        />
        <Text style={{color: 'white'}}>Inbound Checker</Text>
      </Animated.View>
    </>
  );
};

export default LogoComponent;

const s = StyleSheet.create({
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
