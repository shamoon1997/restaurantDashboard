import { useEffect, useState } from 'react';

const useApiValidation = (id) => {
  const [isValidResponse, setIsValidResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/user/?id=${id}`);
          setIsValidResponse(response.ok); // true if HTTP status is in the range 200-299
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsValidResponse(false);
          setLoading(false);
        }
      } else {
        setIsValidResponse(false);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { isValidResponse, loading };
};

export default useApiValidation;
