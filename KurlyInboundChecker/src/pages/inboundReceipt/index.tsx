import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import TopComponent from '../TopComponent';
import {InboundReceiptItem, ProductInfo} from '../home';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import InboundReceiptBaseInfoCard from './InboundReceiptBaseInfoCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

  const checklistItems = [
    {
      id: '1',
      title: '발주서와 상품의 종류 및 수량이 일치하는가?',
      check: false,
    },
    {
      id: '2',
      title: '발주서의 소비기한이 실상품의 소비기한과 일치하거나 더 미래인가?',
      check: false,
    },
    {
      id: '3',
      title: '외박스의 소비기한과 실상품의 소비기한이 일치하는가?',
      check: false,
    },
    {
      id: '4',
      title: '상품에 바코드가 정상 부착되어 있는가?',
      check: false,
    },
    {
      id: '5',
      title: '상품의 모든 바코드가 동일한가?',
      check: false,
    },
    {
      id: '6',
      title: '상품의 모든 바코드가 동일한가?',
      check: false,
    },
    {
      id: '7',
      title: '상품 라벨지에 한글표시사항이 부착되어 있는가?',
      check: false,
    },
    {
      id: '8',
      title: '상품 라벨지에 상품판매가가 노출되어 있지 않은가?',
      check: false,
    },
  ];

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
              <View key={index} style={{marginBottom: 20}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={s.productContainer}
                  onPress={() => handlePress(index)}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <FastImage
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 5,
                        marginBottom: 10,
                      }}
                      source={{uri: item.imageUrl}}
                    />
                    <View style={{width: '100%', paddingLeft: 10}}>
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
                      <View style={s.cardRow}>
                        <Text style={s.label}>체크리스트</Text>
                        <Text style={s.value}>{'1 / 7개 체크완료'}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                {selectedIndex === index && (
                  <View style={s.checklistCard}>
                    {checklistItems.map((checkItem, i) => (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        key={i}
                        style={s.checklistRow}>
                        <MaterialIcons
                          name={'check-circle-outline'}
                          size={16}
                          color={checkItem.check ? '#ffffff' : '#999999'}
                          style={{marginRight: 5, marginLeft: 1}}
                        />
                        <Text
                          style={[
                            s.checkItemText,
                            {color: checkItem.check ? '#ffffff' : '#999999'},
                          ]}>
                          {checkItem.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
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
    padding: 15,
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
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    minWidth: 90,
    color: '#ffffff',
    fontWeight: 'bold',
    marginRight: 20,
  },
  value: {
    fontSize: 14,
    color: '#ffffff',
    flex: 1,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
    marginBottom: 8,
  },
  productContainer: {
    marginTop: 10,
  },
  checklistCard: {
    backgroundColor: '#ffffff10',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  checklistRow: {
    marginBottom: 5,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  checkItemText: {
    fontSize: 14,
    color: '#ffffff',
  },
});
