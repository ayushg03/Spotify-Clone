import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTracksFromAPI } from '../api/spotifyAPI';

export const fetchFilteredTracks = createAsyncThunk('tracks/fetchFilteredTracks', async ({ query, markets, popularity,offset }) => {
  const response = await fetchTracksFromAPI(query, markets, popularity,offset);
  console.log(response.tracks.items);
  return response.tracks.items;
});

const trackSlice = createSlice({
  name: 'tracks',
  initialState: {
    tracks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredTracks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilteredTracks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tracks = action.payload;
      })
      .addCase(fetchFilteredTracks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectTracks = (state) => state.tracks.tracks;

export default trackSlice.reducer;
