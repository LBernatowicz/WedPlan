import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum EToastMessageType {
  error = 'error',
  default = 'default',
  success = 'success',
}

export type ToastAction = {
  type: string;
  payload: string;
};

type ToastSliceStateType = {
  toastMessageType: EToastMessageType | null;
  inModal: boolean;
  title: string | null;
  body?: string | null;
  visible: boolean;
  reduxAction?: PayloadAction<any>;
  link?: string;
  actionText?: string | null;
  toastAction?: ToastAction;
  duration?: number | null;
};

export type ShowToastActionPayload = {
  toastMessageType: EToastMessageType;
  inModal: boolean;
  title: string | null;
  body?: string | null;
  actionText?: string | null;
  reduxAction?: PayloadAction<any>;
  link?: string;
  toastAction?: ToastAction;
  duration?: number;
};

export const initialState: ToastSliceStateType = {
  toastMessageType: null,
  inModal: false,
  title: null,
  visible: false,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ShowToastActionPayload>) => ({
      ...action.payload,
      visible: true,
    }),
    hideToast: () => initialState,
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
