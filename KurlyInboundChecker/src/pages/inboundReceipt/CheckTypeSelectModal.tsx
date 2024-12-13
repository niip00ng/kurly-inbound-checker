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
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;

interface CheckModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCheckTitle: string | null;
}

const CheckTypeSelectModal: React.FC<CheckModalProps> = ({
  visible,
  onClose,
  selectedCheckTitle,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
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
            <Text style={styles.modalText}>{selectedCheckTitle}</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.selectCheckType}
              onPress={onClose}>
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
              onPress={onClose}>
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
              onPress={onClose}>
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
              onPress={onClose}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
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

export default CheckTypeSelectModal;
