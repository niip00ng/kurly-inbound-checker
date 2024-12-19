import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CheckItem} from '@pages/inboundReceiptListView/inboundReceiptsSlice';
import CheckTypeSelectModal from '../CheckTypeSelectModal';
import {
  getAllPictureNormalTypeCheck,
  getAllPictureParcelTypeCheck,
  getGptCheck,
  GptProductCheckResponse,
  GptResponse,
} from '../api/chatGpt';
import {useLoading} from '@pages/common/LoadingContext';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@modules/store';
import {useToast} from 'react-native-toast-notifications';
import GptResponseResultModal from '../GptResponseResultModal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  addParcelTypeCheckItem,
  updateOneParcelTypeCheckItem,
} from '../../inboundReceiptListView/inboundParcelTypeCheckItemStorage';
import {fetchInboundReceipts} from '../../inboundReceiptListView/inboundReceiptsThunks';
import {
  createFormDataFromImages,
  pickMultipleImages,
  pickSingleImage,
} from '../../common/imagePickerUtil';
import {getNormalTypeCheckPrompt} from '../api/prompt';
import GptMultiResponseResultModal from '../GptMultiResponseResultModal';

interface Props {
  inboundReceiptCode: string;
  inboundType: string;
  checkList: Array<CheckItem>;
}

const InboundReceiptParcelTypeCheckCard: React.FC<Props> = ({
  inboundReceiptCode,
  inboundType,
  checkList,
}) => {
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const {showLoading, hideLoading} = useLoading();
  const [modalVisible, setModalVisible] = useState(false);
  const [gptModalVisible, setGptModalVisible] = useState(false);
  const [gptMultiModalVisible, setGptMultiModalVisible] = useState(false);
  const [gptResponse, setGptResponse] = useState<GptResponse | null>(null);
  const [gptMulitChecks, setGptMultiChecks] = useState<
    Array<GptProductCheckResponse>
  >([]);
  const [selectedCheckItem, setSelectedCheckItem] = useState<CheckItem | null>(
    null,
  );

  const updateCheckItem = async () => {
    if (selectedCheckItem) {
      await updateOneParcelTypeCheckItem(inboundReceiptCode, inboundType, {
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

  const handleGalleryMultiSelection = async () => {
    try {
      showLoading();
      const selectedImages = await pickMultipleImages();

      const formData = createFormDataFromImages(selectedImages, 'files');

      const response: Array<GptProductCheckResponse> =
        inboundType === 'NORMAL'
          ? await getAllPictureNormalTypeCheck(formData)
          : await getAllPictureParcelTypeCheck(formData);

      console.log(inboundType + ' response:' + response);
      setGptMultiChecks(response);
      setGptMultiModalVisible(true);
    } catch (error) {
    } finally {
      hideLoading(); // 로딩 종료
    }
  };

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

      const prompt = getNormalTypeCheckPrompt(selectedCheckItem?.id);

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

  const updateAllStorageCheckItems = async () => {
    const result = checkList.map(productCheckItem => {
      const find = gptMulitChecks.find(
        e => e.checkType === productCheckItem.id && e.result === 'pass',
      );
      if (!find) {
        return productCheckItem;
      }

      return {
        ...productCheckItem,
        check: true,
      };
    });

    await addParcelTypeCheckItem(inboundReceiptCode, result);

    toast.show('이미지 체크 검수가 완료 되었습니다. 👏', {
      type: 'info',
      duration: 2000,
    });

    dispatch(fetchInboundReceipts());
    setGptMultiModalVisible(false);
  };

  const handleCheckItemPress = (productCheckItem: CheckItem) => {
    setSelectedCheckItem(productCheckItem);
    setModalVisible(true);
  };

  return (
    <View style={{marginBottom: 20}}>
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
        {checkList.map((checkItem: CheckItem, i: number) => (
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
      <CheckTypeSelectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        clickGallary={() => {
          handleGallerySelection();
          setModalVisible(false);
        }}
        clickManual={() => {
          setModalVisible(false);
          updateCheckItem();
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
        onApply={updateAllStorageCheckItems}
        checkList={checkList}
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

export default InboundReceiptParcelTypeCheckCard;
