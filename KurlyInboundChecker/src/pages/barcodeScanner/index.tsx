import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'; // ActivityIndicator 임포트
import {Camera, CameraType} from 'react-native-camera-kit';
import TopComponent from '../TopComponent';
import LinearGradient from 'react-native-linear-gradient'; // LinearGradient 임포트
import {useSelector} from 'react-redux';
import {InboundReceiptItem} from '../inboundReceiptListView/inboundReceiptsSlice';
import {RootState} from '~/modules/store';
import InboundReciptCard from '../inboundReceiptListView/InboundReciptCard';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useLoading} from '@pages/common/LoadingContext';

const BarcodeScanner = () => {
  const {showLoading, hideLoading} = useLoading();
  const navigation: any = useNavigation();
  const [barcode, setBarcode] = useState<string | null>(null);
  const inboundReceipts: Array<InboundReceiptItem> = useSelector(
    (state: RootState) => state.inboundReceipts.inboundReceipts,
  );
  const [matchedItems, setMatchedItems] = useState<InboundReceiptItem[]>([]);

  const onBarcodeScan = (event: any) => {
    const scannedBarcode = event.nativeEvent.codeStringValue;

    if (scannedBarcode && !barcode) {
      showLoading();
      console.log('Scanned Barcode:', scannedBarcode);
      setBarcode(scannedBarcode);

      // 2초 후에 아래 로직 실행
      setTimeout(() => {
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

        hideLoading();
      }, 2000); // 2초 후에 실행
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
        {!barcode && <ActivityIndicator size="large" color="#FFFFFF" />}
        {barcode && (
          <TouchableOpacity
            style={{
              width: '100%',
              backgroundColor: '#99999950',
              paddingVertical: 15,
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setBarcode(null);
              setMatchedItems([]);
            }}>
            <Ionicons
              name={'barcode'}
              size={20}
              color={'#ffffff'}
              style={{marginRight: 5}}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#ffffff',
              }}>
              바코드 다시 인식하기
            </Text>
          </TouchableOpacity>
        )}

        {/* matchedItems가 존재하면 FlatList로 나열 */}
        {matchedItems.length > 0 && (
          <>
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
          </>
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
    marginBottom: 10,
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
    color: '#ffffff', // 텍스트 색상 변경
  },
  product: {
    marginTop: 5,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  list: {
    width: '100%',
    marginTop: 30,
  },
});

export default BarcodeScanner;
