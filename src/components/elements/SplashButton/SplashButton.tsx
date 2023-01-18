import React, { useState } from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

const splash1 = require('../../../assets/splash-2.png');
const splash2 = require('../../../assets/splash-3.png');
const splash3 = require('../../../assets/splash-4.png');
const splash4 = require('../../../assets/splash-5.png');

interface Props {
  icon: ImageSourcePropType;
  index: number;
  preferredFocus?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const SplashButton: React.FC<Props> = ({
  icon,
  index,
  preferredFocus,
  style,
  onPress,
}) => {
  const [focus, setFocus] = useState(false);

  const icons: ImageSourcePropType[] = [splash1, splash2, splash3, splash4];

  return (
    <Pressable
      hasTVPreferredFocus={preferredFocus}
      style={style}
      onPress={onPress}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <View style={styles.container}>
        <Image
          source={icons[index % 4]}
          style={{ ...styles.bg, tintColor: focus ? '#000' : undefined }}
          resizeMode="contain"
        />
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    width: 160,
    height: 160,
  },
  icon: {
    resizeMode: 'contain',
    height: 64,
    width: 64,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  container: {
    width: 160,
    height: 160,
  },
});

export default SplashButton;
