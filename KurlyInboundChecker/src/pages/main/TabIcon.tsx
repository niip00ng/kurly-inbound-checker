import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  left?: boolean;
  backgroundColor?: string;
  onTouchBackButton?: Function;
  icon: React.ReactNode; // 아이콘을 부모로부터 받기 위해 추가
};
const TabIcon: React.FC<React.PropsWithChildren<Props>> = ({icon}) => {
  return <View style={s.tabOptionBox}>{icon}</View>;
};

export default TabIcon;

const s = StyleSheet.create({
  tabOptionBox: {
    width: '100%',
    height: 30,
  },
});
