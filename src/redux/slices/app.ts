import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    hasInternetConnection: true,
  },
  reducers: {
    toggleInternetConnection: (
      state,
      action: PayloadAction<{bool: boolean}>,
    ) => {
      state.hasInternetConnection = action.payload.bool;
    },
  },
});

export const {toggleInternetConnection} = appSlice.actions;

export default appSlice.reducer;
