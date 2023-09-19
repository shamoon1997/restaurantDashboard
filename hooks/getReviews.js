import { useState, useEffect } from 'react';

const GetReviews = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);

        try {
          const response = await fetch(`/api/review?id=${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();

          setData(result.reviews);
        } catch (error) {
          setError(error);
        }

        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};

export default GetReviews;
