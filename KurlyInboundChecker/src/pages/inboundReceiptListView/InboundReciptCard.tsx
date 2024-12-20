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

// Color constants 정의
const Colors = {
  primaryText: '#FFFFFF',
  secondaryText: '#999999',
  backgroundCard: '#ffffff35',
  backgroundCardAllCheck: '#ffffff20',
  border: '#FFFFFF30',
  borderAllCheck: '#FFFFFF30',
  statusComplete: '#8AFFA7', // 검수 완료 상태 텍스트 색상
  statusReady: '#ffffff80', // 검수중 상태 텍스트 색상
};

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
          backgroundColor: allChecked()
            ? Colors.backgroundCardAllCheck
            : Colors.backgroundCard,
        },
      ]}
      activeOpacity={0.9}
      onPress={onPress}>
      <View style={[styles.cardRow, {justifyContent: 'space-between'}]}>
        <View style={[styles.cardLabel, {marginBottom: 0}]}>
          <Ionicons
            name={'barcode'}
            size={20}
            color={allChecked() ? Colors.secondaryText : Colors.primaryText}
            style={{marginRight: 5}}
          />
          <Text
            style={[
              styles.code,
              {color: allChecked() ? Colors.secondaryText : Colors.primaryText},
            ]}>
            {item.code}
          </Text>
        </View>
        <Text style={allChecked() ? styles.statusComplete : styles.statusReady}>
          {allChecked() ? '검수 완료' : '검수중'}
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: allChecked()
            ? Colors.borderAllCheck
            : Colors.border,
          marginBottom: 8,
        }}
      />
      <View style={styles.cardRow}>
        <View style={styles.cardLabel}>
          <MaterialCommunityIcons
            name={'calendar-arrow-right'}
            size={18}
            color={allChecked() ? Colors.secondaryText : Colors.primaryText}
            style={{marginRight: 5}}
          />
          <Text
            style={[
              styles.infoLabel,
              {color: allChecked() ? Colors.secondaryText : Colors.primaryText},
            ]}>
            발주 날짜
          </Text>
        </View>
        <Text
          style={[
            styles.info,
            {color: allChecked() ? Colors.secondaryText : Colors.primaryText},
          ]}>
          {item.inboundOrderDate}
        </Text>
      </View>
      <View style={styles.cardRow}>
        <View style={styles.cardLabel}>
          <MaterialCommunityIcons
            name={'calendar-arrow-left'}
            size={18}
            color={allChecked() ? Colors.secondaryText : Colors.primaryText}
            style={{marginRight: 5}}
          />
          <Text
            style={[
              styles.infoLabel,
              {color: allChecked() ? Colors.secondaryText : Colors.primaryText},
            ]}>
            입고 예정일
          </Text>
        </View>
        <Text
          style={[
            styles.info,
            {color: allChecked() ? Colors.secondaryText : Colors.primaryText},
          ]}>
          {item.inboundDate}
        </Text>
      </View>

      <View style={styles.cardRow}>
        <View style={styles.cardLabel}>
          <MaterialIcons
            name={'factory'}
            size={16}
            color={allChecked() ? Colors.secondaryText : Colors.primaryText}
            style={{marginRight: 5, marginLeft: 1}}
          />
          <Text
            style={[
              styles.infoLabel,
              {color: allChecked() ? Colors.secondaryText : Colors.primaryText},
            ]}>
            입고지
          </Text>
        </View>
        <Text
          style={[
            styles.info,
            {color: allChecked() ? Colors.secondaryText : Colors.primaryText},
          ]}>
          {item.inboundSimplePlace}
        </Text>
      </View>
      <View style={styles.cardRow}>
        <View style={styles.cardLabel}>
          <MaterialIcons
            name={'category'}
            size={16}
            color={allChecked() ? Colors.secondaryText : Colors.primaryText}
            style={{marginRight: 5, marginLeft: 1}}
          />
          <Text
            style={[
              styles.infoLabel,
              {color: allChecked() ? Colors.secondaryText : Colors.primaryText},
            ]}>
            입고유형
          </Text>
        </View>
        <Text
          style={[
            styles.info,
            {color: allChecked() ? Colors.secondaryText : Colors.primaryText},
          ]}>
          {item.inboundType === 'NORMAL'
            ? '일반입고(입고시간없음)'
            : '택배입고'}
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: allChecked()
            ? Colors.borderAllCheck
            : Colors.border,
          marginBottom: 6,
          marginTop: 4,
        }}
      />
      <View style={[styles.cardRow, {alignItems: 'flex-start'}]}>
        <View style={[styles.cardLabel, {marginTop: 0}]}>
          <MaterialCommunityIcons
            name={'package'}
            size={16}
            color={allChecked() ? Colors.secondaryText : Colors.primaryText}
            style={{marginRight: 5, marginLeft: 1}}
          />
          <Text
            style={[
              styles.infoLabel,
              {color: allChecked() ? Colors.secondaryText : Colors.primaryText},
            ]}>
            상품{' '}
            <Text style={{fontWeight: 'bold'}}>{item.products.length}개</Text>
          </Text>
        </View>

        <View style={{width: '60%'}}>
          {item.products.map((product, index) => {
            return (
              <View key={index} style={{}}>
                <Text
                  style={{
                    color: allChecked()
                      ? Colors.secondaryText
                      : Colors.primaryText,
                  }}
                  numberOfLines={1} // 한 줄로 제한
                  ellipsizeMode="tail" // 텍스트가 길어지면 '...'으로 표시
                >
                  {product.goodsName}
                </Text>
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
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 16,
    elevation: 2,
  },
  code: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaryText,
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    fontWeight: '300',
    color: Colors.primaryText,
    marginBottom: 4,
    minWidth: 100,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primaryText,
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
  },
  statusReady: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.statusReady,
  },
  statusComplete: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.statusComplete,
  },
});

export default InboundReciptCard;
