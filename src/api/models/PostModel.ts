import mongoose, { Document, Model } from 'mongoose';

interface IComment {
  body: string,
  user: mongoose.Schema.Types.ObjectId,
}

interface IPostModel extends Document {
  _id: mongoose.Schema.Types.ObjectId,
  user?: mongoose.Schema.Types.ObjectId,
  image: string | undefined | null,
  imageUrl: string | undefined | null,
  likes?: Object[] | [],
  shares?: Object[] | [],
  postDate?: Date,
  comments?: IComment[],
 }

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: {
    type: String,
    required: true,
  },
  imageUrl: {
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

const Post: Model<IPostModel> = mongoose.model<IPostModel>('Post', postSchema);

export default Post;