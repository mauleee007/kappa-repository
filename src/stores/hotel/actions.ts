import { setCctvUrl, setHotel, setLoading, setProfile, setTvUrl } from '.';
import { AppThunk } from '..';
import HotelService from '../../services/hotels';
import { setToast } from '../ui';

export function getHotels(): AppThunk {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const resInfo = await HotelService.getHotelInfo();
      if (resInfo.status === 200) {
        dispatch(setHotel(resInfo.data.data));
      } else {
        dispatch(setToast({ message: 'Cannot get hotel info.' }));
      }

      const resProfile = await HotelService.getHotelProfile();
      if (resProfile.status === 200) {
        dispatch(setProfile(resProfile.data.data));
      } else {
        dispatch(setToast({ message: 'Cannot get hotel profile.' }));
      }

      const resTV = await HotelService.getTvUrl();
      if (resTV.status === 200) {
        if (
          resTV.data.data != null &&
          typeof resTV.data.data.url === 'string'
        ) {
          dispatch(setTvUrl(resTV.data.data.url));
        }

        if (
          resTV.data.data != null &&
          typeof resTV.data.data.cctv === 'string'
        ) {
          dispatch(setCctvUrl(resTV.data.data.cctv));
        }
      } else {
        dispatch(setToast({ message: 'Cannot get tv stream url.' }));
      }
    } catch (err) {
      dispatch(setToast({ message: 'Cannot get initial data.' }));
    }
    dispatch(setLoading(false));
  };
}
