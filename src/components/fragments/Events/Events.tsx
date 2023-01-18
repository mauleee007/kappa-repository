import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { BASE_FILE_URL } from '../../../services/utils';
import { RootState } from '../../../stores';
import Card from '../../elements/Card';
import ImageItem from '../RoomTypes/ImageItem';

interface Props {
  events: HotelEvent[];
}

type HotelEventProps = {
  event: HotelEvent;
  onBack: () => void;
};

const HotelEvent: React.FC<HotelEventProps> = ({ event, onBack }) => {
  useEffect(() => {
    const backAction = () => {
      onBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [onBack]);

  return (
    <View style={styles.eventRoot}>
      <Image
        source={{ uri: `${BASE_FILE_URL}/${event.img}` }}
        style={styles.eventImg}
      />

      <View style={styles.descContainer}>
        <View style={styles.background} />

        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.desc}>{event.description}</Text>
      </View>
    </View>
  );
};

const Events: React.FC<Props> = ({ events }) => {
  const [event, setEvent] = useState<HotelEvent | null>(null);

  const { profile } = useSelector((s: RootState) => s.hotel);

  return (
    <>
      <Card style={styles.card}>
        <FlatList
          horizontal
          data={events}
          keyExtractor={item => item.id.toString()}
          style={[styles.list, { display: event == null ? 'flex' : 'none' }]}
          renderItem={({ item }) => (
            <ImageItem
              activeColor={profile?.primaryColor}
              key={item.id}
              source={{ uri: `${BASE_FILE_URL}/${item.img}` }}
              text={item.name}
              style={styles.item}
              onPress={() => setEvent(item)}
            />
          )}
        />

        {event != null && (
          <HotelEvent event={event} onBack={() => setEvent(null)} />
        )}
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginLeft: 3,
    marginRight: 3,
    flex: 3,
    overflow: 'hidden',
  },
  background: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.9,
  },
  list: {
    padding: 10,
  },
  item: {
    flex: 1,
    marginHorizontal: 6,
    width: 150,
    height: '100%',
  },
  eventRoot: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  eventImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  descContainer: {
    padding: 32,
    width: '40%',
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'Outfit-SemiBold',
    marginTop: 8,
    textAlign: 'center',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 0.2,
  },
  desc: {
    color: '#000',
    fontFamily: 'Outfit-Light',
    textAlign: 'center',
    marginTop: 32,
  },
});

export default Events;
