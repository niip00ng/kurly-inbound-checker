import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const width = Dimensions.get('window').width;
import {GptProductCheckResponse} from './api/chatGpt';
import {
  CheckItem,
  ProductInfo,
} from '../inboundReceiptListView/inboundReceiptsSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  addCheckItem,
  updateOneCheckItem,
} from '../inboundReceiptListView/inboundProductCheckItemStorage';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@modules/store';
import {fetchInboundReceipts} from '../inboundReceiptListView/inboundReceiptsThunks';

interface GptMultiResponseResultModalProps {
  visible: boolean;
  onClose: () => void;
  inboundReceiptCode: string;
  product: ProductInfo;
  gptMultiChecks: Array<GptProductCheckResponse>;
}

const GptMultiResponseResultModal: React.FC<
  GptMultiResponseResultModalProps
> = ({visible, onClose, inboundReceiptCode, product, gptMultiChecks}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [displayedItems, setDisplayedItems] = useState<boolean[]>([]);

  useEffect(() => {
    if (visible) {
      // `visible` 상태가 true로 변경될 때마다 항목 순차적으로 나타내기
      const newDisplayedItems = product.checkList.map(() => false);
      setDisplayedItems(newDisplayedItems);
    }
  }, [visible, product]);

  useEffect(() => {
    if (visible) {
      // 항목을 순차적으로 보여주기 위해 `LayoutAnimation` 사용
      product.checkList.forEach((_, index) => {
        setTimeout(() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setDisplayedItems(prev => {
            const updated = [...prev];
            updated[index] = true; // 해당 항목을 true로 설정하여 표시
            return updated;
          });
        }, index * 300); // 300ms 간격으로 항목을 표시
      });
    }
  }, [visible, product.checkList]);
  const updateCheckItem = async () => {
    const result = product.checkList.map(productCheckItem => {
      const find = gptMultiChecks.find(
        e => e.checkType === productCheckItem.id && e.result === 'pass',
      );

      if (!find) return productCheckItem;
      return {
        ...productCheckItem,
        check: true,
      };
    });

    await addCheckItem(inboundReceiptCode, product.goodsCode, result);

    dispatch(fetchInboundReceipts());
    onClose();
  };
  const defineCheckResult = (checkType: string) => {
    const find = gptMultiChecks.find(e => e.checkType === checkType);
    if (!find) {
      return 'unknown';
    }
    return find?.result;
  };

  const checkTypeResultLottie = (result: string) => {
    if (result === 'pass') {
      return (
        <AntDesign
          name={'checkcircle'}
          size={16}
          color={'#9CEDAF'}
          style={{marginTop: 0, marginBottom: 0}}
        />
      );
    } else if (result === 'fail') {
      return (
        <Entypo
          name={'warning'}
          size={16}
          color={'#E75B72'}
          style={{marginTop: 0, marginBottom: 0}}
        />
      );
    }

    return (
      <AntDesign
        name={'questioncircle'}
        size={16}
        color={'#666666'}
        style={{marginTop: 0, marginBottom: 0}}
      />
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      style={{zIndex: 20}}
      onRequestClose={onClose}>
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
            <Text style={styles.modalTitle}>이미지 검수 결과</Text>
            {product.checkList.map((checkItem: CheckItem, i: number) =>
              displayedItems[i] ? (
                <View key={i} style={styles.modalTextRow}>
                  {checkTypeResultLottie(defineCheckResult(checkItem.id))}
                  <Text
                    style={[
                      styles.modalText,
                      {
                        marginLeft: 10,
                        color:
                          defineCheckResult(checkItem.id) === 'pass'
                            ? '#ffffff'
                            : defineCheckResult(checkItem.id) === 'fail'
                            ? '#F09BA9'
                            : '#999999',

                        fontWeight:
                          defineCheckResult(checkItem.id) === 'unknown'
                            ? '300'
                            : 'bold',
                      },
                    ]}>
                    {checkItem.title}
                  </Text>
                </View>
              ) : null,
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.closeButton}
                onPress={() => {
                  updateCheckItem();
                }}>
                <Text style={[styles.closeButtonText, {color: '#ffffff'}]}>
                  성공한 검수 저장
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.closeButton}
                onPress={() => {
                  onClose();
                }}>
                <Text style={[styles.closeButtonText, {color: '#999999'}]}>
                  닫기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
  modalTextRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingRight: 10,
    marginBottom: 15, // 각 항목 사이에 간격 추가
  },
  modalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  closeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lottie: {
    width: 20,
    height: 20,
  },
});

export default GptMultiResponseResultModal;
