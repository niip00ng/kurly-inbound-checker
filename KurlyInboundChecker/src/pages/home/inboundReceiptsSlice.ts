import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ProductInfo {
  goodsCode: string;
  barcode: string;
  goodsName: string;
  boxCount: number;
  unitPerBoxCount: number;
  weight: string;
  expiredDate: string;
  description: string;
  imageUrl: string;
}

interface InboundReceiptItem {
  code: string;
  inboundOrderDate: string;
  inboundDate: string;
  inboundSimplePlace: string;
  inboundPlace: string;
  inboundType: string;
  inboundStatus: string;
  products: Array<ProductInfo>;
}

interface InboundReceiptsState {
  inboundReceipts: Array<InboundReceiptItem>;
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
          goodsCode: 'MK0000068907',
          goodsName: '[신선설농탕] 고기 설렁탕',
          barcode: 'MK0000068907',
          expiredDate: '2025-02-24',
          boxCount: 30,
          unitPerBoxCount: 150,
          weight: '150g',
          description: '',
          imageUrl:
            'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
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
          goodsCode: 'MK0000068907',
          goodsName: '[신선설농탕] 고기 설렁탕',
          barcode: 'MK0000068907',
          expiredDate: '2025-02-24',
          boxCount: 30,
          unitPerBoxCount: 150,
          weight: '150g',
          description: '',
          imageUrl:
            'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
        },
      ],
    },
    {
      code: 'T20241115_NLQ17',
      inboundDate: '2024-10-26(화)',
      inboundOrderDate: '2024-10-30(금)',
      inboundSimplePlace: '김포냉동(켄달 2층)',
      inboundPlace: '경기도 김포시 아라육로 75 켄달스퀘어 김포LP 2층 B202~206',
      inboundType: 'NORMAL',
      inboundStatus: 'END',
      products: [
        {
          goodsCode: 'MK0000068907',
          goodsName: '[신선설농탕] 고기 설렁탕',
          barcode: 'MK0000068907',
          expiredDate: '2025-02-24',
          boxCount: 30,
          unitPerBoxCount: 150,
          weight: '150g',
          description: '',
          imageUrl:
            'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
        },
      ],
    },
    {
      code: 'T20241115_NLQ11',
      inboundDate: '2024-10-26(화)',
      inboundOrderDate: '2024-10-30(금)',
      inboundSimplePlace: '김포냉동(켄달 2층)',
      inboundPlace: '경기도 김포시 아라육로 75 켄달스퀘어 김포LP 2층 B202~206',
      inboundType: 'NORMAL',
      inboundStatus: 'END',
      products: [
        {
          goodsCode: 'MK0000068907',
          goodsName: '[신선설농탕] 고기 설렁탕',
          barcode: 'MK0000068907',
          expiredDate: '2025-02-24',
          boxCount: 30,
          unitPerBoxCount: 150,
          weight: '150g',
          description: '',
          imageUrl:
            'https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/11f8dda6-b802-4ad8-a675-d55d8ea18c38.jpeg',
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
