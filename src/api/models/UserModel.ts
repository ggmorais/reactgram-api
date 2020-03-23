import mongoose, { Document, Model } from 'mongoose';

interface IUserModel extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  password: string;
  followers?: Object[];
  follwing?: Object[];
  creationDate?: Date | string | number | undefined;
}

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullname: { 
    type: String, 
    required: true, 
    maxlength: 32, 
    minlength: 3 
  },
  username: {
    type: String,
    required: true,
    maxlength: 16,
    minlength: 3,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 32,
    minlength: 8,
  },
  followers: [
    {
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  creationDate: { 
    type: Date, 
    default: Date.now() 
  },
});

const User: Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema);

export default User;