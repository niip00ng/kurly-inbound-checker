/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const width = Dimensions.get('window').width;
import {GptResponse} from './api/chatGpt';
import LottieView from 'lottie-react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
interface GptResponseResultModalProps {
  visible: boolean;
  onClose: () => void;
  gptResponse: GptResponse | null;
}

const GptResponseResultModal: React.FC<GptResponseResultModalProps> = ({
  visible,
  onClose,
  gptResponse,
}) => {
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

            {gptResponse?.result === 'SUCCESS' && (
              <LottieView
                source={require('../../../assets/lottie/success_check.json')} // Lottie 파일 경로
                autoPlay
                style={[{marginBottom: 40}, styles.lottie]}
              />
            )}
            {gptResponse?.result === 'FAIL' && (
              <>
                <LottieView
                  source={require('../../../assets/lottie/error.json')} // Lottie 파일 경로
                  autoPlay
                  style={styles.lottie}
                />
                <Text style={styles.modalText}>{gptResponse?.reason}</Text>
              </>
            )}
            {gptResponse?.result === 'UNKNOWN' && (
              <>
                <Fontisto
                  name={'question'}
                  size={80}
                  color={'#ffffff'}
                  style={{marginTop: 20, marginBottom: 40}}
                />
                <Text style={styles.modalText}>{gptResponse?.reason}</Text>
              </>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.closeButton}
                onPress={() => {
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
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 50,
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
  lottie: {
    width: 150,
    height: 150,
  },
});

export default GptResponseResultModal;
