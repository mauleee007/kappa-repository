import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageSourcePropType,
  ToastAndroid,
} from 'react-native';
import { normalize } from '../../../utils/scaling';
import Card from '../../elements/Card';
import ImageItem from '../RoomTypes/ImageItem';
import img1 from '../../../assets/HotelProfile/AnEden.jpg';
import img2 from '../../../assets/HotelProfile/YogaShala3-2.jpg';
import img3 from '../../../assets/HotelProfile/Philosophy_.jpg';
import img4 from '../../../assets/HotelProfile/Permaculture.jpg';
import galery1 from '../../../assets/Gallery/Drone-KappaSensesUbud4.jpg';
import galery2 from '../../../assets/Gallery/DroneRetreat.jpg';
import galery3 from '../../../assets/Gallery/Kelapa.jpg';
import galery4 from '../../../assets/Gallery/KokokanDrone.jpg';
import galery5 from '../../../assets/Gallery/OmTaraSpa.jpg';
import galery6 from '../../../assets/Gallery/OneBedroomPoolVilla-swimmingpool_.jpg';
import galery7 from '../../../assets/Gallery/OneBedroomPoolVillawithRiceFieldView.jpg';
import galery8 from '../../../assets/Gallery/Permaculture.jpg';
import kappa1 from '../../../assets/HotelProfile/KappaInstant/BeyondKappaSensesUbud/TuakBali.jpg';
import kappa2 from '../../../assets/HotelProfile/KappaInstant/LittleVoyagerKappaSensesUbud/AnimalFeeding.jpg';
import kappa3 from '../../../assets/HotelProfile/KappaInstant/WithinKappaSenses/UmahTanggayuda.jpg';

import beyond1 from '../../../assets/HotelProfile/KappaInstant/BeyondKappaSensesUbud/CoffeeRoasting.jpg';
import beyond2 from '../../../assets/HotelProfile/KappaInstant/BeyondKappaSensesUbud/LearnHowToMakeBalineseOfferings.jpg';
import beyond3 from '../../../assets/HotelProfile/KappaInstant/BeyondKappaSensesUbud/TraditionalHerbalDrinkLoloh.jpg';
import beyond4 from '../../../assets/HotelProfile/KappaInstant/BeyondKappaSensesUbud/TuakBali.jpg';
import beyond5 from '../../../assets/HotelProfile/KappaInstant/BeyondKappaSensesUbud/YogaShala3.jpg';

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import hotel, { setProfile } from '../../../stores/hotel';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import id from 'date-fns/esm/locale/id/index.js';
import ApiServices from '../../../services/apis';
import { BASE_FILE_URL } from '../../../services/utils';

const Data: HotelProfileDetail[] = [
  {
    id: 1,
    img: img1,
    title: 'An Eden',
    description:
      'At Kappa Senses Ubud, experience divine moments in the land of the gods, in an upscale, environmentally and socially responsible setting. Travel to one of the most coveted islands of the planet and immerse yourself amidst verdant rice fields, whose charm and beauty unfailingly astonish you. Dive into the romantic and passionate world of Rama and Shinta, the Balinese Romeo and Juliet. Whether you are looking for a place to reclaim your inner peace, or a hideaway haven in the midst of a lush jungle, come with an open heart and return forever changed by this enchanting destination and meaningful experiences.',
  },
  {
    id: 2,
    img: img2,
    title: 'Kappa Instants',
    description: ' ',
  },
  {
    id: 3,
    img: img3,
    title: 'Philosophy',
    description:
      'We believe that traveling rhymes with discovery, encounter and authenticity, amidst an eco-friendly and socially responsible environment. Kappa Senses, a new luxury resort in Ubud, incorporates five philosophies to travel differently, to embark on a meaningful journey and to embrace in-depth sensorial experiences spanning wellness and culinary. Being at Kappa Senses Ubud is the beginning of a remarkable journey for the discerning travelers, a full discovery of senses and ultimately embracing the epitome of senses: the KAPPA SENSES.',
  },
  {
    id: 4,
    img: img4,
    title: 'Gallery',
    description: ' ',
  },
];

const dataGalery: Galery[] = [
  {
    id: 1,
    img: galery1,
  },
  {
    id: 2,
    img: galery2,
  },
  {
    id: 3,
    img: galery3,
  },
  {
    id: 4,
    img: galery4,
  },
  {
    id: 5,
    img: galery5,
  },
];

const dataKappa: KappaInstants[] = [
  {
    id: 1,
    title: 'Beyond Kappa Senses Ubud',
    img: kappa1,
    detail: [
      {
        id: 1,
        title: 'Coffe Roasting',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore',
        img: beyond1,
      },
      {
        id: 2,
        title: 'Learn How to Make Balinese Offerings',
        img: beyond2,
      },
      {
        id: 3,
        title: 'Traditional Herbal Drink Loloh',
        img: beyond3,
      },
      {
        id: 4,
        title: 'Tuak Bali',
        img: beyond4,
      },
      {
        id: 5,
        title: 'Yoga Shala 3',
        img: beyond5,
      },
    ],
  },
  {
    id: 2,
    title: 'Little Voyager Kappa Senses Ubud',
    img: kappa2,
    detail: [],
  },
  {
    id: 3,
    title: 'Within Kappa Senses Ubud',
    img: kappa3,
    detail: [],
  },
];

type KappaProps = {
  kappa: KappaInstants;
  onBack: () => void;
};

type GlProps = {
  dataGallery: ListGallery[];
  onBack: () => void;
};

interface Props {
  hotel?: Hotel;
  profile?: HotelProfile[];
}

type HotelProps = {
  detail: HotelProfileDetail;
  onBack: () => void;
};

interface Galery {
  id: number;
  hotelId?: number;
  name?: string;
  description?: string;
  img: string | import('react-native').ImageSourcePropType;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

interface Kappa {
  id: number;
  hotelId?: number;
  name?: string;
  description?: string;
  img: string | import('react-native').ImageSourcePropType;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

//page detail gallery
interface ListGallery {
  id: number;
  roomId: number;
  img: string;
  name: string;
  description?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}
const GalleryDetail: React.FC<GlProps> = ({ dataGallery, onBack }) => {
  const { profile } = useSelector((s: RootState) => s.hotel);
  const [detailGallery, setGallery] = useState<Galery[]>([]);
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

  useEffect(() => {
    const getGallery = async () => {
      setLoading(true);
      try {
        const resGallery = await ApiServices.getGallery();
        console.log(resGallery.data.data);
        if (resGallery.status === 200) {
          setGallery(resGallery.data.data);
        } else {
          console.log(resGallery);
          ToastAndroid.show('Cannot get galleries', ToastAndroid.SHORT);
        }
      } catch (err) {
        console.log(err);
        ToastAndroid.show('Cannot get galleries', ToastAndroid.SHORT);
      }
      setLoading(false);
    };

    getGallery();
  }, []);

  return (
    <>
      <FlatList
        data={detailGallery}
        numColumns={3}
        columnWrapperStyle={styles.listColWrapper}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <ImageItem
            activeColor={profile?.primaryColor}
            preferredFocus={index === 0}
            key={item.id}
            source={{ uri: `${BASE_FILE_URL}/${item.img}` }}
            style={styles.item2}
            // onPress={() =>
            //   navigation.navigate('Restaurant', { category: item.id })
            // }
          />
        )}
      />
    </>
  );
};

//page detail hotel(An Eden & Philosopy)
const DescHotel: React.FC<HotelProps> = ({ detail, onBack }) => {
  const [hotelProfile, setHotelprofile] = useState({});
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

  useEffect(() => {
    const getHotelProfile = async () => {
      // setLoading(true);
      try {
        const resHotelProfile = await ApiServices.getHotelProfile(detail.id);
        console.log(resHotelProfile.data.data);
        if (resHotelProfile.status === 200) {
          setHotelprofile(resHotelProfile.data.data);
        } else {
          console.log(resHotelProfile);
          ToastAndroid.show('Cannot get galleries', ToastAndroid.SHORT);
        }
      } catch (err) {
        console.log(err);
        ToastAndroid.show('Cannot get galleries', ToastAndroid.SHORT);
      }
      // setLoading(false);
    };

    getHotelProfile();
  }, [onBack]);

  return (
    <View style={styles.profileRoot}>
      <Image
        source={{
          uri: `${BASE_FILE_URL}/${hotelProfile.mainPhoto ?? hotelProfile.img}`,
        }}
        style={styles.profileImg}
      />
      <View style={styles.descContainer}>
        <View style={styles.background} />
        <Text style={styles.title}>{hotelProfile.title ?? detail.title}</Text>
        <Text style={styles.desc}>
          {hotelProfile.description ?? 'An Eden description'}
        </Text>
      </View>
    </View>
  );
};

//page kappa instants
const KappaDetail: React.FC<KappaProps> = ({ kappa, onBack }) => {
  const [detailPageKappa, setDetail] = useState<KappaInstants | null>(null);
  const [detailKappa, setKappa] = useState<Kappa[]>([]);
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

  useEffect(() => {
    const getHotelProfile = async () => {
      // setLoading(true);
      try {
        const resHotelProfile = await ApiServices.getHotelProfile(kappa.id);
        console.log(resHotelProfile.data.data);
        if (resHotelProfile.status === 200) {
          setKappa(resHotelProfile.data.data);
        } else {
          console.log(resHotelProfile);
          ToastAndroid.show('Cannot get galleries', ToastAndroid.SHORT);
        }
      } catch (err) {
        console.log(err);
        ToastAndroid.show('Cannot get galleries', ToastAndroid.SHORT);
      }
      // setLoading(false);
    };

    getHotelProfile();
  }, [onBack]);

  return (
    <>
      <FlatList
        horizontal
        focusable
        hasTVPreferredFocus
        data={detailKappa}
        keyExtractor={item => item.id.toString()}
        style={[
          styles.list,
          {
            display: detailPageKappa == null ? 'flex' : 'none',
          },
        ]}
        renderItem={({ item }) => (
          <ImageItem
            activeColor={profile?.primaryColor}
            preferredFocus={item.id === 1}
            key={item.id}
            source={{ uri: `${BASE_FILE_URL}/${item.img}` }}
            text={item.name}
            style={styles.item}
            onPress={() => setDetail(item)}
          />
        )}
      />
      {detailPageKappa != null && (
        <DetailKappaInstant
          kappa={detailPageKappa}
          onBack={() => setDetail(null)}
        />
      )}
    </>
  );
};

const DetailKappaInstant: React.FC<KappaProps> = ({ kappa, onBack }) => {
  const [Dummy] = useState(1);
  const { profile } = useSelector((s: RootState) => s.hotel);
  const [detailKappa, setKappa] = useState<Kappa[]>([]);
  const [choiceItem, setChoiceItem] = useState<Kappa | null>(null);
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

  useEffect(() => {
    const getHotelProfile = async () => {
      // setLoading(true);
      try {
        const resHotelProfile = await ApiServices.getHotelProfile(
          100,
          kappa.id,
        );
        console.log(resHotelProfile.data.data);

        if (resHotelProfile.status === 200) {
          setKappa(resHotelProfile.data.data);
        } else {
          console.log(resHotelProfile);
          ToastAndroid.show('Cannot get galleries', ToastAndroid.SHORT);
        }
      } catch (err) {
        console.log(err);
        ToastAndroid.show('Cannot get galleries', ToastAndroid.SHORT);
      }
      // setLoading(false);
    };

    getHotelProfile();
  }, []);

  function setChoice(id?: number) {
    const result = detailKappa
      .map(e => {
        return e;
      })
      .filter(e => e.id === id);
    console.log(result);

    setChoiceItem(result[0]);
    console.log(choiceItem);
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardMiddle}>
        <FlatList
          removeClippedSubviews={false}
          focusable
          hasTVPreferredFocus
          numColumns={2}
          style={styles.menuList}
          keyExtractor={item => item.id.toString()}
          data={detailKappa}
          renderItem={({ item }) => (
            <ImageItem
              key={item.id}
              preferredFocus={item.id === 1}
              text={item.name}
              activeColor={profile?.primaryColor}
              source={{ uri: `${BASE_FILE_URL}/${item.img}` }}
              onFocus={() => setChoice(item.id)}
              style={styles.item3}
            />
          )}
        />
      </View>

      {choiceItem && (
        <View style={styles.cardRight}>
          <Image
            source={{ uri: `${BASE_FILE_URL}/${choiceItem.img}` }}
            resizeMode="cover"
            style={styles.image}
          />
          <Text style={styles.title2}>{choiceItem.name}</Text>
          <Text style={styles.desc}>{choiceItem.description}</Text>
        </View>
      )}
    </View>
  );
};
//main-page
const HotelProfile: React.FC<Props> = ({ profile }) => {
  const [detail, setDetail] = useState<HotelProfileDetail | null>(null);
  const [detailGallery, setGallery] = useState<ListGallery[] | null>(null);
  const [detailKappa, setKappa] = useState<KappaInstants | null>(null);

  // const { profile } = useSelector((s: RootState) => s.hotel);
  return (
    <>
      <Card style={styles.card}>
        <FlatList
          horizontal
          data={Data}
          // columnWrapperStyle={styles.listColWrapper}
          keyExtractor={item => item.id.toString()}
          style={[
            styles.list,
            {
              display:
                detail == null && detailGallery == null && detailKappa == null
                  ? 'flex'
                  : 'none',
            },
          ]}
          renderItem={({ item }) => (
            <ImageItem
              activeColor={profile?.primaryColor}
              key={item.id}
              source={item.img as ImageSourcePropType}
              text={item.title}
              style={styles.item}
              onPress={() => {
                if (item.id === 3) {
                  setDetail(item);
                } else if (item.id === 2) {
                  setKappa(item);
                } else if (item.id === 1) {
                  setDetail(item);
                } else if (item.id === 4) {
                  setGallery(item);
                }
              }}
            />
          )}
        />

        {detail != null && (
          <DescHotel detail={detail} onBack={() => setDetail(null)} />
        )}
        {detailGallery != null && (
          <GalleryDetail
            dataGallery={detailGallery}
            onBack={() => setGallery(null)}
          />
        )}
        {detailKappa != null && (
          <KappaDetail kappa={detailKappa} onBack={() => setKappa(null)} />
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
  menuList: {
    padding: 6,
    width: '100%',
  },
  title2: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Outfit-Medium',
    marginTop: 8,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 0.2,
  },
  image: {
    height: 120,
    width: '70%',
    marginRight: 'auto',
    marginTop: 12,
    marginLeft: 'auto',
    borderRadius: 8,
  },
  cardRight: {
    backgroundColor: '#ffffffD5',
    marginLeft: 0,
    flex: 2,
    paddingLeft: 1,
    paddingRight: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  cardMiddle: {
    flex: 3,
    marginRight: 0,
    flexWrap: 'wrap',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  list: {
    display: 'flex',
    flex: 1,
    padding: 10,
    height: 500,
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
  item: {
    flex: 1,
    marginHorizontal: 6,
    width: 150,
    height: '100%',
  },
  item3: {
    height: 150,
    fontSize: 12,
  },
  item2: {
    flex: 0.33,
    margin: normalize(20),
    height: 130,
    marginVertical: 'auto',
  },
  listColWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  desc: {
    color: '#000',
    fontFamily: 'Outfit-Light',
    fontSize: 12,
    textAlign: 'justify',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  profileRoot: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'Outfit-SemiBold',
    marginTop: 0,
    textAlign: 'center',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 0.2,
  },
  profileImg: {
    flex: 1,
    width: '100%',

    height: '100%',
    resizeMode: 'cover',
  },
  descContainer: {
    padding: 32,
    width: '40%',
  },
});

export default HotelProfile;
