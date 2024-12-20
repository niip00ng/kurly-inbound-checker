import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface InboundReceiptInfoCardProps {
  code: string;
  inboundDate: string;
  inboundOrderDate: string;
  inboundSimplePlace: string;
  inboundPlace: string;
  inboundType: string;
  inboundStatus: string;
}

const InboundReceiptBaseInfoCard: React.FC<InboundReceiptInfoCardProps> = ({
  code,
  inboundDate,
  inboundOrderDate,
  inboundSimplePlace,
  inboundPlace,
  inboundType,
  inboundStatus,
}) => {
  return (
    <View style={s.card}>
      <View style={s.cardContent}>
        <View style={s.cardRow}>
          <Text style={s.label}>발주 코드</Text>
          <Text style={s.value}>{code}</Text>
        </View>
        <View style={s.cardRow}>
          <Text style={s.label}>입고예정일</Text>
          <Text style={s.value}>{inboundDate}</Text>
        </View>
        <View style={s.cardRow}>
          <Text style={s.label}>발주 일</Text>
          <Text style={s.value}>{inboundOrderDate}</Text>
        </View>
        <View style={s.cardRow}>
          <Text style={s.label}>입고지</Text>
          <Text style={s.value}>{inboundSimplePlace}</Text>
        </View>
        <View style={s.cardRow}>
          <Text style={s.label}>입고센터 주소</Text>
          <Text style={[s.value]}>{inboundPlace}</Text>
        </View>
        <View style={s.cardRow}>
          <Text style={s.label}>입고타입</Text>
          <Text style={s.value}>
            {inboundType === 'NORMAL' ? '일반입고(입고시간없음)' : '택배입고'}
          </Text>
        </View>
        <View style={s.cardRow}>
          <Text style={s.label}>입고상태</Text>
          <Text style={s.value}>
            {inboundStatus === 'READY' ? '입고대기' : '입고중'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff35',
    borderRadius: 20,
    padding: 16,
    paddingVertical: 5,
    marginTop: 0,
    marginBottom: 16,
  },
  cardContent: {
    marginTop: 8,
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
    fontWeight: '400',
    flexWrap: 'wrap',
  },
});

export default InboundReceiptBaseInfoCard;
