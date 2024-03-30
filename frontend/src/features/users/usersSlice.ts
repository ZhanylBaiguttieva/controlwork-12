import { GlobalError, User, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { getUser, googleLogin, login, register } from './usersThunk.ts';
import { RootState } from '../../app/store.ts';
interface UsersState  {
  user: User | null;
  userOne: User | null;
  fetching: boolean;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  userOne: null,
  fetching: false,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    unSetUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending,(state) => {
      state.fetching = true;

    });
    builder.addCase(getUser.fulfilled,(state, {payload: data}) => {
      state.fetching = false;
      state.userOne = data;
    });
    builder.addCase(getUser.rejected,(state) => {
      state.fetching = false;
    });

    builder.addCase(register.pending,(state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled,(state, {payload: data}) => {
      state.registerLoading = false;
      state.user = data.user;
    });
    builder.addCase(register.rejected,(state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending,(state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled,(state,{payload: data}) => {
      state.loginLoading = false;
      state.user = data.user;
    });
    builder.addCase(login.rejected,(state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state, {payload: data}) => {
      state.loginLoading = false;
      state.user = data.user;
    });
    builder.addCase(googleLogin.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
  }
});

export const {unSetUser} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;

export const selectOne = (state: RootState) => state.users.userOne;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;