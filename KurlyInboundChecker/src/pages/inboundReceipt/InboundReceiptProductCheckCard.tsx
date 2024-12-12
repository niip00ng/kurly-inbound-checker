import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {ProductInfo} from '../home';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width;
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCheckTitle, setSelectedCheckTitle] = useState<string | null>(
    null,
  );

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
          {productCheckItems.map((checkItem, i) => (
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

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#C237ED', '#DE6D7E']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              padding: 2,
              borderRadius: 20,
            }}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>체크 방법 선택</Text>
              <Text style={styles.modalText}>{selectedCheckTitle}</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.selectCheckType}
                onPress={() => setModalVisible(false)}>
                <Fontisto
                  name={'camera'}
                  size={18}
                  color={'#ffffff'}
                  style={{marginRight: 15, marginLeft: 10}}
                />
                <Text style={styles.closeButtonText}>카메라 촬영으로 체크</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.selectCheckType}
                onPress={() => setModalVisible(false)}>
                <Fontisto
                  name={'picture'}
                  size={16}
                  color={'#ffffff'}
                  style={{marginRight: 15, marginLeft: 10}}
                />
                <Text style={styles.closeButtonText}>갤러리 이미지로 체크</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.selectCheckType, {marginBottom: 40}]}
                onPress={() => setModalVisible(false)}>
                <FontAwesome
                  name={'eye'}
                  size={22}
                  color={'#ffffff'}
                  style={{marginRight: 15, marginLeft: 10}}
                />
                <Text style={styles.closeButtonText}>직접 수기 체크</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#000000',
    borderRadius: 20,
    padding: 20,
    width: width - 60,
    alignItems: 'center',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },

  selectCheckType: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#ffffff20',
    padding: 10,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InboundReceiptProductCheckCard;
