import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  review: String,
  givenTo: String,
  time: String,
});

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
