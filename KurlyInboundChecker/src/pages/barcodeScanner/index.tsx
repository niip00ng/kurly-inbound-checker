import React, {useState} from 'react';
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
  const [loading, setLoading] = useState(false);

  const onBarcodeScan = (event: any) => {
    const scannedBarcode = event.nativeEvent.codeStringValue;

    if (scannedBarcode && !barcode) {
      setLoading(true);
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
        setLoading(false);
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
          발주서 바코드 혹은 상품 바코드를 인식해 주세요
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
          {barcode && (
            <View style={styles.overlay}>
              <Text
                style={{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>
                {barcode}
              </Text>

              <TouchableOpacity
                style={{
                  width: '90%',
                  backgroundColor: '#333333',

                  marginTop: 20,
                }}
                onPress={() => {
                  setBarcode(null);
                  setMatchedItems([]);
                }}>
                <LinearGradient
                  colors={['#C237ED', '#DE6D7E']} // 그라데이션 색상 설정
                  start={{x: 0, y: 0}} // 시작점: 왼쪽 상단
                  end={{x: 1, y: 1}} // 끝점: 오른쪽 하단
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 15,
                    justifyContent: 'center',
                    borderRadius: 10,
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
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>

        {/* 바코드가 있을 때, View를 위에 추가 */}

        {!barcode && <ActivityIndicator size="large" color="#FFFFFF" />}

        {/* matchedItems가 존재하면 FlatList로 나열 */}
        {barcode && matchedItems.length > 0 && (
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

        {!loading && barcode && matchedItems.length === 0 && (
          <>
            <View
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={{color: '#ffffff', fontSize: 20}}>
                ❗바코드 정보 조회 실패❗
              </Text>
              <Text style={{color: '#bbbbbb', fontSize: 16, marginTop: 20}}>
                컬리에 존재하지 않는 발주 및 상품 바코드입니다.
              </Text>
              <Text style={{color: '#bbbbbb', fontSize: 16, marginTop: 5}}>
                바코드가 정확히 인식되었는지 확인부탁드립니다.
              </Text>
              <Text style={{color: '#bbbbbb', fontSize: 16, marginTop: 5}}>
                혹시나 문제있을시 담당자에 문의해주세요.
              </Text>
            </View>
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
  overlay: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000BB',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});

export default BarcodeScanner;
