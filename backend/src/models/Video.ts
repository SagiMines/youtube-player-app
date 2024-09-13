import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing a video document in MongoDB.
 *
 * @interface
 * @extends Document
 */
export interface IVideo extends Document {
  videoId: string;
  title: string;
  thumbnail: string;
}

/**
 * Mongoose schema for the `Video` model.
 *
 * The schema defines the structure of video documents in the MongoDB collection, including:
 * - `videoId`: A unique identifier for each video.
 * - `title`: The title of the video.
 * - `thumbnail`: A URL to the video's thumbnail.
 *
 * All fields are required.
 *
 * @schema VideoSchema
 */
const VideoSchema: Schema = new Schema({
  videoId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

export default mongoose.model<IVideo>('Video', VideoSchema);
