import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import TopComponent from '../TopComponent';
import LinearGradient from 'react-native-linear-gradient'; // LinearGradient 임포트
import {useSelector} from 'react-redux';
import {InboundReceiptItem} from '../inboundReceiptListView/inboundReceiptsSlice';
import {RootState} from '~/modules/store';
import InboundReciptCard from '../inboundReceiptListView/InboundReciptCard';
import {useNavigation} from '@react-navigation/native';

const BarcodeScanner = () => {
  const navigation: any = useNavigation();
  const [barcode, setBarcode] = useState<string | null>(null);
  const inboundReceipts: Array<InboundReceiptItem> = useSelector(
    (state: RootState) => state.inboundReceipts.inboundReceipts,
  );
  const [matchedItems, setMatchedItems] = useState<InboundReceiptItem[]>([]);

  useEffect(() => {
    console.log(inboundReceipts);
  }, [inboundReceipts]);

  const onBarcodeScan = (event: any) => {
    const scannedBarcode = event.nativeEvent.codeStringValue;

    if (scannedBarcode && !barcode) {
      console.log('Scanned Barcode:', scannedBarcode);
      setBarcode(scannedBarcode);

      // inboundReceipts에서 barcode가 일치하는 항목 찾기
      const matchedItems = inboundReceipts.filter(receipt => {
        return (
          receipt.code === scannedBarcode ||
          receipt.products.some(product => product.barcode === scannedBarcode)
        );
      });

      if (matchedItems.length > 0) {
        console.log('Matched Inbound Receipt Items:', matchedItems);
        setMatchedItems(matchedItems); // matchedItems를 상태에 저장
      } else {
        console.log('No matching items found.');
        setMatchedItems([]); // 일치하는 항목이 없으면 matchedItems를 비웁니다.
      }
    }
  };

  // 카드 형태로 표시할 항목
  const handleCardPress = (inboundReceipt: InboundReceiptItem) => {
    navigation.navigate('InboundReceiptDetail', {code: inboundReceipt.code});
  };

  return (
    <>
      <TopComponent
        titleComponrnt={<Text style={styles.title}>바코드 스캔</Text>}
      />
      <View style={styles.container}>
        <Text style={styles.cardText}>
          발주서 or 상품 바코드를 인식해 주세요
        </Text>
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

        {/* matchedItems가 존재하면 FlatList로 나열 */}
        {matchedItems.length > 0 && (
          <FlatList
            data={matchedItems}
            renderItem={({item}) => (
              <InboundReciptCard
                item={item}
                onPress={() => handleCardPress(item)}
              />
            )}
            keyExtractor={item => item.code}
            style={styles.list}
          />
        )}
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
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333', // 텍스트 색상 변경
  },
  cardText: {
    fontSize: 14,
    color: '#333333', // 텍스트 색상 변경
  },
  product: {
    marginTop: 5,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  list: {
    width: '100%',
    marginTop: 20,
  },
});

export default BarcodeScanner;
