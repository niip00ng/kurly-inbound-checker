import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@modules/store';
import {InboundReceiptItem} from '@pages/inboundReceiptListView/inboundReceiptsSlice';
import {fetchInboundReceipts} from './inboundReceiptsThunks';
import type {AppDispatch} from '@modules/store';
import InboundReciptCard from './InboundReciptCard';
const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const inboundReceipts: Array<InboundReceiptItem> = useSelector(
    (state: RootState) => state.inboundReceipts.inboundReceipts,
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
    navigation.navigate('InboundReceiptDetail', {code: inboundReceipt.code});
  };

  return (
    <SafeAreaView style={s.container}>
      <LinearGradient colors={['#222222', '#444444']}>
        <FlatList
          data={inboundReceipts}
          renderItem={({item}) => (
            <InboundReciptCard
              item={item}
              onPress={() => handleCardPress(item)}
            />
          )}
          keyExtractor={item => item.code}
          style={{height: '100%'}}
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
    color: '#222222',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    fontWeight: '300',
    color: '#222222',
    marginBottom: 4,
    minWidth: 100,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222222',
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
    color: '#222222',
  },
  statusComplete: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222222',
  },
});
