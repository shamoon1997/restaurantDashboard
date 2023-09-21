import React, { useEffect, useState } from 'react';
import GetReviews from '../../hooks/getReviews';

const Review = () => {
  const [userId, setUserId] = useState(null);
  const reviewsGot = GetReviews(userId);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('loginUserId')) {
      setUserId(localStorage.getItem('loginUserId'));
    }
  }, []);

  useEffect(() => {
    if (reviewsGot && reviewsGot.data) {
      setReviews(reviewsGot.data);
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
          {reviews.length > 0 &&
            !reviewsGot.loading &&
            reviews.map((review, index) => (
              <tr key={index}>
                <td>{review.review}</td>
                <td>{review.time}</td>
              </tr>
            ))}
          {reviews.length === 0 && !reviewsGot.loading && (
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
