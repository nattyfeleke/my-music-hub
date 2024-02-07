
import { call, put, takeEvery } from 'redux-saga/effects';
import axios, {  AxiosError } from 'axios';
import { AlbumStat, ArtistStat, GenreStat, Stat } from '../types/dashboardTypes';
import { getDashboardInfoRequest, getDashboardInfoSuccess, getDashboardReportRequest, getDashboardReportSuccess } from '../reducers/dashboardSlice';
import { apiUrl } from './musicSaga';

interface StatRes {
    stat:Stat
}
interface ReportRes {
  albums:AlbumStat
  artists:ArtistStat
  genre: GenreStat
}

const getDashboardStatApi = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/dashboard/stat`);
      return response.data;
    } catch (error) {
      throw new Error(
        (error as AxiosError<{ message?: string }>)?.response?.data?.message || 'Error creating music'
      );
    }
  };
  const getDashboardReportApi = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/dashboard/reports`);
      return response.data;
    } catch (error) {
      throw new Error(
        (error as AxiosError<{ message?: string }>)?.response?.data?.message || 'Error creating music'
      );
    }
  };
function* getDashboardStat(): Generator {
    try {
      const response = yield call(getDashboardStatApi);
      const res = response as StatRes ;
      
      yield put(getDashboardInfoSuccess(res));
    } catch (error: unknown) {
      console.error('Error saving music:',  );
      // Handle error
    }
  }
  function* getDashboardReport(): Generator {
    try {
      const response = yield call(getDashboardReportApi);
      const res = response as ReportRes ;
      
      yield put(getDashboardReportSuccess(res));
    } catch (error: unknown) {
      console.error('Error saving music:',  );
      // Handle error
    }
  }

  function* dashboardSaga(): Generator {
    yield takeEvery(getDashboardInfoRequest.type, getDashboardStat);
    yield takeEvery(getDashboardReportRequest.type, getDashboardReport);
  }
  
  export default dashboardSaga;