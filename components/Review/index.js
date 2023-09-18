import React from 'react';

const reviews = [
  { review: 'Great experience!', date: '2023-09-15' },
  { review: 'Amazing service!', date: '2023-09-17' },
  // Add more reviews as needed
];

const Review = () => {
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
