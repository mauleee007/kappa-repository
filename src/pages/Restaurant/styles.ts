import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/scaling';

export const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    marginTop: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    fontSize: 12,
    paddingVertical: 8,
  },
  card: {
    padding: 16,
    marginLeft: 6,
    marginRight: 6,
  },
  cardMiddle: {
    flex: 3,
    marginRight: 0,
    flexWrap: 'wrap',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardRight: {
    backgroundColor: '#ffffffD5',
    marginLeft: 0,
    flex: 2,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  desc: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Outfit-Regular',
    marginTop: 12,
    textAlign: 'center',
    opacity: 0.8,
  },
  image: {
    height: 120,
    width: '70%',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 8,
  },
  listColWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  item2: {
    flex: 0.33,
    margin: normalize(20),
    height: 150,
    marginVertical: 'auto',
  },
  item: {
    height: 150,
    width: 180
  },
  menu: {
    marginLeft: 6,
    marginRight: 6,
    overflow: 'hidden',
  },
  menuList: {
    padding: 6,
    width: '100%',
  },
  price: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Outfit-Medium',
    marginTop: 12,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 0.2,
  },
  root: {
    paddingLeft: 6,
    paddingRight: 6,
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Outfit-Medium',
    marginTop: 8,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 0.2,
  },
  modal: {
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 16,
  },
  modalBody: {
    width: '50%',
    height: 'auto',
    backgroundColor: '#000000dd',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    elevation: 4,
    padding: 16,
    borderRadius: 16,
  },
});
