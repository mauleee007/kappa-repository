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
  promos: Promo[];
}

type PromoProps = {
  promo: Promo;
  onBack: () => void;
};

const Promo: React.FC<PromoProps> = ({ promo, onBack }) => {
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
    <View style={styles.promoRoot}>
      <Image
        source={{ uri: `${BASE_FILE_URL}/${promo.img}` }}
        style={styles.promoImg}
      />

      <View style={styles.descContainer}>
        <View style={styles.background} />

        <Text style={styles.title}>{promo.name}</Text>
        <Text style={styles.desc}>{promo.description}</Text>
      </View>
    </View>
  );
};

const Promos: React.FC<Props> = ({ promos }) => {
  const [promo, setPromo] = useState<Promo | null>(null);

  const { profile } = useSelector((s: RootState) => s.hotel);

  return (
    <>
      <Card style={styles.card}>
        <FlatList
          horizontal
          data={promos}
          keyExtractor={item => item.id.toString()}
          style={[styles.list, { display: promo == null ? 'flex' : 'none' }]}
          renderItem={({ item }) => (
            <ImageItem
              activeColor={profile?.primaryColor}
              key={item.id}
              source={{ uri: `${BASE_FILE_URL}/${item.img}` }}
              text={item.name}
              style={styles.item}
              onPress={() => setPromo(item)}
            />
          )}
        />

        {promo != null && <Promo promo={promo} onBack={() => setPromo(null)} />}
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
  promoRoot: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  promoImg: {
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
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Promos;
