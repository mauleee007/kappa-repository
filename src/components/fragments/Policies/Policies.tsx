import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import Card from '../../elements/Card';
import TextMenuItem from '../../elements/TextMenuItem';

interface Props {
  policies: Policy[];
}

interface CardProps {
  active: boolean;
  color?: string;
  item: Policy;
  onFocus: (item: Policy) => void;
}

const CustomCard: React.FC<CardProps> = ({ active, item, onFocus }) => {
  const backgroundColor = active ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)';

  return (
    <View style={styles.item}>
      <TextMenuItem
        title={item.name}
        style={[styles.itemPressable, { backgroundColor }]}
        styleText={styles.itemText}
        onFocus={() => onFocus(item)}
      />
    </View>
  );
};

const Facilities: React.FC<Props> = ({ policies }) => {
  const [policy, setPolicy] = useState(policies[0]);

  const { profile } = useSelector((s: RootState) => s.hotel);

  return (
    <>
      <Card style={styles.card}>
        <View style={styles.cardMiddle}>
          <FlatList
            data={policies}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <CustomCard
                active={item.id === policy.id}
                color={profile?.primaryColor}
                item={item}
                key={item.id}
                onFocus={i => setPolicy(i)}
              />
            )}
          />
        </View>

        <View style={styles.cardRight}>
          <View style={styles.background} />
          <Text style={styles.title}>{policy.name}</Text>
          <Text style={styles.desc}>{policy.description}</Text>
        </View>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 3,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 3,
    marginRight: 3,
    padding: 0,
  },
  cardMiddle: {
    flex: 3,
    display: 'flex',
    padding: 3,
  },
  cardRight: {
    flex: 2,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.9,
  },
  item: {
    margin: 10,
    flex: 1,
  },
  itemPressable: {
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    borderBottomWidth: 0,
  },
  itemText: {
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'Outfit-Bold',
    marginTop: 8,
    textAlign: 'center',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 0.2,
  },
  desc: {
    color: '#000',
    fontFamily: 'Outfit-Regular',
    textAlign: 'justify',
    marginTop: 32,
  },
});

export default Facilities;
