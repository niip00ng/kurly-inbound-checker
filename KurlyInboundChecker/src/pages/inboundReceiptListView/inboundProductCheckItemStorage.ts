import {getItem, setItem} from '@modules/storage';
import {ProductCheckItem} from './inboundReceiptsSlice';

const INBOUND_RECEIPT_CHECK_ITEM = 'INBOUND_RECEIPT_CHECK_ITEM:';
const defaultCheckItems = [
  {
    id: '1',
    title: '발주서와 상품의 종류 및 수량이 일치하는가?',
    check: false,
  },
  {
    id: '2',
    title: '발주서의 소비기한이 실상품의 소비기한과 일치하거나 더 미래인가?',
    check: false,
  },
  {
    id: '3',
    title: '외박스의 소비기한과 실상품의 소비기한이 일치하는가?',
    check: false,
  },
  {
    id: '4',
    title: '상품에 바코드가 정상 부착되어 있는가?',
    check: false,
  },
  {
    id: '5',
    title: '상품의 모든 바코드가 동일한가?',
    check: false,
  },
  {
    id: '6',
    title: '상품 라벨지에 한글표시사항이 부착되어 있는가?',
    check: false,
  },
  {
    id: '7',
    title: '상품 라벨지에 상품판매가가 노출되어 있지 않은가?',
    check: false,
  },
];

export const getAllCheckItems = async (
  InboundReceiptCode: string,
  goodsCode: string,
): Promise<Array<ProductCheckItem>> => {
  const result = await getItem<Array<ProductCheckItem>>(
    INBOUND_RECEIPT_CHECK_ITEM + InboundReceiptCode + ':' + goodsCode,
  );

  return result || defaultCheckItems;
};

export const addCheckItem = (
  InboundReceiptCode: string,
  goodsCode: string,
  value: Array<ProductCheckItem>,
) =>
  setItem<Array<ProductCheckItem>>(
    INBOUND_RECEIPT_CHECK_ITEM + InboundReceiptCode + ':' + goodsCode,
    value,
  );

export const updateOneCheckItem = async (
  InboundReceiptCode: string,
  goodsCode: string,
  item: ProductCheckItem,
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
