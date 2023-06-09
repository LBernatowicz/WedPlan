import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TInitialUsersCollectionType } from '../screens/HomeScreen/types/TInitialForm.type';
import { firebase } from '@react-native-firebase/firestore';

const db = firebase.firestore();

export const fetchAppInfo = createAsyncThunk(
  'global/fetchAppInfo',
  async () => {
    const usersRef = db.collection('appInfo');
    const snapshot = await usersRef.get();
    const appInfo = snapshot.docs.map((doc) => ({ ...doc.data() }));
    return appInfo;
  },
);

const initialState: TGlobalInitialType = {
  weddingDate: 0,
  loggedUser: {
    email: '' as string,
    guests: [],
    isFilled: false,
  },
  version: '',
  isLoading: false,
  error: null as string | null,
  language: '',
};

export type TGlobalInitialType = {
  weddingDate: number;
  loggedUser: TLoggedUser;
  version: string;
  isLoading: boolean;
  error: null | string;
  language: string;
};

export type TLoggedUser = {
  guests: TInitialUsersCollectionType[];
  isFilled: boolean;
  email?: string;
  id?: string;
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    addLoggedUser: (state, action: PayloadAction<TLoggedUser>) => {
      state.loggedUser = action.payload;
    },
    updateLoggedUser: (
      state,
      action: PayloadAction<{ id: string; newData: TLoggedUser }>,
    ) => {
      const { id, newData } = action.payload;
      const foundUser = state.loggedUser.guests.find((user) => user.id === id);
      if (foundUser) {
        // @ts-ignore
        foundUser.guests = newData.guests;
        foundUser.isFilled = newData.isFilled;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAppInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        // @ts-ignore
        state.weddingDate = action.payload[0].weddingDate as any;
        // @ts-ignore
        state.version = action.payload[0].version as string;
        state.language = action.payload[0].language as string;
      })
      .addCase(fetchAppInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload.toString()
          : 'Failed to fetch users.';
      });
  },
});

export const { updateLoggedUser, addLoggedUser } = globalSlice.actions;

export default globalSlice.reducer;
