import {configureStore} from '@reduxjs/toolkit';
import inboundReceiptsReducer from '../pages/inboundReceiptListView/inboundReceiptsSlice';
export const store = configureStore({
  reducer: {
    inboundReceipts: inboundReceiptsReducer,
  },
});

// RootState 타입 내보내기
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
