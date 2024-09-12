import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  videoId: string;
  title: string;
  thumbnail: string;
}

const VideoSchema: Schema = new Schema({
  videoId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

export default mongoose.model<IVideo>('Video', VideoSchema);
