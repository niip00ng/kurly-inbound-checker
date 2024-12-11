import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import TopComponent from '../TopComponent';
import {InboundReceiptItem, ProductInfo} from '../home';
import LinearGradient from 'react-native-linear-gradient';

const InboundReceipt = () => {
  const route = useRoute();
  const {inboundReceipt} = route.params as {inboundReceipt: InboundReceiptItem};

  return (
    <>
      <TopComponent
        titleComponrnt={<Text style={s.title}>발주서 상세정보</Text>}
      />
      <View style={s.wrapper}>
        <LinearGradient colors={['#333333', '#000000']}>
          <ScrollView
            contentContainerStyle={s.scrollWrapper}
            showsVerticalScrollIndicator={false}>
            {/* 기본 정보 (카드형태) */}
            <Text style={s.subTitle}>발주 기본 정보</Text>
            <View style={s.card}>
              <View style={s.cardContent}>
                <View style={s.cardRow}>
                  <Text style={s.label}>발주 코드</Text>
                  <Text style={s.value}>{inboundReceipt.code}</Text>
                </View>
                <View style={s.cardRow}>
                  <Text style={s.label}>입고예정일</Text>
                  <Text style={s.value}>{inboundReceipt.inboundDate}</Text>
                </View>
                <View style={s.cardRow}>
                  <Text style={s.label}>발주 일</Text>
                  <Text style={s.value}>{inboundReceipt.inboundOrderDate}</Text>
                </View>
                <View style={s.cardRow}>
                  <Text style={s.label}>입고지</Text>
                  <Text style={s.value}>
                    {inboundReceipt.inboundSimplePlace}
                  </Text>
                </View>
                <View style={s.cardRow}>
                  <Text style={s.label}>입고센터 주소</Text>
                  <Text style={[s.value]}>{inboundReceipt.inboundPlace}</Text>
                </View>
                <View style={s.cardRow}>
                  <Text style={s.label}>입고타입</Text>
                  <Text style={s.value}>
                    {inboundReceipt.inboundType === 'NORMAL'
                      ? '일반입고(입고시간없음)'
                      : '택배입고'}
                  </Text>
                </View>
                <View style={s.cardRow}>
                  <Text style={s.label}>입고상태</Text>
                  <Text style={s.value}>
                    {inboundReceipt.inboundStatus === 'READY'
                      ? '입고대기'
                      : '입고중'}
                  </Text>
                </View>
              </View>
            </View>

            {/* 상품 정보 */}
            <Text style={s.subTitle}>
              발주 상품 ({inboundReceipt.products.length}개)
            </Text>

            {inboundReceipt.products.map((item: ProductInfo, index) => (
              <View style={s.productContainer} key={index}>
                <View style={s.cardRow}>
                  <Text style={s.label}>상품코드</Text>
                  <Text style={s.value}>{item.goodsCode}</Text>
                </View>
                <View style={s.cardRow}>
                  <Text style={s.label}>상품이름</Text>
                  <Text style={s.value}>{item.goodsName}</Text>
                </View>
                <View style={s.cardRow}>
                  <Text style={s.label}>바코드번호</Text>
                  <Text style={s.value}>{item.barcode}</Text>
                </View>
                <View style={s.cardRow}>
                  <Text style={s.label}>유통기한</Text>
                  <Text style={s.value}>{item.expiredDate}</Text>
                </View>
                <View style={s.cardRow}>
                  <Text style={s.label}>박스수</Text>
                  <Text style={s.value}>{item.boxCount}개</Text>
                </View>
                <View style={s.cardRow}>
                  <Text style={s.label}>박스당 상품수</Text>
                  <Text style={s.value}>{item.unitPerBoxCount}개</Text>
                </View>
                <View style={s.cardRow}>
                  <Text style={s.label}>규격 </Text>
                  <Text style={s.value}>{item.weight}</Text>
                </View>
                <View style={s.cardRow}>
                  <Text style={s.label}>비고</Text>
                  <Text style={s.value}>{item.description || 'N/A'}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </LinearGradient>
      </View>
    </>
  );
};

export default InboundReceipt;

const s = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollWrapper: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff10',
    borderRadius: 20,
    padding: 16,
    marginTop: 0,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Android 그림자
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    marginTop: 8,
  },
  cardRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8, // 각 행 간 간격 추가
  },
  label: {
    fontSize: 14,
    minWidth: 90,
    color: '#ffffff',
    fontWeight: 'bold',
    marginRight: 20, // label과 value 간 간격
  },
  value: {
    fontSize: 14,
    color: '#ffffff',
    flex: 1, // value가 남은 공간 차지
    flexWrap: 'wrap', // 길이가 길면 개행
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
    marginBottom: 8,
  },
  productContainer: {
    backgroundColor: '#ffffff10',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
  },
});
