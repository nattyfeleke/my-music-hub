// src/reducers/musicSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddmusicAction, Music, MusicState } from '../types/musicTypes';


const initialState: MusicState = {
  musics: [],
  genres: [],
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
      const {musics,genres}= action.payload;
        state.musics= musics;
        state.genres= genres;
        state.status= 'idle'
    },
    addMusicRequest: (state,_action: PayloadAction<AddmusicAction>) => {
     state.status='loading'
    },
    addMusicSuccess: (state, action: PayloadAction<Music>) => {
        state.musics.push(action.payload);
        state.status='idle';
      },
      updateMusicRequest: (state,_action: PayloadAction<AddmusicAction>) => {
        state.status='loading'
       },
       updateMusicSuccess: (state, action: PayloadAction<Music>) => {
           state.musics= state.musics.map(music =>{
            if(music._id === action.payload._id) return action.payload;
          return music; 
           })
           state.status='idle';
         },
         deleteMusicRequest: (state,_action: PayloadAction<string>) => {
          
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
