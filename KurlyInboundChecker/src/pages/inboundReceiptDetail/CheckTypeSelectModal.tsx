/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState, useRef, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;
import {ProductCheckItem} from '../inboundReceiptListView/inboundReceiptsSlice';

interface CheckModalProps {
  visible: boolean;
  onClose: () => void;
  clickGallary: () => void;
  clickManual: () => void;
  selectedCheckItem: ProductCheckItem | null;
}

const CheckTypeSelectModal: React.FC<CheckModalProps> = ({
  visible,
  onClose,
  clickGallary,
  clickManual,
  selectedCheckItem,
}) => {
  const [manualCheck, setManualCheck] = useState(false);
  const selectCheckTypeOpacity = useRef(new Animated.Value(1)).current;
  const manualCheckOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      // Reset animation values when the modal is closed
      selectCheckTypeOpacity.setValue(1);
      manualCheckOpacity.setValue(0);
      setManualCheck(false);
    }
  }, [visible]);

  const handleManualCheck = () => {
    Animated.timing(selectCheckTypeOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setManualCheck(true);
      Animated.timing(manualCheckOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBackToSelection = () => {
    Animated.timing(manualCheckOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {});

    Animated.timing(selectCheckTypeOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setManualCheck(false));
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
            <Text style={styles.modalTitle}>체크 방법 선택</Text>
            <Text style={styles.modalText}>{selectedCheckItem?.title}</Text>

            {!manualCheck && (
              <Animated.View
                style={[
                  styles.selectCheckTypeContainer,
                  {opacity: selectCheckTypeOpacity},
                ]}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.selectCheckType}
                  onPress={() => {}}>
                  <Fontisto
                    name={'camera'}
                    size={18}
                    color={'#ffffff'}
                    style={{marginRight: 15, marginLeft: 10}}
                  />
                  <Text style={styles.closeButtonText}>
                    카메라 촬영으로 체크
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.selectCheckType}
                  onPress={clickGallary}>
                  <Fontisto
                    name={'picture'}
                    size={16}
                    color={'#ffffff'}
                    style={{marginRight: 15, marginLeft: 10}}
                  />
                  <Text style={styles.closeButtonText}>
                    갤러리 이미지로 체크
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.selectCheckType, {marginBottom: 40}]}
                  onPress={handleManualCheck}>
                  <FontAwesome
                    name={'eye'}
                    size={22}
                    color={'#ffffff'}
                    style={{marginRight: 15, marginLeft: 10}}
                  />
                  <Text style={styles.closeButtonText}>직접 수기 체크</Text>
                </TouchableOpacity>
              </Animated.View>
            )}

            {manualCheck && (
              <Animated.View
                style={{
                  minHeight: 210,
                  opacity: manualCheckOpacity,
                  display: 'flex',
                  paddingTop: 50,
                }}>
                {/* 완료 버튼 추가 */}
                <TouchableOpacity
                  style={styles.completeButton}
                  activeOpacity={0.7}
                  onPress={clickManual}>
                  <FontAwesome
                    name="check"
                    size={24}
                    color="#ffffff"
                    style={{marginRight: 10}}
                  />
                  <Text style={styles.completeButtonText}>수기체크 완료</Text>
                </TouchableOpacity>
              </Animated.View>
            )}

            <View style={styles.buttonContainer}>
              {manualCheck && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.closeButton, {left: 10}]}
                  onPress={handleBackToSelection}>
                  <Text style={styles.closeButtonText}>이전</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.closeButton}
                onPress={() => {
                  setManualCheck(false);
                  onClose();
                }}>
                <Text style={styles.closeButtonText}>닫기</Text>
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
  selectCheckTypeContainer: {
    display: 'flex',
    width: '100%',
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
  manualCheckText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 15,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50', // 녹색 버튼
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default CheckTypeSelectModal;
