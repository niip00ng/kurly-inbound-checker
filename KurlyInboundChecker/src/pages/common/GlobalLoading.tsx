import React from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import {useLoading} from './LoadingContext';

const {width, height} = Dimensions.get('window');

const GlobalLoading = () => {
  const {isLoading} = useLoading();

  if (!isLoading) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9000,
    elevation: 10, // Android 우선순위 설정
  },
  loadingContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default GlobalLoading;
