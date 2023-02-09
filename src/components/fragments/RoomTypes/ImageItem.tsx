import React from 'react';
import {
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import ImageButton from '../../elements/ImageButton';

interface Props {
  activeColor?: string;
  imgStyle?: StyleProp<ViewStyle>;
  source: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  text?: string;
  preferredFocus?: boolean;
  onFocus?: () => void;
  onPress?: () => void;
}

const ImageItem: React.FC<Props> = ({
  activeColor,
  imgStyle,
  source,
  style,
  text,
  preferredFocus,
  onFocus,
  onPress,
}) => {
  return (
    <View style={StyleSheet.compose<ViewStyle>(styles.root, style)}>
      <ImageButton
        preferredFocus={preferredFocus}
        color={activeColor}
        source={source}
        style={[styles.image, imgStyle]}
        onFocus={onFocus}
        onPress={onPress}
      />
      {text != null && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    height: 120,
    width: '48%',
    margin: '1%',
    marginBottom: 32,
  },
  image: {
    flex: 1,
    width: '100%',
  },
  text: {
    fontFamily: 'Outfit-Regular',
    color: '#fff',
    fontSize: 15,
    padding: 10,
    width: '100%',
    textAlign: 'center',
  },
});

export default ImageItem;
