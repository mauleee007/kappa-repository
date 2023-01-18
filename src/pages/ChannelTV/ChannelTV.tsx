import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  findNodeHandle,
  FlatList,
  HWEvent,
  NativeModules,
  Text,
  TVEventHandler,
  View,
} from 'react-native';
import { RootStackParamList } from '../../../App';
import Card from '../../components/elements/Card';
import TextMenuItem from '../../components/elements/TextMenuItem';
import BaseLayout from '../../components/fragments/BaseLayout';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../stores';
import { getHotels } from '../../stores/hotel';
import { getTVChannels } from '../../stores/tv';
import { buildLiveUrl } from '../../services/xtream/buildUrl';
import { Channel } from '../../services/xtream/getChannels';
import Video from 'react-native-video';
import { normalize } from '../../utils/scaling';
import SelectableCard from '../../components/elements/SelectableCard';

type ChannelTVNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'ChannelTV'
>;

const heightFooter = normalize(230);

const ChannelTV: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [url, setUrl] = useState('');
  const [flatChannels, setFlatChannels] = useState<Channel[]>([]);
  const [footerShow, setFooterShow] = useState(false);

  const refItems = useRef<Array<View | null>>([]);
  const animFooterY = useRef(new Animated.Value(heightFooter)).current;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigation<ChannelTVNavigationProps>();
  const { tvUrl } = useSelector((s: RootState) => s.hotel);
  const { profile } = useSelector((s: RootState) => s.hotel);
  const { channels } = useSelector((s: RootState) => s.tv);

  const showChannel = useCallback(() => {
    Animated.timing(animFooterY, {
      duration: 100,
      useNativeDriver: true,
      toValue: 0,
    }).start(() => setFooterShow(true));

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
    }).start(() => setFooterShow(false));
  }, [animFooterY]);

  const tvEventHandler = useRef(new TVEventHandler()).current;

  const enableTVEventHandler = useCallback(() => {
    tvEventHandler.enable(this, (_, evt: HWEvent) => {
      if (!fullscreen) {
        return;
      }

      if (evt.eventType === 'down') {
        showChannel();
      } else if (evt.eventType === 'up') {
        hideChannel();
      }
    });
  }, [tvEventHandler, fullscreen, showChannel, hideChannel]);

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
      if (!fullscreen) {
        navigate.goBack();
      } else if (footerShow) {
        hideChannel();
      } else {
        setFullscreen(false);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [footerShow, fullscreen, hideChannel, navigate]);

  useEffect(() => {
    dispatch(getTVChannels());
    dispatch(getHotels());
  }, [dispatch]);

  useEffect(() => {
    let flat: Channel[] = [];
    for (const property in channels) {
      flat = [...flat, ...channels[property]];
    }
    setFlatChannels(flat);
  }, [channels]);

  useEffect(() => {
    if (url === '' && flatChannels.length > selectedIdx) {
      setUrl(buildLiveUrl(tvUrl, flatChannels[selectedIdx].stream_id));
    }
  }, [url, flatChannels, tvUrl, selectedIdx]);

  return (
    <BaseLayout
      fullscreen={fullscreen}
      style={fullscreen ? undefined : styles.root}
    >
      <View style={styles.container}>
        {!fullscreen && (
          <Card style={{ ...styles.card, ...styles.sidebar }}>
            <FlatList
              data={flatChannels}
              keyExtractor={item => item.stream_id.toString()}
              renderItem={({ item, index }) => {
                return (
                  <TextMenuItem
                    activeColor={profile?.primaryColor}
                    title={item.name}
                    onPress={() => {
                      setSelectedIdx(index);
                      if (
                        flatChannels[selectedIdx].stream_id === item.stream_id
                      ) {
                        setFullscreen(true);
                      } else {
                        setUrl(buildLiveUrl(tvUrl, item.stream_id));
                      }
                    }}
                  />
                );
              }}
            />
          </Card>
        )}

        <Card
          style={[
            styles.card,
            styles.videoWrapper,
            fullscreen ? styles.fullscreen : styles.mini,
          ]}
        >
          <View style={styles.videoContainer}>
            {url.length === 0 && (
              <Text style={styles.text}>Select TV Channel</Text>
            )}

            {url.length > 0 && (
              <Video
                source={{ uri: url }}
                bufferConfig={{ minBufferMs: 5000, maxBufferMs: 50000 }}
                style={styles.video}
                resizeMode="stretch"
                onError={() => setUrl('')}
                fullscreen={true}
              />
            )}
          </View>

          {!fullscreen && flatChannels.length > 0 && (
            <View style={styles.channel}>
              <Text style={styles.text}>{flatChannels[selectedIdx].name}</Text>
            </View>
          )}
        </Card>
      </View>

      <Animated.View
        style={[
          styles.footer,
          { transform: [{ translateY: animFooterY }] },
          { opacity: fullscreen ? 1 : 0 },
        ]}
      >
        <FlatList
          horizontal
          data={flatChannels}
          contentContainerStyle={styles.channelsContainer}
          keyExtractor={item => item.name}
          renderItem={({ index, item }) => {
            const selected = selectedIdx === index;
            const backgroundColor = selected ? '#000000AA' : '#000000AA';
            const borderColor = selected ? '#ffffff' : '#00000000';

            return (
              <SelectableCard
                style={[styles.channelCard, { backgroundColor, borderColor }]}
                onPress={() => {
                  setUrl(buildLiveUrl(tvUrl, item.stream_id));
                  setSelectedIdx(index);
                  hideChannel();
                }}
              >
                <Text style={styles.channelText}>{item.name}</Text>
              </SelectableCard>
            );
          }}
        />
      </Animated.View>
    </BaseLayout>
  );
};

export default ChannelTV;
