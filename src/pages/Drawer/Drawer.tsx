import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppList from '../../components/fragments/AppList';
import BaseLayout from '../../components/fragments/BaseLayout';
import { AppDispatch, RootState } from '../../stores';
import { getHotels } from '../../stores/hotel';
import { getTVChannels } from '../../stores/tv';
import { styles } from './styles';

const Drawer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((s: RootState) => s.hotel);

  useEffect(() => {
    dispatch(getHotels());
    dispatch(getTVChannels());
  }, [dispatch]);

  return (
    <BaseLayout profile={profile} style={styles.apps}>
      <AppList profile={profile} />
    </BaseLayout>
  );
};

export default Drawer;
