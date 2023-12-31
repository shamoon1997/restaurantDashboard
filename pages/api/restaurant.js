import connectDB from '../../lib/db';
import User from '../../models/User';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const email = req.query.email;
    try {
      const user = await User.findOne({ email: email });
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'POST') {
    const { email, restaurantName, restaurantAddress, reviewQuestion } =
      req.body;
    try {
      const response = await User.findOneAndUpdate(
        { email: email },
        {
          restaurantName: restaurantName,
          restaurantAddress: restaurantAddress,
          reviewQuestion: reviewQuestion,
        },
        {
          new: true,
        }
      );

      res.status(201).json({
        status: 201,
        response: response,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
}
