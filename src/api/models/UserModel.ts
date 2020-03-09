import mongoose from 'mongoose';

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
  followers: [
    {
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

export default mongoose.model('User', userSchema);