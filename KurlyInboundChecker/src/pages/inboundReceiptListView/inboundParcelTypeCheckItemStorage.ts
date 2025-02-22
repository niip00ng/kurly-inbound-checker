import {getItem, setItem} from '@modules/storage';
import {CheckItem} from './inboundReceiptsSlice';

const INBOUND_PARCEL_TYPE_CHECK_ITEM = 'INBOUND_PARCEL_TYPE_CHECK_ITEM:';

const defaultNormalCheckItems = [
  {
    id: '1',
    title: '외박스가 50개 이상일 시 파레트에 적치되어 있어야 합니다. ',
    check: false,
  },
  {
    id: 'pallet_arrangement',
    title: '박스가 올바르게 정렬된 상태로 파레트에 적치되어 있어야 합니다.',
    check: false,
  },
  {
    id: 'pallet_type',
    title: '나무나 일회용 파레트를 사용하지 않아야 합니다.',
    check: false,
  },
];

const defaultParcelCheckItems = [
  {
    id: 'parcel_label_exist',
    title: '입고라벨지가 박스에 부착되어 있어야 합니다.',
    check: false,
  },
  {
    id: '2',
    title: '입고라벨지에 상품 종류는 최대 3개까지만 기재되어야 합니다.',
    check: false,
  },
  {
    id: 'invoice_dock_exist',
    title: '발주서의 입고 주소와 송장 주소가 일치해야합니다. (도크 번호 필수)',
    check: false,
  },
];

export const getAllParcelTypeCheckItems = async (
  InboundReceiptCode: string,
  parcelType: string,
): Promise<Array<CheckItem>> => {
  const result = await getItem<Array<CheckItem>>(
    INBOUND_PARCEL_TYPE_CHECK_ITEM + InboundReceiptCode,
  );

  return (
    result ||
    (parcelType === 'NORMAL'
      ? defaultNormalCheckItems
      : defaultParcelCheckItems)
  );
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
  parcelType: string,
  item: CheckItem,
) => {
  try {
    // 기존 체크 아이템 리스트 가져오기
    const currentItems = await getAllParcelTypeCheckItems(
      InboundReceiptCode,
      parcelType,
    );

    const updatedItems = currentItems.map(checkItem =>
      checkItem.id === item.id ? {...checkItem, ...item} : checkItem,
    );

    // 업데이트된 리스트 저장
    await addParcelTypeCheckItem(InboundReceiptCode, updatedItems);
  } catch (error) {
    console.error('체크 아이템 업데이트 중 오류 발생:', error);
  }
};
