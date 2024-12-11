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

type InboundReceipt = {
  code: string;
  inboundOrderDate: string;
  inboundDate: string;
  inboundSimplePlace: string;
  inboundPlace: string;
  inboundType: string;
  inboundStatus: string;
};

const Home = () => {
  const navigation: any = useNavigation();

  const [inboundReceipts, setInboundOrders] = useState<Array<InboundReceipt>>(
    [],
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadInboundOrders();
  }, []);

  const loadInboundOrders = () => {
    setInboundOrders([
      {
        code: 'T20241115_NLPH9',
        inboundDate: '2024-11-13(수)',
        inboundOrderDate: '2024-11-16(토)',
        inboundSimplePlace: '김포냉동(켄달 2층)',
        inboundPlace:
          '경기도 김포시 아라육로 75 켄달스퀘어 김포LP 2층 B202~206',
        inboundType: 'NORMAL',
        inboundStatus: 'READY',
      },
      {
        code: 'T20241115_NLQ19',
        inboundDate: '2024-10-26(화)',
        inboundOrderDate: '2024-10-30(금)',
        inboundSimplePlace: '김포냉동(켄달 2층)',
        inboundPlace:
          '경기도 김포시 아라육로 75 켄달스퀘어 김포LP 2층 B202~206',
        inboundType: 'NORMAL',
        inboundStatus: 'END',
      },
      {
        code: 'T20241115_NLQ17',
        inboundDate: '2024-10-26(화)',
        inboundOrderDate: '2024-10-30(금)',
        inboundSimplePlace: '김포냉동(켄달 2층)',
        inboundPlace:
          '경기도 김포시 아라육로 75 켄달스퀘어 김포LP 2층 B202~206',
        inboundType: 'NORMAL',
        inboundStatus: 'END',
      },
      {
        code: 'T20241115_NLQ11',
        inboundDate: '2024-10-26(화)',
        inboundOrderDate: '2024-10-30(금)',
        inboundSimplePlace: '김포냉동(켄달 2층)',
        inboundPlace:
          '경기도 김포시 아라육로 75 켄달스퀘어 김포LP 2층 B202~206',
        inboundType: 'NORMAL',
        inboundStatus: 'END',
      },
    ]);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadInboundOrders();
      setRefreshing(false);
    }, 1000); // Simulate a network request
  };

  const handleCardPress = (order: InboundReceipt) => {
    navigation.navigate('InboundReceipt', {order});
  };

  const renderInboundReciptCard = ({item}: {item: InboundReceipt}) => (
    <TouchableOpacity
      style={s.card}
      activeOpacity={0.5}
      onPress={() => handleCardPress(item)}>
      <Text style={s.code}>{item.code}</Text>
      <Text style={s.info}>입고 날짜: {item.inboundDate}</Text>
      <Text style={s.info}>주문 날짜: {item.inboundOrderDate}</Text>
      <Text style={s.info}>장소(간략): {item.inboundSimplePlace}</Text>
      <Text style={s.info}>장소: {item.inboundPlace}</Text>
      <Text style={s.info}>유형: {item.inboundType}</Text>
      <Text style={s.status(item.inboundStatus)}>
        상태: {item.inboundStatus === 'READY' ? '준비 중' : '완료'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={inboundReceipts}
        renderItem={renderInboundReciptCard}
        keyExtractor={item => item.code}
        contentContainerStyle={s.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  code: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  status: (status: string) => ({
    fontSize: 14,
    fontWeight: 'bold',
    color: status === 'READY' ? '#ff9800' : '#4caf50',
  }),
});
