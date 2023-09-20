import React, { useEffect, useState } from 'react';
import GetReviews from '../../hooks/getReviews';

const Review = () => {
  const [userId, setUserId] = useState(null); // Initialize with null
  const reviewsGot = GetReviews(userId);
  const [reviews, setReviews] = useState([]);

  console.log('reviews', reviewsGot);

  useEffect(() => {
    if (localStorage.getItem('loginUserId')) {
      setUserId(localStorage.getItem('loginUserId'));
    }
  }, []);

  useEffect(() => {
    if (reviewsGot && reviewsGot.data) {
      setReviews(reviewsGot.data); // Update state with valid data
    }
  }, [reviewsGot]);

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
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <tr key={index}>
                <td>{review.review}</td>
                <td>{review.time}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No reviews found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Review;
