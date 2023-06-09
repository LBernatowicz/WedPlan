import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebase } from '@react-native-firebase/firestore';
import { TInitialUsersCollectionType } from '../screens/HomeScreen/types/TInitialForm.type';

const db = firebase.firestore();

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const usersRef = db.collection('users');
  const snapshot = await usersRef.get();
  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return users;
});

export const saveUser = createAsyncThunk('user/saveUser', async (user: any) => {
  const { id, guests, isFilled } = user;
  const userRef = db.collection('users').doc(id);
  await userRef.set({ guests, isFilled });
});

const initialState = {
  users: [] as any[],
  isLoading: false,
  error: null as string | null,
};

export type TUsersInfo = {
  guests: Record<any, TGuestData>;
  id: string | null;
};

export type TGuestData = {
  diet: string;
  present: string | null;
  name: string;
  surname: string;
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload as TInitialUsersCollectionType[];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload.toString()
          : 'Failed to fetch users.';
      })
      .addCase(saveUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveUser.fulfilled, (state, action: any) => {
        state.isLoading = false;
        const { id } = action.payload;
        const index = state.users.findIndex((user) => user.id === id);
        if (index !== -1) {
          state.users[index] = action.payload;
        } else {
          state.users.push(action.payload);
        }
      })
      .addCase(saveUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload.toString()
          : 'Failed to save user.';
      });
  },
});

export default usersSlice.reducer;
