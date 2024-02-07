
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {  AddmusicAction, UpdatemusicAction, addMusicRequest, addMusicSuccess ,deleteMusicRequest,deleteMusicSuccess,fetchMusicRequest, fetchMusicSuccess, updateMusicRequest, updateMusicSuccess} from '../reducers/musicSlice';
import { Music, NewMusic } from '../types/musicTypes';
import { toast } from 'sonner';
export const apiUrl = process.env.NODE_ENV === 'production'? 'https://mymusic-7qoy.onrender.com':'http://localhost:3000';
console.log('process.env.NODE_ENV ')
console.log(process.env.NODE_ENV )
const createMusicApi = async (music: NewMusic): Promise<AxiosResponse<Music>> => {
  try {
    const response = await axios.post(`${apiUrl}/api/music`, music);
    return response.data;
  } catch (error) {
    throw new Error(
      (error as AxiosError<{ message?: string }>)?.response?.data?.message || 'Error creating music'
    );
  }
};

const fetchMusicsApi = async (): Promise<AxiosResponse<Music>> => {
    try {
      const response = await axios.get(`${apiUrl}/api/music`);
      return response.data;
    } catch (error) {
      throw new Error(
        (error as AxiosError<{ message?: string }>)?.response?.data?.message || 'Error creating music'
      );
    }
  };
  const updateMusicApi = async (music: Music): Promise<AxiosResponse<Music>> => {
    try {
      const response = await axios.put(`${apiUrl}/api/music/${music._id}`, music);
      return response.data;
    } catch (error) {
      throw new Error(
        (error as AxiosError<{ message?: string }>)?.response?.data?.message || 'Error creating music'
      );
    }
  };
  
const deleteMusicApi = async(musicId: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/music/${musicId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      (error as AxiosError<{ message?: string }>)?.response?.data?.message || 'Error creating music'
    );
  }
};
function* addMusic(action: { type: string; payload: AddmusicAction }): Generator {
  try {
    const {music,setOpen} = action.payload;
    const response = yield call(createMusicApi, music);
    const savedMusic = response as Music;
    setOpen(false);
    toast.success('Music added successfully')

    yield put(addMusicSuccess(savedMusic));
  } catch (error: unknown) {
    console.error('Error saving music:', error);
    // Handle error
  }
}


function* updateMusic(action: { type: string; payload: UpdatemusicAction }): Generator {
  try {
    const {music,setOpen} = action.payload;
    const response = yield call(updateMusicApi, music);
    const savedMusic = response as Music;
    setOpen(false);
    toast.success('Music updated successfully')

    yield put(updateMusicSuccess(savedMusic));
  } catch (error: unknown) {
    console.error('Error saving music:', error);
    // Handle error
  }
}
function* fetchMusics(): Generator {
    try {
      const response = yield call(fetchMusicsApi);
      const savedMusic = response as Music[];
      yield put(fetchMusicSuccess(savedMusic));
    } catch (error: unknown) {
      console.error('Error saving music:',  );
      // Handle error
    }
  }


function* deleteMusic(action: { type: string; payload: string }): Generator {
    try {
      yield call(deleteMusicApi, action.payload);
      yield put(deleteMusicSuccess(action.payload));
    } catch (error: unknown) {
      console.error('Error deleting music:', error);
      // Handle error
    }
  }
  
  function* musicSaga(): Generator {
    yield takeLatest(addMusicRequest.type, addMusic);
    yield takeLatest(updateMusicRequest.type, updateMusic);
    yield takeEvery(fetchMusicRequest.type, fetchMusics);
    yield takeEvery(deleteMusicRequest.type, deleteMusic);
  }
  
  export default musicSaga;