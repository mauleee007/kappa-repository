import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/elements/Card';
import TextMenuItem from '../../components/elements/TextMenuItem';
import AroundUs from '../../components/fragments/AroundUs';
import BaseLayout from '../../components/fragments/BaseLayout';
import CCTVCard from '../../components/fragments/CCTVCard';
import Events from '../../components/fragments/Events';
import Facilities from '../../components/fragments/Facilities';
import HotelProfile from '../../components/fragments/HotelProfile';
import Policies from '../../components/fragments/Policies';
import Promos from '../../components/fragments/Promos';
import Restaurant from '../../components/fragments/Restaurant';
import Room from '../../components/fragments/Room';
import RoomTypes from '../../components/fragments/RoomTypes';
import ApiServices from '../../services/apis';
import HotelService from '../../services/hotels';
import { AppDispatch, RootState } from '../../stores';
import { getHotels } from '../../stores/hotel';
import { setToast } from '../../stores/ui';
import { styles } from './styles';

const HotelGuide: React.FC = () => {
  const [arounds, setArounds] = useState<Around[]>([]);
  const [events, setEvents] = useState<HotelEvent[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(0);
  const [menu, setMenu] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const { hotel, profile, cctvUrl } = useSelector((s: RootState) => s.hotel);

  const renderContent = useCallback(() => {
    switch (menu) {
      case 0:
        return <HotelProfile hotel={hotel} profile={profile} />;
      case 1:
        if (rooms.length > 0) {
          return <RoomTypes rooms={rooms} />;
        }
        break;
      case 2:
        if (facilities.length > 0) {
          return <Facilities facilities={facilities} />;
        }
        break;
      case 3:
        if (foodCategories.length > 0) {
          return <Restaurant categories={foodCategories} />;
        }
        break;
      case 4:
        if (promos.length > 0) {
          return <Promos promos={promos} />;
        }
        break;
      case 5:
        if (events.length > 0) {
          return <Events events={events} />;
        }
        break;
      case 6:
        if (policies.length > 0) {
          return <Policies policies={policies} />;
        }
        break;
      case 7:
        return <CCTVCard />;
      case 8:
        if (arounds.length > 0) {
          return <AroundUs arounds={arounds} />;
        }
        break;
    }

    if (loading > 0) {
      return (
        <Card style={{ ...styles.card, ...styles.flex5 }}>
          <Text style={styles.text}>Please Wait..</Text>
        </Card>
      );
    }

    if (menu >= 100) {
      return <Room room={rooms[menu - 100]} />;
    }

    return (
      <Card style={{ ...styles.card, ...styles.flex5 }}>
        <Text style={styles.text}>Coming soon!</Text>
      </Card>
    );
  }, [
    arounds,
    events,
    facilities,
    foodCategories,
    hotel,
    loading,
    menu,
    policies,
    profile,
    promos,
    rooms,
  ]);

  useEffect(() => {
    let isMounted = true;

    const getHotelInfo = async () => {
      if (hotel == null) {
        return;
      }

      setLoading(l => l + 1);
      try {
        const resFoodCategory = await ApiServices.getRestaurant(hotel.id);
        if (resFoodCategory.status === 200) {
          console.log(resFoodCategory);

          if (isMounted) {
            setFoodCategories(resFoodCategory.data.data);
          }
        } else {
          dispatch(setToast({ message: 'Cannot get hotel food categories' }));
        }

        if (!isMounted) {
          return;
        }
        const resRoom = await HotelService.getRooms(hotel.id);
        if (resRoom.status === 200) {
          if (isMounted) {
            setRooms(resRoom.data.data);
          }
        } else {
          dispatch(setToast({ message: 'Cannot get hotel rooms' }));
        }

        if (!isMounted) {
          return;
        }

        const resPolicies = await HotelService.getPolicies();
        if (resPolicies.status === 200) {
          if (isMounted) {
            setPolicies(resPolicies.data.data);
          }
        } else {
          dispatch(setToast({ message: 'Cannot get hotel policies' }));
        }
      } catch (err) {
        console.log(err);
        dispatch(setToast({ message: 'Cannot get information' }));
      }
      setLoading(l => l - 1);
    };

    const getFacilities = async () => {
      setLoading(l => l + 1);
      try {
        const resFacility = await HotelService.getFacilities();
        if (resFacility.status === 200) {
          if (isMounted) {
            setFacilities(resFacility.data.data);
          }
        } else {
          dispatch(setToast({ message: 'Cannot get hotel facilities' }));
        }

        if (!isMounted) {
          return;
        }

        const resArounds = await HotelService.getArounds();
        if (resArounds.status === 200) {
          if (isMounted) {
            setArounds(resArounds.data.data);
          }
        } else {
          dispatch(setToast({ message: 'Cannot get hotel facilities' }));
        }
      } catch {
        dispatch(setToast({ message: 'Cannot get hotel facilities' }));
      }
      setLoading(l => l - 1);
    };

    const getPromotionals = async () => {
      setLoading(l => l + 1);
      try {
        const resPromos = await HotelService.getPromos();
        if (resPromos.status === 200) {
          if (isMounted) {
            setPromos(resPromos.data.data);
          }
        } else {
          dispatch(setToast({ message: 'Cannot get hotel promotions' }));
        }

        if (!isMounted) {
          return;
        }

        const resEvents = await HotelService.getEvents();
        if (resEvents.status === 200) {
          if (isMounted) {
            setEvents(resEvents.data.data);
          }
        } else {
          dispatch(setToast({ message: 'Cannot get hotel policies' }));
        }
      } catch {
        dispatch(setToast({ message: 'Cannot get hotel facilities' }));
      }
      setLoading(l => l - 1);
    };

    getHotelInfo();
    getFacilities();
    getPromotionals();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch]);

  return (
    <BaseLayout
      customBg={{ uri: 'file:///storage/emulated/0/tv/guide-bg.jpg' }}
      profile={profile}
      style={styles.root}
    >
      <View style={styles.container}>
        <Card style={{ ...styles.card, ...styles.sidebar }}>
          <ScrollView>
            <TextMenuItem
              preferredFocus
              active={menu === 0}
              activeColor={profile?.primaryColor}
              title="Resort Profile"
              onFocus={() => setMenu(0)}
            />

            {rooms.map((room, i) => (
              <TextMenuItem
                key={room.id}
                active={menu === i + 100}
                activeColor={profile?.primaryColor}
                title={room.name}
                onFocus={() => setMenu(i + 100)}
              />
            ))}
            <TextMenuItem
              active={menu === 2}
              activeColor={profile?.primaryColor}
              title="Facilities"
              onFocus={() => setMenu(2)}
            />
            <TextMenuItem
              active={menu === 3}
              activeColor={profile?.primaryColor}
              title="Epicurean Nests"
              onFocus={() => setMenu(3)}
            />
            <TextMenuItem
              activeColor={profile?.primaryColor}
              title="Promo"
              onFocus={() => setMenu(4)}
            />
            <TextMenuItem
              active={menu === 5}
              activeColor={profile?.primaryColor}
              title="Event"
              onFocus={() => setMenu(5)}
            />
            <TextMenuItem
              active={menu === 6}
              activeColor={profile?.primaryColor}
              title="Policy"
              onFocus={() => setMenu(6)}
            />
            {cctvUrl !== '' && (
              <TextMenuItem
                active={menu === 7}
                activeColor={profile?.primaryColor}
                title="Traffic CCTV"
                onFocus={() => setMenu(7)}
              />
            )}
          </ScrollView>
        </Card>

        {renderContent()}
      </View>
    </BaseLayout>
  );
};

export default HotelGuide;
