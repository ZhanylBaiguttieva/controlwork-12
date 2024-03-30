import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Art, ArtMutation } from '../../types';

export const fetchArts = createAsyncThunk<Art[]>(
  'arts/fetch',
  async() => {
    const response = await axiosApi.get('/arts');
    return response.data;
  }
);

export const fetchArtsByUser = createAsyncThunk<Art[], string>(
  'arts/fetchByUser',
  async(userId) => {
    const response = await axiosApi.get('/arts?userId=' + userId);
    return response.data;
  }
);
export const fetchOneArt = createAsyncThunk<Art| null, string>(
  'arts/fetchOne',
  async(artId) => {
    const artResponse = await axiosApi.get<Art | null>('/arts/' +  artId);
    if(!artResponse) {
      return null;
    }
    return artResponse.data;
  }
);


export const createArt = createAsyncThunk<void, ArtMutation>(
  'arts/create',
  async(artMutation) => {

    const formData = new FormData();

    const keys = Object.keys(artMutation) as (keyof ArtMutation)[];
    keys.forEach(key => {
      const value = artMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
    return await axiosApi.post('/arts', formData);
  }
);

export const deleteArt = createAsyncThunk<void,string>(
  'arts/delete',
  async(artId) => {
    return await axiosApi.delete('/arts/' + artId);
  }
);