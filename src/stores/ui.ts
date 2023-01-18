import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIToast {
  message: string;
}

interface UIState {
  toast: UIToast;
}

const initialState: UIState = {
  toast: { message: '' },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setToast: (state, { payload }: PayloadAction<UIToast>) => {
      state.toast = payload;
    },
  },
});

export const { setToast } = uiSlice.actions;

export default uiSlice.reducer;
