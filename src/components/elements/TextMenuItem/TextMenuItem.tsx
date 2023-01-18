import React, { useCallback, useState } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { normalize } from '../../../utils/scaling';

interface Props {
  active?: boolean;
  activeColor?: string;
  preferredFocus?: boolean;
  bgColor?: string;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  title: string;
  onFocus?: () => void;
  onPress?: () => void;
}

const TextMenuItem: React.FC<Props> = ({
  preferredFocus,
  style,
  styleText,
  title,
  onFocus,
  onPress,
}) => {
  const [focus, setFocus] = useState(preferredFocus);
  const backgroundColor = focus ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)';

  const handleFocus = useCallback(() => {
    setFocus(true);
    if (typeof onFocus === 'function') {
      onFocus();
    }
  }, [onFocus]);

  return (
    <Pressable
      hasTVPreferredFocus={preferredFocus}
      style={[styles.root, { backgroundColor }, style]}
      onFocus={handleFocus}
      onBlur={() => setFocus(false)}
      onPress={onPress}
    >
      <Text style={[styles.text, styleText]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 8,
    marginBottom: 8,
    borderRadius: normalize(30),
  },
  text: {
    color: '#fff',
    fontFamily: 'Outfit-SemiBold',
    textAlign: 'center',
  },
});

export default TextMenuItem;
