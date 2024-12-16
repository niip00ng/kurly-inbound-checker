import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@modules/store';
import {InboundReceiptItem} from '@pages/inboundReceiptListView/inboundReceiptsSlice';
import {fetchInboundReceipts} from './inboundReceiptsThunks';
import type {AppDispatch} from '@modules/store';
const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const inboundReceipts: Array<InboundReceiptItem> = useSelector(
    (state: RootState) => state.InboundReceipts.inboundReceipts,
  );

  const navigation: any = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchInboundReceipts());
  }, [dispatch]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulate a network request
  };

  const handleCardPress = (inboundReceipt: InboundReceiptItem) => {
    navigation.navigate('InboundReceipt', {inboundReceipt});
  };

  const renderInboundReciptCard = ({item}: {item: InboundReceiptItem}) => (
    <TouchableOpacity
      style={[
        s.card,
        {
          backgroundColor:
            item.inboundStatus === 'READY' ? '#00000080' : '#00000020',
        },
      ]}
      activeOpacity={0.7}
      onPress={() => handleCardPress(item)}>
      <View style={[s.cardRow, {justifyContent: 'space-between'}]}>
        <View style={[s.cardLabel, {marginBottom: 10}]}>
          <Ionicons
            name={'barcode'}
            size={20}
            color={'#ffffff'}
            style={{marginRight: 5}}
          />
          <Text style={s.code}>{item.code}</Text>
        </View>
        <Text
          style={
            item.inboundStatus === 'READY' ? s.statusReady : s.statusComplete
          }>
          {item.inboundStatus === 'READY' ? '준비 중' : '완료'}
        </Text>
      </View>

      <View style={s.cardRow}>
        <View style={s.cardLabel}>
          <MaterialCommunityIcons
            name={'calendar-arrow-left'}
            size={18}
            color={'#ffffff'}
            style={{marginRight: 5}}
          />
          <Text style={s.infoLabel}>입고 예정일</Text>
        </View>

        <Text style={s.info}>{item.inboundDate}</Text>
      </View>
      <View style={s.cardRow}>
        <View style={s.cardLabel}>
          <MaterialCommunityIcons
            name={'calendar-arrow-right'}
            size={18}
            color={'#ffffff'}
            style={{marginRight: 5}}
          />
          <Text style={s.infoLabel}>발주 날짜</Text>
        </View>

        <Text style={s.info}>{item.inboundOrderDate}</Text>
      </View>
      <View style={s.cardRow}>
        <View style={s.cardLabel}>
          <MaterialIcons
            name={'factory'}
            size={16}
            color={'#ffffff'}
            style={{marginRight: 5, marginLeft: 1}}
          />
          <Text style={s.infoLabel}>입고지</Text>
        </View>
        <Text style={s.info}>{item.inboundSimplePlace}</Text>
      </View>
      <View style={s.cardRow}>
        <View style={s.cardLabel}>
          <MaterialIcons
            name={'category'}
            size={16}
            color={'#ffffff'}
            style={{marginRight: 5, marginLeft: 1}}
          />
          <Text style={s.infoLabel}>유형</Text>
        </View>

        <Text style={s.info}>
          {item.inboundType === 'NORMAL'
            ? '일반입고(입고시간없음)'
            : '택배입고'}
        </Text>
      </View>
      <View style={[s.cardRow, {alignItems: 'flex-start'}]}>
        <View style={[s.cardLabel, {marginTop: 0}]}>
          <MaterialCommunityIcons
            name={'package'}
            size={16}
            color={'#ffffff'}
            style={{marginRight: 5, marginLeft: 1}}
          />
          <Text style={s.infoLabel}>입고상품</Text>
        </View>

        <View>
          {item.products.map((product, index) => (
            <View
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 4,
              }}>
              <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
                {product.goodsName}
              </Text>
              {/* <FastImage
                style={{
                  marginLeft: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 5,
                }}
                source={{uri: product.imageUrl}}
              /> */}
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s.container}>
      <LinearGradient colors={['#9032C7', '#333333']}>
        <FlatList
          data={inboundReceipts}
          renderItem={renderInboundReciptCard}
          keyExtractor={item => item.code}
          contentContainerStyle={s.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    height: '100%',
  },
  card: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    elevation: 2,
  },
  code: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    fontWeight: '300',
    color: '#ffffff',
    marginBottom: 4,
    minWidth: 100,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
    minWidth: 100,
  },
  cardLabel: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 0, // 각 행 간 간격 추가
  },
  statusReady: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statusComplete: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff80',
  },
});
