import React, { useEffect, useState } from 'react';
import GetReviews from '../../hooks/getReviews';

const reviews = [
  { review: 'Great experience!', date: '2023-09-15' },
  { review: 'Amazing service!', date: '2023-09-17' },
  // Add more reviews as needed
];

const Review = () => {
  const [userId, setUserId] = useState();
  const reviewsGot = GetReviews(userId);

  console.log('reviews', reviewsGot);

  useEffect(() => {
    if (localStorage.getItem('loginUserId')) {
      setUserId(localStorage.getItem('loginUserId'));
    }
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Review</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={index}>
              <td>{review.review}</td>
              <td>{review.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Review;
