import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HotelState {
  hotel?: Hotel;
  profile?: HotelProfile;
  tvUrl: string;
  cctvUrl: string;
  mac: string;
  loading: boolean;
  runningText: string;
  room: RoomInfo;
}

const initialState: HotelState = {
  loading: false,
  tvUrl: '',
  cctvUrl: '',
  mac: '',
  runningText: '',
  room: {
    guestName: 'Guest Name',
    no: '0',
    roomId: 0,
  },
};

export const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotel: (state, { payload }: PayloadAction<Hotel>) => {
      state.hotel = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setMac: (state, { payload }: PayloadAction<string>) => {
      state.mac = payload;
    },
    setRoom: (state, { payload }: PayloadAction<RoomInfo>) => {
      state.room = payload;
    },
    setProfile: (state, { payload }: PayloadAction<HotelProfile>) => {
      state.profile = payload;
    },
    setRunningText: (state, { payload }: PayloadAction<string>) => {
      state.runningText = payload;
    },
    setTvUrl: (state, { payload }: PayloadAction<string>) => {
      state.tvUrl = payload;
    },
    setCctvUrl: (state, { payload }: PayloadAction<string>) => {
      state.cctvUrl = payload;
    },
  },
});
