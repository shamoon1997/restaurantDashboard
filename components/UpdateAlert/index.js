import React from 'react';

const UpdateAlert = ({ message }) => {
  const originalMessage = message || ' Information updated successfully!';
  return (
    <div style={{ 'margin-top': '20px' }}>
      {' '}
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        {originalMessage}
      </div>
    </div>
  );
};

export default UpdateAlert;
