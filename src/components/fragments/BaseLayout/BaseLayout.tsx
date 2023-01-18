import React, { useCallback, useEffect } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HotelService from '../../../services/hotels';
import { RootState } from '../../../stores';
import { setRoom, setRunningText } from '../../../stores/hotel';
import useInterval from '../../hooks/useInterval';
import Footer from '../Footer';
import Header from '../Header';
import { styles } from './styles';

interface Props {
  children?: React.ReactNode;
  customBg?: ImageSourcePropType;
  fullscreen?: boolean;
  hideGuest?: boolean;
  profile?: HotelProfile;
  style?: StyleProp<ViewStyle> | undefined;
}

const BaseLayout: React.FC<Props> = ({
  children,
  customBg,
  fullscreen,
  hideGuest,
  profile,
  style,
}) => {
  const dispatch = useDispatch();
  const { mac } = useSelector((s: RootState) => s.hotel);

  const getInfo = useCallback(async () => {
    try {
      const res = await HotelService.getInfo(mac);
      if (res.status === 200) {
        dispatch(setRunningText((res.data.data.info as Info).runningText));
        dispatch(setRoom(res.data.data.room));
      }
    } catch {
      // No action
    }
  }, [dispatch, mac]);

  useInterval(() => {
    getInfo();
  }, 60 * 1000);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  const source =
    customBg == null
      ? { uri: 'file:///storage/emulated/0/tv/drawer-bg.jpg' }
      : customBg;

  if (fullscreen) {
    return <View style={styles.fullscreen}>{children}</View>;
  }

  return (
    <View style={styles.container}>
      <Image source={source} style={styles.imageBg} />

      <View style={styles.header}>
        <Header hideGuest={hideGuest} profile={profile} />
      </View>

      <View style={StyleSheet.compose<ViewStyle>(styles.children, style)}>
        <View style={styles.wrapper}>{children}</View>
      </View>

      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default BaseLayout;
