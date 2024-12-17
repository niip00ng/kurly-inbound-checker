import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import TopComponent from '../TopComponent';
import {
  InboundReceiptItem,
  ProductInfo,
} from '@pages/inboundReceiptListView/inboundReceiptsSlice';
import LinearGradient from 'react-native-linear-gradient';
import InboundReceiptBaseInfoCard from './InboundReceiptBaseInfoCard';
import InboundReceiptProductCheckCard from './InboundReceiptProductCheckCard';
import {RootState} from '@modules/store';
import {useSelector} from 'react-redux';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const InboundReceiptDetail = () => {
  const route = useRoute();
  const {code} = route.params as {code: string}; // 단순히 code만 전달받음
  const inboundReceiptsSlice: Array<InboundReceiptItem> = useSelector(
    (state: RootState) => state.InboundReceipts.inboundReceipts,
  );

  const [inboundReceipt, setInboundReceipt] =
    useState<InboundReceiptItem | null>(null);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePress = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const findReceipt: InboundReceiptItem | undefined =
      inboundReceiptsSlice.find(receipt => receipt.code === code);

    if (findReceipt) {
      setInboundReceipt(findReceipt);
    }
  }, [inboundReceiptsSlice, code]);

  if (!inboundReceipt) {
    return <Text>발주서 정보를 찾을 수 없습니다.</Text>;
  }

  return (
    <>
      <TopComponent
        titleComponrnt={<Text style={s.title}>발주서 상세정보</Text>}
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
            <Text style={s.subTitle}>
              발주 상품 {inboundReceipt.products.length}개
            </Text>

            {inboundReceipt.products.map((item: ProductInfo, index: number) => (
              <InboundReceiptProductCheckCard
                inboundReceiptCode={inboundReceipt.code}
                key={index}
                product={item}
                index={index}
                selectedIndex={selectedIndex}
                handlePress={handlePress}
              />
            ))}
          </ScrollView>
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
});
