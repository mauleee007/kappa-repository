import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Pressable,
  findNodeHandle,
  NativeModules,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import { BASE_FILE_URL } from '../../services/utils';
import { AppDispatch, RootState } from '../../stores';
import { getHotels } from '../../stores/hotel';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Boarding'>;

const introUrl = 'file:///storage/emulated/0/tv/intro.mp4';

const Boarding: React.FC<Props> = ({ navigation }) => {
  const [url, setUrl] = useState(introUrl);
  const [mounted, setMounted] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef<View>(null);
  const { profile } = useSelector((s: RootState) => s.hotel);

  const gotoDrawer = () => {
    navigation.replace('Drawer');
  };

  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (ref.current != null) {
      const tag = findNodeHandle(ref.current);
      if (tag != null) {
        NativeModules.UIManager.updateView(tag, 'RCTView', {
          hasTVPreferredFocus: true,
        });
      }
    }

    setMounted(true);
  }, []);

  return (
    <View style={styles.container}>
      {mounted && url !== '' && (
        <Video
          repeat
          source={{ uri: url }}
          resizeMode="cover"
          style={styles.video}
          onError={() => {
            setUrl('');
            setTimeout(() => setUrl(introUrl), 1000);
          }}
        />
      )}

      <View style={styles.header}>
        {profile != null && (
          <Image
            source={{ uri: `${BASE_FILE_URL}/${profile.logoWhite}` }}
            style={styles.logo}
          />
        )}
      </View>

      <Image
        source={require('../../assets/enter2-gif.gif')}
        resizeMode="contain"
        style={styles.anim}
      />

      <View style={styles.footer}>
        <Pressable hasTVPreferredFocus ref={ref} onPress={gotoDrawer}>
          <Image
            source={require('../../assets/enter2.png')}
            resizeMode="contain"
            style={styles.enter}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Boarding;
