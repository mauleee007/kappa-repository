import { format } from 'date-fns';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { BASE_FILE_URL } from '../../../services/utils';
import { RootState } from '../../../stores';
import { normalize } from '../../../utils/scaling';
import useInterval from '../../hooks/useInterval';

interface Props {
  hideGuest?: boolean;
  profile?: HotelProfile;
}

const Header: React.FC<Props> = ({ hideGuest, profile }) => {
  const [now, setNow] = useState(new Date());

  const { room } = useSelector((s: RootState) => s.hotel);

  useInterval(() => {
    setNow(new Date());
  }, 1000);

  const alignItems = hideGuest ? 'flex-end' : 'center';

  return (
    <LinearGradient colors={['#000000CC', '#00000000']}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.timeContainer}>
            <Text style={{ ...styles.text, ...styles.hour }}>
              {format(now, 'h')}.
            </Text>

            <View style={styles.time}>
              <Text style={{ ...styles.text, marginBottom: normalize(10) }}>
                {format(now, 'eee, d MMM yyyy')}
              </Text>
              <Text style={styles.text}>{format(now, '.mm aa')}</Text>
            </View>
          </View>
        </View>

        <View style={{ ...styles.wrapper, alignItems }}>
          {profile != null && (
            <Image
              source={{ uri: `${BASE_FILE_URL}/${profile.logoColor}` }}
              resizeMode="contain"
              style={styles.logo}
            />
          )}
        </View>

        {!hideGuest && (
          <View style={styles.wrapper}>
            <View style={styles.welcomeContainer}>
              <Text style={{ ...styles.text, ...styles.welcome }}>welcome</Text>
              <View style={styles.borderVertical} />
              <View>
                <Text style={{ ...styles.text }}>{room.guestName}</Text>
                <Text style={{ ...styles.text }}>Room {room.no}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  border: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  borderVertical: {
    height: '50%',
    borderLeftColor: '#fff',
    borderLeftWidth: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '50%',
    paddingTop: normalize(16),
    paddingBottom: normalize(16),
    paddingLeft: normalize(32),
    paddingRight: normalize(32),
  },
  hour: {
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: normalize(20),
  },
  logo: {
    height: normalize(160),
    width: normalize(300),
  },
  right: {
    position: 'absolute',
    right: 0,
    top: 12,
  },
  text: {
    color: '#fff',
    fontFamily: 'Outfit-Regular',
  },
  time: {
    marginLeft: normalize(16),
    marginTop: normalize(24),
  },
  timeContainer: {
    alignItems: 'center',
    height: '80%',
    flexDirection: 'row',
    paddingLeft: normalize(32),
  },
  welcome: {
    fontSize: 24,
  },
  welcomeContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: '80%',
    justifyContent: 'flex-end',
    paddingRight: normalize(32),
  },
  wrapper: {
    width: '30%',
  },
});

export default Header;
