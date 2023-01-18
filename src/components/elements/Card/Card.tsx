import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { normalize } from '../../../utils/scaling';

interface Props {
  style?: StyleProp<ViewStyle> | undefined;
}

const Card: React.FC<Props> = ({ children, style }) => {
  return (
    <View style={StyleSheet.compose<ViewStyle>(styles.card, style)}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2F2F2FC9',
    borderRadius: normalize(30),
  },
});

export default Card;
