import {getItem, setItem} from '@modules/storage';
import {CheckItem} from './inboundReceiptsSlice';

const INBOUND_PARCEL_TYPE_CHECK_ITEM = 'INBOUND_PARCEL_TYPE_CHECK_ITEM:';
const defaultCheckItems = [
  {
    id: '1',
    title: '상품마다 바코드가 존재해야 합니다.',
    check: false,
  },
  {
    id: '2',
    title: '발주서 상품 바코드와 실물 상품의 바코드가 일치해야 합니다.',
    check: false,
  },
];

export const getAllParcelTypeCheckItems = async (
  InboundReceiptCode: string,
): Promise<Array<CheckItem>> => {
  const result = await getItem<Array<CheckItem>>(
    INBOUND_PARCEL_TYPE_CHECK_ITEM + InboundReceiptCode,
  );

  return result || defaultCheckItems;
};

export const addParcelTypeCheckItem = (
  InboundReceiptCode: string,
  value: Array<CheckItem>,
) =>
  setItem<Array<CheckItem>>(
    INBOUND_PARCEL_TYPE_CHECK_ITEM + InboundReceiptCode,
    value,
  );

export const updateOneParcelTypeCheckItem = async (
  InboundReceiptCode: string,
  item: CheckItem,
) => {
  try {
    // 기존 체크 아이템 리스트 가져오기
    const currentItems = await getAllParcelTypeCheckItems(InboundReceiptCode);

    const updatedItems = currentItems.map(checkItem =>
      checkItem.id === item.id ? {...checkItem, ...item} : checkItem,
    );

    // 업데이트된 리스트 저장
    await addParcelTypeCheckItem(InboundReceiptCode, updatedItems);
  } catch (error) {
    console.error('체크 아이템 업데이트 중 오류 발생:', error);
  }
};
