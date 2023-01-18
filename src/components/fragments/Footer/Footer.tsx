import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextTicker from 'react-native-text-ticker';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import { styles } from './styles';

const Footer: React.FC = () => {
  const [text, setText] = useState('');

  const { runningText } = useSelector((s: RootState) => s.hotel);

  useEffect(() => {
    const separator = '      •      ';

    let t = runningText + separator + runningText;

    if (t.length < 250) {
      while (t.length > 0 && t.length < 250) {
        t = t + separator + runningText;
      }
    }

    t = t + separator.trimEnd();
    setText(t);
  }, [runningText]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#00000000', '#000000CC']}>
        <View style={styles.wrapper}>
          {runningText.length > 2 && (
            <TextTicker
              useNativeDriver
              selectable={false}
              scroll={false}
              isInteraction={false}
              style={{ ...styles.text, ...styles.runningText }}
              duration={text.length * 80}
              marqueeDelay={0}
              animationType="scroll"
            >
              {text}
            </TextTicker>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default Footer;
