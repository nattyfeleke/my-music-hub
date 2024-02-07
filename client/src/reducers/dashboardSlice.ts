// src/reducers/dashboardSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { DashboardState } from '../types/dashboardTypes';


const initialState: DashboardState = {
    stat: {
        totalAlbums: 0, 
        totalArtists: 0, 
        totalGenres: 0, 
        totalSongs: 0
    },
    artists:[],
    albums:[],
    genre:{
      labels:[],
      data:[]
    },
  status:'idle',
  task:[]
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getDashboardInfoRequest:(state)=>{
        state.status= 'loading'
        state.task.push('stat')
    },
    getDashboardInfoSuccess:(state,action)=>{
        state.stat= action.payload.stat;
        state.status= 'idle'
        state.task= state.task.filter(task=>task!=='stat')
    },
    getDashboardReportRequest:(state)=>{
      state.status= 'loading'
      state.task.push('report')
  },
  getDashboardReportSuccess:(state,action)=>{
     const {artists,albums,genre}= action.payload;
     state.artists= artists;
     state.albums= albums;
     state.genre= genre;
      state.status= 'idle'
      state.task= state.task.filter(task=>task!=='report')
  },
   
  },
});

export const {getDashboardInfoRequest,getDashboardInfoSuccess,getDashboardReportRequest,getDashboardReportSuccess} = dashboardSlice.actions;


export default dashboardSlice.reducer;
