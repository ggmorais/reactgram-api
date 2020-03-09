import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      body: {
        type: String,
        required: true,
      }
    },
  ],
  shares: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

export default mongoose.model('Post', postSchema);