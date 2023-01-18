import React, { useState } from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
} from 'react-native';
import { normalize } from '../../../utils/scaling';

interface Props {
  image: ImageSourcePropType;
  preferredFocus?: boolean;
  tintColor?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const AppBtn: React.FC<Props> = props => {
  const [focus, setFocus] = useState(false);

  const { image, onBlur, onFocus, onPress, preferredFocus, tintColor } = props;
  const color = tintColor == null ? '#4C90F0' : `${tintColor}CC`;

  return (
    <Pressable
      hasTVPreferredFocus={preferredFocus}
      style={{ ...styles.root, backgroundColor: focus ? color : undefined }}
      onPress={onPress}
      onFocus={() => {
        setFocus(true);
        if (typeof onFocus === 'function') {
          onFocus();
        }
      }}
      onBlur={() => {
        setFocus(false);
        if (typeof onBlur === 'function') {
          onBlur();
        }
      }}
    >
      <Image source={image} style={styles.image} resizeMode="contain" />
    </Pressable>
  );
};

const size = normalize(100);

const styles = StyleSheet.create({
  root: {
    borderRadius: normalize(32),
    padding: normalize(32),
    marginHorizontal: normalize(32),
  },
  image: {
    width: size,
    height: size,
  },
});

export default AppBtn;
