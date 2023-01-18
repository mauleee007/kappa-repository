import React, { useState } from 'react';
import {
  ColorValue,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

interface Props extends ViewProps {
  color?: ColorValue;
  preferredFocus?: boolean;
  style?: ViewStyle;
  title: string;
  onFocus?: () => void;
  onPress?: (event: GestureResponderEvent) => void;
}

const RoundedButton = React.forwardRef<View, Props>(
  ({ color, preferredFocus, style, title, onFocus, onPress }, ref) => {
    const [focus, setFocus] = useState(preferredFocus);

    const borderColor =
      color == null ? styles.prassable.backgroundColor : color;
    const backgroundColor =
      color == null ? styles.prassable.backgroundColor : color;

    let focusStyle: ViewStyle = {};
    if (focus) {
      focusStyle = {
        borderColor: '#fff',
        elevation: 4,
      };
    }

    return (
      <Pressable
        ref={ref}
        hasTVPreferredFocus={preferredFocus}
        onFocus={() => {
          setFocus(true);
          if (typeof onFocus === 'function') {
            onFocus();
          }
        }}
        onBlur={() => setFocus(false)}
        onPress={onPress}
        style={{
          ...styles.prassable,
          backgroundColor,
          borderColor,
          ...focusStyle,
          ...style,
        }}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  prassable: {
    backgroundColor: '#009688',
    borderWidth: 2,
    borderStyle: 'solid',
    paddingVertical: 10,
    paddingHorizontal: 12,
    elevation: 2,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
    color: '#fff',
    alignSelf: 'center',
  },
});

export default RoundedButton;
