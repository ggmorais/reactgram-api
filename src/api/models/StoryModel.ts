import mongoose, { Model, Document } from 'mongoose';

interface IStoryModel extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  postDate?: Date;
  image: String;
  views: Object[] | [];
}

const storySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  postDate: {
    type: Date,
    default: Date.now(),
  },
  image: {
    type: String,
    required: true,
  },
  views: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

const StoryModel: Model<IStoryModel> = mongoose.model<IStoryModel>('Story', storySchema);

export default StoryModel;