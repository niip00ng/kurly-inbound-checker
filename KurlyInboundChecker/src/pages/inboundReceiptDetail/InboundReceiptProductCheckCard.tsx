import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ProductInfo} from '@pages/inboundReceiptListView/inboundReceiptsSlice';
import {ProductCheckItem} from '@pages/inboundReceiptListView/inboundReceiptsSlice';
import CheckTypeSelectModal from './CheckTypeSelectModal';

interface InboundReceiptProductCheckCardProps {
  product: ProductInfo;
  index: number;
  selectedIndex: number | null;
  handlePress: (index: number) => void;
}

const InboundReceiptProductCheckCard: React.FC<
  InboundReceiptProductCheckCardProps
> = ({product, index, selectedIndex, handlePress}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCheckTitle, setSelectedCheckTitle] = useState<string | null>(
    null,
  );

  const handleCheckItemPress = (title: string) => {
    setSelectedCheckTitle(title);
    setModalVisible(true);
  };

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
          {product.checkList.map((checkItem: ProductCheckItem, i: number) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={i}
              style={styles.checklistRow}
              onPress={() => handleCheckItemPress(checkItem.title)}>
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
      <CheckTypeSelectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedCheckTitle={selectedCheckTitle}
      />
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
