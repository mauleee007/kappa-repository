import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  StyleSheet,
  Text,
  findNodeHandle,
  NativeModules,
  View,
  Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import img1 from '../../../assets/DanuRetreat/OneBedroomPoolVilla.jpg';
import ApiServices from '../../../services/apis';
import { BASE_FILE_URL } from '../../../services/utils';
import { AppDispatch, RootState } from '../../../stores';
import { setToast } from '../../../stores/ui';
import Card from '../../elements/Card';
import ImageItem from '../RoomTypes/ImageItem';

type Props = {
  room: Room;
};

type DanuProps = {
  room: Room;
  dataRoom: ListImg[];
  onBack: () => void;
};

interface ListImg {
  id: number;
  roomId: number;
  img: string;
  name: string;
  description?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

const ListImageEx: ListImg = {
  id: 1,
  roomId: 45,
  img: img1,
  name: 'One Bedroom Pool Villa',
  description:
    'One Bedroom Pool Villas are private sanctuaries set within the divine Danu Retreat. Surrounded by tropical foliage, these conscientiously designed one-bedroom villas offer ample space to relax and unwind. Spend endless days relaxing in the villa spacious bedroom and recharge waterside by the private infinity swimming pool.',
};

const DescDanu: React.FC<DanuProps> = ({ dataRoom, onBack }) => {
  const { profile } = useSelector((s: RootState) => s.hotel);
  const [ListImage, setListImage] = useState<ListImg | null>(ListImageEx);

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
    <View style={styles.container}>
      <View style={{ ...styles.cardMiddle }}>
        <FlatList
          removeClippedSubviews={false}
          focusable
          hasTVPreferredFocus
          numColumns={2}
          style={styles.menuList}
          keyExtractor={item => item.id.toString()}
          data={dataRoom}
          renderItem={({ item, index }) => (
            <ImageItem
              preferredFocus={index === 0}
              key={item.id}
              activeColor={profile?.primaryColor}
              source={{ uri: `${BASE_FILE_URL}/${item.img}` }}
              // text={item.text}
              style={styles.item2}
              onFocus={() => setListImage(item)}
            />
          )}
        />
      </View>

      {dataRoom.length > 0 && (
        <View style={styles.cardRight}>
          <Image
            source={{ uri: `${BASE_FILE_URL}/${ListImage.img}` }}
            resizeMode="cover"
            style={styles.image}
          />
          <Text style={styles.title2}>{ListImage.name}</Text>
          <Text style={styles.desc}>{ListImage.description}</Text>
        </View>
      )}
    </View>
  );
};

const Room: React.FC<Props> = ({ room }) => {
  const [detail, setDetail] = useState<DanuDetail | null>(null);
  const [hideList, setHideList] = useState(false);
  const { profile } = useSelector((s: RootState) => s.hotel);
  const [listImg, setListImg] = useState<ListImg[]>([]);
  const [choiceItem, setChoiceItem] = useState(-1);
  const { hotel } = useSelector((s: RootState) => s.hotel);

  const dispatch = useDispatch<AppDispatch>();
  const mainRef = useRef<View>(null);

  const setFocus = useCallback(() => {
    if (mainRef.current == null) {
      return;
    }

    const tag = findNodeHandle(mainRef.current);
    NativeModules.UIManager.updateView(tag, 'RCTView', {
      hasTVPreferredFocus: true,
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const getListImg = async () => {
      if (hotel == null) {
        return;
      }

      try {
        const resDanuRetreat = await ApiServices.getDanu(hotel.id, room.id);
        if (resDanuRetreat.status === 200) {
          if (isMounted) {
            setListImg(resDanuRetreat.data.data);
          }
        } else {
          dispatch(setToast({ message: 'Cannot get hotel rooms' }));
        }

        if (!isMounted) {
          return;
        }
      } catch (err) {
        dispatch(setToast({ message: 'Cannot get information' }));
      }
    };

    getListImg();
  }, [dispatch, hotel, room.id]);

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <View style={styles.cardMiddle}>
          <FlatList
            focusable
            hasTVPreferredFocus
            numColumns={2}
            style={styles.menuList}
            keyExtractor={item => item.id.toString()}
            data={listImg}
            renderItem={({ item, index }) => (
              <ImageItem
                preferredFocus={index === 0}
                key={item.id}
                text={item.name}
                activeColor={profile?.primaryColor}
                source={{ uri: `${BASE_FILE_URL}/${item.img}` }}
                onFocus={() => setChoiceItem(index)}
                style={styles.item3}
              />
            )}
          />
        </View>
        <View style={styles.cardRight}>
          {choiceItem >= 0 && (
            <>
              <Image
                source={{ uri: `${BASE_FILE_URL}/${listImg[choiceItem].img}` }}
                resizeMode="cover"
                style={styles.image}
              />
              <Text style={styles.title2}>{listImg[choiceItem].name}</Text>
              <Text style={styles.desc}>{listImg[choiceItem].description}</Text>
            </>
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginLeft: 3,
    marginRight: 3,
    overflow: 'hidden',
  },
  item3: {
    height: 150,
    fontSize: 12,
  },
  card2: {
    padding: 16,
    marginLeft: 6,
    marginRight: 6,
  },
  image: {
    height: 120,
    width: '70%',
    marginRight: 'auto',
    marginTop: 12,
    marginLeft: 'auto',
    borderRadius: 8,
  },
  list: {
    display: 'flex',
    flex: 1,
    padding: 10,
    height: 500,
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
  menuList: {
    padding: 6,
    width: '100%',
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
  desc: {
    color: '#000',
    fontFamily: 'Outfit-Light',
    marginLeft: 12,
    marginRight: 12,
    fontSize: 12,
    textAlign: 'justify',
    marginTop: 20,
  },
  menu: {
    marginLeft: 6,
    marginRight: 6,
    overflow: 'hidden',
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
  background: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.9,
  },
  profileImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  descContainer: {
    padding: 32,
    width: '40%',
  },
  profileRoot: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    marginHorizontal: 6,
    width: 150,
    height: '100%',
  },
  item2: {
    height: 150,
  },
});

export default Room;
