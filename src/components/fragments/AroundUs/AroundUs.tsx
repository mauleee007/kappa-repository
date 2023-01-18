import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { BASE_FILE_URL } from '../../../services/utils';
import { RootState } from '../../../stores';
import { normalize } from '../../../utils/scaling';
import Card from '../../elements/Card';
import ImageItem from '../RoomTypes/ImageItem';

interface Props {
  arounds: Around[];
}

const AroundUs: React.FC<Props> = ({ arounds }) => {
  const [around, setAround] = useState(arounds[0]);

  const { profile } = useSelector((s: RootState) => s.hotel);

  return (
    <>
      <Card style={styles.card}>
        <View style={styles.list}>
          <FlatList
            data={arounds}
            numColumns={3}
            columnWrapperStyle={styles.listColWrapper}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <ImageItem
                activeColor={profile?.primaryColor}
                key={item.id}
                source={{ uri: `${BASE_FILE_URL}/${item.img}` }}
                style={styles.item}
                onFocus={() => setAround(item)}
              />
            )}
          />
        </View>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginLeft: 6,
    marginRight: 6,
    display: 'flex',
    flexDirection: 'row',
    flex: 3,
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  image: {
    width: 200,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
  },
  item: {
    flex: 0.33,
    margin: normalize(20),
    height: 130,
    marginVertical: 'auto',
  },
  list: {
    paddingVertical: 20,
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  listColWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Outfit-Medium',
    marginTop: 8,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 0.2,
  },
  descContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 32,
    width: '40%',
  },
  desc: {
    color: '#fff',
    fontFamily: 'Outfit-Light',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default AroundUs;
