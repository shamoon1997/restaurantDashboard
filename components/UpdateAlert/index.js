import React from 'react';

const UpdateAlert = ({ message }) => {
  const originalMessage = message || ' Information udpated successfully!';
  return (
    <div
      className="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      {originalMessage}
    </div>
  );
};

export default UpdateAlert;
