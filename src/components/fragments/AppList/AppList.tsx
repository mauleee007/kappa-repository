import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, ToastAndroid, View } from 'react-native';
import { RootStackParamList } from '../../../../App';
import { launchApp } from '../../natives/openApplication';
import AppBtn from './AppBtn';
import { styles } from './styles';

interface Props {
  profile?: HotelProfile;
}

type DrawerNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Drawer'
>;

const AppList: React.FC<Props> = ({ profile }) => {
  const navigation = useNavigation<DrawerNavigationProps>();

  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        <AppBtn
          preferredFocus
          image={require('../../../assets/icons/hotel-guide.png')}
          tintColor={profile == null ? undefined : profile.primaryColor}
          onPress={() => navigation.navigate('HotelGuide')}
        />
        <AppBtn
          image={require('../../../assets/icons/tv.png')}
          tintColor={profile == null ? undefined : profile.primaryColor}
          onPress={async () => {
            try {
              await launchApp('com.infinitv.tv');
            } catch (err) {
              ToastAndroid.show('Cannot open TV', ToastAndroid.SHORT);
            }
          }}
        />
        {APPS.map(a => (
          <AppBtn
            key={a.packageName}
            image={a.icon}
            tintColor={profile == null ? undefined : profile.primaryColor}
            onPress={async () => {
              try {
                await launchApp(a.packageName);
              } catch (err) {
                ToastAndroid.show(
                  `Cannot open ${a.appName}`,
                  ToastAndroid.SHORT,
                );
              }
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export const APPS: App[] = [
  {
    appName: 'Youtube',
    packageName: 'com.google.android.youtube.tv',
    icon: require('../../../assets/icons/youtube.png'),
  },
  {
    appName: 'Youtube Kids',
    packageName: 'com.google.android.youtube.tvkids',
    // packageName: 'com.google.android.apps.youtube.kids',
    icon: require('../../../assets/icons/youtube-kids.png'),
  },
  {
    appName: 'Netflix',
    packageName: 'com.netflix.ninja',
    // packageName: 'com.netflix.mediaclient',
    icon: require('../../../assets/icons/netflix.png'),
  },
  // {
  //   appName: 'Vidio',
  //   packageName: 'com.vidio.android.tv',
  //   // packageName: 'com.vidio.android',
  //   icon: require('../../../assets/icons/vidio.png'),
  // },
  // {
  //   appName: 'Disney+',
  //   packageName: 'in.startv.hotstar.dplus.tv',
  //   // packageName: 'in.startv.hotstar.dplus',
  //   icon: require('../../../assets/icons/disney-plus.png'),
  // },
  {
    appName: 'Prime Video',
    packageName: 'com.amazon.amazonvideo.livingroom',
    icon: require('../../../assets/icons/prime-video.png'),
  },
  {
    appName: 'HBO Go',
    packageName: 'com.hbo.asia.androidtv',
    icon: require('../../../assets/icons/hbo-go.png'),
  },
  {
    appName: 'Spotify',
    packageName: 'com.spotify.tv.android',
    // packageName: 'com.spotify.music',
    icon: require('../../../assets/icons/spotify.png'),
  },
];

export default AppList;
