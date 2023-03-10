import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/scaling';

export const styles = StyleSheet.create({
  city: {
    color: '#000',
    fontFamily: 'Outfit-Regular',
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 60,
    width: 80,
    height: 80,
    zIndex: 3,
  },
  enter: {
    width: 200,
    zIndex: 3,
  },
  anim: {
    position: 'absolute',
    bottom: 28,
    left: 130,
    width: 70,
    height: 70,
    zIndex: 2,
  },
  footerFont: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: normalize(40),
    padding: 10,
    textAlign: 'right',
    marginRight: 20,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  hotelContainer: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: 120,
    paddingVertical: 0,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(114, 114, 114, 1)',
    width: normalize(694),
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  hotelName: {
    color: '#000',
    fontFamily: 'Outfit-Light',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: -10,
    fontSize: normalize(65),
    lineHeight: normalize(89),
  },
  logo: {
    height: normalize(200),
    width: normalize(300),
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginEnd: 20,
  },
  video: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 0,
  },
});
