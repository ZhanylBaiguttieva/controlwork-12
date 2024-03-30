import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterResponse, User,
  ValidationError
} from '../../types';
import axiosApi from '../../axiosApi.ts';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store.ts';
import { unSetUser } from './usersSlice.ts';

export const getUser = createAsyncThunk<User | null,string>(
  'users/get',
  async(userId) => {
    const result = await axiosApi.get('/users/' + userId);
    if(!result) {
      return null;
    }
    return result.data;
  }
);

export  const register = createAsyncThunk<RegisterResponse,RegisterMutation,{rejectValue: ValidationError}>(
  'users/register',
  async (registerMutation, {rejectWithValue}) => {
    const formData = new FormData();

    const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];
    keys.forEach(key => {
      const value = registerMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const response = await axiosApi.post('/users', formData);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export  const login = createAsyncThunk<RegisterResponse,LoginMutation,{rejectValue: GlobalError}>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/users/sessions', loginMutation);
      return response.data;
    } catch (e) {
      if(isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);

export const googleLogin = createAsyncThunk<RegisterResponse,string,{rejectValue: GlobalError}>(
  'users/googleLogin',
  async (credential, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/users/google',{credential});
      return response.data;
    } catch (e) {
      if(isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw (e);
    }
  }
);

export const logout = createAsyncThunk<void, undefined, {state: RootState}>(
  'users/logout',
  async(_, {getState, dispatch}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('/users/sessions', {headers: {'Authorization': 'Bearer ' + token}});
    dispatch(unSetUser());
  },
);