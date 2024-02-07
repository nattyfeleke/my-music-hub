import { Request, Response } from "express"
import Music from "../models/Music"

  export const getDashboardStat = async (req: Request, res: Response) => {
    try {

      const [totalArtists , totalSongs ,totalGenres ,totalAlbums ] = await Promise.all([
        (await Music.distinct('artist')).length,
        Music.countDocuments(),
        (await Music.distinct('genre')).length,
        (await Music.distinct('album')).length
        
       ])
      res.json({stat:{totalArtists,totalAlbums,totalGenres,totalSongs}});
    } catch (error) {
      console.log( error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  export const getReports = async (req: Request, res: Response) => {
    try {
const [artistsStat,albumsStat,genreStat]= await Promise.all([Music.aggregate([
  {
      $match: {
          album: { $exists: true, $ne: '' } // Exclude documents where album is not present or is an empty string
      }
  },
  {
      $group: {
          _id: '$artist',
          songsCount: { $sum: 1 },
          albumsCount: { $addToSet: '$album' }
      }
  },
  {
      $project: {
          _id: 0,
          name:'$_id',
          songsCount: 1,
          albumsCount: { $size: '$albumsCount' } // Count the number of unique albums
      }
  }
]),
Music.aggregate([
  {
    $group: {
      _id: '$album',
      songsCount: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0, // Exclude the _id field
      name: '$_id',
      songsCount: 1,
    },
  },
]),
Music.aggregate([
  {
    $group: {
      _id: '$genre',
      numberOfSongs: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0, // Exclude the _id field
      genre: '$_id',
      numberOfSongs: 1,
    },
  },
])

]);

const labels = genreStat.map((item) => item.genre);
    const data = genreStat.map((item) => item.numberOfSongs);
       
      res.json({
        artists:artistsStat,
        albums:albumsStat,
        genre:{
          labels,data
        }
      });
    } catch (error) {
      console.log( error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

 


export default {getDashboardStat,getReports};
