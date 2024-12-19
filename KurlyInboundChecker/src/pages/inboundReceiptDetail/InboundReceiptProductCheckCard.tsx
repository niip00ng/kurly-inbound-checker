import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ProductInfo} from '@pages/inboundReceiptListView/inboundReceiptsSlice';
import {CheckItem} from '@pages/inboundReceiptListView/inboundReceiptsSlice';
import CheckTypeSelectModal from './CheckTypeSelectModal';
import {
  getAllPictureProductCheck,
  getGptCheck,
  GptProductCheckResponse,
  GptResponse,
} from './api/chatGpt';
import {getProductCheckPrompt} from './api/prompt';
import {useLoading} from '@pages/common/LoadingContext';
import {updateOneCheckItem} from '../inboundReceiptListView/inboundProductCheckItemStorage';
import {fetchInboundReceipts} from '../inboundReceiptListView/inboundReceiptsThunks';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@modules/store';
import {useToast} from 'react-native-toast-notifications';
import GptResponseResultModal from './GptResponseResultModal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GptMultiResponseResultModal from './GptMultiResponseResultModal';
import {
  createFormDataFromImages,
  pickMultipleImages,
  pickSingleImage,
} from '../common/imagePickerUtil';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface InboundReceiptProductCheckCardProps {
  inboundReceiptCode: string;
  product: ProductInfo;
}

const InboundReceiptProductCheckCard: React.FC<
  InboundReceiptProductCheckCardProps
> = ({inboundReceiptCode, product}) => {
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const {showLoading, hideLoading} = useLoading();
  const [modalVisible, setModalVisible] = useState(false);
  const [gptModalVisible, setGptModalVisible] = useState(false);
  const [gptMultiModalVisible, setGptMultiModalVisible] = useState(false);
  const [spreadYn, setSpreadYn] = useState(false);
  const [gptResponse, setGptResponse] = useState<GptResponse | null>(null);
  const [gptMulitChecks, setGptMultiChecks] = useState<
    Array<GptProductCheckResponse>
  >([]);
  const [selectedCheckItem, setSelectedCheckItem] = useState<CheckItem | null>(
    null,
  );

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setSpreadYn(!spreadYn);
  };

  const handleCheckItemPress = (productCheckItem: CheckItem) => {
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
    try {
      showLoading();
      const selectedImageUri = await pickSingleImage();

      const formData = createFormDataFromImages(
        [
          {
            uri: selectedImageUri,
            name: 'selectedImage.jpg',
            type: 'image/jpeg',
          },
        ],
        'file',
      );

      if (!selectedCheckItem) {
        return;
      }

      const prompt = getProductCheckPrompt(
        selectedCheckItem?.id,
        product.barcode,
        product.expiredDate,
      );

      if (!prompt) {
        return;
      }

      const response: GptResponse = await getGptCheck(formData, prompt);

      if (response.result === 'pass') {
        updateCheckItem();
      }

      setGptResponse(response);
      setGptModalVisible(true);
      console.log('API 응답:', response);
    } catch (error) {
    } finally {
      hideLoading(); // 로딩 종료
    }
  };

  const handleGalleryMultiSelection = async () => {
    try {
      showLoading();
      const selectedImages = await pickMultipleImages();

      const formData = createFormDataFromImages(selectedImages, 'files');

      console.log(product.barcode, product.expiredDate, formData);
      const response: Array<GptProductCheckResponse> =
        await getAllPictureProductCheck(
          formData,
          product.barcode,
          product.expiredDate,
        );
      setGptMultiChecks(response);
      setGptMultiModalVisible(true);
    } catch (error) {
    } finally {
      hideLoading(); // 로딩 종료
    }
  };

  const updateCheckItem = async () => {
    if (selectedCheckItem) {
      await updateOneCheckItem(inboundReceiptCode, product.goodsCode, {
        ...selectedCheckItem,
        check: true,
      });
      toast.show('수기 검수가 완료 되었습니다. 👏', {
        type: 'info',
        duration: 2000,
      });

      dispatch(fetchInboundReceipts());
    }
  };

  return (
    <View style={{marginBottom: 20}}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.productContainer}
        onPress={() => handlePress()}>
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
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={[styles.value, {color: checklistTextColor}]}>
                  {`${completedCount} / ${totalCount}개 완료`}
                </Text>
                <FontAwesome
                  name={spreadYn ? 'caret-up' : 'caret-down'}
                  size={20}
                  color={'#ffffff'}
                  style={{marginLeft: 10}}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {spreadYn && (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.selectCheckType}
            onPress={handleGalleryMultiSelection}>
            <FontAwesome5
              name={'images'}
              size={16}
              color={'#ffffff'}
              style={{marginRight: 15, marginLeft: 10}}
            />
            <Text style={styles.closeButtonText}>
              여러장 이미지로 일괄 체크하기
            </Text>
          </TouchableOpacity>
          <View style={styles.checklistCard}>
            {product.checkList.map((checkItem: CheckItem, i: number) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={i}
                style={styles.checklistRow}
                onPress={() => handleCheckItemPress(checkItem)}>
                <MaterialIcons
                  name={'check-circle-outline'}
                  size={16}
                  color={checkItem.check ? '#999999' : '#ffffff'}
                  style={{marginRight: 5, marginLeft: 1}}
                />
                <Text
                  style={[
                    styles.checkItemText,
                    {
                      color: checkItem.check ? '#999999' : '#ffffff',
                      fontWeight: checkItem.check ? '500' : 'bold',
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
        </>
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
      <GptMultiResponseResultModal
        visible={gptMultiModalVisible}
        onClose={() => setGptMultiModalVisible(false)}
        inboundReceiptCode={inboundReceiptCode}
        product={product}
        gptMultiChecks={gptMulitChecks}
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
    minWidth: '40%',
  },
  checklistCard: {
    backgroundColor: '#ffffff10',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    padding: 10,
  },
  checklistRow: {
    marginBottom: 5,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  checkItemText: {
    paddingRight: 15,
    fontSize: 14,
    color: '#ffffff',
  },
  selectCheckType: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#ffffff20',
    padding: 10,
    paddingVertical: 15,
    marginTop: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InboundReceiptProductCheckCard;
