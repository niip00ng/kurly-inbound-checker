import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

type PropTopComponent = {
  titleComponrnt?: any;
};

const TopComponent: React.FC<React.PropsWithChildren<PropTopComponent>> = ({
  titleComponrnt,
}) => {
  const navigation = useNavigation();

  return (
    <>
      <LinearGradient
        colors={['#930EF2', '#5D61D0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={s.tabOptionBox}>
        <TouchableOpacity
          style={{
            left: 5,
            minWidth: 30,
          }}
          onPress={navigation.goBack}>
          <AntDesign name={'left'} size={24} color={'#ffffff'} />
        </TouchableOpacity>

        {titleComponrnt && <>{titleComponrnt}</>}
        <View style={{minWidth: 30}} />
      </LinearGradient>
    </>
  );
};
export default TopComponent;

const s = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#fefefe',
    fontWeight: 'bold',
  },
  tabOptionBox: {
    backgroundColor: '#333333',
    zIndex: 3,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingTop: Platform.OS === 'ios' ? 60 : 12,
    paddingBottom: 15,
  },
});
