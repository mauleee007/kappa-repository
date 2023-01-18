import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { PermissionsAndroid, ToastAndroid } from 'react-native';
import { getDeviceName } from 'react-native-device-info';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Boarding from './src/pages/Boarding';
import ChannelTV from './src/pages/ChannelTV';
import Drawer from './src/pages/Drawer';
import FullscreenTV from './src/pages/FullscreenTV';
import HotelGuide from './src/pages/HotelGuide';
import Restaurant from './src/pages/Restaurant';
import { RootState, store } from './src/stores';
import 'react-native/tvos-types.d';
import { setMac } from './src/stores/hotel';

export type RootStackParamList = {
  Boarding: undefined;
  ChannelTV: undefined;
  Drawer: undefined;
  FullscreenTV: { url: string; streamId: number };
  HotelGuide: undefined;
  Restaurant: { category: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
  const dispatch = useDispatch();
  const { toast } = useSelector((s: RootState) => s.ui);

  useEffect(() => {
    const getMac = async () => {
      try {
        const mac = await getDeviceName();
        dispatch(setMac(mac));
      } catch {
        ToastAndroid.show('Cannot get device name', ToastAndroid.SHORT);
      }
    };

    getMac();
  }, [dispatch]);

  useEffect(() => {
    if (toast.message !== '') {
      ToastAndroid.show(toast.message, ToastAndroid.SHORT);
    }
  }, [toast.message]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Boarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Boarding" component={Boarding} />
        <Stack.Screen name="ChannelTV" component={ChannelTV} />
        <Stack.Screen name="Drawer" component={Drawer} />
        <Stack.Screen name="FullscreenTV" component={FullscreenTV} />
        <Stack.Screen name="HotelGuide" component={HotelGuide} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  const getStorageReadPemission = useCallback(async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Read Storage Permission',
          message:
            'TV Launcher needs access to your camera ' +
            'to get local video and background image.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    } catch (err) {
      ToastAndroid.show(
        'Cannot get READ STORAGE permission',
        ToastAndroid.SHORT,
      );
    }
  }, []);

  useEffect(() => {
    getStorageReadPemission();
  }, [getStorageReadPemission]);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
