import {getItem, setItem} from '@modules/storage';
import {CheckItem} from './inboundReceiptsSlice';

const INBOUND_RECEIPT_PRODUCT_CHECK_ITEM =
  'INBOUND_RECEIPT_PRODUCT_CHECK_ITEM:';
const defaultCheckItems = [
  {
    id: 'product_barcode_equal',
    title: '발주서 상품 바코드와 실물 상품의 바코드가 일치해야 합니다.',
    check: false,
  },
  {
    id: 'product_expirationDate_equal_or_future',
    title:
      '상품에 소비기한(유통기한)이 발주서 기준 유통기한보다 이후여야 합니다.',
    check: false,
  },
  {
    id: 'product_korean_labeling_exist',
    title: '상품 라벨지에 한글표시사항이 존재해야 합니다.',
    check: false,
  },
  {
    id: 'product_price_exist',
    title: '상품 라벨지에 상품판매가는 노출되어선 안됩니다.',
    check: false,
  },
  {
    id: 'product_expirationDate_equal_box',
    title: '박스의 소비기한과 실상품의 소비기한이 일치해야합니다.',
    check: false,
  },
  {
    id: 'box_product_barcode_different',
    title: '외박스의 바코드는 가리거나, 상품의 바코드와 달라야합니다.',
    check: false,
  },
  {
    id: 'product_expirationDate_equal_box',
    title: '외박스의 소비기한(유통기한)과 상품의 소비기한은 일치해야 합니다.',
    check: false,
  },
];

export const getAllCheckItems = async (
  inboundReceiptCode: string,
  goodsCode: string,
): Promise<Array<CheckItem>> => {
  const result = await getItem<Array<CheckItem>>(
    INBOUND_RECEIPT_PRODUCT_CHECK_ITEM + inboundReceiptCode + ':' + goodsCode,
  );

  return result || defaultCheckItems;
};

export const addCheckItem = (
  inboundReceiptCode: string,
  goodsCode: string,
  value: Array<CheckItem>,
) =>
  setItem<Array<CheckItem>>(
    INBOUND_RECEIPT_PRODUCT_CHECK_ITEM + inboundReceiptCode + ':' + goodsCode,
    value,
  );

export const updateOneCheckItem = async (
  inboundReceiptCode: string,
  goodsCode: string,
  item: CheckItem,
) => {
  try {
    console.log(inboundReceiptCode, goodsCode, item);
    // 기존 체크 아이템 리스트 가져오기
    const currentItems = await getAllCheckItems(inboundReceiptCode, goodsCode);

    const updatedItems = currentItems.map(checkItem =>
      checkItem.id === item.id ? {...checkItem, ...item} : checkItem,
    );

    // 업데이트된 리스트 저장
    await addCheckItem(inboundReceiptCode, goodsCode, updatedItems);
  } catch (error) {
    console.error('체크 아이템 업데이트 중 오류 발생:', error);
  }
};
