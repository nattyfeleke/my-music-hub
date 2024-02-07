// src/sagas/index.ts
import { all } from 'redux-saga/effects';
import musicSaga from './musicSaga';
import dashboardSaga from './dashboardSaga';

function* rootSaga() {
  yield all([musicSaga(),dashboardSaga()]);
}

export default rootSaga;
