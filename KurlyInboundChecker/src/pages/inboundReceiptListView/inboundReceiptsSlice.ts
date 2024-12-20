import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createSelector} from 'reselect';

// 데이터 타입 정의
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
  checkList: Array<CheckItem>;
}

export interface InboundReceiptItem {
  code: string;
  inboundOrderDate: string;
  inboundDate: string;
  inboundSimplePlace: string;
  inboundPlace: string;
  inboundType: string;
  inboundTypeCheckList: Array<CheckItem>;
  inboundStatus: string;
  products: Array<ProductInfo>;
}

export interface CheckItem {
  id: string;
  title: string;
  check: boolean;
}

export interface InboundReceiptsState {
  loading: boolean;
  inboundReceipts: Array<InboundReceiptItem>;
}

// 초기 상태 설정
const initialState: InboundReceiptsState = {
  loading: false,
  inboundReceipts: [],
};

// 슬라이스 생성
const inboundReceiptsSlice = createSlice({
  name: 'inboundReceipts',
  initialState,
  reducers: {
    setLoadingSlice(state, action: PayloadAction<boolean>) {
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

// 셀렉터 정의 (필터링된 데이터를 가져오는 셀렉터)
export const selectInboundReceipts = (state: {
  inboundReceipts: InboundReceiptsState;
}) => {
  return state?.inboundReceipts.inboundReceipts;
};

// 필터링된 발주서 데이터를 반환하는 셀렉터
export const selectFilteredInboundReceipts = createSelector(
  [selectInboundReceipts],
  inboundReceipts => {
    return inboundReceipts;
  },
);

// 액션과 리듀서 내보내기
export const {
  setInboundReceipts,
  addInboundReceipt,
  updateInboundReceipt,
  setLoadingSlice,
} = inboundReceiptsSlice.actions;

// 슬라이스의 리듀서 내보내기
export default inboundReceiptsSlice.reducer;
