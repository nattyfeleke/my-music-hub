// src/types/musicTypes.ts
export interface Music {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
  }
  export interface NewMusic extends Omit<Music, '_id'> {}

  
  export interface DeleteMusicAction {
    type: string;
    payload: string; // Music ID
  }
  export interface MusicState {
    musics: Music[];
    genres: string[];
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