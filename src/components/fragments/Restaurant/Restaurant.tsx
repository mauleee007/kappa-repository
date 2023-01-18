import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { FlatList, ImageSourcePropType, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../../../App';
import { BASE_FILE_URL } from '../../../services/utils';
import { RootState } from '../../../stores';
import { normalize } from '../../../utils/scaling';
import Card from '../../elements/Card';
import ImageItem from '../RoomTypes/ImageItem';
import img1 from '../../../assets/EpicurentNest/InVillaDining.jpg';
import img2 from '../../../assets/EpicurentNest/Kelapa.jpg';
import img3 from '../../../assets/EpicurentNest/Kepuh.jpg';
import img4 from '../../../assets/EpicurentNest/Kokokan.jpg';
import img5 from '../../../assets/EpicurentNest/BaleGourmet.jpg';
import img6 from '../../../assets/EpicurentNest/Lianas.jpg';

type HotelGuideNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'HotelGuide'
>;

const dataDummy: { id: number; name: string; text: string; img: string }[] = [
  {
    id: 1,
    name: 'In Villa Dining',
    text: 'In Villa Dining',
    img: img1,
  },
  {
    id: 2,
    name: 'Kelapa',
    text: 'Kelapa',
    img: img2,
  },
  {
    id: 3,
    name: 'Kepuh',
    text: 'Kepuh',
    img: img3,
  },
  {
    id: 4,
    name: 'Kokoan',
    text: 'Kokoan',
    img: img4,
  },
  {
    id: 5,
    name: 'Bale Gourmet',
    text: 'Bale Gourmet',
    img: img5,
  },
  {
    id: 6,
    name: 'Lianas',
    text: 'Lianas',
    img: img6,
  },
];

interface Props {
  categories: FoodCategory[];
}

const Restaurant: React.FC<Props> = ({ categories }) => {
  const navigation = useNavigation<HotelGuideNavigationProps>();
  const { profile } = useSelector((s: RootState) => s.hotel);

  const data: FoodCategory[] = useMemo(() => {
    return [
      ...categories.map(v => ({
        ...v,
        img: { uri: `${BASE_FILE_URL}/${v.img}` },
      })),
    ];
  }, [categories]);

  return (
    <>
      <Card style={styles.card}>
        <FlatList
          data={dataDummy}
          numColumns={3}
          columnWrapperStyle={styles.listColWrapper}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ImageItem
              activeColor={profile?.primaryColor}
              key={item.id}
              source={item.img as ImageSourcePropType}
              style={styles.item}
              onPress={() => {
                navigation.navigate('Restaurant', { category: item.id });
              }}
            />
          )}
        />
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    marginLeft: 3,
    marginRight: 3,
  },
  item: {
    flex: 0.33,
    margin: normalize(20),
    height: 130,
    marginVertical: 'auto',
  },
  listColWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});

// const styles = StyleSheet.create({
//   card: {
//     flex: 1,
//     marginLeft: 3,
//     marginRight: 3,
//     overflow: 'hidden',
//   },
//   list: {
//     display: 'flex',
//     flex: 1,
//     padding: 10,
//     height: 500,
//   },
//   item: {
//     flex: 1,
//     marginHorizontal: 6,
//     width: 150,
//     height: '100%',
//   },
// });

export default Restaurant;
