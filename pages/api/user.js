// pages/api/posts.js
import connectDB from '../../lib/db';
import User from '../../models/User';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    console.log('request received! ');
    const email = req.query.email;
    const user = await User.findOne({ email: email });
    res.status(200).json(user);
  } else if (req.method === 'POST') {
    const { email, username } = req.body;
    const user = new User({ email, username });
    await user.save();
    res.status(201).json(user);
  }
}