import { useEffect, useState } from 'react';

const useApiValidation = (id) => {
  const [isValidResponse, setIsValidResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/user/?id=${id}`);
          setIsValidResponse(response.ok); // true if HTTP status is in the range 200-299
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsValidResponse(false);
        }
      } else {
        setIsValidResponse(false);
      }
    };

    fetchData();
  }, [id]);

  return isValidResponse;
};

export default useApiValidation;
