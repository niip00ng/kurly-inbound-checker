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
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

export interface InboundReceiptItem {
  code: string;
  inboundOrderDate: string;
  inboundDate: string;
  inboundSimplePlace: string;
  inboundPlace: string;
  inboundType: string;
  inboundStatus: string;
  products: Array<ProductInfo>;
}

export interface ProductInfo {
  goodsCode: string;
  barcode: string;
  goodsName: string;
  boxCount: number;
  unitPerBoxCount: number;
  weight: string;
  expiredDate: string;
  description: string;
  imageUrl: string;
}

const Home = () => {
  const navigation: any = useNavigation();

  const [inboundReceipts, setInboundOrders] = useState<
    Array<InboundReceiptItem>
  >([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadInboundOrders();
  }, []);

  const loadInboundOrders = () => {
    setInboundOrders([
      {
        code: 'T20241115_NLPH9',
        inboundDate: '2024-12-25(수)',
        inboundOrderDate: '2024-12-16(토)',
        inboundSimplePlace: '김포냉동(켄달 2층)',
        inboundPlace:
          '경기도 김포시 아라육로 75 켄달스퀘어 김포LP 2층 B202~206',
        inboundType: 'NORMAL',
        inboundStatus: 'READY',
        products: [
          {
            goodsCode: 'MK0000068907',
            goodsName: '[신선설농탕] 고기 설렁탕',
            barcode: 'MK0000068907',
            expiredDate: '2025-02-24',
            boxCount: 30,
            unitPerBoxCount: 150,
            weight: '150g',
            description: '',
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
          },
          {
            goodsCode: 'MK0000068907',
            goodsName: '[신선설농탕] 감자 설렁탕',
            barcode: 'MK0000068908',
            expiredDate: '2025-02-24',
            boxCount: 30,
            unitPerBoxCount: 150,
            weight: '150g',
            description: '',
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
          },
        ],
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
        products: [
          {
            goodsCode: 'MK0000068907',
            goodsName: '[신선설농탕] 고기 설렁탕',
            barcode: 'MK0000068907',
            expiredDate: '2025-02-24',
            boxCount: 30,
            unitPerBoxCount: 150,
            weight: '150g',
            description: '',
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
          },
        ],
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
        products: [
          {
            goodsCode: 'MK0000068907',
            goodsName: '[신선설농탕] 고기 설렁탕',
            barcode: 'MK0000068907',
            expiredDate: '2025-02-24',
            boxCount: 30,
            unitPerBoxCount: 150,
            weight: '150g',
            description: '',
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
          },
        ],
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
        products: [
          {
            goodsCode: 'MK0000068907',
            goodsName: '[신선설농탕] 고기 설렁탕',
            barcode: 'MK0000068907',
            expiredDate: '2025-02-24',
            boxCount: 30,
            unitPerBoxCount: 150,
            weight: '150g',
            description: '',
            imageUrl:
              'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
          },
        ],
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

  const handleCardPress = (inboundReceipt: InboundReceiptItem) => {
    navigation.navigate('InboundReceipt', {inboundReceipt});
  };

  const renderInboundReciptCard = ({item}: {item: InboundReceiptItem}) => (
    <TouchableOpacity
      style={[
        s.card,
        {
          backgroundColor:
            item.inboundStatus === 'READY' ? '#ffffffDD' : '#ffffff50',
        },
      ]}
      activeOpacity={0.7}
      onPress={() => handleCardPress(item)}>
      <View style={[s.cardRow, {justifyContent: 'space-between'}]}>
        <Text style={s.code}>{item.code}</Text>
        <Text style={s.status(item.inboundStatus)}>
          {item.inboundStatus === 'READY' ? '준비 중' : '완료'}
        </Text>
      </View>

      <View style={s.cardRow}>
        <Text style={s.infoLabel}>입고 예정일</Text>
        <Text style={s.info}>{item.inboundDate}</Text>
      </View>
      <View style={s.cardRow}>
        <Text style={s.infoLabel}>발주 날짜</Text>
        <Text style={s.info}>{item.inboundOrderDate}</Text>
      </View>
      <View style={s.cardRow}>
        <Text style={s.infoLabel}>입고지</Text>
        <Text style={s.info}>{item.inboundSimplePlace}</Text>
      </View>
      <View style={s.cardRow}>
        <Text style={s.infoLabel}>유형</Text>
        <Text style={s.info}>
          {item.inboundType === 'NORMAL'
            ? '일반입고(입고시간없음)'
            : '택배입고'}
        </Text>
      </View>
      <View style={[s.cardRow, {alignItems: 'center'}]}>
        <Text style={s.infoLabel}>입고상품</Text>

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
              <Text>{product.goodsName}</Text>
              <FastImage
                style={{
                  marginLeft: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 5,
                }}
                source={{uri: product.imageUrl}}
              />
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
  },
  card: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  code: {
    fontSize: 14,
    fontWeight: 'bold',
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
  cardRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 0, // 각 행 간 간격 추가
  },
  status: (status: string) => ({
    fontSize: 14,
    fontWeight: 'bold',
    color: status === 'READY' ? '#222222' : '#444444',
  }),
});
