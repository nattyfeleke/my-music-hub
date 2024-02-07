// src/types/musicTypes.ts
export interface Music {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
  }
  export interface NewMusic extends Omit<Music, '_id'> {}
  export interface MusicState {
    list: Music[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

  export interface AddMusicAction {
    type: string;
    payload: Music;
  }
  
  export interface UpdateMusicAction {
    type: string;
    payload: Music;
  }
  
  export interface DeleteMusicAction {
    type: string;
    payload: string; // Music ID
  }
  