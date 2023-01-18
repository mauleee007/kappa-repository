import { setCategories, setChannels } from '.';
import { AppThunk } from '..';
import { parseTVUrl } from '../../services/xtream/buildUrl';
import getCategories from '../../services/xtream/getCategories';
import getChannels from '../../services/xtream/getChannels';

export function getTVChannels(): AppThunk {
  return async (dispatch, getState) => {
    const { tvUrl } = getState().hotel;
    if (tvUrl === '') {
      return;
    }

    try {
      const xtream = parseTVUrl(tvUrl);

      const res = await getCategories(
        xtream.url,
        xtream.username,
        xtream.password,
      );

      dispatch(setCategories(res));

      for (let i = 0; i < res.length; i++) {
        dispatch(getTVChannelsByCategory(res[i].category_id));
      }
    } catch {
      // ToastAndroid.show('Cannot get TV Categories', ToastAndroid.SHORT);
      // No action
    }
  };
}

function getTVChannelsByCategory(categoryId: string): AppThunk {
  return async (dispatch, getState) => {
    const { tvUrl } = getState().hotel;
    if (tvUrl === '') {
      return;
    }

    try {
      const xtream = parseTVUrl(tvUrl);

      const res = await getChannels(
        xtream.url,
        xtream.username,
        xtream.password,
        categoryId,
      );

      dispatch(setChannels({ categoryId, value: res }));
    } catch {
      // ToastAndroid.show('Cannot get TV Categories', ToastAndroid.SHORT);
      // No action
    }
  };
}
