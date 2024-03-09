import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './trackSlice';

export default configureStore({
  reducer: {
    tracks: trackReducer,
  },
});
