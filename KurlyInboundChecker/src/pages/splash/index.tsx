import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LogoComponent from './LogoComponent';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation: any = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main'); // 'Main' 컴포넌트로 이동
    }, 1000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
  }, [navigation]);

  return (
    <LinearGradient colors={['#C237ED', '#333333']} style={s.wrapper}>
      <SafeAreaView>
        <LogoComponent animation={true} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Splash;

const s = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // 추가로 중앙 정렬
  },
});
