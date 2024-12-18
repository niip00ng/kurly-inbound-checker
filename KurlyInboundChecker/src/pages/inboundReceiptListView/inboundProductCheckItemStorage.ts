import {getItem, setItem} from '@modules/storage';
import {CheckItem} from './inboundReceiptsSlice';

const INBOUND_RECEIPT_PRODUCT_CHECK_ITEM =
  'INBOUND_RECEIPT_PRODUCT_CHECK_ITEM:';
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
  {
    id: '3',
    title: '상품의 모든 바코드는 동일해야 합니다.',
    check: false,
  },
  {
    id: '4',
    title: '발주서의 상품 전체 수량과 일치 해야합니다.',
    check: false,
  },
  {
    id: '5',
    title: '박스의 소비기한과 실상품의 소비기한이 일치해야합니다.',
    check: false,
  },
  {
    id: '6',
    title: '상품 라벨지에 한글표시사항이 존재해야 합니다.',
    check: false,
  },
  {
    id: '7',
    title: '상품 라벨지에 상품판매가는 노출되어선 안됩니다.',
    check: false,
  },
  {
    id: '8',
    title: '외박스의 바코드는 가리거나, 상품의 바코드와 달라야합니다.',
    check: false,
  },
  {
    id: '9',
    title: '외박스의 소비기한(유통기한)과 상품의 소비기한은 일치해야 합니다.',
    check: false,
  },
];

export const getAllCheckItems = async (
  InboundReceiptCode: string,
  goodsCode: string,
): Promise<Array<CheckItem>> => {
  const result = await getItem<Array<CheckItem>>(
    INBOUND_RECEIPT_PRODUCT_CHECK_ITEM + InboundReceiptCode + ':' + goodsCode,
  );

  return result || defaultCheckItems;
};

export const addCheckItem = (
  InboundReceiptCode: string,
  goodsCode: string,
  value: Array<CheckItem>,
) =>
  setItem<Array<CheckItem>>(
    INBOUND_RECEIPT_PRODUCT_CHECK_ITEM + InboundReceiptCode + ':' + goodsCode,
    value,
  );

export const updateOneCheckItem = async (
  InboundReceiptCode: string,
  goodsCode: string,
  item: CheckItem,
) => {
  try {
    // 기존 체크 아이템 리스트 가져오기
    const currentItems = await getAllCheckItems(InboundReceiptCode, goodsCode);

    const updatedItems = currentItems.map(checkItem =>
      checkItem.id === item.id ? {...checkItem, ...item} : checkItem,
    );

    // 업데이트된 리스트 저장
    await addCheckItem(InboundReceiptCode, goodsCode, updatedItems);
  } catch (error) {
    console.error('체크 아이템 업데이트 중 오류 발생:', error);
  }
};
