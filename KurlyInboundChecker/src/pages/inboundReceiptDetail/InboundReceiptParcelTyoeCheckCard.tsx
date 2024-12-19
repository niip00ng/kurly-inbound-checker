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
import {launchImageLibrary} from 'react-native-image-picker';
import {GptProductCheckResponse, GptResponse} from './api/chatGpt';
import {useLoading} from '@pages/common/LoadingContext';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@modules/store';
import {useToast} from 'react-native-toast-notifications';
import GptResponseResultModal from './GptResponseResultModal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  inboundReceiptCode: string;
  checkList: Array<CheckItem>;
}

const InboundReceiptParcelTyoeCheckCard: React.FC<Props> = ({
  inboundReceiptCode,
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

  return (
    <View style={{marginBottom: 20}}>
      <TouchableOpacity activeOpacity={0.7} style={styles.selectCheckType}>
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
      <CheckTypeSelectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        clickGallary={() => {
          setModalVisible(false);
        }}
        clickManual={() => {
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

export default InboundReceiptParcelTyoeCheckCard;
