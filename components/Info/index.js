import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import UpdateAlert from '../UpdateAlert';
import QRCodeGenerator from '../QrCodeGenerator';
import jsPDF from 'jspdf';

function Info() {
  const session = useSession();
  const [restaurantName, setRestaurantName] = useState();
  const [restaurantAddress, setRestaurantAddress] = useState();
  const [reviewQuestion, setReviewQuestion] = useState();
  const [showUpdateAlert, setShowUpdateAlert] = useState();
  const [showQRCode, setShowQRCode] = useState(false);
  const [currentHostName, setCurrentHostName] = useState();
  const [currentUserId, setCurrentUserId] = useState();

  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      setCurrentHostName('http://' + window.location.hostname + ':3000');
    } else {
      setCurrentHostName('https://' + window.location.hostname);
    }
  }, []);

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
        setRestaurantName(data.restaurantName);
        setRestaurantAddress(data.restaurantAddress);
        setReviewQuestion(data.reviewQuestion);
        setCurrentUserId(data._id);
        localStorage.setItem('loginUserId', data._id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

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
            reviewQuestion: reviewQuestion,
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
  const handlePrintQRCode = () => {
    const qrCodeDiv = document.getElementById('qrCodeDiv');

    if (qrCodeDiv) {
      const pdf = new jsPDF();
      const canvasElement = qrCodeDiv.querySelector('canvas');

      if (canvasElement) {
        const imageData = canvasElement.toDataURL('image/png');
        pdf.addImage(imageData, 'PNG', 15, 40, 180, 180);
        pdf.save('qr_code.pdf');
      }
    }
  };

  return (
    <div className="container">
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
            value={restaurantAddress}
            onChange={(e) => setRestaurantAddress(e.target.value)}
          />
        </div>
        {/* <div className="col-sm-12 mb-3">
          <label htmlFor="reviewQuestion" className="form-label">
            Review Question
          </label>
          <input
            type="text"
            className="form-control"
            id="reviewQuestion"
            placeholder="Enter the review question"
            value={reviewQuestion}
            onChange={(e) => setReviewQuestion(e.target.value)}
          />
        </div> */}
        <div className="col-sm-12 mb-3">
          <button
            className="btn btn-primary btn-block"
            onClick={() => handleUpdation()}
          >
            Update
          </button>
        </div>
        <div className="col-sm-12">
          <button
            className="btn btn-primary btn-block"
            onClick={() => setShowQRCode(!showQRCode)}
          >
            Toggle QR Code
          </button>
          {showQRCode && (
            <>
              <div id="qrCodeDiv" style={{ 'margin-top': '20px' }}>
                <QRCodeGenerator
                  slug={currentHostName + '/review/' + currentUserId}
                />
              </div>

              <div className="col-sm-12" style={{ 'margin-top': '20px' }}>
                <button
                  className="btn btn-primary btn-block"
                  onClick={handlePrintQRCode}
                >
                  Print QR Code
                </button>
              </div>
            </>
          )}
        </div>
        {showUpdateAlert && <UpdateAlert />}
      </div>
    </div>
  );
}

export default Info;
