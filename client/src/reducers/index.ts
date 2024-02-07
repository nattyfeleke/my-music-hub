// src/reducers/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import musicSlice from './musicSlice';
import dashboardSlice from './dashboardSlice';

const rootReducer = combineReducers({
  music: musicSlice,
  dashboard:dashboardSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
