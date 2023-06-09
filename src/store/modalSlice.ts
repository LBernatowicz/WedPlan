import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EModalNames } from '../components/Modal/type/EModalNames';
import { TNavigationDetailsProps } from '../components/Modal/templates/NavigationDetails/NavigationDetails';

export type ModalAction = {
  type: string;
  payload: string;
};

type ModalSliceStateType = {
  modalName: EModalNames | null;
  inModal: boolean;
  body?: TNavigationDetailsProps;
  visible?: boolean;
  reduxAction?: PayloadAction<any>;
  ModalAction?: ModalAction;
};

export type ShowModalActionPayload = {
  modalName: EModalNames | null;
  inModal: boolean;
  body?: TNavigationDetailsProps;
  reduxAction?: PayloadAction<any>;
  ModalAction?: ModalAction;
};

export const initialState: ModalSliceStateType = {
  modalName: null,
  inModal: false,
  visible: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ShowModalActionPayload>) => ({
      ...action.payload,
      visible: true,
    }),
    hideModal: () => initialState,
    updateModal: (state, action: PayloadAction<ShowModalActionPayload>) => ({
      ...action.payload,
    }),
  },
});

export const { showModal, hideModal, updateModal } = modalSlice.actions;

export default modalSlice.reducer;
