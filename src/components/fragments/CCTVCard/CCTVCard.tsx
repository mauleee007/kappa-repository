import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PlaylistItem } from 'iptv-playlist-parser';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../../../App';
import { getChannelHls } from '../../../services/channel';
import { RootState } from '../../../stores';
import Card from '../../elements/Card';
import ImageItem from '../RoomTypes/ImageItem';

type HotelGuideNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'HotelGuide'
>;

const CCTVCard: React.FC = () => {
  const [channels, setChannels] = useState<PlaylistItem[]>([]);

  const navigation = useNavigation<HotelGuideNavigationProps>();
  const { cctvUrl, profile } = useSelector((s: RootState) => s.hotel);

  useEffect(() => {
    let isMounted = true;
    const fetchChannels = async () => {
      const data = await getChannelHls(cctvUrl);
      if (isMounted) {
        setChannels(data);
      }
    };

    fetchChannels();

    return () => {
      isMounted = false;
    };
  }, [cctvUrl]);

  return (
    <Card style={styles.card}>
      {channels.length > 0 && (
        <FlatList
          data={channels}
          numColumns={3}
          keyExtractor={item => item.url}
          renderItem={({ item }) => (
            <ImageItem
              activeColor={profile?.primaryColor}
              key={item.name}
              source={require('../../../assets/cctv-bg.jpg')}
              text={item.name}
              style={styles.image}
              onPress={() =>
                navigation.navigate('FullscreenTV', {
                  url: item.url,
                  channels,
                })
              }
            />
          )}
        />
      )}

      {channels.length === 0 && <Text style={styles.text}>Coming Soon!</Text>}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    marginLeft: 3,
    marginRight: 3,
  },
  image: {
    width: '31%',
  },
  text: {
    color: '#000000dd',
    fontFamily: 'Outfit-Medium',
  },
});

export default CCTVCard;
