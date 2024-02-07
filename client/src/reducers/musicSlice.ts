// src/reducers/musicSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Music, NewMusic } from '../types/musicTypes';

interface MusicState {
  musics: Music[];
  status: 'loading'|'idle'|'failed';
}
export interface AddmusicAction {
    music:NewMusic
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}
export interface UpdatemusicAction {
  music:Music
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
}
const initialState: MusicState = {
  musics: [],
  status:'idle'
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    fetchMusicRequest:(state)=>{
        state.status= 'loading'
    },
    fetchMusicSuccess:(state,action)=>{
        state.musics= action.payload;
        state.status= 'idle'
    },
    addMusicRequest: (state,action: PayloadAction<AddmusicAction>) => {
     state.status='loading'
    },
    addMusicSuccess: (state, action: PayloadAction<Music>) => {
        state.musics.push(action.payload);
        state.status='idle';
      },
      updateMusicRequest: (state,action: PayloadAction<AddmusicAction>) => {
        state.status='loading'
       },
       updateMusicSuccess: (state, action: PayloadAction<Music>) => {
           state.musics= state.musics.map(music =>{
            if(music._id === action.payload._id) return action.payload;
          return music; 
           })
           state.status='idle';
         },
         deleteMusicRequest: (state,action: PayloadAction<string>) => {
          state.status='loading'
         },
    deleteMusicSuccess: (state, action: PayloadAction<string>) => {
      state.status='idle'
      state.musics = state.musics.filter((music) => music._id !== action.payload);
    },
  },
});

export const { addMusicRequest, addMusicSuccess,deleteMusicRequest, deleteMusicSuccess,fetchMusicRequest,fetchMusicSuccess,updateMusicRequest,updateMusicSuccess} = musicSlice.actions;



export default musicSlice.reducer;
