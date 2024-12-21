import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
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
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const InboundReceiptDetail = () => {
  const route = useRoute();
  const {code} = route.params as {code: string};
  const inboundReceiptsSlice: Array<InboundReceiptItem> = useSelector(
    (state: RootState) => state.inboundReceipts.inboundReceipts,
  );

  const [inboundReceipt, setInboundReceipt] =
    useState<InboundReceiptItem | null>(null);

  const [isOpenAllCheck, setIsOpenAllCheck] = useState(false);

  const openAllCheckLottie = (flag: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setIsOpenAllCheck(flag);
  };

  useEffect(() => {
    const findReceipt: InboundReceiptItem | undefined =
      inboundReceiptsSlice.find(receipt => receipt.code === code);

    if (findReceipt) {
      setInboundReceipt(findReceipt);
    }
  }, [inboundReceiptsSlice, code]);

  // 최초 렌더링 여부 추적용 ref
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (inboundReceipt) {
      // 최초 렌더링이 아닌 경우에만 조건 실행
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return; // 최초 렌더링 시에는 아무 작업도 하지 않음
      }

      if (totalCheckItemSize() === checkCompletedSize()) {
        openAllCheckLottie(true);

        // 3초 뒤에 setIsOpenAllCheck(false) 실행
        setTimeout(() => {
          openAllCheckLottie(false);
        }, 2000);
      }
    }
  }, [inboundReceipt]);

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
        {/* Dimmed 오버랩된 View 추가 */}
        {isOpenAllCheck && (
          <View style={s.dimmedOverlay}>
            <LottieView
              source={require('../../../assets/lottie/clap.json')} // Lottie 파일 경로
              autoPlay
              style={{width: 300, height: 150}}
            />
            <Text style={s.dimmedText}>전체 검수가 완료되었습니다.</Text>
          </View>
        )}
        <LinearGradient colors={['#000000', '#000000']}>
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
        <LinearGradient
          colors={[
            totalCheckItemSize() === checkCompletedSize()
              ? '#53BD78'
              : '#333333',
            totalCheckItemSize() === checkCompletedSize()
              ? '#53BD78'
              : '#333333',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={s.footer}>
          <SafeAreaView style={[s.footerSafe]}>
            <Text
              style={[
                s.footerText,
                {
                  color:
                    totalCheckItemSize() === checkCompletedSize()
                      ? '#ffffff'
                      : '#999999',
                },
              ]}>
              {checkCompletedSize()} / {totalCheckItemSize()} 항목 체크 완료
            </Text>
          </SafeAreaView>
        </LinearGradient>
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
    fontSize: 20,
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

    shadowColor: '#000000',
    shadowOffset: {width: 0, height: -10},
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 10,
    paddingBottom: Platform.OS === 'ios' ? 0 : 15,
  },
  footerSafe: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    marginTop: 15,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dimmedOverlay: {
    position: 'absolute',
    zIndex: 20,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // dimmed 색상
    justifyContent: 'center',
    alignItems: 'center',
  },
  dimmedText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
