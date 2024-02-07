import mongoose, { Document, Schema } from "mongoose";

export interface Music extends Document {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const musicSchema = new Schema<Music>({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  genre: { type: String, required: true },
});

const  Music = mongoose.model<Music>("Music", musicSchema);
export default Music