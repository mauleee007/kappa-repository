import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageSourcePropType,
  ToastAndroid,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import ApiServices from '../../../services/apis';
import { BASE_FILE_URL } from '../../../services/utils';
import { RootState } from '../../../stores';
import { normalize } from '../../../utils/scaling';
import Card from '../../elements/Card';
// import { styles } from '../Footer/styles';
import ImageItem from '../RoomTypes/ImageItem';
import img1 from '../../../assets/OmTaraSPa/spabyclarins.jpg';
import img2 from '../../../assets/OmTaraSPa/treatment.jpg';
import img3 from '../../../assets/OmTaraSPa/facilities.jpg';
import img4 from '../../../assets/OmTaraSPa/retreatworkshop.jpg';
import { setLoading } from '../../../stores/hotel';

interface OmTaraSpa {
  id: number;
  hotelId?: number;
  title?: string;
  description?: string;
  img?: any;
  detail: details[];
}
interface WellnessFacilities {
  id: number;
  hotelId?: number;
  name?: string;
  description?: string;
  img: string | import('react-native').ImageSourcePropType;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

type Props = {
  omtaraspa: OmTaraSpa;
};
const Data: OmtaraSpaDetail[] = [
  {
    id: 1,
    img: img1,
    title: 'Spa by Clarins',
    description: '',
  },
  {
    id: 2,
    img: img2,
    title: 'Treatment Menu',
    description: '',
  },
  {
    id: 3,
    img: img3,
    title: 'Wellness Facilities',
    description: '',
  },
  {
    id: 4,
    img: img4,
    title: 'Retreat & Workshop',
    description: '',
  },
];
type OmtaraProps = {
  detail: OmtaraSpaDetail;
  onBack: () => void;
};

const DescOmtara: React.FC<OmtaraProps> = ({ detail, onBack }) => {
  const [omtaraprofile, setOmtaraProfile] = useState({});
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
    const getOmtaraDetail = async () => {
      // setLoading(true);
      try {
        const resOmtaraDetail = await ApiServices.getSpa(detail.id);
        console.log(resOmtaraDetail.data.data);
        if (resOmtaraDetail.status === 200) {
          setOmtaraProfile(resOmtaraDetail.data.data);
        } else {
          console.log(resOmtaraDetail);
          ToastAndroid.show('Cannot get OmtaraDetail', ToastAndroid.SHORT);
        }
      } catch (err) {
        console.log(err);
        ToastAndroid.show('Cannot get OmtaraDetail', ToastAndroid.SHORT);
      }
      // setLoading(false);
    };

    getOmtaraDetail();
  }, [onBack]);

  return (
    <View style={styles.profileRoot}>
      <Image
        source={{
          uri: `${BASE_FILE_URL}/${
            omtaraprofile.img ?? omtaraprofile.mainPhoto
          }`,
        }}
        style={styles.profileImg}
      />
      <View style={styles.descContainer}>
        <View style={styles.background} />
        <Text style={styles.desc}>{omtaraprofile.description}</Text>
      </View>
    </View>
  );
};
interface ListFacilities {
  id: number;
  roomId: number;
  img: string;
  name: string;
  description?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}
type FacilitiesProps = {
  dataFacilities: Facilities[];
  onBack: () => void;
};
interface Facilities {
  id: number;
  hotelId?: number;
  name?: string;
  description?: string;
  img: string | import('react-native').ImageSourcePropType;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

const FacilitiesDetail: React.FC<FacilitiesProps> = ({
  dataFacilities,
  onBack,
}) => {
  const [detail, setDetail] = useState<Facilities[]>([]);
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
    const getFacilities = async () => {
      setLoading(true);
      try {
        const resFacilities = await ApiServices.getSpaFacilities();
        console.log(resFacilities.data.data);
        if (resFacilities.status === 200) {
          setDetail(resFacilities.data.data);
        } else {
          console.log(resFacilities);
          ToastAndroid.show('Cannot get facilities', ToastAndroid.SHORT);
        }
      } catch (err) {
        console.log(err);
        ToastAndroid.show('Cannot get facilities', ToastAndroid.SHORT);
      }
      setLoading(false);
    };
    getFacilities();
  }, []);

  return (
    <>
      <FlatList
        data={detail}
        numColumns={3}
        columnWrapperStyle={styles.listColWrapper}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <ImageItem
            activeColor={profile?.primaryColor}
            preferredFocus={index === 0}
            text={item.name}
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

interface ListTreatment {
  id: number;
  roomId: number;
  img: string;
  name: string;
  description?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}
type TreatmentProps = {
  detail: TreatmentMenu[];
  onBack: () => void;
};
interface Treatment {
  id: number;
  hotelId?: number;
  name?: string;
  description?: string;
  img: string | import('react-native').ImageSourcePropType;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

const DetailTreatment: React.FC<TreatmentProps> = ({ detail, onBack }) => {
  const [detailTreatment, setTreatment] = useState<Treatment[]>([]);
  const [choiseItem, setChoiseItem] = useState<Treatment | null>(null);
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
    const getTreatmentDetail = async () => {
      try {
        const resTreatmentDetail = await ApiServices.getWellnessTreatment();
        console.log(resTreatmentDetail.data.data);
        if (resTreatmentDetail.status === 200) {
          setTreatment(resTreatmentDetail.data.data);
        } else {
          console.log(resTreatmentDetail);
          ToastAndroid.show('Cannot get Treatment', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.show('Cannot get Treatment', ToastAndroid.SHORT);
      }
    };
    getTreatmentDetail();
  }, []);

  function setChoise(id?: number) {
    const result = detailTreatment
      .map(e => {
        return e;
      })
      .filter(e => e.id === id);
    console.log(result);
    setChoiseItem(result[0]);
    console.log(choiseItem);
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
          data={detailTreatment}
          renderItem={({ item }) => (
            <ImageItem
              key={item.id}
              preferredFocus={item.id === 1}
              text={item.name}
              activeColor={profile?.primaryColor}
              source={{ uri: `${BASE_FILE_URL}/${item.img}` }}
              onFocus={() => setChoise(item.id)}
              style={styles.item3}
            />
          )}
        />
      </View>

      {choiseItem && (
        <View style={styles.cardRight}>
          <Image
            source={{ uri: `${BASE_FILE_URL}/${choiseItem.img}` }}
            resizeMode="cover"
            style={styles.image}
          />
          <Text style={styles.title2}>{choiseItem.name}</Text>
          <Text style={styles.desc}>{choiseItem.description}</Text>
        </View>
      )}
    </View>
  );
};

const OmTaraSpaDetail: React.FC<Props> = ({ omtaraspa }) => {
  const [detailOmTaraSpa, setDetail] = useState<OmtaraSpaDetail | null>(null);
  const [detailFacilities, setFacilities] = useState<ListFacilities[] | null>(
    null,
  );
  const [detailMenu, setMenu] = useState<TreatmentMenu[] | null>(null);
  const { profile } = useSelector((s: RootState) => s.hotel);

  // useEffect(() => {
  //   const getOmTaraSpa = async () => {
  //     // setLoading(true);
  //     try {
  //       const resOmTaraSpa = await ApiServices.getKappa();
  //       console.log(resOmTaraSpa.data.data);
  //       if (resOmTaraSpa.status === 200) {
  //         setOmTara(resOmTaraSpa.data.data);
  //       } else {
  //         console.log(resOmTaraSpa);
  //         ToastAndroid.show('Cannot get galleries', ToastAndroid.SHORT);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       ToastAndroid.show('Cannot get galleries', ToastAndroid.SHORT);
  //     }
  //     // setLoading(false);
  //   };

  //   getOmTaraSpa();
  // }, []);

  return (
    <>
      <Card style={styles.card}>
        <FlatList
          horizontal
          data={Data}
          keyExtractor={item => item.id.toString()}
          style={[
            styles.list,
            {
              display:
                detailOmTaraSpa == null &&
                detailFacilities == null &&
                detailMenu == null
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
                if (item.id === 1) {
                  setDetail(item);
                } else if (item.id === 4) {
                  setDetail(item);
                } else if (item.id === 3) {
                  setFacilities(item);
                } else if (item.id === 2) {
                  setMenu(item);
                }
              }}
            />
          )}
        />
        {detailOmTaraSpa != null && (
          <DescOmtara detail={detailOmTaraSpa} onBack={() => setDetail(null)} />
        )}
        {detailFacilities != null && (
          <FacilitiesDetail
            dataFacilities={detailFacilities}
            onBack={() => setFacilities(null)}
          />
        )}
        {detailMenu != null && (
          <DetailTreatment detail={detailMenu} onBack={() => setMenu(null)} />
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
    height: 150,
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
    height: 150,
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
export default OmTaraSpaDetail;
