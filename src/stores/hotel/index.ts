import { hotelSlice } from './hotel';

export { getHotels } from './actions';

export const {
  setHotel,
  setLoading,
  setProfile,
  setTvUrl,
  setCctvUrl,
  setRunningText,
  setMac,
  setRoom,
} = hotelSlice.actions;

export default hotelSlice.reducer;
