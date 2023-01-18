import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  findNodeHandle,
  FlatList,
  HWEvent,
  ListRenderItem,
  NativeModules,
  StyleSheet,
  Text,
  TVEventHandler,
  View,
} from 'react-native';
import Video from 'react-native-video';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import SelectableCard from '../../components/elements/SelectableCard';
import { buildLiveUrl } from '../../services/xtream/buildUrl';
import { Channel } from '../../services/xtream/getChannels';
import { RootState } from '../../stores';
import { normalize } from '../../utils/scaling';

type FullscreenTVRouteProp = RouteProp<RootStackParamList, 'FullscreenTV'>;
type FullscreenTVNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'FullscreenTV'
>;

const heightFooter = normalize(230);

const FullscreenTV: React.FC = () => {
  const [url, setUrl] = useState('');
  const [flatChannels, setFlatChannels] = useState<Channel[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const refItems = useRef<Array<View | null>>([]);
  const animFooterY = useRef(new Animated.Value(heightFooter)).current;

  const route = useRoute<FullscreenTVRouteProp>();
  const navigate = useNavigation<FullscreenTVNavigationProps>();
  const isFocused = useIsFocused();
  const { profile, tvUrl } = useSelector((s: RootState) => s.hotel);
  const { channels } = useSelector((s: RootState) => s.tv);

  const showChannel = useCallback(() => {
    Animated.timing(animFooterY, {
      duration: 100,
      useNativeDriver: true,
      toValue: 0,
    }).start();

    if (refItems.current != null && refItems.current[selectedIdx] != null) {
      const tag = findNodeHandle(refItems.current[selectedIdx]);
      if (tag != null) {
        NativeModules.UIManager.updateView(tag, 'RCTView', {
          hasTVPreferredFocus: true,
        });
      }
    }
  }, [animFooterY, selectedIdx]);

  const hideChannel = useCallback(() => {
    Animated.timing(animFooterY, {
      duration: 100,
      useNativeDriver: true,
      toValue: heightFooter,
    }).start();
  }, [animFooterY]);

  const tvEventHandler = useRef(new TVEventHandler()).current;

  const enableTVEventHandler = useCallback(() => {
    tvEventHandler.enable(this, (_, evt: HWEvent) => {
      if (evt.eventType === 'down') {
        showChannel();
      } else if (evt.eventType === 'up') {
        hideChannel();
      }
    });
  }, [showChannel, hideChannel, tvEventHandler]);

  const disableTVEventHandler = useCallback(() => {
    if (tvEventHandler) {
      tvEventHandler.disable();
    }
  }, [tvEventHandler]);

  useEffect(() => {
    enableTVEventHandler();
    return () => disableTVEventHandler();
  }, [disableTVEventHandler, enableTVEventHandler]);

  useEffect(() => {
    const backAction = () => {
      navigate.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigate]);

  useEffect(() => {
    setUrl(route.params.url);
  }, [route.params.url]);

  useEffect(() => {
    if (url === '') {
      setUrl(route.params.url);
    }
  }, [route.params.url, url]);

  useEffect(() => {
    let flat: Channel[] = [];
    for (const property in channels) {
      flat = [...flat, ...channels[property]];
    }
    setFlatChannels(flat);
  }, [channels]);

  useEffect(() => {
    setSelectedIdx(
      flatChannels.map(c => c.stream_id).indexOf(route.params.streamId),
    );
  }, [flatChannels, route.params.streamId]);

  const renderItem: ListRenderItem<Channel> = ({ index, item }) => {
    const selected = selectedIdx === index;
    return (
      <SelectableCard
        style={[
          styles.card,
          {
            backgroundColor: selected ? '#FFFFFF' : '#FFFFFFAA',
            borderColor: selected ? profile?.primaryColor : '#00000000',
          },
        ]}
        onPress={() => {
          setUrl(buildLiveUrl(tvUrl, item.stream_id));
          setSelectedIdx(index);
          hideChannel();
        }}
      >
        <Text style={styles.text}>{item.name}</Text>
      </SelectableCard>
    );
  };

  return (
    <View style={styles.video}>
      {isFocused && url !== '' && (
        <Video
          source={{ uri: url }}
          bufferConfig={{ minBufferMs: 10000, maxBufferMs: 50000 }}
          style={styles.video}
          resizeMode="stretch"
          onError={() => setUrl('')}
        />
      )}

      <Animated.View
        style={[styles.footer, { transform: [{ translateY: animFooterY }] }]}
      >
        <FlatList
          horizontal
          data={flatChannels}
          renderItem={renderItem}
          contentContainerStyle={styles.channelsContainer}
          keyExtractor={item => item.name}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  video: {
    backgroundColor: '#000',
    flex: 1,
  },
  footer: {
    position: 'absolute',
    backgroundColor: '#2F2F2FC9',
    bottom: 0,
    left: 0,
    width: '100%',
    height: heightFooter,
    zIndex: 1,
  },
  channelsContainer: {
    padding: normalize(24),
  },
  card: {
    alignSelf: 'center',
    borderWidth: 2,
    width: normalize(220),
    height: normalize(120),
    margin: normalize(24),
    borderRadius: normalize(24),
  },
  text: {
    flexGrow: 1,
    color: '#000',
    fontFamily: 'Inter-Bold',
    fontSize: normalize(24),
    lineHeight: normalize(24),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  channel: {
    backgroundColor: '#fff',
    height: 80,
    width: 80,
    margin: 8,
    borderRadius: 20,
  },
});

export default FullscreenTV;
