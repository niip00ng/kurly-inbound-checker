import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const BarcodeScannerView: React.FC = () => {
  const [barcode, setBarcode] = useState<string | null>(null); // 스캔된 바코드를 저장할 상태

  return (
    <View style={styles.container}>
      {barcode && (
        <View style={styles.barcodeContainer}>
          <Text style={styles.barcodeText}>Scanned Barcode: {barcode}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    padding: 20,
  },
  barcodeContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    alignItems: 'center',
  },
  barcodeText: {
    color: 'white',
    fontSize: 18,
  },
});

export default BarcodeScannerView;
