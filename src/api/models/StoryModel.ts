import mongoose from 'mongoose';

const storyModel = new mongoose.Schema({
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

export default mongoose.model('Story', storyModel);