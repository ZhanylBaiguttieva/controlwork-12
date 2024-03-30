import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { createArt, deleteArt, fetchArts, fetchArtsByUser, fetchOneArt } from './artsThunk.ts';
import { Art } from '../../types';

interface ArtsState {
  items: Art[];
  item: Art | null;
  fetchingOne: boolean;
  fetching: boolean;
  creating: boolean;
  deleteLoading: boolean;
}

const initialState: ArtsState = {
  items: [],
  item: null,
  fetchingOne: false,
  fetching: false,
  creating: false,
  deleteLoading: false,
};

export const artsSlice = createSlice({
  name: 'arts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArts.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchArts.fulfilled, (state, {payload: arts}) => {
      state.fetching = false;
      state.items = arts;
    });
    builder.addCase(fetchArts.rejected, (state) => {
      state.fetching = false;
    });

    builder.addCase(fetchOneArt.pending, (state) => {
      state.fetchingOne = true;
    });
    builder.addCase(fetchOneArt.fulfilled, (state, {payload: art}) => {
      state.fetchingOne= false;
      state.item = art;
    });
    builder.addCase(fetchOneArt.rejected, (state) => {
      state.fetchingOne = false;
    });

    builder.addCase(fetchArtsByUser.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchArtsByUser.fulfilled, (state, {payload: arts}) => {
      state.fetching = false;
      state.items = arts;
    });
    builder.addCase(fetchArtsByUser.rejected, (state) => {
      state.fetching = false;
    });

    builder.addCase(createArt.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createArt.fulfilled, (state) => {
      state.creating = false;
    });
    builder.addCase(createArt.rejected, (state) => {
      state.creating = false;
    });

    builder.addCase(deleteArt.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteArt.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteArt.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const artsReducer = artsSlice.reducer;

export const selectArts = (state: RootState) => state.arts.items;
export const selectOneArt= (state: RootState) => state.arts.item;
export const selectArtCreating = (state:RootState) => state.arts.creating;
export const selectDeletingArt = (state: RootState) => state.arts.deleteLoading;