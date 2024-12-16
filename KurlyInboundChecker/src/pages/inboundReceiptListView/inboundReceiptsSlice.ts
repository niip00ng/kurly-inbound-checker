import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ProductInfo {
  goodsCode: string;
  barcode: string;
  goodsName: string;
  boxCount: number;
  unitPerBoxCount: number;
  weight: string;
  expiredDate: string;
  description: string;
  imageUrl: string;
  checkList: Array<ProductCheckItem>;
}

export interface InboundReceiptItem {
  code: string;
  inboundOrderDate: string;
  inboundDate: string;
  inboundSimplePlace: string;
  inboundPlace: string;
  inboundType: string;
  inboundStatus: string;
  products: Array<ProductInfo>;
}

export interface InboundReceiptsState {
  inboundReceipts: Array<InboundReceiptItem>;
}

export interface ProductCheckItem {
  id: string;
  title: string;
  check: boolean;
}

const initialState: InboundReceiptsState = {
  inboundReceipts: [
    {
      code: 'T20241115_NLPH9',
      inboundDate: '2024-12-25(수)',
      inboundOrderDate: '2024-12-16(토)',
      inboundSimplePlace: '김포냉동(켄달 2층)',
      inboundPlace: '경기도 김포시 아라육로 75 켄달스퀘어 김포LP 2층 B202~206',
      inboundType: 'NORMAL',
      inboundStatus: 'READY',
      products: [
        {
          goodsCode: 'MK0000068906',
          goodsName: '[신선설농탕] 고기 설렁탕',
          barcode: 'MK0000068907',
          expiredDate: '2025-02-24',
          boxCount: 30,
          unitPerBoxCount: 150,
          weight: '150g',
          description: '',
          imageUrl:
            'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
          checkList: [
            {
              id: '1',
              title: '발주서와 상품의 종류 및 수량이 일치하는가?',
              check: false,
            },
            {
              id: '2',
              title:
                '발주서의 소비기한이 실상품의 소비기한과 일치하거나 더 미래인가?',
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
          ],
        },
        {
          goodsCode: 'MK0000068907',
          goodsName: '[신선설농탕] 감자 설렁탕',
          barcode: 'MK0000068908',
          expiredDate: '2025-02-24',
          boxCount: 30,
          unitPerBoxCount: 150,
          weight: '150g',
          description: '',
          imageUrl:
            'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
          checkList: [
            {
              id: '1',
              title: '발주서와 상품의 종류 및 수량이 일치하는가?',
              check: false,
            },
            {
              id: '2',
              title:
                '발주서의 소비기한이 실상품의 소비기한과 일치하거나 더 미래인가?',
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
          ],
        },
      ],
    },
    {
      code: 'T20241115_NLQ19',
      inboundDate: '2024-10-26(화)',
      inboundOrderDate: '2024-10-30(금)',
      inboundSimplePlace: '김포냉동(켄달 2층)',
      inboundPlace: '경기도 김포시 아라육로 75 켄달스퀘어 김포LP 2층 B202~206',
      inboundType: 'NORMAL',
      inboundStatus: 'END',
      products: [
        {
          goodsCode: 'MK0000068909',
          goodsName: '[신선설농탕] 고기 설렁탕',
          barcode: 'MK0000068907',
          expiredDate: '2025-02-24',
          boxCount: 30,
          unitPerBoxCount: 150,
          weight: '150g',
          description: '',
          imageUrl:
            'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
          checkList: [
            {
              id: '1',
              title: '발주서와 상품의 종류 및 수량이 일치하는가?',
              check: false,
            },
            {
              id: '2',
              title:
                '발주서의 소비기한이 실상품의 소비기한과 일치하거나 더 미래인가?',
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
              title: '상품의 모든 바코드가 동일한가?',
              check: false,
            },
            {
              id: '7',
              title: '상품 라벨지에 한글표시사항이 부착되어 있는가?',
              check: false,
            },
            {
              id: '8',
              title: '상품 라벨지에 상품판매가가 노출되어 있지 않은가?',
              check: false,
            },
          ],
        },
      ],
    },
  ],
};

const inboundReceiptsSlice = createSlice({
  name: 'inboundReceipts',
  initialState,
  reducers: {
    setInboundReceipts(
      state,
      action: PayloadAction<Array<InboundReceiptItem>>,
    ) {
      state.inboundReceipts = action.payload;
    },
    addInboundReceipt(state, action: PayloadAction<InboundReceiptItem>) {
      state.inboundReceipts.push(action.payload);
    },
    updateInboundReceipt(
      state,
      action: PayloadAction<{
        code: string;
        updatedData: Partial<InboundReceiptItem>;
      }>,
    ) {
      const index = state.inboundReceipts.findIndex(
        receipt => receipt.code === action.payload.code,
      );
      if (index !== -1) {
        state.inboundReceipts[index] = {
          ...state.inboundReceipts[index],
          ...action.payload.updatedData,
        };
      }
    },
  },
});

export const {setInboundReceipts, addInboundReceipt, updateInboundReceipt} =
  inboundReceiptsSlice.actions;

export default inboundReceiptsSlice.reducer;
