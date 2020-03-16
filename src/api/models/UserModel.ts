import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: { 
    type: mongoose.Schema.Types.ObjectId, 
    default: mongoose.Types.ObjectId() 
  },
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
      type: String,
      ref: 'User',
    }
  ],
  following: [
    {
      type: String,
      ref: 'User',
    }
  ],
  creationDate: { 
    type: Date, 
    default: Date.now() 
  },
});

export default mongoose.model('User', userSchema);