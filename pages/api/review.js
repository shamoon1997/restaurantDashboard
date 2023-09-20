import connectDB from '../../lib/db';
import Review from '../../models/Review';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const id = req.query.id;
    const reviews = await Review.find({ givenTo: id }).sort({ _id: -1 });
    if (reviews) {
      return res.status(200).json({ status: 200, reviews: reviews });
    } else {
      return res.status(400).json({ status: 200, reviews: reviews });
    }
  } else if (req.method === 'POST') {
    const { review, givenTo, time } = req.body;
    const reviewCreated = new Review({ review, givenTo, time });
    await reviewCreated.save();
    res.status(201).json({
      status: 201,
      reviewCreated,
    });
  }
}
