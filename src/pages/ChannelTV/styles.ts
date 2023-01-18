import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/scaling';

export const styles = StyleSheet.create({
  root: {
    paddingLeft: 6,
    paddingRight: 6,
  },
  card: {
    padding: 16,
    overflow: 'hidden',
  },
  channel: {
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: normalize(64),
  },
  sidebar: {
    width: '24%',
    marginRight: 20,
  },
  text: {
    color: '#fff',
    padding: normalize(32),
    fontFamily: 'Outfit-Medium',
    fontSize: normalize(40),
  },
  video: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  videoContainer: {
    flex: 1,
  },
  channelsContainer: {
    padding: normalize(24),
  },
  channelCard: {
    alignSelf: 'center',
    borderWidth: 2,
    width: normalize(220),
    height: normalize(120),
    margin: normalize(24),
    borderRadius: normalize(24),
  },
  channelText: {
    flexGrow: 1,
    color: '#fff',
    fontFamily: 'Outfit-SemiBold',
    fontSize: normalize(24),
    lineHeight: normalize(24),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  footer: {
    position: 'absolute',
    backgroundColor: '#2F2F2FC9',
    bottom: 0,
    left: 0,
    width: '100%',
    height: normalize(230),
    zIndex: 1,
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 0,
  },
  mini: {
    marginLeft: 6,
    marginRight: 6,
  },
  videoWrapper: {
    padding: 0,
    flex: 1,
  },
});
