// components/QRCodeGenerator.js

import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ slug }) => {
  return (
    <div>
      <QRCode value={slug} />
    </div>
  );
};

export default QRCodeGenerator;
