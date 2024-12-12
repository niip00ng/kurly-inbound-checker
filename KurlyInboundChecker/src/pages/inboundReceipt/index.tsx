import React, {useState} from 'react';
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
import {InboundReceiptItem, ProductInfo} from '../home';
import LinearGradient from 'react-native-linear-gradient';
import InboundReceiptBaseInfoCard from './InboundReceiptBaseInfoCard';
import InboundReceiptProductCheckCard from './InboundReceiptProductCheckCard';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const InboundReceipt = () => {
  const route = useRoute();
  const {inboundReceipt} = route.params as {inboundReceipt: InboundReceiptItem};

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePress = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedIndex(prevIndex => (prevIndex === index ? null : index));
  };

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
              발주 상품 체크({inboundReceipt.products.length}개)
            </Text>

            {inboundReceipt.products.map((item: ProductInfo, index) => (
              <InboundReceiptProductCheckCard
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

export default InboundReceipt;

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
