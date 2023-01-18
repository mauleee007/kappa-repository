import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import hotel from './hotel';
import tv from './tv';
import ui from './ui';

export const store = configureStore({
  reducer: {
    hotel,
    tv,
    ui,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
