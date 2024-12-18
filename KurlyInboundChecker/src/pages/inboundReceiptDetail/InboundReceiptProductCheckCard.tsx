import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ProductInfo} from '@pages/inboundReceiptListView/inboundReceiptsSlice';
import {ProductCheckItem} from '@pages/inboundReceiptListView/inboundReceiptsSlice';
import CheckTypeSelectModal from './CheckTypeSelectModal';
import {launchImageLibrary} from 'react-native-image-picker';
import {getGptCheck, GptResponse} from './api/chatGpt';
import {getPrompt} from './api/prompt';
import {useLoading} from '@pages/common/LoadingContext';
import {updateOneCheckItem} from '../inboundReceiptListView/inboundProductCheckItemStorage';
import {fetchInboundReceipts} from '../inboundReceiptListView/inboundReceiptsThunks';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@modules/store';
import {useToast} from 'react-native-toast-notifications';
import GptResponseResultModal from './GptResponseResultModal';

interface InboundReceiptProductCheckCardProps {
  inboundReceiptCode: string;
  product: ProductInfo;
  index: number;
  selectedIndex: number | null;
  handlePress: (index: number) => void;
}

const InboundReceiptProductCheckCard: React.FC<
  InboundReceiptProductCheckCardProps
> = ({inboundReceiptCode, product, index, selectedIndex, handlePress}) => {
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const {showLoading, hideLoading} = useLoading();
  const [modalVisible, setModalVisible] = useState(false);
  const [gptModalVisible, setGptModalVisible] = useState(false);
  const [gptResponse, setGptResponse] = useState<GptResponse | null>(null);
  const [selectedCheckItem, setSelectedCheckItem] =
    useState<ProductCheckItem | null>(null);

  const handleCheckItemPress = (productCheckItem: ProductCheckItem) => {
    setSelectedCheckItem(productCheckItem);
    setModalVisible(true);
  };

  const getChecklistTextColor = (checkList: {check: boolean}[]) => {
    const completedCount = checkList.filter(e => e.check).length;
    return completedCount === checkList.length ? '#A1D9AE' : '#999999';
  };

  const completedCount = product.checkList.filter(e => e.check).length;
  const totalCount = product.checkList.length;
  const checklistTextColor = getChecklistTextColor(product.checkList);

  const handleGallerySelection = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;

      console.log('선택된 이미지 URI:', selectedImageUri);
      showLoading();
      try {
        // FormData에 Blob 추가
        const formData = new FormData();
        formData.append('file', {
          uri: selectedImageUri,
          name: 'selectedImage.jpg',
          type: 'image/jpeg',
        });

        if (!selectedCheckItem) {
          return;
        }
        const prompt = getPrompt(selectedCheckItem?.id);

        if (!prompt) {
          return;
        }
        // API 호출
        const response: GptResponse = await getGptCheck(formData, prompt);

        if (response.result === 'SUCCESS') {
          updateCheckItem();
        }
        setGptResponse(response);
        setGptModalVisible(true);
        console.log('API 응답:', response);
        hideLoading(); // 로딩 종료
      } catch (error) {
        console.error('이미지 처리 중 오류 발생:', error);
        hideLoading(); // 로딩 종료
      }
    } else {
      console.log('이미지가 선택되지 않았습니다.');
      hideLoading(); // 로딩 종료
    }
  };

  const postOneCheckItem = async (
    inboundReceiptCode: string,
    goodsCode: string,
    selectedCheckItem: ProductCheckItem,
  ) => {
    await updateOneCheckItem(inboundReceiptCode, goodsCode, {
      ...selectedCheckItem,
      check: true,
    });
    toast.show('수기 검수가 완료 되었습니다. 👏', {
      type: 'info',
      duration: 2000,
    });

    dispatch(fetchInboundReceipts());
  };

  const updateCheckItem = () => {
    if (selectedCheckItem) {
      postOneCheckItem(inboundReceiptCode, product.goodsCode, {
        ...selectedCheckItem,
        check: true,
      });
    }
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
              <Text style={[styles.value, {color: checklistTextColor}]}>
                {`${completedCount} / ${totalCount}개 체크완료`}
              </Text>
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
              onPress={() => handleCheckItemPress(checkItem)}>
              <MaterialIcons
                name={'check-circle-outline'}
                size={16}
                color={checkItem.check ? '#ffffff' : '#999999'}
                style={{marginRight: 5, marginLeft: 1}}
              />
              <Text
                style={[
                  styles.checkItemText,
                  {
                    color: checkItem.check ? '#ffffff' : '#999999',
                    textDecorationLine: !checkItem.check
                      ? 'none'
                      : 'line-through', // checkItem.check가 false일 때 취소선 추가
                  },
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
        clickGallary={() => {
          handleGallerySelection();
          setModalVisible(false);
        }}
        clickManual={() => {
          updateCheckItem();
          setModalVisible(false);
        }}
        selectedCheckItem={selectedCheckItem}
      />
      <GptResponseResultModal
        visible={gptModalVisible}
        onClose={() => setGptModalVisible(false)}
        gptResponse={gptResponse}
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
