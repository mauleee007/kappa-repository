import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../services/xtream/getCategories';
import { Channel } from '../../services/xtream/getChannels';

export interface PayloadChannel {
  categoryId: string;
  value: Channel[];
}

interface ChannelGroups {
  [key: string]: Channel[];
}

interface TVState {
  categories: Category[];
  channels: ChannelGroups;
}

const initialState: TVState = {
  categories: [],
  channels: {},
};

export const tvSlice = createSlice({
  name: 'tv',
  initialState,
  reducers: {
    setCategories: (state, { payload }: PayloadAction<Category[]>) => {
      state.categories = payload;
    },
    setChannels: (state, { payload }: PayloadAction<PayloadChannel>) => {
      const channels = { ...state.channels };
      channels[payload.categoryId] = payload.value;

      state.channels = channels;
    },
  },
});
