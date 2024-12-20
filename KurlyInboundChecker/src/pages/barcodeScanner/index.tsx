import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import TopComponent from '../TopComponent';
import LinearGradient from 'react-native-linear-gradient'; // LinearGradient 임포트

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState<string | null>(null);

  const onBarcodeScan = (event: any) => {
    if (!barcode) {
      console.log(event.nativeEvent.codeStringValue);
      setBarcode(event.nativeEvent.codeStringValue);
    }
  };

  return (
    <>
      <TopComponent
        titleComponrnt={<Text style={styles.title}>바코드 스캔</Text>}
      />
      <View style={styles.container}>
        <Text>발주서 or 상품 바코드를 인식해 주세요</Text>
        <LinearGradient
          colors={['#C237ED', '#DE6D7E']} // 그라데이션 색상 설정
          style={styles.camera} // 스타일을 LinearGradient로 감쌈
        >
          <Camera
            style={{width: '100%', height: '100%'}}
            scanBarcode={true}
            type={CameraType.Back}
            onReadCode={onBarcodeScan}
            showFrame={false}
          />
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    paddingTop: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  camera: {
    width: '100%',
    height: '30%',
    marginBottom: 20,
    marginTop: 10,
    padding: 2,
  },
  resultContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flashButton: {
    marginTop: 20,
    fontSize: 18,
    color: 'blue',
  },
  title: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default BarcodeScanner;
