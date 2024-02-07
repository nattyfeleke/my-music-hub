export interface Stat {
    totalSongs: number;
    totalAlbums: number;
    totalArtists: number;
    totalGenres: number;
  }
  export interface ArtistStat {
    name: string;
    songsCount: number;
    albumsCount: number;
  }
  export interface AlbumStat {
    name: string;
    songsCount: number;
  }
  export interface GenreStat {
    labels: string[];
    data: number[];
  }
  export interface DashboardState {
      stat: Stat
      artists:ArtistStat[]
      albums:AlbumStat[]
      genre:GenreStat
      status: 'idle' | 'loading' | 'succeeded' | 'failed';
      task:string[]
    }

