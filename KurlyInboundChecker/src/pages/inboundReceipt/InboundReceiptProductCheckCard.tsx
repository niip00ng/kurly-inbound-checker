import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ProductInfo} from '../home';

interface InboundReceiptProductCheckCardProps {
  product: ProductInfo;
  index: number;
  selectedIndex: number | null;
  handlePress: (index: number) => void;
}

interface ProductCheckItem {
  id: string;
  title: string;
  check: boolean;
}

const InboundReceiptProductCheckCard: React.FC<
  InboundReceiptProductCheckCardProps
> = ({product, index, selectedIndex, handlePress}) => {
  const [productCheckItems, setProductCheckItems] = useState<
    Array<ProductCheckItem>
  >([]);

  useEffect(() => {
    setProductCheckItems([
      {
        id: '1',
        title: '발주서와 상품의 종류 및 수량이 일치하는가?',
        check: false,
      },
      {
        id: '2',
        title:
          '발주서의 소비기한이 실상품의 소비기한과 일치하거나 더 미래인가?',
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
    ]);
  }, []);

  return (
    <View key={index} style={{marginBottom: 20}}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.productContainer}
        onPress={() => handlePress(index)}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <FastImage
            style={styles.productImage}
            source={{uri: product.imageUrl}}
          />
          <View style={{width: '100%', paddingLeft: 10}}>
            <View style={styles.cardRow}>
              <Text style={styles.label}>상품코드</Text>
              <Text style={styles.value}>{product.goodsCode}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.label}>상품이름</Text>
              <Text style={styles.value}>{product.goodsName}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.label}>바코드번호</Text>
              <Text style={styles.value}>{product.barcode}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.label}>유통기한</Text>
              <Text style={styles.value}>{product.expiredDate}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.label}>박스수</Text>
              <Text style={styles.value}>{product.boxCount}개</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.label}>박스당 상품수</Text>
              <Text style={styles.value}>{product.unitPerBoxCount}개</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.label}>규격</Text>
              <Text style={styles.value}>{product.weight}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.label}>비고</Text>
              <Text style={styles.value}>{product.description || 'N/A'}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.label}>체크리스트</Text>
              <Text style={styles.value}>{'1 / 7개 체크완료'}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {selectedIndex === index && (
        <View style={styles.checklistCard}>
          {productCheckItems.map((checkItem, i) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={i}
              style={styles.checklistRow}>
              <MaterialIcons
                name={'check-circle-outline'}
                size={16}
                color={checkItem.check ? '#ffffff' : '#999999'}
                style={{marginRight: 5, marginLeft: 1}}
              />
              <Text
                style={[
                  styles.checkItemText,
                  {color: checkItem.check ? '#ffffff' : '#999999'},
                ]}>
                {checkItem.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginTop: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginBottom: 10,
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

export default InboundReceiptProductCheckCard;
