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
  loading: boolean;
  inboundReceipts: Array<InboundReceiptItem>;
}

export interface ProductCheckItem {
  id: string;
  title: string;
  check: boolean;
}

const initialState: InboundReceiptsState = {
  loading: false,
  inboundReceipts: [],
};

const inboundReceiptsSlice = createSlice({
  name: 'inboundReceipts',
  initialState,
  reducers: {
    setLoadingSlice(state, action) {
      state.loading = action.payload;
    },
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

export const {
  setInboundReceipts,
  addInboundReceipt,
  updateInboundReceipt,
  setLoadingSlice,
} = inboundReceiptsSlice.actions;

export default inboundReceiptsSlice.reducer;
