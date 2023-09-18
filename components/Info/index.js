import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import UpdateAlert from '../UpdateAlert';

function Info() {
  const session = useSession();
  const [restaurantName, setRestaurantName] = useState();
  const [restaurantAddress, setRestaurantAddress] = useState();
  const [showUpdateAlert, setShowUpdateAlert] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/restaurant/?email=${session?.data?.user?.email}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('data', data);
        setRestaurantName(data.restaurantName);
        setRestaurantAddress(data.restaurantAddress);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    console.log('session.data.user.email', session?.data?.user?.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.data?.user?.email]);

  const handleUpdation = async () => {
    if (restaurantName && restaurantAddress) {
      try {
        const response = await fetch('/api/restaurant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: session?.data?.user?.email,
            restaurantName: restaurantName,
            restaurantAddress: restaurantAddress,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.status == 201) {
          setShowUpdateAlert(true);
          setTimeout(() => {
            setShowUpdateAlert(false);
          }, 2000);
        }
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  };

  console.log('session in Info: ', session);
  return (
    <div className="row">
      <div className="col-sm-6 mb-3">
        <label htmlFor="restaurantName" className="form-label">
          Restaurant Name
        </label>
        <input
          type="text"
          className="form-control"
          id="restaurantName"
          placeholder="Enter restaurant name"
          style={{ height: '50px', width: '100%' }}
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
      </div>
      <div className="col-sm-6 mb-3">
        <label htmlFor="restaurantAddress" className="form-label">
          Restaurant Address
        </label>
        <input
          type="text"
          className="form-control"
          id="restaurantAddress"
          placeholder="Enter restaurant address"
          style={{ height: '50px', width: '100%' }}
          value={restaurantAddress}
          onChange={(e) => setRestaurantAddress(e.target.value)}
        />
      </div>
      <div className="col-sm-12">
        <button
          className="btn btn-primary btn-block" // Use btn-block to make it full width
          style={{ height: '50px' }}
          onClick={() => handleUpdation()}
        >
          Update
        </button>
      </div>
      {showUpdateAlert && <UpdateAlert />}
    </div>
  );
}

export default Info;
