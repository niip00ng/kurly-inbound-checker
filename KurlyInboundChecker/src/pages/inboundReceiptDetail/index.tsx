import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import TopComponent from '../TopComponent';
import {
  InboundReceiptItem,
  ProductInfo,
} from '@pages/inboundReceiptListView/inboundReceiptsSlice';
import LinearGradient from 'react-native-linear-gradient';
import InboundReceiptBaseInfoCard from './component/InboundReceiptBaseInfoCard';
import InboundReceiptProductCheckCard from './component/InboundReceiptProductCheckCard';
import {RootState} from '@modules/store';
import {useSelector} from 'react-redux';
import InboundReceiptParcelTypeCheckCard from './component/InboundReceiptParcelTyoeCheckCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';

const InboundReceiptDetail = () => {
  const route = useRoute();
  const {code} = route.params as {code: string}; // 단순히 code만 전달받음
  const inboundReceiptsSlice: Array<InboundReceiptItem> = useSelector(
    (state: RootState) => state.inboundReceipts.inboundReceipts,
  );

  const [inboundReceipt, setInboundReceipt] =
    useState<InboundReceiptItem | null>(null);

  useEffect(() => {
    const findReceipt: InboundReceiptItem | undefined =
      inboundReceiptsSlice.find(receipt => receipt.code === code);

    if (findReceipt) {
      setInboundReceipt(findReceipt);
    }
  }, [inboundReceiptsSlice, code]);

  if (!inboundReceipt) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#333333',
        }}>
        <Text>발주서 정보를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  const checkCompletedProducts = () => {
    return inboundReceipt.products.filter(product => {
      if (product.checkList.filter(e => !e.check).length > 0) {
        return false;
      }
      return true;
    });
  };

  const completedParcelType = () => {
    return (
      inboundReceipt.inboundTypeCheckList.filter(e => e.check).length ===
      inboundReceipt.inboundTypeCheckList.length
    );
  };

  const totalCheckItemSize = () => {
    return inboundReceipt.products.length + 1;
  };

  const checkCompletedSize = () => {
    return checkCompletedProducts().length + (completedParcelType() ? 1 : 0);
  };

  return (
    <>
      <TopComponent
        titleComponrnt={<Text style={s.title}>발주서 체크리스트</Text>}
      />
      <View style={s.wrapper}>
        <LinearGradient colors={['#333333', '#000000']}>
          <ScrollView
            style={{height: '100%'}}
            contentContainerStyle={s.scrollWrapper}
            showsVerticalScrollIndicator={false}>
            <Text style={s.subTitle}>발주 기본 정보</Text>
            <InboundReceiptBaseInfoCard
              code={inboundReceipt.code}
              inboundDate={inboundReceipt.inboundDate}
              inboundOrderDate={inboundReceipt.inboundOrderDate}
              inboundSimplePlace={inboundReceipt.inboundSimplePlace}
              inboundPlace={inboundReceipt.inboundPlace}
              inboundType={inboundReceipt.inboundType}
              inboundStatus={inboundReceipt.inboundStatus}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text style={s.subTitle}>발주 상품 체크</Text>
              <Text
                style={[
                  s.subTitle,
                  {
                    fontSize: 14,
                    color:
                      checkCompletedProducts().length ===
                      inboundReceipt.products.length
                        ? '#ffffff'
                        : '#999999',
                  },
                ]}>
                {checkCompletedProducts().length} /{' '}
                {inboundReceipt.products.length}개 상품 완료
              </Text>
            </View>
            {inboundReceipt.products.map((item: ProductInfo, index: number) => (
              <InboundReceiptProductCheckCard
                key={index}
                inboundReceiptCode={inboundReceipt.code}
                product={item}
              />
            ))}
            {inboundReceipt.inboundType === 'PARCEL' && (
              <View style={{marginTop: 20}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={s.titleRow}>
                    <MaterialCommunityIcons
                      name={'package-variant-closed'}
                      size={20}
                      color={'#ffffff'}
                      style={{marginRight: 5, marginTop: 2}}
                    />
                    <Text style={s.subTitle}>택배입고 추가 체크</Text>
                  </View>
                  <Text
                    style={[
                      s.subTitle,
                      {
                        fontSize: 14,
                        color: completedParcelType() ? '#ffffff' : '#999999',
                      },
                    ]}>
                    {
                      inboundReceipt.inboundTypeCheckList.filter(e => e.check)
                        .length
                    }{' '}
                    / {inboundReceipt.inboundTypeCheckList.length}개 체크 완료
                  </Text>
                </View>
                <InboundReceiptParcelTypeCheckCard
                  inboundReceiptCode={inboundReceipt.code}
                  inboundType={inboundReceipt.inboundType}
                  checkList={inboundReceipt.inboundTypeCheckList}
                />
              </View>
            )}
            {inboundReceipt.inboundType === 'NORMAL' && (
              <View style={{marginTop: 20}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={s.titleRow}>
                    <MaterialCommunityIcons
                      name={'package-variant-closed'}
                      size={20}
                      color={'#ffffff'}
                      style={{marginRight: 5, marginTop: 2}}
                    />
                    <Text style={s.subTitle}>일반입고 추가 체크</Text>
                  </View>
                  <Text
                    style={[
                      s.subTitle,
                      {
                        fontSize: 14,
                        color: completedParcelType() ? '#ffffff' : '#999999',
                      },
                    ]}>
                    {
                      inboundReceipt.inboundTypeCheckList.filter(e => e.check)
                        .length
                    }{' '}
                    / {inboundReceipt.inboundTypeCheckList.length}개 체크 완료
                  </Text>
                </View>
                <InboundReceiptParcelTypeCheckCard
                  inboundReceiptCode={inboundReceipt.code}
                  inboundType={inboundReceipt.inboundType}
                  checkList={inboundReceipt.inboundTypeCheckList}
                />
              </View>
            )}
          </ScrollView>
        </LinearGradient>

        {/* 하단 footer */}
        <SafeAreaView
          style={[
            s.footer,
            {
              backgroundColor:
                totalCheckItemSize() === checkCompletedSize()
                  ? '#EEEEEE'
                  : '#333333',
            },
          ]}>
          <Text
            style={[
              s.footerText,
              {
                color:
                  totalCheckItemSize() === checkCompletedSize()
                    ? '#666666'
                    : '#999999',
              },
            ]}>
            {checkCompletedSize()} / {totalCheckItemSize()} 항목 체크 완료
          </Text>
          {totalCheckItemSize() === checkCompletedSize() && (
            <LottieView
              source={require('../../../assets/lottie/success_check.json')}
              autoPlay
              loop
              style={[
                {
                  marginTop: 5,
                  marginLeft: 5,
                  width: 30,
                  height: 30,
                },
              ]}
            />
          )}
        </SafeAreaView>
      </View>
    </>
  );
};

export default InboundReceiptDetail;

const s = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollWrapper: {
    padding: 15,
    paddingBottom: 100,
  },
  title: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },

  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
    marginBottom: 8,
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333333',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // iOS 그림자
    shadowColor: '#000000', // 그림자 색
    shadowOffset: {width: 0, height: -10}, // 그림자 방향 (위쪽으로 5px)
    shadowOpacity: 0.7, // 그림자 투명도
    shadowRadius: 5, // 그림자 블러 반경
    // Android 그림자 (elevation은 그림자를 생성함)
    elevation: 10, // 그림자의 높이
  },

  footerText: {
    marginTop: 10,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
