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
import ApiServices from '../../services/apis';
import hotel from '../../stores/hotel';
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

const Restaurant: React.FC<RestaurantRouteProp> = () => {
  const route = useRoute<RestaurantRouteProp>();
  const [category, setCategory] = useState(route.params.categoryId);
  const [categoryId] = useState(route.params.categoryId);
  const [hotelId] = useState(route.params.hotelId);
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [extentionCall, setExtentionCall] = useState<RestoCategory[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(false);
  const [qty, setQty] = useState('1');
  const [selectedMenuIdx, setSelectedMenuIdx] = useState(0);
  // const [index, setIndex] = useState(0);

  // function setData(id: React.SetStateAction<number>) {
  //   setCategory(id);
  //   console.log(foods);
  // }

  // const ref = useRef<View>(null);
  const textRef = useRef<TextInput>(null);
  const { profile } = useSelector((s: RootState) => s.hotel);
  const selectedMenu = foods.find(v => v.id === selectedMenuIdx);
  const extention = extentionCall.find(v => v.id === categoryId);

  const categories: FoodCategory[] = useMemo(
    () => [...foodCategories],
    [foodCategories],
  );

  useEffect(() => {
    const getExtentionCall = async () => {
      setLoading(true);
      try {
        const resExention = await ApiServices.getRestaurant(hotelId);
        if (resExention.status === 200) {
          setExtentionCall(resExention.data.data);
          // console.log(extentionCall);
        } else {
          ToastAndroid.show('Cannot get categories', ToastAndroid.SHORT);
        }
      } catch {
        ToastAndroid.show('Cannot get categories', ToastAndroid.SHORT);
      }
      setLoading(false);
    };
    getExtentionCall();
  }, [hotelId]);

  useEffect(() => {
    const getFoodCategories = async () => {
      setLoading(true);
      try {
        const resFoodCategory = await ApiServices.getFoodCategories(
          hotelId,
          categoryId,
        );
        if (resFoodCategory.status === 200) {
          setFoodCategories(resFoodCategory.data.data);
          // console.log(foodCategories);
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
        const resFood = await ApiServices.getFoods(hotelId, categoryId);
        if (resFood.status === 200) {
          setFoods(
            resFood.data.data
              .filter(
                (data: { foodCategoryId: number }) =>
                  data.foodCategoryId === category,
              )
              .map((data: any) => data),
          );
        } else {
          ToastAndroid.show('Cannot get hotel menu', ToastAndroid.SHORT);
        }
      } catch {
        ToastAndroid.show('Cannot get hotel menu', ToastAndroid.SHORT);
      }
      setLoading(false);
    };

    if (category) {
      getFoods();
    }
  }, [category, categoryId, hotelId]);
  // console.log(extention);
  return (
    <BaseLayout profile={profile} style={styles.root}>
      <View style={styles.container}>
        <Card style={[styles.card, { width: '20%' }]}>
          {loading && foodCategories.length === 0 && (
            <Text style={{ color: '#fff' }}>Please wait...</Text>
          )}
          {(!loading || foodCategories.length > 0) && (
            <FlatList
              data={categories}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TextMenuItem
                  key={item.id}
                  activeColor={profile?.primaryColor}
                  preferredFocus={category === item.id}
                  active={category === item.id}
                  title={item.name}
                  onFocus={() => setCategory(item.id)}
                />
              )}
            />
          )}
        </Card>
        <Card style={[styles.menu, styles.cardMiddle]}>
          {categories.find(v => v.id === category) != null &&
            categories.find(v => v.id === category)?.name === 'Gallery' && (
              <>
                <FlatList
                  removeClippedSubviews={false}
                  numColumns={3}
                  columnWrapperStyle={styles.listColWrapper}
                  data={foods}
                  renderItem={({ item }) => (
                    <ImageItem
                      key={item.id}
                      activeColor={profile?.primaryColor}
                      source={{ uri: `${BASE_FILE_URL}/${item.img}` }}
                      text={item.name}
                      style={styles.item2}
                      onFocus={() => setSelectedMenuIdx(item.id)}
                      onPress={() => {
                        // setOrder(true);yy
                      }}
                    />
                  )}
                  style={styles.menuList}
                />
              </>
            )}
          <FlatList
            removeClippedSubviews={false}
            numColumns={2}
            columnWrapperStyle={styles.listColWrapper}
            data={foods}
            renderItem={({ item }) => (
              <ImageItem
                key={item.id}
                activeColor={profile?.primaryColor}
                source={{ uri: `${BASE_FILE_URL}/${item.img}` }}
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
        {categories.find(v => v.id === category) != null &&
          categories.find(v => v.id === category)?.name !== 'Gallery' && (
            <>
              <Card style={[styles.card, styles.cardRight]}>
                {selectedMenu == null && (
                  <Text style={styles.title}>Select Menu</Text>
                )}
                {selectedMenu && (
                  <>
                    <Image
                      source={{ uri: `${BASE_FILE_URL}/${selectedMenu.img}` }}
                      resizeMode="cover"
                      style={styles.image}
                    />

                    <Text style={styles.title}>{selectedMenu.name}</Text>
                    <Text style={styles.desc}>{selectedMenu.description}</Text>
                    {categories.find(v => v.id === category) != null &&
                      categories.find(v => v.id === category)?.name !==
                        'Featured Menu' && (
                        <>
                          <Text style={styles.price}>
                            IDR.{' '}
                            {formatNumber(
                              selectedMenu == null ? 0 : selectedMenu.price,
                            )}
                            ,-
                          </Text>
                        </>
                      )}
                    <Text style={styles.desc}>{extention?.contact}</Text>
                  </>
                )}  
              </Card>
            </>
          )}
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
