import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  restaurantName: String,
  restaurantAddress: String,
});

export default mongoose.models.User || mongoose.model('User', userSchema);
