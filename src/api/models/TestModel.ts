import mongoose, { mongo } from 'mongoose';

const testSchema = new mongoose.Schema({
  val1: String,
  val2: Number,
});

export default mongoose.model('Test', testSchema);