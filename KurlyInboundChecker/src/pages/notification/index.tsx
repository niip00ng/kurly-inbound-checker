import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import TopComponent from '../TopComponent';
import LinearGradient from 'react-native-linear-gradient';

const Notification = () => {
  const notifications = [
    {
      id: 'NT00000001',
      title: '(김포) 발주서 도착 T20241115_NLPH9 ',
      value: 'T20241115_NLPH9',
      contents: '[근대골목단팥빵] 옛날소시지빵 150EA 발주가 등록되었습니다.',
      isNew: true,
    },
    {
      id: 'NT00000005',
      title: '(평택) 발주서 도착 T20241115_NLPH9',
      value: 'T20241119_NLPH9',
      contents: '[근대골목단팥빵] 옛날소시지빵 150EA 발주가 등록되었습니다.',
      isNew: true,
    },
    {
      id: 'NT00000025',
      title: '(창원) 발주서 도착 T20241115_NLPH9',
      value: 'T20241119_NLPH9',
      contents: '[근대골목단팥빵] 옛날소시지빵 150EA 발주가 등록되었습니다.',
      isNew: true,
    },
    {
      id: 'NT00000003',
      title: '회송 요청 T20241117_NLPH9',
      value: 'T20241117_NLPH9',
      contents: `[채선당] 샤브샤브 상품 유통기한이 문제가 있습니다.${'\n'}확인후 재요청드립니다.`,
      isNew: true,
    },
    {
      id: 'NT00000004',
      title: '(창원) 발주서 도착 T20241115_NLPH9',
      value: 'T20241119_NLPH9',
      contents: '[근대골목단팥빵] 옛날소시지빵 150EA 발주가 등록되었습니다.',
      isNew: false,
    },
    {
      id: 'NT00000007',
      title: '(창원) 발주서 도착 T20241115_NLPH9',
      value: 'T20241119_NLPH9',
      contents: '[근대골목단팥빵] 옛날소시지빵 150EA 발주가 등록되었습니다.',
      isNew: false,
    },
    {
      id: 'NT00000008',
      title: '(창원) 발주서 도착 T20241115_NLPH9',
      value: 'T20241119_NLPH9',
      contents: '[근대골목단팥빵] 옛날소시지빵 150EA 발주가 등록되었습니다.',
      isNew: false,
    },
    {
      id: 'NT00000009',
      title: '발주서 등록',
      value: 'T20241123_NLPH9',
      contents: 'T20241123_NLPH9 발주서가 도착했습니다.',
      isNew: false,
    },
    {
      id: 'NT00000010',
      title: '배송완료',
      value: 'T20241124_NLPH9',
      contents: 'T20241124_NLPH9 배송이 완료되었습니다.',
      isNew: false,
    },
    {
      id: 'NT00000011',
      title: '주문확인',
      value: 'T20241125_NLPH9',
      contents: 'T20241125_NLPH9 주문이 확인되었습니다.',
      isNew: false,
    },
    {
      id: 'NT00000012',
      title: '결제완료',
      value: 'T20241126_NLPH9',
      contents: 'T20241126_NLPH9 결제가 완료되었습니다.',
      isNew: false,
    },
    {
      id: 'NT00000013',
      title: '발주서 등록',
      value: 'T20241127_NLPH9',
      contents: 'T20241127_NLPH9 발주서가 도착했습니다.',
      isNew: false,
    },
    {
      id: 'NT00000014',
      title: '배송완료',
      value: 'T20241128_NLPH9',
      contents: 'T20241128_NLPH9 배송이 완료되었습니다.',
      isNew: false,
    },
    {
      id: 'NT00000015',
      title: '주문확인',
      value: 'T20241129_NLPH9',
      contents: 'T20241129_NLPH9 주문이 확인되었습니다.',
      isNew: false,
    },
  ];

  // `isNew`가 true인 항목은 최상단에 3개만 표시
  const newNotifications = notifications.filter(
    notification => notification.isNew,
  );
  // `isNew`가 false인 항목은 그 아래에 표시
  const oldNotifications = notifications.filter(
    notification => !notification.isNew,
  );

  return (
    <>
      <TopComponent titleComponrnt={<Text style={s.title}>알림 내역</Text>} />
      <View style={s.wrapper}>
        <LinearGradient
          colors={['#333333', '#000000']}
          style={{height: '100%'}}>
          <ScrollView style={s.scrollWrapper}>
            {/* 새로운 알림 3개 */}
            {newNotifications.map(notification => (
              <View key={notification.id} style={s.card}>
                <View style={s.cardHeader}>
                  <Text style={s.cardTitle}>{notification.title}</Text>
                  {notification.isNew && <View style={s.newDot} />}
                </View>

                <Text style={s.cardContents}>{notification.contents}</Text>
              </View>
            ))}
            {/* 이전 알림 (비활성화된 스타일) */}
            {oldNotifications.map(notification => (
              <View key={notification.id} style={[s.card, s.disabledCard]}>
                <View style={s.cardHeader}>
                  <Text style={[s.cardTitle, s.disabledText]}>
                    {notification.title}
                  </Text>
                  {!notification.isNew && (
                    <View style={[s.newDot, s.disabledDot]} />
                  )}
                </View>
                <Text style={[s.cardContents, s.disabledText]}>
                  {notification.contents}
                </Text>
              </View>
            ))}
          </ScrollView>
        </LinearGradient>
      </View>
    </>
  );
};

export default Notification;

const s = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollWrapper: {
    padding: 15,
    paddingBottom: 100,
  },
  title: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#444444',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  disabledCard: {
    backgroundColor: '#333333', // 비활성화된 카드 배경
    opacity: 0.6, // 비활성화된 느낌을 주기 위해 투명도 낮춤
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  newDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  disabledDot: {
    backgroundColor: '#bbbbbb', // 비활성화된 점 (회색)
  },
  cardValue: {
    fontSize: 14,
    color: '#bbbbbb',
  },
  cardContents: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 5,
  },
  disabledText: {
    color: '#888888', // 비활성화된 텍스트 색상 (회색)
  },
});
