import React, { useCallback, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface Props {
  children?: React.ReactNode | undefined;
  focusable?: boolean;
  preferredFocus?: boolean;
  style?: StyleProp<ViewStyle>;
  onFocus?: () => void;
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SelectableCard: React.FC<Props> = ({
  children,
  focusable,
  onFocus,
  onPress,
  preferredFocus,
  style,
}) => {
  const anim = useRef(new Animated.Value(1)).current;

  const handleBlur = useCallback(() => {
    Animated.timing(anim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 100,
    }).start();
  }, [anim]);

  const handleFocus = useCallback(() => {
    Animated.timing(anim, {
      toValue: 1.2,
      useNativeDriver: true,
      duration: 100,
    }).start();

    if (typeof onFocus === 'function') {
      onFocus();
    }
  }, [anim, onFocus]);

  return (
    <AnimatedPressable
      focusable={focusable}
      hasTVPreferredFocus={preferredFocus}
      onPress={onPress}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[styles.card, style, { transform: [{ scale: anim }] }]}
    >
      {children}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 32,
    padding: 16,
    height: '100%',
    width: '100%',
  },
});

export default SelectableCard;
