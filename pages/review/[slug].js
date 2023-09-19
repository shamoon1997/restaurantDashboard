import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'; // Import CSS module
import UpdateAlert from '../../components/UpdateAlert';
import useApiValidation from '../../hooks/ValidateAPI';

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return date.toLocaleString(undefined, options);
}

function Review() {
  const router = useRouter();
  const { slug } = router.query;
  const [review, setReview] = useState('');
  const [consumerId, setConsumerId] = useState();
  const [reviewSubmitted, setReviewSubmitted] = useState();

  const isValidResponse = useApiValidation(slug);

  console.log('isValidResponse: ', isValidResponse);

  useEffect(() => {
    setConsumerId(slug);
  }, [slug]);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmitReview = () => {
    // Simulate a dummy API call
    const requestBody = {
      review: review,
      time: formatTimestamp(Date.now()),
      givenTo: consumerId,
    };

    fetch('/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        setReview('');
        setReviewSubmitted(true);
      })
      .catch((error) => console.error('Error submitting review:', error));
    setReview('');
  };

  useEffect(() => {
    const reviewTextarea = document?.getElementById('reviewTextarea');
    reviewTextarea?.addEventListener('input', () => {
      if (reviewTextarea?.value?.trim() === '') {
        reviewTextarea?.classList?.add(styles.faded);
      } else {
        reviewTextarea?.classList?.remove(styles.faded);
      }
    });
  }, []);

  return (
    <div className="container mt-4">
      {isValidResponse && (
        <div className="row">
          <div className="col-12">
            <h2 className="mb-3">Write a Review</h2>
            <div className={`mb-3 ${styles.textareaContainer}`}>
              <label htmlFor="reviewTextarea" className="form-label">
                Your Review
              </label>
              <textarea
                className={`form-control ${styles.textarea}`}
                id="reviewTextarea"
                rows="5"
                value={review}
                onChange={handleReviewChange}
              />
            </div>
            <button
              className={`btn btn-primary ${styles.submitButton}`}
              onClick={handleSubmitReview}
              disabled={!review} // Disable if review is empty
            >
              Submit Review
            </button>
          </div>
          <div style={{ 'margin-top': '20px' }}>
            {reviewSubmitted && (
              <UpdateAlert message={'Review submitted successfully! '} />
            )}
          </div>
        </div>
      )}
      {!isValidResponse && <p>InValid Page</p>}
    </div>
  );
}

export default Review;
