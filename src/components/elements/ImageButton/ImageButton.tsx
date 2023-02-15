import React, { useCallback, useState } from 'react';
import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { normalize } from '../../../utils/scaling';

interface Props {
  color?: string;
  preferredFocus?: boolean;
  resizeMode?: ImageResizeMode;
  source: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  onFocus?: () => void;
  onPress?: () => void;
}

const ImageButton = React.forwardRef<View, Props>(({
  color,
  preferredFocus,
  resizeMode,
  source,
  style,
  onFocus,
  onPress,
}, ref) => {
  const [focus, setFocus] = useState(false);

  const handlePress = useCallback(() => {
    if (typeof onPress === 'function') {
      onPress();
    }
  }, [onPress]);

  const handleFocus = useCallback(() => {
    setFocus(true);
    if (typeof onFocus === 'function') {
      onFocus();
    }
  }, [onFocus]);

  const activeColor = color == null ? '#2D72D2' : color;

  return (
    <Pressable
      ref={ref}
      hasTVPreferredFocus={preferredFocus}
      onPress={handlePress}
      onFocus={handleFocus}
      onBlur={() => setFocus(false)}
      style={StyleSheet.compose<ViewStyle>(
        { ...styles.container, borderColor: focus ? activeColor : '#ffffff00' },
        style,
      )}
    >
      <Image
        source={source}
        style={styles.image}
        resizeMode={resizeMode == null ? 'cover' : resizeMode}
      />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    overflow: 'hidden',
    borderRadius: normalize(30),
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ImageButton;
