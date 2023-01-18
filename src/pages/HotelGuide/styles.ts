import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/scaling';

export const styles = StyleSheet.create({
  root: {
    paddingLeft: 6,
    paddingRight: 6,
  },
  card: {
    padding: 16,
    marginLeft: 3,
    marginRight: 3,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: normalize(64),
    paddingVertical: normalize(20),
  },
  flex5: {
    flex: 5,
  },
  sidebar: {
    width: '20%',
    marginRight: 20,
  },
  text: {
    color: '#ffffffdd',
    fontFamily: 'Outfit-Medium',
  },
});
