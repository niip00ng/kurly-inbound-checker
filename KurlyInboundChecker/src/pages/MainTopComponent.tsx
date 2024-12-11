import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
type Props = {
  left?: any;
  right?: any;
  center?: any;
  backgroundColor?: string;
};
const MainTopComponent: React.FC<React.PropsWithChildren<Props>> = ({
  left,
  right,
  center,
}) => {
  useEffect(() => {}, []);
  const navigation = useNavigation();
  const s = StyleSheet.create({
    tabOptionBox: {
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
    },
  });

  return (
    <>
      <StatusBar backgroundColor={'#141615'} />
      <View style={s.tabOptionBox}>
        {left && left}
        {!left && (
          <TouchableOpacity
            style={{marginLeft: -10}}
            onPress={navigation.goBack}>
            <AntDesign name={'left'} size={24} color={'#999999'} />
          </TouchableOpacity>
        )}
        {center && center}
        {right && right}
        {!right && <View style={{width: 28}} />}
        {/* <Text style={{fontSize: 16, fontWeight: 'bold'}}>{menuTitle}</Text> */}
      </View>
    </>
  );
};

export default MainTopComponent;
