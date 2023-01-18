import { StyleSheet } from 'react-native';
import { normalize } from '../../../utils/scaling';

export const styles = StyleSheet.create({
  children: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    zIndex: 10,
  },
  container: {
    flex: 1,
  },
  fullscreen: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
  },
  imageBg: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    zIndex: 0,
  },
  footer: {
    bottom: 0,
    display: 'flex',
    height: '50%',
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
  header: {
    height: '70%',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  wrapper: {
    marginTop: normalize(72),
    height: '70%',
    width: '100%',
  },
});
