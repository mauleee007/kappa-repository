import React, { useState } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { BASE_FILE_URL } from '../../../services/utils';
import { RootState } from '../../../stores';
import Card from '../../elements/Card';
import ImageItem from './ImageItem';

interface Props {
  rooms: Room[];
}

const RoomTypes: React.FC<Props> = ({ rooms }) => {
  const [room, setRoom] = useState(rooms[0]);

  const { profile } = useSelector((s: RootState) => s.hotel);

  return (
    <>
      <Card
        style={{
          ...styles.card,
          flexDirection: 'row',
          flex: 3,
          flexWrap: 'wrap',
        }}
      >
        {rooms.map(v => (
          <ImageItem
            activeColor={profile?.primaryColor}
            key={v.id}
            source={{ uri: `${BASE_FILE_URL}/${v.img}` }}
            text={v.name}
            onFocus={() => setRoom(v)}
          />
        ))}
      </Card>

      <Card style={{ ...styles.card, flex: 2 }}>
        <Image
          source={{ uri: `${BASE_FILE_URL}/${room.img}` }}
          resizeMode="cover"
          style={styles.image}
        />
        <Text style={styles.title}>{room.name}</Text>
        <Text style={styles.desc}>{room.description}</Text>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginLeft: 3,
    marginRight: 3,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Outfit-Medium',
    marginTop: 8,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 0.2,
  },
  desc: {
    color: '#fff',
    fontFamily: 'Outfit-Light',
    textAlign: 'justify',
    marginTop: 8,
  },
});

export default RoomTypes;
