import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  Pressable,
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
  facilities: Facility[];
}

interface CardProps {
  color?: string;
  index: number;
  facility: Facility;
  onPress: (facility: Facility) => void;
}

const FacilityCard: React.FC<CardProps> = ({
  color,
  index,
  facility,
  onPress,
}) => {
  const [focus, setFocus] = useState(false);

  const borderColor = !focus ? '#FFF' : color;

  const col = index % 2;
  const row = Math.floor(index / 2);

  const colEven = col % 2;
  const rowEven = row % 2;

  let width = '59%';
  if (colEven && !rowEven) {
    width = '40%';
  } else if (!colEven && rowEven) {
    width = '40%';
  }

  return (
    <Pressable
      style={[styles.item, { borderColor, width }]}
      onPress={() => onPress(facility)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <Image
        source={{ uri: `${BASE_FILE_URL}/${facility.img}` }}
        resizeMode="cover"
        style={styles.image}
      />
      <Text style={[styles.text, { backgroundColor: color }]}>
        {facility.name}
      </Text>
    </Pressable>
  );
};

type FacilityProps = {
  facility: Facility;
  onBack: () => void;
};

const Facility: React.FC<FacilityProps> = ({ facility, onBack }) => {
  const { profile } = useSelector((s: RootState) => s.hotel);

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
    <View style={styles.facilityRoot}>
      <Image
        source={{ uri: `${BASE_FILE_URL}/${facility.img}` }}
        style={styles.facilityImg}
      />

      <View style={styles.descContainer}>
        <View style={styles.background} />
        <Text style={styles.title}>{facility.name}</Text>
        <Text style={styles.desc}>{facility.description}</Text>
      </View>
    </View>
  );
};

const Facilities: React.FC<Props> = ({ facilities }) => {
  const [facility, setFacility] = useState<Facility | null>(null);

  const { profile } = useSelector((s: RootState) => s.hotel);

  return (
    <>
      <Card style={styles.card}>
        <FlatList
          horizontal
          data={facilities}
          keyExtractor={item => item.id.toString()}
          style={[styles.list, { display: facility == null ? 'flex' : 'none' }]}
          renderItem={({ item }) => (
            <ImageItem
              activeColor={profile?.primaryColor}
              key={item.id}
              source={{ uri: `${BASE_FILE_URL}/${item.img}` }}
              text={item.name}
              style={styles.item}
              onPress={() => setFacility(item)}
            />
          )}
        />

        {facility != null && (
          <Facility facility={facility} onBack={() => setFacility(null)} />
        )}
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginLeft: 3,
    marginRight: 3,
    overflow: 'hidden',
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
  image: {
    height: '100%',
    width: '100%',
  },
  text: {
    position: 'absolute',
    bottom: 20,
    fontFamily: 'Outfit-Bold',
    color: '#000',
    padding: 10,
    width: '50%',
    textAlign: 'center',
    opacity: 0.8,
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
  facilityRoot: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  facilityImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    textAlign: 'justify',
    marginTop: 32,
  },
});

export default Facilities;
