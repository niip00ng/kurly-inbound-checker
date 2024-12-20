// RenderInboundReciptCard.tsx
import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {InboundReceiptItem} from '@pages/inboundReceiptListView/inboundReceiptsSlice';

interface InboundReciptCardProps {
  item: InboundReceiptItem;
  onPress: () => void;
}

const InboundReciptCard: React.FC<InboundReciptCardProps> = ({
  item,
  onPress,
}) => {
  const checkProductYn = () => {
    return (
      item.products.filter(product => {
        if (product.checkList.filter(e => !e.check).length > 0) {
          return false;
        }

        return true;
      }).length === item.products.length
    );
  };

  const checkParcelTypeYn = () => {
    return (
      item.inboundTypeCheckList.filter(e => e.check).length ===
      item.inboundTypeCheckList.length
    );
  };

  const allChecked = () => {
    return checkParcelTypeYn() && checkProductYn();
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: allChecked() ? '#FFFFFF50' : '#DDDDDD',
        },
      ]}
      activeOpacity={0.7}
      onPress={onPress}>
      <View style={[styles.cardRow, {justifyContent: 'space-between'}]}>
        <View style={[styles.cardLabel, {marginBottom: 10}]}>
          <Ionicons
            name={'barcode'}
            size={20}
            color={'#222222'}
            style={{marginRight: 5}}
          />
          <Text style={styles.code}>{item.code}</Text>
        </View>
        <Text style={allChecked() ? styles.statusComplete : styles.statusReady}>
          {allChecked() ? '완료' : '확인중'}
        </Text>
      </View>

      <View style={styles.cardRow}>
        <View style={styles.cardLabel}>
          <MaterialCommunityIcons
            name={'calendar-arrow-left'}
            size={18}
            color={'#222222'}
            style={{marginRight: 5}}
          />
          <Text style={styles.infoLabel}>입고 예정일</Text>
        </View>
        <Text style={styles.info}>{item.inboundDate}</Text>
      </View>
      <View style={styles.cardRow}>
        <View style={styles.cardLabel}>
          <MaterialCommunityIcons
            name={'calendar-arrow-right'}
            size={18}
            color={'#222222'}
            style={{marginRight: 5}}
          />
          <Text style={styles.infoLabel}>발주 날짜</Text>
        </View>
        <Text style={styles.info}>{item.inboundOrderDate}</Text>
      </View>
      <View style={styles.cardRow}>
        <View style={styles.cardLabel}>
          <MaterialIcons
            name={'factory'}
            size={16}
            color={'#222222'}
            style={{marginRight: 5, marginLeft: 1}}
          />
          <Text style={styles.infoLabel}>입고지</Text>
        </View>
        <Text style={styles.info}>{item.inboundSimplePlace}</Text>
      </View>
      <View style={styles.cardRow}>
        <View style={styles.cardLabel}>
          <MaterialIcons
            name={'category'}
            size={16}
            color={'#222222'}
            style={{marginRight: 5, marginLeft: 1}}
          />
          <Text style={styles.infoLabel}>유형</Text>
        </View>
        <Text style={styles.info}>
          {item.inboundType === 'NORMAL'
            ? '일반입고(입고시간없음)'
            : '택배입고'}
        </Text>
      </View>
      <View style={[styles.cardRow, {alignItems: 'flex-start'}]}>
        <View style={[styles.cardLabel, {marginTop: 0}]}>
          <MaterialCommunityIcons
            name={'package'}
            size={16}
            color={'#222222'}
            style={{marginRight: 5, marginLeft: 1}}
          />
          <Text style={styles.infoLabel}>입고상품</Text>
        </View>

        <View>
          {item.products.map((product, index) => {
            return (
              <View
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 4,
                }}>
                <Text style={{color: '#222222'}}>{product.goodsName}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    elevation: 2,
  },
  code: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    fontWeight: '300',
    color: '#222222',
    marginBottom: 4,
    minWidth: 100,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222222',
    marginBottom: 4,
    minWidth: 100,
  },
  cardLabel: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 0,
  },
  statusReady: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222222',
  },
  statusComplete: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222222',
  },
});

export default InboundReciptCard;
