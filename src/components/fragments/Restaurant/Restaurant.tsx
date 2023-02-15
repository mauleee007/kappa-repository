import { useNavigation, useNavigationState } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useLayoutEffect, useRef, useState } from 'react';
import { findNodeHandle, FlatList, ImageSourcePropType, NativeModules, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../../../App';
import { BASE_FILE_URL } from '../../../services/utils';
import { RootState } from '../../../stores';
import { normalize } from '../../../utils/scaling';
import Card from '../../elements/Card';
import ImageItem from '../RoomTypes/ImageItem';

type HotelGuideNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'HotelGuide'
>;

interface Props {
  categories: FoodCategory[];
}

const Restaurant: React.FC<Props> = ({ categories }) => {
  const [gotoDetail, setGotoDetail] = useState(false);

  const navigation = useNavigation<HotelGuideNavigationProps>();
  const { profile } = useSelector((s: RootState) => s.hotel);
  const navState = useNavigationState(state => state);
  const itemRef = useRef<View>(null);

  const data: FoodCategory[] = useMemo(() => {
    return [
      ...categories.map(v => ({
        ...v,
        img: { uri: `${BASE_FILE_URL}/${v.img}` },
      })),
    ];
  }, [categories]);

  useLayoutEffect(() => {
    if (navState.index === 2) {
      setGotoDetail(true);
      return;
    }

    if (navState.index === 1 && gotoDetail) {
      if (itemRef.current != null) {
        const tag = findNodeHandle(itemRef.current);
        NativeModules.UIManager.updateView(tag, 'RCTView', { hasTVPreferredFocus: true });
      }
      setGotoDetail(false);
      return;
    }
  }, [navState]);

  return (
    <>
      <Card style={styles.card}>
        <FlatList
          data={data}
          numColumns={3}
          columnWrapperStyle={styles.listColWrapper}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => (
            <ImageItem
              ref={index === 0 ? itemRef : undefined}
              activeColor={profile?.primaryColor}
              key={item.id}
              source={item.img as ImageSourcePropType}
              style={styles.item}
              onPress={() => {
                navigation.navigate('Restaurant', {
                  categoryId: item.id,
                  hotelId: item.hotelId,
                });
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
    height: 140,
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
