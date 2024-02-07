import { Request, Response } from "express"
import Music from "../models/Music"




const addMusic =async (req:Request, res:Response) => {
    const { title,artist,album,genre } = req.body;
    try {

   const   newMusic = new Music({
       title,artist,album,genre
      });
     
      await newMusic.save();
    
      res.json(newMusic);
    } catch (err) {
      console.log(err)
      res.status(500).send("Server Error")
    }
  }

export const updateMusic = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {  title,artist,album,genre } = req.body;
  try {

    const updatedMusic = await Music.findById(id);
    if(!updatedMusic) {
      return res.status(400).json({
        errors: [{ msg: "Music doesnot exist" }],
      })
    }
    if(title) updatedMusic.title = title;
    if(artist) updatedMusic.artist = artist;
    if(album) updatedMusic.album = album;
    if(genre) updatedMusic.genre = genre;
   
    await updatedMusic.save();
   
    res.json(updatedMusic);
  } catch (error:any) {
    console.log( error);
    if (error && error.kind && error.kind === 'ObjectId') {
      return res.status(400).json({
        msg: 'There is no music with this id',
      });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMusic = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedMusic = await Music.findByIdAndDelete(id);
   
    res.json(deletedMusic); 
  } catch (error:any) {
    console.log( error);
    if (error && error.kind && error.kind === 'ObjectId') {
      return res.status(400).json({
        msg: 'There is no music with this id',
      });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};



  export const getMusics = async (req: Request, res: Response) => {
    try {
      const musics = await Music.find();
     
      res.json(musics);
    } catch (error) {
      console.log( error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

 


export default {addMusic,getMusics,deleteMusic,updateMusic};
