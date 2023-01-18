import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  Text,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../../App';
import Card from '../../components/elements/Card';
import RoundedButton from '../../components/elements/RoundedButton';
import TextMenuItem from '../../components/elements/TextMenuItem';
import BaseLayout from '../../components/fragments/BaseLayout';
import ImageItem from '../../components/fragments/RoomTypes/ImageItem';
import HotelService from '../../services/hotels';
import { BASE_FILE_URL } from '../../services/utils';
import { RootState } from '../../stores';
import { formatNumber } from '../../utils/numbers';
import { styles } from './styles';

import appetizer1 from '../../assets/EpicurentNest/appetizer3.jpg';
import appetizer2 from '../../assets/EpicurentNest/appetizer2.jpg';
import appetizer3 from '../../assets/EpicurentNest/appetizer1.jpg';

import maincourse1 from '../../assets/EpicurentNest/maincourse1.jpg';
import maincourse2 from '../../assets/EpicurentNest/maincourse2.jpg';
import maincourse3 from '../../assets/EpicurentNest/maincourse3.png';
type RestaurantRouteProp = RouteProp<RootStackParamList, 'Restaurant'>;

interface menus {
  id: number;
  name: string;
}

interface datas {
  id: number;
  name: string;
  text: string;
  img: string;
}

const dataDummy: { id: number; data: datas[] }[] = [
  {
    id: 1,
    data: [
      {
        id: 1,
        name: 'Patti Samosa',
        text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit" ',
        img: appetizer3,
      },
      {
        id: 2,
        name: 'Salmon Bites',
        text: 'Appetizer',
        img: appetizer2,
      },
      {
        id: 3,
        name: 'Grilled Shrimp',
        text: 'Appetizer',
        img: appetizer1,
      },
    ],
  },
  {
    id: 2,
    data: [
      {
        id: 1,
        name: 'Pan Grill Salmon',
        text: 'Main Course',
        img: maincourse1,
      },
      {
        id: 2,
        name: 'Rib Eye',
        text: 'Main COurse',
        img: maincourse2,
      },
      {
        id: 3,
        name: 'Fish with Sauce',
        text: 'Main Course',
        img: maincourse3,
      },
    ],
  },
  {
    id: 3,
    data: [
      {
        id: 1,
        name: 'Kepuh',
        text: 'Kepuh',
        img: 'http://192.168.1.10/images_local/img/Kepuh.jpg',
      },
    ],
  },
  {
    id: 4,
    data: [
      {
        id: 1,
        name: 'Kokoan',
        text: 'Kokoan',
        img: 'http://192.168.1.10/images_local/img/Kokokan.jpg',
      },
    ],
  },
  {
    id: 5,
    data: [
      {
        id: 1,
        name: 'Bale Gourmet',
        text: 'Bale Gourmet',
        img: 'http://192.168.1.10/images_local/img/Bale Gourmet.jpg',
      },
    ],
  },
  {
    id: 6,
    data: [
      {
        id: 1,
        name: 'Lianas',
        text: 'Lianas',
        img: 'http://192.168.1.10/images_local/img/Lianas.jpg',
      },
    ],
  },
];

const menuDummy: { id: number; menu: menus[] }[] = [
  {
    id: 1,
    menu: [
      { id: 1, name: 'Appetizer' },
      { id: 2, name: 'Main Course' },
      { id: 3, name: 'Dessert' },
      { id: 4, name: 'Light Bites/Snacks' },
      { id: 5, name: 'Beverages' },
    ],
  },
  {
    id: 2,
    menu: [
      { id: 1, name: 'Gallery' },
      { id: 2, name: 'Featured Menu' },
    ],
  },
  {
    id: 3,
    menu: [
      { id: 1, name: 'Gallery' },
      { id: 2, name: 'Featured Menu' },
    ],
  },
  {
    id: 4,
    menu: [
      { id: 1, name: 'Gallery' },
      { id: 2, name: 'Featured Menu' },
    ],
  },
  {
    id: 5,
    menu: [
      { id: 1, name: 'Gallery' },
      { id: 2, name: 'Featured Menu' },
    ],
  },
  {
    id: 6,
    menu: [
      { id: 1, name: 'Gallery' },
      { id: 2, name: 'Featured Menu' },
    ],
  },
];

const Restaurant: React.FC = () => {
  const route = useRoute<RestaurantRouteProp>();
  const [category, setCategory] = useState(route.params.category);
  const [idCategory] = useState(route.params.category);
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(false);
  const [qty, setQty] = useState('1');
  const [Dummy, setDummy] = useState(1);
  const [selectedMenuIdx, setSelectedMenuIdx] = useState(0);

  function setData(id: React.SetStateAction<number>) {
    setCategory(id);
    setDummy(id);
  }

  // const ref = useRef<View>(null);
  const textRef = useRef<TextInput>(null);
  const { profile } = useSelector((s: RootState) => s.hotel);
  const selectedMenu = foods.find(v => v.id === selectedMenuIdx);

  const categories: FoodCategory[] = useMemo(
    () => [...foodCategories],
    [foodCategories],
  );

  useEffect(() => {
    const getFoodCategories = async () => {
      setLoading(true);
      try {
        const resFoodCategory = await HotelService.getFoodCategories();
        if (resFoodCategory.status === 200) {
          setFoodCategories(resFoodCategory.data.data);
        } else {
          ToastAndroid.show('Cannot get categories', ToastAndroid.SHORT);
        }
      } catch {
        ToastAndroid.show('Cannot get categories', ToastAndroid.SHORT);
      }
      setLoading(false);
    };

    getFoodCategories();
  }, []);

  useEffect(() => {
    const getFoods = async () => {
      setLoading(true);
      try {
        const resFood = await HotelService.getFoods();
        if (resFood.status === 200) {
          setFoods(resFood.data.data);
        } else {
          ToastAndroid.show('Cannot get hotel menu', ToastAndroid.SHORT);
        }
      } catch {
        ToastAndroid.show('Cannot get hotel menu', ToastAndroid.SHORT);
      }
      setLoading(false);
    };

    getFoods();
  }, []);

  return (
    <BaseLayout profile={profile} style={styles.root}>
      <View style={styles.container}>
        <Card style={[styles.card, { width: '20%' }]}>
          {loading && foodCategories.length === 0 && (
            <Text style={{ color: '#fff' }}>Please wait...</Text>
          )}
          {(!loading || foodCategories.length > 0) && (
            <FlatList
              data={menuDummy[idCategory - 1].menu}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TextMenuItem
                  key={item.id}
                  activeColor={profile?.primaryColor}
                  preferredFocus={Dummy === item.id}
                  active={Dummy === item.id}
                  title={item.name}
                  onFocus={() => setData(item)}
                />
              )}
            />
          )}
        </Card>
        <Card style={[styles.menu, styles.cardMiddle]}>
          <FlatList
            removeClippedSubviews={false}
            numColumns={2}
            data={dataDummy[0].data}
            renderItem={({ item }) => (
              <ImageItem
                key={item.id}
                activeColor={profile?.primaryColor}
                source={item.img as ImageSourcePropType}
                text={item.name}
                style={styles.item}
                onFocus={() => setSelectedMenuIdx(item.id)}
                onPress={() => {
                  // setOrder(true);yy
                }}
              />
            )}
            style={styles.menuList}
          />
        </Card>

        <Card style={[styles.card, styles.cardRight]}>
          {selectedMenu == null && (
            <Text style={styles.title}>Select Menu</Text>
          )}

          {Dummy && (
            <>
              <Image
                source={dataDummy[0].data[0].img as ImageSourcePropType}
                resizeMode="cover"
                style={styles.image}  
              />

              <Text style={styles.title}>{dataDummy[0].data[0].name}</Text>
              <Text style={styles.desc}>{dataDummy[0].data[0].text}</Text>
              <Text style={styles.price}>
                IDR.{' '}
                {formatNumber(selectedMenu == null ? 0 : selectedMenu.price)},-
              </Text>
            </>
          )}
        </Card>
      </View>

      <Modal
        transparent
        visible={order}
        onRequestClose={() => setOrder(false)}
        onShow={() => {
          setQty('1');
          textRef.current?.focus();
        }}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <Image
              source={{
                uri: 'http://192.168.1.10/images_local/img/invilla.jpg',
              }}
              resizeMode="cover"
              style={styles.image}
            />

            <Text style={styles.title}>{selectedMenu?.name}</Text>

            <Text style={{ color: '#fff', marginTop: 16 }}>
              Input order quantity
            </Text>
            <TouchableHighlight onFocus={() => textRef.current?.focus()}>
              <TextInput
                editable
                focusable
                isTVSelectable
                ref={textRef}
                keyboardType="number-pad"
                value={qty}
                onChangeText={text => setQty(text)}
                style={{ color: '#fff' }}
              />
            </TouchableHighlight>
            <RoundedButton
              color={profile?.primaryColor}
              title="ORDER"
              onPress={() => {
                setOrder(false);
                ToastAndroid.show(
                  'Thank you for your order!',
                  ToastAndroid.SHORT,
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </BaseLayout>
  );
};

export default Restaurant;
